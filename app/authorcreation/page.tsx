'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function AuthorCreation() {
    const [authorDisplay, setAuthorDisplay] = useState('');

    const HandlePost = () => {
        if(!authorDisplay) return;
        axios({
            method: 'post',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'author',
            data: {
                display: authorDisplay
            },
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <h1>Create a new Author</h1>
            <input type="text" onChange={e => setAuthorDisplay(e.target.value)} />
            <button onClick={HandlePost}>Create</button>
            <Link className='button' href="/">Home</Link>
        </div>
    );
}