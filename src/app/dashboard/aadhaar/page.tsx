"use client"
import React, { useEffect, useState } from 'react'
import VerifiedCard from '@/app/components/verifiedCard/VerifiedCard'
import styles from "./aadhaar.module.css"
import axios from 'axios'
import BASE_URL from '@/lib/baseUrl';


function Aadhaar() {

  interface User {
    userName: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    aadhaarNumber: string;
    isAadhaarVerified: boolean;
    PAN: string;
    gstin: string;
    pincode: string;
    bankIfsc: string;
    bankAc: string;
  }

  const [response, setResponse] = useState<any>(null)
  const [token, setToken] = useState<string | null>("")
  const [error, setError] = useState("")
  const [user, setUser] = useState<User | null>(null)

  const fetchUser = async () => {
    const storedToken = sessionStorage.getItem('token');

    const request = {
      method: "GET",
      url: `${BASE_URL}/user`,
      headers: {
        "Authorization": `Bearer ${storedToken}`,
      },
      data: {},
    };

    setToken(storedToken)
    try {
      const response = await axios.request(request);
      if (response.status == 200) {
        setUser(response.data.user);
      }
    } catch (err) {
      setError('Failed to fetch user data');
    }
  };

  useEffect(() => {
    fetchUser();
  }, [response]);

  const aadhaarVerification = async () => {
    const storedToken = sessionStorage.getItem('token');
    setToken(storedToken)
    const request = {
      method: "GET",
      url: `${BASE_URL}/aadhaarVerification/${ user?.aadhaarNumber } `,
      headers: {
        "Authorization": `Bearer ${ storedToken } `,
      },
      data: {},
    };

    try {
      const response = await axios.request(request);
      if (response.status == 200) {
        setResponse(response);
        alert("Aadhaar Verified")
      }
    } catch (err) {
      setError('Failed to Verify Pan');
    }
  };

  return (
    <>{user?.isAadhaarVerified ? (
      <VerifiedCard cardText="Aadhaar" />
    ) :

      (
        <div className={styles.container}>
          <h2>Aadhaar Verification</h2>
          <div className={styles.field}>
            <label >Aadhaar number</label>
            <span id="name"><input className='verificationInput1' placeholder='Enter Your Aadhaar number ' value={user?.aadhaarNumber} disabled /></span>
          </div>
          <div className={styles.field}>
            <button className="verifyButton" onClick={aadhaarVerification} >Verify</button>
          </div>
        </div >
      )
    }</>
  )
}

export default Aadhaar