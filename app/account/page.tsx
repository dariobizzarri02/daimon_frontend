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
            .then(user => {
                console.log(user.data);
                axios({
                    method: 'get',
                    url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user/auths',
                    withCredentials: true
                })
                    .then(response => {
                        console.log(response.data);
                        setUserData({user: user.data, auths: response.data});
                    })
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
            {userData&&userData.auths&&userData.auths.local&&<h2>Username: @{userData.auths.local.username}</h2>}
            {userData&&userData.auths&&userData.auths.discord&&<h2>Discord: connected</h2>}
            {userData&&userData.auths&&userData.auths.minecraft&&<h2>Minecraft: connected</h2>}
			{userData&&<button className='button' onClick={handleLogout}>Logout</button>}
            <Link className='button' href="/">Home</Link>
        </div>
    );
}