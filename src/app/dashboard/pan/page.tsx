"use client"
import React, { useEffect, useState } from 'react'
import styles from "./pan.module.css"
import axios from 'axios'
import VerifiedCard from '@/app/components/verifiedCard/VerifiedCard'
import BASE_URL from '@/lib/baseUrl';


function Pan() {

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

    const [response, setResponse] = useState<string | null>(null)
    const [token, setToken] = useState<string | null>("")
    const [error, setError] = useState("")
    const [pan, setPan] = useState("")

    const panVerification = async () => {
        const storedToken = sessionStorage.getItem('token');
        setToken(storedToken)

        let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);

        if (regex.test(pan) == true) {
            alert("Invalid PAN Number")
            return;
        }
        const request = {
            method: "GET",
            url: `${BASE_URL}/panVerification/${pan}`,
            headers: {
                "Authorization": `Bearer ${storedToken}`,
            },
            data: {},
        };


        try {
            const response = await axios.request(request);
            if (response.status == 200) {
                setResponse(response.data.message);
                alert("Pan Verified")
            }
        } catch (err) {
            setError('Failed to Verify Pan');
        }
    };

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

    return (
        <>
            {user?.PAN ? (
                <VerifiedCard cardText="PAN" />
            ) :

                (
                    <div className={styles.container}>
                        <h2>Pan Verification</h2>
                        <div className={styles.field}>
                            <label >PAN number</label>
                            <span id="name"><input className='verificationInput1' placeholder='Enter Your PAN number ' onChange={(e) => { setPan(e.target.value) }} value={pan} /></span>
                        </div>
                        <div className={styles.field}>
                            <button className="verifyButton" onClick={panVerification}>Verify</button>
                        </div>
                    </div >
                )
            }
        </>

    )
}

export default Pan