import React from 'react'
import styles from "./verifiedCard.module.css"
import Image from 'next/image'

type VerifiedCardProps = {
    cardText: string;
};

function VerifiedCard({ cardText }: VerifiedCardProps) {
    return (
        <div className={styles.card}>
            <div><Image src={"/assets/checkMark.png"} alt='check mark' width={100} height={100} />
            </div>
            <div>{cardText} Verified</div>

        </div>
    )
}

export default VerifiedCard