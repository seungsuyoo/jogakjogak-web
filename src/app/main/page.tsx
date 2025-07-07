"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ResumeRegistration } from "@/components/ResumeRegistration";
import { JobAdd } from "@/components/JobAdd";
import { JobList } from "@/components/JobList";

export default function MainPage() {
  const router = useRouter();

  const handleJobClick = () => {
    router.push("/job/1");
  };

  return (
    <>
      <Header backgroundColor="white" showLogout={true} />
      <main className={styles.main}>
        <div className={styles.container}>
          <ResumeRegistration />
          
          <div className={styles.jobSection}>
            <JobAdd />
            
            {/* Mock job posting */}
            <JobList
              title="2025 상반기 신입 개발자 채용"
              company="카카오"
              registerDate="2025년 01월 07일"
              state="default"
              completedCount="12"
              totalCount="30"
              dDay={52}
              onClick={handleJobClick}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}