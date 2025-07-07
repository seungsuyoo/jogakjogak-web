"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import arrowBackIcon from "@/assets/images/ic_arrow_back.svg";

export default function CreateJobPage() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [deadline, setDeadline] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobUrl, setJobUrl] = useState("");

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    // 채용공고 등록 로직
    console.log({
      jobTitle,
      companyName,
      jobPosition,
      deadline,
      jobDescription,
      jobUrl
    });
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
            <h1 className={styles.title}>채용공고 등록하기</h1>
          </div>

          <div className={styles.content}>
            {/* 채용공고 제목 */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <input
                  type="text"
                  className={styles.titleInput}
                  placeholder="채용공고 제목을 입력해주세요."
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  maxLength={30}
                />
                <span className={styles.counter}>{jobTitle.length}/30</span>
              </div>
            </div>

            {/* 회사 이름 */}
            <div className={styles.inputWrapper}>
              <input
                type="text"
                className={styles.input}
                placeholder="지원하는 회사 이름"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            {/* 직무 이름 */}
            <div className={styles.inputWrapper}>
              <input
                type="text"
                className={styles.input}
                placeholder="지원하는 직무 이름"
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
              />
            </div>

            {/* 마감일 */}
            <div className={`${styles.inputWrapper} ${styles.dateWrapper} ${deadline ? styles.hasValue : ''}`}>
              <input
                type="date"
                className={styles.input}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
              <span className={styles.placeholderText}>마감일 설정 (상시채용 시 건너뛰기)</span>
            </div>

            {/* 채용공고 내용 */}
            <div className={styles.textareaWrapper}>
              <textarea
                className={styles.textarea}
                placeholder="채용공고의 내용을 복사/붙여넣기 해주세요."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            {/* URL */}
            <div className={styles.inputWrapper}>
              <input
                type="url"
                className={styles.input}
                placeholder="채용공고 URL 주소"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
              />
            </div>

            {/* 완료하기 버튼 */}
            <button className={styles.completeButton} onClick={handleSubmit}>
              <span className={styles.completeButtonText}>조각 생성하기</span>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}