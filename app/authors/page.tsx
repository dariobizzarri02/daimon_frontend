'use client'

import { useState, useEffect } from 'react';
import { useGlobalContext } from '../Context/store';
import axios from 'axios';
import Link from 'next/link';

declare interface Author {
    id: string;
    display: string;
}

export default function Authors() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [canCreateAuthor, setCanCreateAuthor] = useState<boolean>(false);
    const { setAuthor } = useGlobalContext();
    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'authors',
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
                setAuthors(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'cancreateauthor',
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
                setCanCreateAuthor(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Authors</h1>
            <select onChange={e => setAuthor(e.target.value)}>
                <option value="">Select a Author</option>
                {authors.map(author => (
                    <option key={author.id} value={author.id}>{author.display}</option>
                ))}
            </select>
            {canCreateAuthor && <Link href="/authorcreation">[ Create Author ]</Link>}
            <Link href="/">[ Home ]</Link>
        </div>
    );
}