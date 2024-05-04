'use client'

import { useState, useEffect } from 'react';
import { useGlobalContext } from '../Context/store';
import axios from 'axios';
import Link from 'next/link';

export default function UserCreation() {
    const { player } = useGlobalContext();
    const [display, setDisplay] = useState<any>(null);

    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user',
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
                if(response.data.display) {
                    location.href = '/account';
                    return;
                }
            })
            .catch(error => {
                console.error(error);
                location.href = '/';
            });
    }, []);

    const handleSubmit = () => {
        axios({
            method: 'post',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'player',
            data: {
                display: display
            },
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                location.href = '/account';
            });
    }

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
            <h1>Create Account</h1>
            <button className='button' onClick={handleLogout}>Logout</button>
            <div className='formtab'>
                    <input className='form' type='text' placeholder='Display Name' onChange={(e) => setDisplay(e.target.value)} />
                    <button className='form' onClick={handleSubmit}>Submit</button>
                </div>
                <h3></h3>
            <Link className='button' href="/">Home</Link>
        </div>
    );
}