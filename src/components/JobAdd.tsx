"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./JobAdd.module.css";
import addJobIcon from "@/assets/images/add_job.svg";

interface JobAddProps {
  className?: string;
}

export function JobAdd({ 
  className = ""
}: JobAddProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/job/create");
  };

  return (
    <div className={`${styles.jobAdd} ${className}`} onClick={handleClick}>
      {/* Desktop version */}
      <div className={styles.desktopContent}>
        <Image 
          src={addJobIcon}
          alt="Add Job"
          width={33.33}
          height={36.67}
          className={styles.desktopIcon}
        />
        <div className={styles.textWrapper}>채용공고 추가하기</div>
      </div>
      
      {/* Mobile version */}
      <div className={styles.mobileContent}>
        <Image 
          src={addJobIcon}
          alt="Add Job"
          width={26.67}
          height={29.33}
          className={styles.mobileIcon}
        />
        <div className={styles.textWrapper}>채용공고 추가하기</div>
      </div>
    </div>
  );
}