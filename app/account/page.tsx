'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Account() {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user',
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
                setUserData(response.data);
            })
            .catch(error => {
                console.error(error);
                location.href = '/login';
            });
    }, []);

    const handleLogout = () => {
        axios({
            method: 'post',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'logout',
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                location.href = '/';
            });
    };

    return (
        <div>
            <h1>Account</h1>
			{userData&&<button onClick={handleLogout}>Logout</button>}
            {userData&&<Link className='button' href="/unregister">Unregister</Link>}
            {userData&&<Link className='button' href="/mail">Mail</Link>}
            <Link className='button' href="/">Home</Link>
        </div>
    );
}