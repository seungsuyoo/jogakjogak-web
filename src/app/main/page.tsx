"use client";

import styles from "./page.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ResumeRegistration } from "@/components/ResumeRegistration";

export default function MainPage() {
  return (
    <>
      <Header backgroundColor="white" showLogout={true} />
      <main className={styles.main}>
        <div className={styles.container}>
          <ResumeRegistration />
        </div>
      </main>
      <Footer />
    </>
  );
}