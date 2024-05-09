"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import HomeLink from "../../homelink";

export default function AccountCreate() {
    const [hairStyles, setHairStyles] = useState<any[]>([])
    const [facialHairs, setFacialHairs] = useState<any[]>([])
    const [eyeColor, setEyeColor] = useState<string>("");
    const [hairColor, setHairColor] = useState<string>("");
    const [skinColor, setSkinColor] = useState<string>("");
    const [hairStyle, setHairStyle] = useState<string>("");
    const [facialHair, setFacialHair] = useState<string>("");
    const [gender, setGender] = useState<boolean>(true);

    useEffect(() => {
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/character",
            withCredentials: true
        })
            .then(character => {
                setEyeColor(character.data.eyeColor);
                setHairColor(character.data.hairColor);
                setSkinColor(character.data.skinColor);
                setHairStyle(character.data.hairStyle);
                setFacialHair(character.data.facialHair);
                setGender(character.data.gender);
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/cosmetics",
            withCredentials: true
        })
            .then(cosmetics => {
                setHairStyles(cosmetics.data.hairStyles);
                setFacialHairs(cosmetics.data.facialHairs);
            })
    }, []);

    const handleSubmit = () => {
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/character",
            data: {
                eyeColor: eyeColor,
                hairColor: hairColor,
                skinColor: skinColor,
                hairStyle: hairStyle,
                facialHair: facialHair,
                gender: gender
            },
            withCredentials: true
        })
    }

    return (
        <div>
            <h1>Create Character</h1>
            <div className="charactercanvas">
                <img src="/character/h3bc.png"/>
                <img src="/character/h3bl.png"/>
                <img src="/character/fc.png"/>
                <img src="/character/fl.png"/>
                {gender? <img src="/character/ffc.png"/> : <img src="/character/fmc.png"/>}
                {gender? <img src="/character/ffl.png"/> : <img src="/character/fml.png"/>}
                <img src="/character/h3fc.png"/>
                <img src="/character/h3fl.png"/>
            </div>
            <div className="gui">
                <div className="guicard">
                    <label>Gender</label>
                    <input type="checkbox" checked={gender} onChange={e => setGender(!gender)}/>
                </div>
                <div className="guicard">
                <label>Eye Color</label>
                <input type="color" value={eyeColor} onChange={e => setEyeColor(e.target.value)}/>
                </div>
                <div className="guicard">
                <label>Hair Color</label>
                <input type="color" value={hairColor} onChange={e => setHairColor(e.target.value)}/>
                </div>
                <div className="guicard">
                <label>Skin Color</label>
                <input type="color" value={skinColor} onChange={e => setSkinColor(e.target.value)}/>
                </div>
                <div className="guicard">
                <label>Hair Style</label>
                <select value={hairStyle} onChange={e => setHairStyle(e.target.value)}>
                    {hairStyles.map(hairStyle => <option key={hairStyle} value={hairStyle}>{hairStyle}</option>)}
                </select>
                </div>
                <div className="guicard">
                <label>Facial Hair</label>
                <select value={facialHair} onChange={e => setFacialHair(e.target.value)}>
                    {facialHairs.map(facialHair => <option key={facialHair} value={facialHair}>{facialHair}</option>)}
                </select>
                </div>
            </div>
                <button className="rightbottombutton" onClick={handleSubmit}>Submit</button>
            <HomeLink/>
        </div>
    );
}