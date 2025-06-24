"use client";

import styles from "./page.module.css";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import section1 from "@/assets/images/section1.png";
import section2 from "@/assets/images/section2.png";
import section3 from "@/assets/images/section3.png";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header backgroundColor="transparent" />
      
      <main className={styles.main}>
        <div className={styles.badge}>
          <span>막막한 취업 준비, 조각조각이 함께</span>
        </div>
        <h1 className={styles.title}>
          나의 커리어 조각, 하나씩 완성해요
        </h1>
        <p className={styles.description}>
          AI가 함께하는 나의 취업 성공 투두 리스트
        </p>
        <button className={styles.ctaButton}>지금 취업 성공하기</button>
      </main>
      
      <section className={styles.featureSection}>
        <div className={styles.featureContent}>
          <div className={styles.imagePlaceholder}>
            <Image 
              src={section1} 
              alt="조각조각 서비스 화면" 
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.featureText}>
            <h2 className={styles.featureTitle}>
              이력서와 채용 공고로
              <br />
              지금 할 일을 알 수 있어요.
            </h2>
            <p className={styles.featureDescription}>
              동록한 이력서와 관심 채용 공고를 비교 분석해,
              <br />
              지금 보완해야 할 항목을 AI가 자동으로 정리해 드려요.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className={`${styles.featureContent} ${styles.reversed}`}>
          <div className={styles.imagePlaceholder}>
            <Image 
              src={section2} 
              alt="진척도 확인 화면" 
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.featureText}>
            <h2 className={styles.featureTitle}>
              조각을 채워가며
              <br />
              작은 성취를 만들어가세요.
            </h2>
            <p className={styles.featureDescription}>
              할 일을 진행할 때마다 조각이 채워져요.
              <br />
              조각을 완성하면 어느새 최종 합격이 눈앞에 !
            </p>
          </div>
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className={styles.featureContent}>
          <div className={styles.imagePlaceholder}>
            <Image 
              src={section3} 
              alt="알림 기능 화면" 
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={styles.featureText}>
            <h2 className={styles.featureTitle}>
              멈춘 날도 괜찮아요.
              <br />
              다시 시작할 수 있게 도울게요.
            </h2>
            <p className={styles.featureDescription}>
              진척도가 3일 동안 멈춰 있으면,
              <br />
              이메일로 할 일을 이어갈 수 있게 도와드려요.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
