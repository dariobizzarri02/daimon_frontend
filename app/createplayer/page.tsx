'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import HomeLink from '../homelink';

export default function CreatePlayer() {
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
            <h1>Create Player</h1>
            <div className='formtab'>
                <input className='form' type='text' placeholder='Display Name' onChange={(e) => setDisplay(e.target.value)} />
                <button className='form' onClick={handleSubmit}>Submit</button>
            </div>
            <button className='button' onClick={handleLogout}>Logout</button>
            <HomeLink />
        </div>
    );
}