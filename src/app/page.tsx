"use client"
import React, { useEffect, useState } from 'react'
import styles from "./login.module.css"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BASE_URL from '@/lib/baseUrl';


export default function Home() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter()

  // EMAIL VALIDATION
  const [emailError, setEmailError] = useState<string>("")
  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length == 0) {
      setEmailError("")
    }
    else if (!emailPattern.test(email)) {
      // Setting the error message
      setEmailError("Please enter a valid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  // FUNCTION TO LOGIN
  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(BASE_URL)
    if (email != "" && password != "") {
      try {
        const response = await axios.post(`${BASE_URL}/login`, {
          email,
          password,
        });

        if (response.status === 200) {
          const data = response.data;
          const token = data.token
          setEmail("")
          setPassword("")
          alert("Login Succesfull")
          router.push("/dashboard")
          sessionStorage.setItem("token", token);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            alert('User not found');
          } else if (error.response?.status === 401) {
            alert('Invalid Password');
          } else {
            alert(`Login failed: ${error.response?.data}`);
          }
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    }
    else {
      alert("Please Enter All Feilds")
    }
  };

  useEffect(() => {
    validateEmail()
  }, [email])

  return (
    <> <div className={styles.signUpContainer}>
      <div className={styles.signUpMain}>
        <div className={styles.signUpCol2}>
          <h1 className={styles.signUpHeading}>Log In</h1>
          <form className={styles.signUpForm}>
            <label className={styles.signUpLabel} htmlFor="userEmail">Email</label>
            <input type="email" id='userEmail' className={styles.signUpInput} placeholder='Enter Email' name='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <p className={styles.error}>{emailError}</p>

            <label className={styles.signUpLabel} htmlFor="password">Password</label>
            <input type="password" id='password' className={styles.signUpInput} placeholder='Enter Password' name='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <p className={styles.error}></p>


            <button className={styles.nextButton1} onClick={login}>LOGIN</button>
            <span>New Here? <Link href={"/register"}>Register</Link></span>

          </form>
        </div>
      </div>
    </div></>
  )
}
