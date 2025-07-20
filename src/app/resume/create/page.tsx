"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/Button";
import arrowBackIcon from "@/assets/images/ic_arrow_back.svg";
import arrowDropDownIcon from "@/assets/images/ic_drop_down.svg";
import chatInfoIcon from "@/assets/images/ic_chat_info.svg";
import { tokenManager } from "@/utils/auth";

export default function CreateResumePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get('id');
  const [resumeTitle, setResumeTitle] = useState("나의 이력서");
  const [resumeText, setResumeText] = useState("");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchResume = useCallback(async () => {
    setIsLoading(true);
    try {
      const accessToken = tokenManager.getAccessToken();
      const response = await fetch(`/api/resume/${resumeId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          setResumeTitle(data.data.title || '나의 이력서');
          setResumeText(data.data.content || '');
        }
      }
    } catch (error) {
      console.error('Failed to fetch resume:', error);
    } finally {
      setIsLoading(false);
    }
  }, [resumeId]);

  // resumeId가 있으면 기존 이력서 불러오기
  useEffect(() => {
    if (resumeId) {
      fetchResume();
    }
  }, [resumeId, fetchResume]);

  const handleBack = () => {
    router.back();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeTitle(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value);
  };

  const toggleHelp = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  const handleSubmit = async () => {
    if (!resumeTitle.trim() || !resumeText.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const accessToken = tokenManager.getAccessToken();
      const url = resumeId ? `/api/resume/${resumeId}` : '/api/resume';
      const method = resumeId ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          title: resumeTitle,
          content: resumeText
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(resumeId ? "이력서가 성공적으로 수정되었습니다." : "이력서가 성공적으로 등록되었습니다.");
        router.push('/');
      } else if (response.status === 409) {
        alert("이미 이력서가 등록되어 있습니다.");
      } else {
        alert(data.message || (resumeId ? "이력서 수정에 실패했습니다." : "이력서 등록에 실패했습니다."));
      }
    } catch (error) {
      console.error('Resume submission error:', error);
      alert(resumeId ? "이력서 수정 중 오류가 발생했습니다." : "이력서 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header backgroundColor="white" showLogout={true} />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <button className={styles.backButton} onClick={handleBack}>
              <Image 
                src={arrowBackIcon}
                alt="뒤로가기"
                width={15.57}
                height={15.16}
              />
            </button>
            <h1 className={styles.title}>{resumeId ? '나의 이력서 수정하기' : '나의 이력서 만들기'}</h1>
            <Button variant="disabled" className={styles.pdfButton}>
              PDF로 불러오기
            </Button>
          </div>

          <div className={styles.content}>
            {isLoading && resumeId ? (
              <div className={styles.fullLoadingContainer}>
                <div className={styles.spinner} />
                <p className={styles.loadingText}>이력서를 불러오는 중...</p>
              </div>
            ) : (
              <>
                <div className={styles.resumeSection}>
                  <div className={styles.resumeHeader}>
                    <input
                      type="text"
                      className={styles.resumeTitleInput}
                      value={resumeTitle}
                      onChange={handleTitleChange}
                      maxLength={30}
                    />
                    <span className={styles.counter}>{resumeTitle.length}/30</span>
                  </div>
                </div>

                <div className={styles.inputSection}>
                  <textarea
                    className={styles.textarea}
                    placeholder="갖고 있는 이력서 내용을 복사/붙여넣기 하면 한번에 정리해드릴게요."
                    maxLength={5000}
                    value={resumeText}
                    onChange={handleTextChange}
                  />
                  <div className={styles.charCounter}>
                    <span>{resumeText.length}/5000</span>
                  </div>
                </div>
              </>
            )}

            <div className={styles.helpSection} onClick={toggleHelp}>
              <div className={styles.helpContent}>
                <Image 
                  src={chatInfoIcon}
                  alt="도움말"
                  width={16.67}
                  height={15.51}
                  className={styles.helpIcon}
                />
                <span className={styles.helpText}>
                  이력서에 어떤걸 넣을지 모르겠나요?
                </span>
              </div>
              <Image 
                src={arrowDropDownIcon}
                alt="펼치기"
                width={8.6}
                height={4.7}
                className={`${styles.dropdownIcon} ${isHelpOpen ? styles.rotated : ''}`}
              />
            </div>

            <button 
              className={styles.completeButton}
              onClick={handleSubmit}
              disabled={isSubmitting || isLoading}
            >
              <span className={styles.completeButtonText}>
                {isLoading ? '불러오는 중...' : isSubmitting ? (resumeId ? '수정 중...' : '등록 중...') : '완료하기'}
              </span>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}