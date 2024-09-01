"use client"
import React, { useState } from 'react'
import styles from "./setPassword.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/store';
import { setUserInfo } from '@/lib/features/register/registerSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import BASE_URL from '@/lib/baseUrl';

function SetPassword() {
    const router = useRouter()
    const dispatch: AppDispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfo);
    const [confirmPswd, setConfirmpswd] = useState("")
    const [error, setError] = useState("")

    // Handle Change to store value in state onchange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setUserInfo({
            ...userInfo,
            [name]: value
        }));
    };


    const register = async () => {
        if (userInfo.password == confirmPswd) {
            if (userInfo.name != "" && userInfo.email != "" && userInfo.email != "" && userInfo.password != "" && userInfo.aadhaar != "") {
                try {
                    const response = await axios.post(`${BASE_URL}/register`, {
                        "userName": userInfo.name,
                        "name": userInfo.name,
                        "email": userInfo.email,
                        "phone": userInfo.phone,
                        "password": userInfo.password,
                        "aadhaarNumber": userInfo.aadhaar,
                    }
                    );
                    router.push("/")

                }
                catch (err) {
                    console.error("Error Registering User:", error);
                }
            } else {
                setError("Registration Failed Try Again")
            }

        }
        else {
            setError("Passwords do not match")
        }

    }


    return (
        <div>
            <div className={styles.pswdMain}>
                <div className={styles.pswdCol}>
                    <h1 className={styles.pswdH1}>Set Password</h1>
                    <label htmlFor="pswd">Password</label>
                    <input className={styles.input} type="text" id='pswd' placeholder='Enter Your Password' onChange={(e) => {
                        dispatch(setUserInfo({
                            ...userInfo,
                            password: e.target.value
                        }));
                    }} />
                    <label htmlFor="cfrmPswd">Confirm Password</label>
                    <input className={styles.input} type="text" id='cfrmPswd' placeholder='Re-enter your password' onChange={(e) => { setConfirmpswd(e.target.value) }} />
                    <button className={styles.verifyButton} onClick={register}>Register</button>
                    <span>{error}</span>
                </div>
            </div>
        </div>
    )
}

export default SetPassword