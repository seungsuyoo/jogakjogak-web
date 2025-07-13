'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { tokenManager } from '@/utils/auth';

function KakaoCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('===== 카카오 로그인 콜백 시작 =====');
        
        let refreshToken: string | null = null;

        // 쿠키에서 refresh token 가져오기 (환경 구분 없이 통일)
        console.log('쿠키에서 refresh token 가져오기 시도');
        console.log('현재 URL:', window.location.href);
        
        // 먼저 현재 쿠키 상태 확인
        console.log('쿠키 문자열 (초기):', document.cookie);
        
        // 백엔드가 이미 처리했는지 확인하기 위해 잠시 대기
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('0.5초 후 쿠키 문자열:', document.cookie);
        
        // API를 통해 쿠키 확인
        const getRefreshTokenResponse = await fetch('/api/auth/get-refresh-token', {
          credentials: 'include',
        });
        
        console.log('get-refresh-token API 응답 상태:', getRefreshTokenResponse.status);
        const refreshTokenData = await getRefreshTokenResponse.json();
        console.log('get-refresh-token API 응답:', JSON.stringify(refreshTokenData));
        
        if (!refreshTokenData.refresh_token) {
          console.error('❌ 쿠키에서 refresh token을 찾을 수 없습니다.');
          router.push('/?error=login_failed');
          return;
        }
        
        refreshToken = refreshTokenData.refresh_token;
        console.log('✅ 쿠키에서 refresh token 추출: 성공');
        console.log('refresh token 길이:', refreshToken.length);

        // refresh_token으로 access_token 받기
        console.log('토큰 재발급 API 호출 시작');
        const response = await fetch('/api/member/reissue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            refresh_token: refreshToken
          }),
        });
        console.log('토큰 재발급 API 응답 상태:', response.status);

        const data = await response.json();

        console.log('===== 카카오 로그인 처리 결과 =====');
        console.log('Reissue response:', data);
        console.log('Response status:', response.status);
        console.log('Response code:', data.code);
        console.log('Access token 존재 여부:', !!data.data?.access_token);
        console.log('Refresh token 존재 여부:', !!data.data?.refresh_token);

        if (data.code === 200 && data.data?.access_token) {
          console.log('✅ 로그인 성공! Access token을 저장합니다.');
          // access_token을 localStorage에 저장
          tokenManager.setAccessToken(data.data.access_token);
          console.log('✅ Access token 저장 완료. 메인 페이지로 이동합니다.');
          router.push('/');
        } else {
          console.log('❌ 로그인 실패!');
          console.log('실패 이유:', data.message || 'Access token이 없습니다.');
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

export default function KakaoCallback() {
  return (
    <Suspense 
      fallback={
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontFamily: 'Pretendard'
        }}>
          <p>로딩 중...</p>
        </div>
      }
    >
      <KakaoCallbackContent />
    </Suspense>
  );
}