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
    const response = await fetch(`${backendUrl}/member/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `refresh=${refresh_token}`,
      },
    });

    const data = await response.json();

    // 백엔드 응답 처리
    if (response.status === 200 && data.status === 'OK') {
      // 백엔드가 data 필드에 직접 access token을 문자열로 보냄
      const accessToken = data.data;
      
      // refresh token은 쿠키에서 가져온 것을 그대로 사용
      // (백엔드가 새로운 refresh token을 보내지 않는 경우)
      
      // 프론트엔드가 기대하는 형식으로 응답 생성
      const responseData = {
        code: 200,
        data: {
          access_token: accessToken,
          refresh_token: refresh_token
        },
        message: 'Token reissued successfully'
      };
      
      return NextResponse.json(responseData);
    } else {
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