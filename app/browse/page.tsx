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
            <select className='form'
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value)}
            >
                <option className='form' value="">Select a resource type</option>
                <option className='form' value="area">area</option>
                <option className='form' value="article">article</option>
                <option className='form' value="author">author</option>
                <option className='form' value="character">character</option>
                <option className='form' value="guild">guild</option>
                <option className='form' value="item">item</option>
                <option className='form' value="pack">pack</option>
                <option className='form' value="route">route</option>
                <option className='form' value="screen">screen</option>
                <option className='form' value="skill">skill</option>
                <option className='form' value="track">track</option>
                <option className='form' value="user">user</option>
            </select>
            <input className='form'
                type="text"
                placeholder="Resource ID"
                value={resourceId}
                onChange={(e) => setResourceId(e.target.value)}
            />
            <button className='form' onClick={handleBrowse}>Browse</button>
            <Link className='button' href="/">Home</Link>
        </div>
    );
}