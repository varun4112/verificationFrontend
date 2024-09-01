"use client"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '@/lib/features/register/registerSlice';
import { RootState, AppDispatch } from '@/lib/store';
import styles from "./emailVerfication.module.css"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import BASE_URL from '@/lib/baseUrl';


function EmailVerification() {
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
                { otp: otp },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            generatePhoneOtp()
            router.push('/register/phoneVerification');
            if (response.status == 200) {
                alert("Verification sucessfull")
            }
            else {
                alert("Verification failed Try again")
            }
        } catch (error) {
            setError("Invalid OTP Try Again")
            console.error('Error:', error);
        }
    };

    const generateOtp = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/genOtp`, { email: userInfo.email }, { withCredentials: true })
                .then(response => console.log(response.data))
                .catch(error => console.error('Error:', error));
        } catch (error) {
            console.error("Error generating OTP:", error);
        }
    };

    return (
        <div>
            <div className={styles.otpMain}>
                <div className={styles.emailOtpCol}>
                    <h1 className={styles.emailOtpH1}>Email Verification</h1>
                    <label htmlFor="otp">Please Enter Otp To Verify Your Email</label>
                    <input className={styles.input} type="text" id='otp' placeholder='Enter Your OTP' onChange={(e) => { setOtp(e.target.value) }} />
                    <button className={styles.verifyButton} onClick={verifyOtp}>Verify</button>
                    <p>{error}</p>
                    <span className={styles.resendOtpButton} onClick={generateOtp}>Resend OTP</span>

                </div>
            </div>
        </div>
    )
}

export default EmailVerification