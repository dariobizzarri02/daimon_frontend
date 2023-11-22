'use client'

import { useState, useEffect, use } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Account() {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/user',
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
            url: 'http://localhost:3000/logout',
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
			{userData&&<button onClick={handleLogout}>[ Logout ]</button>}
            {userData&&<Link href="/unregister">[ Unregister ]</Link>}
            {userData&&<Link href="/mail">[ Mail ]</Link>}
            <Link href="/">[ Home ]</Link>
        </div>
    );
}