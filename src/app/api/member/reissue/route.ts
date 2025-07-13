import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { refresh_token } = body;

    // refresh_token이 없는 경우 쿠키에서 읽기
    if (!refresh_token) {
      refresh_token = request.cookies.get('refresh')?.value;
    }

    if (!refresh_token) {
      return NextResponse.json(
        { code: 400, message: 'refresh_token is required' },
        { status: 400 }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.jogakjogak.com';

    // 백엔드 서버로 토큰 재발급 요청 - 쿠키로 전송
    const response = await fetch(`${backendUrl}/api/member/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `refresh=${refresh_token}`,
      },
    });

    // 백엔드 응답 헤더 확인
    console.log('백엔드 응답 상태:', response.status);
    const setCookieHeader = response.headers.get('set-cookie');
    console.log('Set-Cookie 헤더:', setCookieHeader);
    
    let data;
    try {
      data = await response.json();
      console.log('백엔드 응답 본문:', data);
    } catch {
      console.log('JSON 파싱 실패');
      data = {};
    }

    // 백엔드 응답 처리
    if (response.status === 200) {
      let accessToken = null;
      let newRefreshToken = null;
      
      // Set-Cookie 헤더에서 토큰 찾기
      if (setCookieHeader) {
        const cookieArray = setCookieHeader.split(/,(?=\s*\w+=)/).map(c => c.trim());
        
        for (const cookie of cookieArray) {
          const [name, ...valueParts] = cookie.split('=');
          const value = valueParts.join('=').split(';')[0];
          
          // 가능한 access token 이름들
          if (['access', 'accessToken', 'access_token', 'accesstoken'].includes(name)) {
            accessToken = value;
          }
          // refresh token
          if (['refresh', 'refreshToken', 'refresh_token', 'refreshtoken'].includes(name)) {
            newRefreshToken = value;
          }
        }
      }
      
      // JSON 응답에서도 확인 (백엔드가 양쪽 다 보낼 수도 있음)
      if (!accessToken) {
        accessToken = data.data?.newAccessToken || data.data?.accessToken || data.accessToken;
      }
      if (!newRefreshToken) {
        newRefreshToken = data.data?.newRefreshToken || data.data?.refreshToken || data.refreshToken;
      }
      
      if (!accessToken) {
        console.error('Access token을 찾을 수 없음');
        return NextResponse.json(
          { code: 500, message: 'No access token in response' },
          { status: 500 }
        );
      }
      
      // 프론트엔드가 기대하는 형식으로 응답 생성
      const responseData = {
        code: 200,
        data: {
          access_token: accessToken,
          refresh_token: newRefreshToken || refresh_token
        },
        message: 'Token reissued successfully'
      };
      
      const res = NextResponse.json(responseData);
      
      // 새로운 refresh token을 쿠키에 저장
      if (newRefreshToken) {
        res.cookies.set('refresh', newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30, // 30일
        });
      }
      
      return res;
    } else {
      console.error('백엔드 응답 실패:', response.status, data);
      return NextResponse.json(data || { code: response.status }, { status: response.status });
    }
  } catch (error) {
    console.error('Token reissue error:', error);
    return NextResponse.json(
      { code: 500, message: 'Internal server error' },
      { status: 500 }
    );
  }
}