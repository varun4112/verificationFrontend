"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import styles from "./phoneVerification.module.css"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import BASE_URL from '@/lib/baseUrl';


function PhoneVerification() {
    const userInfo = useSelector((state: RootState) => state.userInfo);
    const router = useRouter()
    const [otp, setOtp] = useState("")
    const [error, setError] = useState("")

    const generatePhoneOtp = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/phoneGenOtp`, { phone: userInfo.phone }, { withCredentials: true })
                .then(response => {
                    alert("otp generated")
                })
                .catch(error => console.error('Error:', error));
        } catch (error) {
            console.error("Error generating OTP:", error);
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/verOtp`,
                { otp: `${otp}` },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            generatePhoneOtp()
            router.push('/register/setPassword');
        } catch (error) {
            setError("Invalid OTP Try Again")
            console.error('Error:', error);
        }
    };



    return (
        <div>
            <div className={styles.otpMain}>
                <div className={styles.phoneOtpCol}>
                    <h1 className={styles.phoneOtpH1}>Phone Verification</h1>
                    <label htmlFor="otp">Please Enter Otp To Verify Your Phone Number</label>
                    <input className={styles.input} type="text" id='otp' placeholder='Enter Your OTP' onChange={(e) => { setOtp(e.target.value) }} />
                    <button className={styles.verifyButton} onClick={verifyOtp}>Verify</button>
                    <span>{error}</span>
                    <span className={styles.resendOtpButton} onClick={generatePhoneOtp}>Resend OTP</span>
                </div>
            </div>
        </div>
    )
}

export default PhoneVerification