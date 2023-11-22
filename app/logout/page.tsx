'use client'

import axios from 'axios';
import Link from 'next/link';

export default function Logout() {
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
            });
    };

    return (
        <div>
            <h1>Logout</h1>
            <button onClick={handleLogout}>[ Logout ]</button>
			<Link href="/">[ Home ]</Link>
        </div>
    );
}