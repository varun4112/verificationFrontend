"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from "./pincode.module.css"
import BASE_URL from '@/lib/baseUrl';


function Pincode() {

  interface Response {
    area: string;
    district: string;
    lat: string;
    lng: string;
    pincode: string;
    state: string;
  }

  const [response, setResponse] = useState<Response | null>(null)
  const [token, setToken] = useState<string | null>("")
  const [error, setError] = useState("")
  const [pincode, setPincode] = useState("")


  const pincodeVerification = async () => {
    const storedToken = sessionStorage.getItem('token');

    if (pincode.length != 6) {
      alert('Pincode must be exactly 6 digits long');
      return;
    }
    const request = {
      method: "GET",
      url: `${BASE_URL}/pincode/${pincode} `,
      headers: {
        "Authorization": `Bearer ${storedToken} `,
      },
      data: {},
    };

    setToken(storedToken)
    try {
      const response = await axios.request(request);
      if (response.status == 200) {
        setResponse(response.data.location);
      }
    } catch (err) {
      setError('Failed to fetch user data');
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Postal Lookup</h2>
        <div className={styles.field}>
          <label >Pin Code:</label>
          <span id="name"><input className='verificationInput1' placeholder='Enter Your Pincode ' onChange={(e) => { setPincode(e.target.value) }} value={pincode} /></span>
        </div>
        <div className={styles.field}>
          <button className="verifyButton" onClick={pincodeVerification}>Verify</button>
        </div>

      </div>
      {response ? (<div className={styles.container}>
        <h2>Postal Details</h2>
        <div className={styles.field}>
          <label >Area: </label>
          <span id="name">{response?.area}</span>
        </div>
        <div className={styles.field}>
          <label >Pincode: </label>
          <span id="name">{response?.pincode}</span>
        </div>
        <div className={styles.field}>
          <label >District: </label>
          <span id="name">{response?.district}</span>
        </div>
        <div className={styles.field}>
          <label >State: </label>
          <span id="name">{response?.state}</span>
        </div>
        <div className={styles.field}>
          <label >Lattitude: </label>
          <span id="name">{response?.lat}</span>
        </div>

        <div className={styles.field}>
          <label >Langitude: </label>
          <span id="name">{response?.lng}</span>
        </div>
      </div>) : ""}

    </>
  )
}

export default Pincode