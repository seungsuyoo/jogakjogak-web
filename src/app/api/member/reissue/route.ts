import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { refresh_token } = body;

    // refresh_token이 'from_cookie'인 경우 쿠키에서 읽기
    if (refresh_token === 'from_cookie' || !refresh_token) {
      refresh_token = request.cookies.get('refresh_token')?.value;
    }

    if (!refresh_token) {
      return NextResponse.json(
        { code: 400, message: 'refresh_token is required' },
        { status: 400 }
      );
    }

    // 백엔드 서버로 토큰 재발급 요청
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://www.jogakjogak.com'}/api/member/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token }),
    });

    const data = await response.json();

    if (data.code === 200) {
      // 새로운 refresh_token을 쿠키에 저장
      const res = NextResponse.json(data);
      res.cookies.set('refresh_token', data.data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30일
      });
      
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