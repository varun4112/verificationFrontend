"use client"
import VerifiedCard from '@/app/components/verifiedCard/VerifiedCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from "./gst.module.css"
import BASE_URL from '@/lib/baseUrl';


function Gst() {

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

  const [user, setUser] = useState<User | null>(null)
  const [response, setResponse] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>("")
  const [error, setError] = useState("")
  const [gstin, setGstin] = useState("")

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

  const gstinVerification = async () => {
    const storedToken = sessionStorage.getItem('token');
    setToken(storedToken)
    const request = {
      method: "GET",
      url: `${BASE_URL}/gst/${gstin} `,
      headers: {
        "Authorization": `Bearer ${storedToken} `,
      },
      data: {},
    };


    try {
      const response = await axios.request(request);
      if (response.status == 200) {
        setResponse(response.data.message);
        alert("GSTIN verified")
      }
    } catch (err) {
      setError('Failed to Verify GSTIN');
    }
  };


  return (
    <>
      {user?.gstin ? (<VerifiedCard cardText="GSTIN" />) : (
        <div className={styles.container}>
          <h2>GSTIN Verification</h2>
          <div className={styles.field}>
            <label >GSTIN number</label>
            <span id="name"><input className='verificationInput1' placeholder='Enter Your GST number ' onChange={(e) => { setGstin(e.target.value) }} value={gstin} /></span>
          </div>
          <div className={styles.field}>
            <button className="verifyButton" onClick={gstinVerification}>Verify</button>
          </div>
        </div >
      )}
    </>
  )
}

export default Gst