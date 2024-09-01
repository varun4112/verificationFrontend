import Link from 'next/link';
import NavLinks from '../navLinks/nav-links';
import { FaPowerOff } from "react-icons/fa6";
import styles from "../sidebar/sidenav.module.css"

export default function SideNav() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.nav_links}>
          <NavLinks />
        </div>
        <div className={styles.placeholder}></div>
        <form>
          <button className={styles.sign_out_button}>
            <FaPowerOff />
            <div className={styles.sign_out_text}>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
