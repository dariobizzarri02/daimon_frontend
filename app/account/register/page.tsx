"use client"

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import HomeLink from "@/app/homelink";

export default function AccountRegister() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
    
    const handleLocalRegister = () => {
		if(password!==confirmPassword||password.length<0||username.length<0||confirmPassword.length<0) {
			return;
		}
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/auth/local",
            data: {
                username: username,
                password: password,
                register: true
            },
            withCredentials: true
        })
            .then(() => {
                location.href = "/account/create";
            });
    };
    
    return (
        <div>
            <h1>Register</h1>
			<h2>Local Account</h2>
			<>
                <div className="formtab">
                    <input className="form"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <input className="form"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
					<input className="form"
						type="password"
						placeholder="confirm password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
                    <button className="form" onClick={handleLocalRegister}>Register</button>
					<Link className="form center" href="/account/login">Login instead?</Link>
                </div>
            </>
			{password!==confirmPassword&&confirmPassword.length>0&&<h3 className="error">Passwords do not match</h3>}
			<HomeLink/>
        </div>
    );
}