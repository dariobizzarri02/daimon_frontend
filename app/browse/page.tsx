'use client'

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

//this page contains a dropdown menu with all the resource types:
// 1. area
// 2. article
// 3. author
// 4. character
// 5. guild
// 6. item
// 7. pack
// 8. route
// 9. screen
// 10. skill
// 11. track
// 12. user
// and a text input field for the resource id

export default function Browse() {
    const [resourceType, setResourceType] = useState('');
    const [resourceId, setResourceId] = useState('');

    const handleBrowse = () => {
        if(!resourceType || !resourceId) return;
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'' + resourceType + '/' + resourceId,
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
            <h1>Browse</h1>
            <select
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value)}
            >
                <option value="">Select a resource type</option>
                <option value="area">area</option>
                <option value="article">article</option>
                <option value="author">author</option>
                <option value="character">character</option>
                <option value="guild">guild</option>
                <option value="item">item</option>
                <option value="pack">pack</option>
                <option value="route">route</option>
                <option value="screen">screen</option>
                <option value="skill">skill</option>
                <option value="track">track</option>
                <option value="user">user</option>
            </select>
            <input
                type="text"
                placeholder="Resource ID"
                value={resourceId}
                onChange={(e) => setResourceId(e.target.value)}
            />
            <button onClick={handleBrowse}>[ Browse ]</button>
            <Link href="/">[ Home ]</Link>
        </div>
    );
}