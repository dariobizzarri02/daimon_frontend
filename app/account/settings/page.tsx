"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { HomeLink } from "@/app/commons";
import { useGlobalContext } from "@/app/Context/store";

export default function AccountSettings () {
    const { authenticated, user } = useGlobalContext();
    const [userDisplay, setUserDisplay] = useState<string>("");
    const [auths, setAuths] = useState<any>(null);

    const [password, setPassword] = useState<string>("");
    
    const [display, setDisplay] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

    const [displayChange, toggleDisplayChange] = useState<boolean>(false);
    const [usernameChange, toggleUsernameChange] = useState<boolean>(false);
    const [passwordChange, togglePasswordChange] = useState<boolean>(false);

    document.title = `Account Settings - Daimon`;

    useEffect(() => {
        if(authenticated===false) {
            location.href = "/account/login";
            return;
        }
        if(authenticated) {
            axios({
                method: "get",
                url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/display",
                withCredentials: true
            })
                .then(display => {
                    setUserDisplay(display.data);
                    setDisplay(display.data);
                })
            axios({
                method: "get",
                url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/auth",
                withCredentials: true
            })
                .then(auths => {
                    setAuths(auths.data);
                    setUsername(auths.data.local.username);
                })
        }
    }, [displayChange, usernameChange, passwordChange, authenticated]);

    const handleLogout = () => {
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/auth/logout",
            withCredentials: true
        })
            .then(() => {
                location.href = "/";
            });
    };

    const handleChangeDisplay = () => {
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/display",
            withCredentials: true,
            data: {display: display}
        })
            .then(() => {
                toggleDisplayChange(false);
            })
    }

    const handleUnlink = (service: string) => {
        axios({
            method: "delete",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/auth/"+service,
            withCredentials: true
        })
            .then(() => {
                location.reload();
            })
    };

    const handleDeleteAccount = () => {
        axios({
            method: "delete",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user",
            withCredentials: true
        })
            .then(() => {
                location.href = "/";
            });
    }

    const handleChangeUsername = () => {
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/auth/local/username",
            withCredentials: true,
            data: {username: username, password: password}
        })
            .then(() => {
                toggleUsernameChange(false);
            })
    }

    const handleChangePassword = () => {
        if(newPassword !== confirmNewPassword) {
            return;
        }
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/auth/local/password",
            withCredentials: true,
            data: {password: password, newPassword: newPassword}
        })
            .then(() => {
                togglePasswordChange(false);
            })
    }

    return (
        <div>
            <h1>Account Settings</h1>
            {user&&<div className="card">
                <p>Display Name</p>
                {!displayChange&&<>
                    <p className="text">{userDisplay}</p>
                    <button onClick={() => toggleDisplayChange(true)}>Edit</button>
                </>}
                {displayChange&&<>
                    <input type="text" value={display} onChange={e => setDisplay(e.target.value)} />
                    <button onClick={handleChangeDisplay}>Save</button>
                    <button onClick={() => toggleDisplayChange(false)}>Cancel</button>
                </>}
            </div>}
            {auths&&auths.local&&<div className="card">
                {!usernameChange&&<>
                    <p>Username</p>
                    <p className="text">@{auths.local.username}</p>
                </>}
                {usernameChange&&<>
                    <p>Username</p>
                    <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
                    <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                </>}
                {!passwordChange&&<>
                    <p>Password</p>
                    <p className="text">********</p>
                </>}
                {passwordChange&&<>
                    <p>Password</p>
                    <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                    <input type="password" placeholder="new password" onChange={e => setNewPassword(e.target.value)} />
                    <input type="password" placeholder="confirm new password" onChange={e => setConfirmNewPassword(e.target.value)} />
                    {newPassword!==confirmNewPassword&&confirmNewPassword.length>0&&<h3 className="error">Passwords do not match</h3>}
                </>}
                {!usernameChange&&<>
                    <button onClick={() => toggleUsernameChange(true)}>Edit Username</button>
                </>}
                {usernameChange&&<>
                    <button onClick={handleChangeUsername}>Save</button>
                    <button onClick={() => toggleUsernameChange(false)}>Cancel</button>
                </>}
                {!passwordChange&&<>
                    <button onClick={() => togglePasswordChange(true)}>Edit Password</button>
                </>}
                {passwordChange&&<>
                    <button onClick={handleChangePassword}>Save</button>
                    <button onClick={() => togglePasswordChange(false)}>Cancel</button>
                </>}
                <button onClick={() => handleUnlink("local")}>Delete Username and Password</button>
            </div>}
            {auths&&auths.discord&&<div className="card">
                <p>Discord</p>
                <p className="text">@{auths.discord.discord_username}</p>
                <button onClick={() => handleUnlink("discord")}>Unlink</button>
            </div>}
            {auths&&auths.minecraft&&<div className="card">
                <p>Minecraft</p>
                <p className="text">{auths.minecraft.minecraft_username}</p>
                <button onClick={() => handleUnlink("minecraft")}>Unlink</button>
            </div>}
            {auths&&(!auths.local||!auths.discord||!auths.minecraft)&&
                <Link className="button" href="/account/link">Link Another Service</Link>
            }
			{user&&<button className="button" onClick={handleLogout}>Logout</button>}
            {user&&<button className="button" onClick={handleDeleteAccount}>Delete Account</button>}
            <HomeLink/>
        </div>
    );
}