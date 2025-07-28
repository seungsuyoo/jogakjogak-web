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
import Snackbar from "@/components/Snackbar";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";

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
  const [showNoResumeSnackbar, setShowNoResumeSnackbar] = useState(false);
  const [deletingJobId, setDeletingJobId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState({ isOpen: false, message: '', type: 'success' as 'success' | 'error' | 'info' });

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

  const handleNoResumeClick = () => {
    setShowNoResumeSnackbar(true);
  };

  // 채용공고 삭제 핸들러
  const handleJobDelete = async (jobId: number) => {
    try {
      const accessToken = tokenManager.getAccessToken();
      const response = await fetch(`/api/jds/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        setSnackbar({ isOpen: true, message: '채용공고가 삭제되었습니다.', type: 'success' });
        // 목록 새로고침
        fetchJdsData();
        setDeletingJobId(null);
      } else {
        setSnackbar({ isOpen: true, message: '채용공고 삭제에 실패했습니다.', type: 'error' });
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      setSnackbar({ isOpen: true, message: '채용공고 삭제 중 오류가 발생했습니다.', type: 'error' });
    }
  };

  // 지원 완료 핸들러
  const handleApplyComplete = async (jobId: number) => {
    try {
      const accessToken = tokenManager.getAccessToken();
      const response = await fetch(`/api/jds/${jobId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          applyAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        setSnackbar({ isOpen: true, message: '지원 완료로 표시되었습니다.', type: 'success' });
        // 목록 새로고침
        fetchJobs();
      } else {
        setSnackbar({ isOpen: true, message: '지원 완료 처리에 실패했습니다.', type: 'error' });
      }
    } catch (error) {
      console.error('Error marking as applied:', error);
      setSnackbar({ isOpen: true, message: '지원 완료 처리 중 오류가 발생했습니다.', type: 'error' });
    }
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
              <JobAdd hasResume={!!resume} onNoResumeClick={handleNoResumeClick} />
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
            <JobAdd hasResume={!!resume} onNoResumeClick={handleNoResumeClick} />
            
            {jds.length > 0 && (
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
                  onApplyComplete={() => handleApplyComplete(jd.jd_id)}
                  onDelete={() => setDeletingJobId(jd.jd_id)}
                />
              ))
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
      
      <Snackbar
        message="채용공고를 추가하기 전에 먼저 이력서를 등록해주세요."
        isOpen={showNoResumeSnackbar}
        onClose={() => setShowNoResumeSnackbar(false)}
        type="info"
        duration={3000}
      />
      
      <Snackbar
        message={snackbar.message}
        isOpen={snackbar.isOpen}
        onClose={() => setSnackbar({ ...snackbar, isOpen: false })}
        type={snackbar.type}
      />
      
      {/* Delete confirmation modal */}
      <DeleteConfirmModal
        isOpen={!!deletingJobId}
        onClose={() => setDeletingJobId(null)}
        onConfirm={() => deletingJobId && handleJobDelete(deletingJobId)}
      />
    </>
  );
}