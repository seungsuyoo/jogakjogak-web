import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refresh_token } = body;

    if (!refresh_token) {
      return NextResponse.json(
        { code: 400, message: 'refresh_token is required' },
        { status: 400 }
      );
    }

    // 백엔드 서버로 로그아웃 요청
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://www.jogakjogak.com'}/api/member/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token }),
    });

    const data = await response.json();

    // 로그아웃 성공 여부와 관계없이 쿠키 삭제
    const res = NextResponse.json(data);
    res.cookies.delete('refresh'); // 쿠키 이름을 refresh로 변경
    
    return res;
  } catch (error) {
    console.error('Logout error:', error);
    // 에러가 발생해도 쿠키는 삭제
    const res = NextResponse.json(
      { code: 500, message: 'Internal server error' },
      { status: 500 }
    );
    res.cookies.delete('refresh');
    return res;
  }
}