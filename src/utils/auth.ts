// 토큰 관리 유틸리티
export const tokenManager = {
  getAccessToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  },

  setAccessToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  },

  removeAccessToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
  },

  getRefreshToken: async () => {
    // 서버에서 쿠키를 읽어야 하므로 API 호출 필요
    const response = await fetch('/api/auth/get-refresh-token');
    const data = await response.json();
    return data.refresh_token;
  },
};

// 토큰 재발급 함수
export async function reissueToken(): Promise<boolean> {
  try {
    const response = await fetch('/api/member/reissue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: await tokenManager.getRefreshToken(),
      }),
    });

    const data = await response.json();

    if (data.code === 200) {
      tokenManager.setAccessToken(data.data.access_token);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Token reissue failed:', error);
    return false;
  }
}

// API 요청 래퍼 함수
export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const accessToken = tokenManager.getAccessToken();
  
  const headers = {
    ...options.headers,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  let response = await fetch(url, { ...options, headers });

  // 토큰 만료 시 재발급 시도
  if (response.status === 401) {
    const reissued = await reissueToken();
    
    if (reissued) {
      // 새 토큰으로 재시도
      const newAccessToken = tokenManager.getAccessToken();
      headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(url, { ...options, headers });
    } else {
      // 재발급 실패 시 로그인 페이지로 리다이렉트
      tokenManager.removeAccessToken();
      window.location.href = '/';
    }
  }

  return response;
}

// 로그아웃 함수
export async function logout() {
  try {
    const refreshToken = await tokenManager.getRefreshToken();
    
    await fetch('/api/member/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    tokenManager.removeAccessToken();
    window.location.href = '/';
  }
}