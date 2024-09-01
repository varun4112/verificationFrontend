"use client"
import React, { useEffect, useState } from 'react'
import styles from "./register.module.css"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '@/lib/features/register/registerSlice';
import { RootState, AppDispatch } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BASE_URL from '@/lib/baseUrl';


function Register() {
    const dispatch: AppDispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.userInfo);
    const router = useRouter()

    // Handle Change to store value in state onchange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setUserInfo({
            ...userInfo,
            [name]: value
        }));
    };

    // validate Name
    const [nameError, setNameError] = useState("")
    const nameValidation = () => {
        if (userInfo.name.length > 0 && userInfo.name.length < 3) {
            setNameError("Name length Should Be Greater Than 3")
        }
        else {
            setNameError("")
        }
    }

    // email validation
    const [emailError, setEmailError] = useState<string>("")
    const validateEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (userInfo.email.length == 0) {
            setEmailError("")
        }
        else if (!emailPattern.test(userInfo.email)) {
            // Setting the error message
            setEmailError("Please enter a valid email address");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    };

    // Phone Error Validation
    const [phoneError, setPhoneError] = useState("")
    const phoneValidation = () => {
        if (userInfo.phone.length > 0 && userInfo.phone.length < 10) {

            setPhoneError("Please Enter Valid Phone Number")
        }
        else {
            setPhoneError("")
        }
    }

    // AAdhaar validation
    const [aadhaarError, setAadhaarError] = useState("")
    const aadhaarValidation = () => {
        if (userInfo.aadhaar.length > 0 && userInfo.aadhaar.length < 12) {

            setAadhaarError("Please Enter Valid Aadhaar Number")
        }
        else {
            setAadhaarError("")
        }
    }

    // function to generate email otp
    const generateOtp = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/genOtp`, { email: userInfo.email }, { withCredentials: true })
                .then(response => alert("OTP Generated"))
                .catch(error => {
                    console.error('Error:', error)
                    alert("Failed to generate Email OTP ")
                });
        } catch (error) {
            console.error("Error generating OTP:", error);
            alert("Failed to generate Email OTP ")
        }
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();// Prevents the default action of the event
        if (userInfo.name != "" && userInfo.email != "" && userInfo.phone != "" && userInfo.dob != "" && userInfo.aadhaar != "") {
            //generating phone otp
            generateOtp()
            router.push('/register/emailVerification'); // Navigate to the email verification page
        }
        else {
            alert("Enter All Feilds")
        }

    };

    useEffect(() => {
        nameValidation()
        validateEmail()
        phoneValidation()
        aadhaarValidation()
    }, [userInfo])

    return (
        <>
            <div className={styles.signUpContainer}>
                <div className={styles.signUpMain}>
                    <div className={styles.signUpCol2}>
                        <h1 className={styles.signUpHeading}>Sign Up</h1>
                        <form className={styles.signUpForm}>
                            <label htmlFor="fullName" className={styles.signUpLabel}>Name</label>
                            <input type="text" id='fullName' className={styles.signUpInput} placeholder='Enter Your Name' name='name' value={userInfo.name} onChange={handleChange} />
                            <p className={styles.error}>{nameError}</p>


                            <label className={styles.signUpLabel} htmlFor="userEmail">Email</label>
                            <input type="email" id='userEmail' className={styles.signUpInput} placeholder='Enter Email' name='email' value={userInfo.email} onChange={handleChange} />
                            <p className={styles.error}>{emailError}</p>


                            <label className={styles.signUpLabel} htmlFor="userDOB">Date of Birth</label>
                            <input type="date" id='userDOB' className={styles.signUpInput} name='dob' value={userInfo.dob} onChange={handleChange} />

                            <label className={styles.signUpLabel} htmlFor="userPhone" >Phone number</label>
                            <input type="number" id='userPhone' className={styles.signUpInput} placeholder='Enter Phone number' name='phone' value={userInfo.phone} onChange={handleChange} />
                            <p className={styles.error}>{phoneError}</p>

                            <label className={styles.signUpLabel} htmlFor="aadhaarNumber">AAdhaar Number</label>
                            <input type="number" id='aadhaarNumber' className={styles.signUpInput} placeholder='Enter AAdhaar Number' name='aadhaar' value={userInfo.aadhaar} onChange={handleChange} />
                            <p className={styles.error}>{aadhaarError}</p>

                            <button className={styles.nextButton1} onClick={handleNext}>Next</button>
                            <span>Already have an account? <Link href={"/"}>Login</Link></span>


                        </form>
                    </div>
                </div>
            </div></>
    )
}

export default Register;