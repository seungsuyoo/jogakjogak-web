"use client";

import { useEffect, Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import section1 from "@/assets/images/section1.png";
import section2 from "@/assets/images/section2.png";
import section3 from "@/assets/images/section3.png";
import { tokenManager } from "@/utils/auth";

// Main page components
import mainStyles from "./main/page.module.css";
import { ResumeRegistration } from "@/components/ResumeRegistration";
import { JobAdd } from "@/components/JobAdd";
import { JobList } from "@/components/JobList";

interface Resume {
  resumeId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface JobDescription {
  jd_id: number;
  title: string;
  isBookmark: boolean;
  companyName: string;
  total_pieces: number;
  completed_pieces: number;
  applyAt: string | null;
  endedAt: string;
  createdAt: string;
  updatedAt: string;
}

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [resume, setResume] = useState<Resume | null>(null);
  const [jds, setJds] = useState<JobDescription[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    // 로그인 상태 확인
    const checkAuth = () => {
      const token = tokenManager.getAccessToken();
      setIsAuthenticated(!!token);
    };

    checkAuth();

    // 토큰 변경 시 리스너 등록 (로그아웃 시 대응)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // 로그인 상태일 때 데이터 불러오기
  useEffect(() => {
    if (isAuthenticated) {
      fetchJdsData();
    }
  }, [isAuthenticated]);

  const fetchJdsData = async () => {
    try {
      const accessToken = tokenManager.getAccessToken();
      const response = await fetch('/api/jds', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      
      if (data.data) {
        setResume(data.data.resume);
        setJds(data.data.jds || []);
      }
    } catch (error) {
      console.error('Failed to fetch jds data:', error);
    } finally {
      setIsDataLoaded(true);
    }
  };

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      let message = '';
      switch (error) {
        case 'no_code':
          message = '인증 코드를 받지 못했습니다.';
          break;
        case 'login_failed':
          message = '로그인에 실패했습니다. 다시 시도해 주세요.';
          break;
        default:
          message = '오류가 발생했습니다.';
      }
      
      // 에러 메시지를 사용자에게 표시 (추후 토스트나 모달로 개선 가능)
      console.error('Login error:', message);
      
      // URL에서 에러 파라미터 제거
      window.history.replaceState({}, '', '/');
    }
  }, [searchParams]);

  const handleJobClick = (jdId: number) => {
    router.push(`/job/${jdId}`);
  };

  const calculateDDay = (endedAt: string) => {
    const endDate = new Date(endedAt);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`;
  };

  // 로딩 중
  if (isAuthenticated === null) {
    return <div style={{ minHeight: '100vh' }} />;
  }

  // 로그인 상태에 따른 컨텐츠 렌더링
  if (isAuthenticated) {
    return (
      <>
        <Header backgroundColor="white" showLogout={true} />
        <main className={mainStyles.main}>
          <div className={mainStyles.container}>
            {isDataLoaded ? (
              <ResumeRegistration 
                hasResume={!!resume} 
                resumeId={resume?.resumeId} 
                resumeTitle={resume?.title}
                resumeUpdatedAt={resume?.updatedAt}
              />
            ) : (
              <div className={mainStyles.resumeLoading}>
                <div className={mainStyles.skeleton} style={{ height: '93px', borderRadius: '12px' }} />
              </div>
            )}
            
            <div className={mainStyles.jobSection}>
              <JobAdd />
              
              {!isDataLoaded ? (
                <div className={mainStyles.jobLoading}>
                  <div className={mainStyles.skeleton} style={{ height: '140px', borderRadius: '12px' }} />
                  <div className={mainStyles.skeleton} style={{ height: '140px', borderRadius: '12px' }} />
                </div>
              ) : jds.length > 0 ? (
                jds.map((jd) => (
                  <JobList
                    key={jd.jd_id}
                    title={jd.title}
                    company={jd.companyName}
                    registerDate={formatDate(jd.createdAt)}
                    state="default"
                    completedCount={String(jd.completed_pieces)}
                    totalCount={String(jd.total_pieces)}
                    dDay={calculateDDay(jd.endedAt)}
                    onClick={() => handleJobClick(jd.jd_id)}
                  />
                ))
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  등록된 채용공고가 없습니다.
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // 비로그인 상태 - 랜딩 페이지
  return (
    <div className={styles.container}>
      <Header backgroundColor="transparent" />
      
      <HeroSection />
      
      <FeatureSection
        image={section1}
        imageAlt="조각조각 서비스 화면"
        title={<>이력서와 채용 공고로<br />지금 할 일을 알 수 있어요.</>}
        description={<>동록한 이력서와 관심 채용 공고를 비교 분석해,<br />지금 보완해야 할 항목을 AI가 자동으로 정리해 드려요.</>}
      />

      <FeatureSection
        image={section2}
        imageAlt="진척도 확인 화면"
        title={<>조각을 채워가며<br />작은 성취를 만들어가세요.</>}
        description={<>할 일을 진행할 때마다 조각이 채워져요.<br />조각을 완성하면 어느새 최종 합격이 눈앞에 !</>}
        reversed
      />

      <FeatureSection
        image={section3}
        imageAlt="알림 기능 화면"
        title={<>멈춘 날도 괜찮아요.<br />다시 시작할 수 있게 도울게요.</>}
        description={<>진척도가 3일 동안 멈춰 있으면,<br />이메일로 할 일을 이어갈 수 있게 도와드려요.</>}
      />

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
