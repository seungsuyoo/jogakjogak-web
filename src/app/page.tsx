"use client";

import styles from "./page.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import section1 from "@/assets/images/section1.png";
import section2 from "@/assets/images/section2.png";
import section3 from "@/assets/images/section3.png";

export default function Home() {
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
