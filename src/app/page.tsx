"use client";

import styles from "./page.module.css";
import Image from "next/image";
import section1 from "@/assets/images/section1.png";
import section2 from "@/assets/images/section2.png";
import section3 from "@/assets/images/section3.png";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundPattern}>
        <div className={styles.blueGradientContainer}>
          <div className={styles.blueCircle1}></div>
          <div className={styles.blueCircle2}></div>
        </div>
        <div className={styles.orangeGradientContainer}>
          <div className={styles.orangeCircle1}></div>
          <div className={styles.orangeCircle2}></div>
        </div>
      </div>
      
      <main className={styles.main}>
        <h1 className={styles.title}>
          내 이력서에 따른
          <br />
          할 일이 자동 생성돼요
        </h1>
        <p className={styles.description}>
          내 이력서와 기업의 채용 공고를 비교하고, 
          <br />
          자동 생성된 투두 리스트로 취업 목표에 집중해 보세요.
        </p>
        <button className={styles.ctaButton}>조각조각 시작하기</button>
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
              채용공고에 맞춰, AI가
              <br />
              지금 해야 할 일을 알려줘요
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
              눈에 보이는 진척도 덕분에
              <br />
              작은 성취도 놓치지 않게 돼요
            </h2>
            <p className={styles.featureDescription}>
              할 일을 완료할 때마다 진척도가 업데이트돼요.
              <br />
              시각적으로 확인할 수 있어 계획을 점검하기에 좋아요.
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
              멈춘 날도 괜찮아요,
              <br />
              다시 시작할 수 있게 알려드려요
            </h2>
            <p className={styles.featureDescription}>
              진척도가 일정 기간 멈춰 있으면, 알림으로 준비를 이어갈 수 있게 도와드려요.
              <br />
              중요한 채용 기회도 놓치지 않도록 챙겨드릴게요.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
