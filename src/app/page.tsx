"use client";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
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
    </div>
  );
}
