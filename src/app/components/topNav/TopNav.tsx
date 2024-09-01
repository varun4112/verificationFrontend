"use client"
import React, { useState } from 'react'
import styles from "./topNav.module.css"
import { IoMenu } from "react-icons/io5";
import NavLinks from '../navLinks/nav-links';

function TopNav() {

    const [display, setDisplay] = useState(false)

    const handleDisplay = () => {
        if (display == true) {
            setDisplay(false)
        }
        else {
            setDisplay(true)
        }
    }

    return (
        <>
            <div className={styles.nav_container}>
                <div className={styles.mainContainer}>
                    <div className={styles.navLogo}>Verification app</div>
                    <div className={styles.navButtonContainer}>
                        <button className={styles.navButton} onClick={handleDisplay}><IoMenu /></button>
                    </div>
                </div>
                {display ? (<div className={styles.navLinksContainer}>
                    <NavLinks />
                </div>) : ""}
            </div>
        </>
    )
}

export default TopNav