"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ResumeRegistration } from "@/components/ResumeRegistration";
import { JobAdd } from "@/components/JobAdd";
import { JobList } from "@/components/JobList";
import { tokenManager } from "@/utils/auth";
import NoResumeModal from "@/components/NoResumeModal";

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

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [resume, setResume] = useState<Resume | null>(null);
  const [jds, setJds] = useState<JobDescription[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [showNoResumeModal, setShowNoResumeModal] = useState(false);

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

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

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
        
        // 이력서가 없는 경우 모달 표시
        if (!data.data.resume) {
          setShowNoResumeModal(true);
        }
      }
    } catch (error) {
      console.error('Failed to fetch jds data:', error);
    } finally {
      setIsDataLoaded(true);
    }
  };

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

  const handleResumeRegisterClick = () => {
    setShowNoResumeModal(false);
    // 이력서 등록 페이지로 이동
    router.push('/resume/create');
  };

  if (isAuthenticated === null || !isDataLoaded) {
    return (
      <>
        <Header backgroundColor="white" showLogout={true} />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.resumeLoading}>
              <div className={styles.skeleton} style={{ height: '93px', borderRadius: '12px' }} />
            </div>
            
            <div className={styles.jobSection}>
              <JobAdd />
              <div className={styles.jobLoading}>
                <div className={styles.skeleton} style={{ height: '140px', borderRadius: '12px' }} />
                <div className={styles.skeleton} style={{ height: '140px', borderRadius: '12px' }} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Header backgroundColor="white" showLogout={true} />
      <main className={styles.main}>
        <div className={styles.container}>
          <ResumeRegistration 
            hasResume={!!resume} 
            resumeId={resume?.resumeId} 
            resumeTitle={resume?.title}
            resumeUpdatedAt={resume?.updatedAt}
          />
          
          <div className={styles.jobSection}>
            <JobAdd />
            
            {jds.length > 0 ? (
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
      
      <NoResumeModal 
        isOpen={showNoResumeModal}
        onClose={() => setShowNoResumeModal(false)}
        onRegisterClick={handleResumeRegisterClick}
      />
    </>
  );
}