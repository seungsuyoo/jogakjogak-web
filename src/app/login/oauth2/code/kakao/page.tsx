'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { tokenManager } from '@/utils/auth';

export default function KakaoCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');

      if (!code) {
        console.error('No authorization code received');
        router.push('/?error=no_code');
        return;
      }

      try {
        // 백엔드 서버가 이미 인증을 처리하고 쿠키에 refresh_token을 설정
        // 먼저 쿠키에서 refresh_token을 확인
        const getRefreshTokenResponse = await fetch('/api/auth/get-refresh-token', {
          credentials: 'include',
        });
        const refreshTokenData = await getRefreshTokenResponse.json();
        
        if (!refreshTokenData.refresh_token) {
          // refresh_token이 없으면 백엔드 서버에서 로그인 처리가 완료되지 않은 것
          console.error('No refresh token found in cookies');
          router.push('/?error=login_failed');
          return;
        }

        // refresh_token이 있으면 토큰 재발급을 통해 access_token 받기
        const response = await fetch('/api/member/reissue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // 쿠키 포함
          body: JSON.stringify({
            refresh_token: refreshTokenData.refresh_token
          }),
        });

        const data = await response.json();

        if (data.code === 200 && data.data.access_token) {
          // access_token을 localStorage에 저장
          tokenManager.setAccessToken(data.data.access_token);
          router.push('/');
        } else {
          throw new Error(data.message || 'Failed to get tokens');
        }
      } catch (error) {
        console.error('Kakao callback error:', error);
        router.push('/?error=login_failed');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Pretendard'
    }}>
      <p>로그인 처리 중...</p>
    </div>
  );
}