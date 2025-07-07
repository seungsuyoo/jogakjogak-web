"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProgressBar } from "@/components/ProgressBar";
import { DDayChip } from "@/components/DDayChip";
import { JogakCategory } from "@/components/JogakCategory";
import { MemoBox } from "@/components/MemoBox";
import arrowBackIcon from "@/assets/images/ic_arrow_back.svg";
import alarmIcon from "@/assets/images/ic_alarm.svg";
import bookmarkIcon from "@/assets/images/ic_add_to_bookmark.svg";
import moreIcon from "@/assets/images/ic_more.svg";
import contentEmphasisIcon from "@/assets/images/content-emphasis-and-reorganization.svg";
import scheduleIcon from "@/assets/images/employment-schedule-and-others.svg";

export default function JobDetailPage() {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <>
      <Header backgroundColor="white" showLogout={true} />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Header with navigation */}
          <div className={styles.header}>
            <div className={styles.leftSection}>
              <button className={styles.backButton} onClick={handleBack}>
                <Image 
                  src={arrowBackIcon}
                  alt="뒤로가기"
                  width={18.17}
                  height={17.69}
                />
              </button>
            </div>

            <div className={styles.rightSection}>
              <button className={styles.actionButton}>
                <span className={styles.actionButtonText}>채용공고 보기</span>
              </button>

              <button 
                className={`${styles.iconButton} ${isBookmarked ? styles.bookmarked : ''}`}
                onClick={toggleBookmark}
              >
                <Image 
                  src={bookmarkIcon}
                  alt="북마크"
                  width={21.33}
                  height={24}
                  style={{ opacity: isBookmarked ? 1 : 0.7 }}
                />
              </button>

              <button className={styles.iconButton}>
                <Image 
                  src={moreIcon}
                  alt="더보기"
                  width={21.33}
                  height={5.33}
                />
              </button>
            </div>
          </div>

          {/* Job details */}
          <div className={styles.jobDetails}>
            <div className={styles.jobDetailsTop}>
              <div className={styles.jobDetailsLeft}>
                <DDayChip 
                  alarm="off"
                  state="default"
                  dDay={52}
                />
                <div className={styles.modifiedInfo}>
                  <div className={styles.modifiedText}>3일 전 수정</div>
                </div>
              </div>
              <div className={styles.jobDetailsRight}>
                <div className={styles.registerInfo}>
                  <div className={styles.registerText}>등록일</div>
                  <div className={styles.separator}>|</div>
                  <div className={styles.registerText}>25년 5월 24일 목요일</div>
                </div>
              </div>
            </div>
            <div className={styles.jobDetailsBottom}>
              <div className={styles.jobTitle}>풀스택 개발자</div>
              <div className={styles.companyName}>KT&amp;G</div>
            </div>
          </div>

          {/* Progress tracker */}
          <div className={styles.progressTracker}>
            <div className={styles.progressContent}>
              <div className={styles.progressHeader}>
                <div className={styles.progressTitle}>완료한 조각</div>
                <p className={styles.progressCount}>
                  <span className={styles.progressCountActive}>4</span>
                  <span className={styles.progressCountTotal}> / 30</span>
                </p>
              </div>
              <ProgressBar
                total={30}
                completed={4}
                className={styles.progressBarInstance}
              />
            </div>
            <button className={styles.notificationBtn}>
              <Image 
                src={alarmIcon}
                alt="알림"
                width={14.2}
                height={13.1}
              />
              <div className={styles.notificationBtnText}>알림 신청</div>
            </button>
          </div>

          {/* Jogak Categories */}
          <div className={styles.jogakCategories}>
            <JogakCategory 
              state="active"
              title="필요한 경험과 역량"
              initialItems={[
                { id: "1", text: "경력 기간 명확화", completed: true },
                { id: "2", text: "리더 경험 만들기", completed: false },
                { id: "3", text: "최대 10개 표시입니다.", completed: true },
                { id: "4", text: "TO DO LIST EXAMPLE", completed: false },
                { id: "5", text: "투두 리스트 예시", completed: false },
                { id: "6", text: "투두 리스트 예시", completed: false },
              ]}
              checkboxColor="#D9A9F9"
              className={styles.jogakCategoryInstance}
              onItemToggle={(itemId) => console.log(`Toggled item: ${itemId}`)}
            />
            
            <JogakCategory 
              state="active"
              title="내용 강조 및 재구성"
              initialItems={[
                { id: "1", text: "핵심 성과 수치화", completed: false },
                { id: "2", text: "구체적인 기술 스택 명시", completed: false },
                { id: "3", text: "프로젝트 임팩트 강조", completed: false },
                { id: "4", text: "협업 경험 구체화", completed: false },
                { id: "5", text: "문제 해결 과정 서술", completed: false },
                { id: "6", text: "성장 과정 스토리텔링", completed: false },
              ]}
              checkboxColor="#FFD00E"
              icon={contentEmphasisIcon}
              className={styles.jogakCategoryInstance}
              onItemToggle={(itemId) => console.log(`Toggled emphasis item: ${itemId}`)}
            />
            
            <JogakCategory 
              state="active"
              title="취업 일정 및 기타"
              initialItems={[
                { id: "1", text: "서류 마감일 확인", completed: false },
                { id: "2", text: "코딩 테스트 준비", completed: false },
                { id: "3", text: "면접 예상 질문 정리", completed: false },
                { id: "4", text: "포트폴리오 업데이트", completed: false },
                { id: "5", text: "자기소개서 최종 검토", completed: false },
                { id: "6", text: "레퍼런스 연락처 정리", completed: false },
              ]}
              checkboxColor="#3DC3A9"
              icon={scheduleIcon}
              className={styles.jogakCategoryInstance}
              onItemToggle={(itemId) => console.log(`Toggled schedule item: ${itemId}`)}
            />
          </div>

          {/* Memo Box */}
          <MemoBox 
            placeholder="해당 조각에 대해 메모해보세요."
            maxLength={1000}
            className={styles.memoBoxInstance}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}