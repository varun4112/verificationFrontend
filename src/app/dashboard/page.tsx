"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from "./dashboard.module.css"
import BASE_URL from '@/lib/baseUrl';

function Dashboard() {

    interface User {
        userName: string;
        name: string;
        email: string;
        phone: string;
        aadhaarNumber?: string;
    }


    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>("")
    const [error, setError] = useState("")

    const fetchUser = async () => {
        const storedToken = sessionStorage.getItem('token');

        const request = {
            method: "GET",
            url: `${ BASE_URL }/user`,
    headers: {
        "Authorization": `Bearer ${storedToken}`,
            },
    data: { },
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
}, []);

return (
    <>
        <div className={styles.container}>
            <h2>User Information</h2>
            <div className={styles.field}>
                <label >Name:</label>
                <span id="name">{user?.userName}</span>
            </div>
            <div className={styles.field}>
                <label >Email:</label>
                <span id="email">{user?.email}</span>
            </div>
            <div className={styles.field}>
                <label >Phone:</label>
                <span id="phone">{user?.phone}</span>
            </div>

        </div>
    </>
)
}

export default Dashboard