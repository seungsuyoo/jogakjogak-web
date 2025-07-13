import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('[PROD] Get refresh token API 호출됨');
    console.log('[PROD] 모든 쿠키:', request.cookies.getAll());
    console.log('[PROD] Request headers:', Object.fromEntries(request.headers.entries()));
    
    // 쿠키에서 refresh token 읽기
    const refreshToken = request.cookies.get('refresh')?.value;
    console.log('[PROD] refresh 쿠키:', refreshToken ? `있음 (길이: ${refreshToken.length})` : '없음');

    if (!refreshToken) {
      console.log('[PROD] refresh token이 쿠키에 없음');
      return NextResponse.json(
        { refresh_token: null },
        { status: 200 }
      );
    }

    console.log('[PROD] refresh token 반환 성공');
    return NextResponse.json(
      { refresh_token: refreshToken },
      { status: 200 }
    );
  } catch (error) {
    console.error('[PROD] Error getting refresh token:', error);
    console.error('[PROD] Error details:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: 'Failed to get refresh token' },
      { status: 500 }
    );
  }
}