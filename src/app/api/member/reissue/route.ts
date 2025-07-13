import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { refresh_token } = body;

    console.log('Reissue API - Received body:', body);
    console.log('Reissue API - Initial refresh_token:', refresh_token);

    // refresh_token이 없는 경우 쿠키에서 읽기 (프로덕션 환경)
    if (!refresh_token) {
      refresh_token = request.cookies.get('refresh')?.value;
      console.log('Reissue API - Token from cookie:', refresh_token);
    }

    if (!refresh_token) {
      return NextResponse.json(
        { code: 400, message: 'refresh_token is required' },
        { status: 400 }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.jogakjogak.com';
    console.log('Reissue API - Backend URL:', backendUrl);
    console.log('Reissue API - Sending refresh_token:', refresh_token);

    // 백엔드 서버로 토큰 재발급 요청 - 쿠키로 전송
    const response = await fetch(`${backendUrl}/api/member/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `refresh=${refresh_token}`,
      },
    });

    const data = await response.json();
    console.log('Reissue API - Backend response:', data);
    console.log('Reissue API - Backend status:', response.status);

    // 백엔드 응답 처리
    if (response.status === 200 && data.status === 'OK') {
      // 응답 데이터 확인
      const accessToken = data.data?.newAccessToken;
      const refreshToken = data.data?.newRefreshToken;
      
      console.log('Reissue API - New access_token:', accessToken);
      console.log('Reissue API - New refresh_token:', refreshToken);
      
      // 프론트엔드가 기대하는 형식으로 응답 생성
      const responseData = {
        code: 200,
        data: {
          access_token: accessToken,
          refresh_token: refreshToken
        },
        message: data.message || 'Token reissued successfully'
      };
      
      const res = NextResponse.json(responseData);
      
      // 새로운 refresh token을 쿠키에 저장
      if (refreshToken) {
        res.cookies.set('refresh', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30, // 30일
        });
      }
      
      return res;
    } else {
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    console.error('Token reissue error:', error);
    return NextResponse.json(
      { code: 500, message: 'Internal server error' },
      { status: 500 }
    );
  }
}