'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Canon() {
    const router = useRouter();
    const path = usePathname().substring(1);
    const [children, setChildren] = useState([]);
    const [body, setBody] = useState('');

    if(!path) {
        return <div>Loading...</div>;
    }
    if(path)
        console.log(path);

    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+path,
        })
            .then(response => {
                console.log(response.data);
                setChildren(response.data.children);
                setBody(response.data.body);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Canon</h1>
            <p>{body}</p>
            {children?children.map((child: string, index) => (
                <Link className='button' key={index} href={"/canon/"+child.substring(0, child.length-3)}>{child.substring(0, child.length-3)}
                </Link>
            )):""}
            <Link className='button' href="/">Home</Link>
        </div>
    );
}