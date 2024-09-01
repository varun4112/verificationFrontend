'use client'
import SideNav from '../components/sidebar/sidenav';
import TopNav from '../components/topNav/TopNav';
import styles from "./layout.module.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <SideNav />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </>

  );
}