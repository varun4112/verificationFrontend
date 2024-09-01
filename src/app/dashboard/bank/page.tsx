'use client'
import VerifiedCard from '@/app/components/verifiedCard/VerifiedCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from "./bank.module.css"
import BASE_URL from '@/lib/baseUrl';



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

function Bank() {
    const [response, setResponse] = useState<any>(null)
    const [token, setToken] = useState<string | null>("")
    const [error, setError] = useState("")
    const [user, setUser] = useState<User | null>(null)
    const [accountDetails, setAccountDetails] = useState("")
    const [ifsc, setIfsc] = useState("")

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

    const bankVerification = async () => {
        const storedToken = sessionStorage.getItem('token');
        setToken(storedToken)
        const request = {
            method: "POST",
            url: `${BASE_URL}/bankVerification`,
            headers: {
                "Authorization": `Bearer ${storedToken}`,
            },
            data: {
                ifsc, accountDetails
            },
        };
        try {
            const response = await axios.request(request);
            if (response.status == 200) {
                setResponse(response);
                alert("Bank Account Verified")
            }
        } catch (err) {
            setError('Failed to Verify Bank Account');
        }
    };

    return (
        <>{user?.bankAc ? (
            <VerifiedCard cardText="Bank Details" />
        ) :
            (
                <div className={styles.container}>
                    <h2>Bank Verification</h2>
                    <div className={styles.field}>
                        <label >Bank Account Number: </label>
                        <span id="name"><input className='verificationInput1' placeholder='Enter Your Bank number ' value={accountDetails} onChange={(e) => setAccountDetails(e.target.value)} /></span>
                        <label >IFSC:</label>
                        <span id="name"><input className='verificationInput1' placeholder='Enter Bank IFSC number ' value={ifsc} onChange={(e) => setIfsc(e.target.value)} /></span>
                    </div>
                    <div className={styles.field}>
                        <button className="verifyButton" onClick={bankVerification} >Verify</button>
                    </div>
                </div >
            )
        }</>
    )
}

export default Bank