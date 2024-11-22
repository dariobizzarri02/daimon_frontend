"use client"

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { HomeLink, idToUrl } from "@/app/commons";

export default function CharacterCreate () {
    const [hairStyles, setHairStyles] = useState<any[]>([])
    const [facialHairs, setFacialHairs] = useState<any[]>([])
    const [eyeColor, setEyeColor] = useState<string>("");
    const [hairColor, setHairColor] = useState<string>("");
    const [skinColor, setSkinColor] = useState<string>("");
    const [hairStyle, setHairStyle] = useState<string>("");
    const [facialHair, setFacialHair] = useState<string>("");
    const [gender, setGender] = useState<boolean>(true);
    const [firstCharacter, setFirstCharacter] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    document.title = `Create Character - Daimon`

    useEffect(() => {
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/character",
            withCredentials: true
        })
            .then(character => {
                if(character) {
                    setEyeColor(character.data.eye_color);
                    setHairColor(character.data.hair_color);
                    setSkinColor(character.data.skin_color);
                    setHairStyle(character.data.hair_style?.id);
                    setFacialHair(character.data.facial_hair?.id);
                    setGender(character.data.gender);
                    setFirstCharacter(false);
                }
                else {
                    setEyeColor("#000000");
                    setHairColor("#000000");
                    setSkinColor("#c58c85");
                    setHairStyle("07401d362bb1");
                    setFacialHair("");
                    setGender(true);
                    setFirstCharacter(true);
                }
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/cosmetics",
            withCredentials: true
        })
            .then(cosmetics => {
                const hairStyles = cosmetics.data.filter((cosmetic: any) => cosmetic.type === 0||cosmetic.type === 1);
                const facialHairs = cosmetics.data.filter((cosmetic: any) => cosmetic.type === 2);
                setHairStyles(hairStyles);
                setFacialHairs(facialHairs);
            })
    }, []);

    useEffect(() => {
        if(!hairStyle||!eyeColor||!hairColor||!skinColor) return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const style: any = hairStyles.find(style => style.id === hairStyle);
        if(canvas&&ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const images = [];
            if(style&&style.type === 1) {
                images.push([idToUrl(hairStyle, "0"), "hair"]);
                images.push([idToUrl(hairStyle, "1"), "line"]);
            }
            images.push([idToUrl("face", "0"), "skin"]);
            images.push([idToUrl("face", "1"), "line"]);
            gender?images.push([idToUrl("male", "0"), "eye"]):images.push([idToUrl("female", "0"), "eye"]);
            gender?images.push([idToUrl("male", "1"), "line"]):images.push([idToUrl("female", "1"), "line"]);
            if(facialHair) {
                images.push([idToUrl(facialHair, "0"), "line"]);
            }
            if(style&&style.type === 0) {
                images.push([idToUrl(hairStyle, "0"), "hair"]);
                images.push([idToUrl(hairStyle, "1"), "line"]);
            }
            else if(style&&style.type === 1) {
                images.push([idToUrl(hairStyle, "2"), "hair"]);
                images.push([idToUrl(hairStyle, "3"), "line"]);
            }
            const imagePromises = images.map(image => new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject();
                img.crossOrigin = "anonymous";
                img.src = image[0];
                if(image[1] === "hair"||image[1] === "skin"||image[1] === "eye") {
                    img.onload = () => {
                        const canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const context = canvas.getContext("2d");
                        context?.drawImage(img, 0, 0, img.width, img.height);
                        const imageData = context?.getImageData(0, 0, img.width, img.height);
                        if(image[1] === "hair") {
                            for(let i = 0; i < imageData!.data.length; i += 4) {
                                if(imageData!.data[i] === 127&&imageData!.data[i+1] === 127&&imageData!.data[i+2] === 127) {
                                    imageData!.data[i] = parseInt(hairColor.substring(1, 3), 16);
                                    imageData!.data[i+1] = parseInt(hairColor.substring(3, 5), 16);
                                    imageData!.data[i+2] = parseInt(hairColor.substring(5, 7), 16);
                                }
                            }
                        }
                        else if(image[1] === "skin") {
                            for(let i = 0; i < imageData!.data.length; i += 4) {
                                if(imageData!.data[i] === 127&&imageData!.data[i+1] === 127&&imageData!.data[i+2] === 127) {
                                    imageData!.data[i] = parseInt(skinColor.substring(1, 3), 16);
                                    imageData!.data[i+1] = parseInt(skinColor.substring(3, 5), 16);
                                    imageData!.data[i+2] = parseInt(skinColor.substring(5, 7), 16);
                                }
                            }
                        }
                        else if(image[1] === "eye") {
                            for(let i = 0; i < imageData!.data.length; i += 4) {
                                if(imageData!.data[i] === 127&&imageData!.data[i+1] === 127&&imageData!.data[i+2] === 127) {
                                    imageData!.data[i] = parseInt(eyeColor.substring(1, 3), 16);
                                    imageData!.data[i+1] = parseInt(eyeColor.substring(3, 5), 16);
                                    imageData!.data[i+2] = parseInt(eyeColor.substring(5, 7), 16);
                                }
                            }
                        }
                        context?.putImageData(imageData!, 0, 0);
                        resolve(canvas);
                    }
                }
            }));
            Promise.all(imagePromises)
                .then((images: any) => {
                    images.forEach((image: any) => ctx.drawImage(image, 0, 0, canvas.width, canvas.height));
                })
        }
    })

    const handleSubmit = () => {
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/character",
            data: {
                eyeColor: eyeColor,
                hairColor: hairColor,
                skinColor: skinColor,
                hairStyle: hairStyle,
                facialHair: facialHair?facialHair:null,
                gender: gender
            },
            withCredentials: true
        })
    }

    const handleDelete = () => {
        axios({
            method: "delete",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/character",
            withCredentials: true
        })
    }

    return (
        <div>
            <h1>Create Character</h1>
            <canvas ref={canvasRef} width="512" height="512"/>
            <div className="gui">
                {gender&&<>
                <div className="guicard">
                    <label>Gender</label>
                    <input type="checkbox" checked={gender} onChange={e => setGender(!gender)}/>
                </div>
                </>}
                {eyeColor&&<>
                <div className="guicard">
                <label>Eye Color</label>
                <input type="color" value={eyeColor} onChange={e => setEyeColor(e.target.value)}/>
                </div>
                </>}
                {hairColor&&<>
                <div className="guicard">
                <label>Hair Color</label>
                <input type="color" value={hairColor} onChange={e => setHairColor(e.target.value)}/>
                </div>
                </>}
                {skinColor&&<>
                <div className="guicard">
                <label>Skin Color</label>
                <input type="color" value={skinColor} onChange={e => setSkinColor(e.target.value)}/>
                </div>
                </>}
                {hairStyle&&<>
                <div className="guicard">
                <label>Hair Style</label>
                <select value={hairStyle} onChange={e => setHairStyle(e.target.value)}>
                    <option value="">None</option>
                    {hairStyles.map(hairStyle => <option key={hairStyle.id} value={hairStyle.id}>{hairStyle.display}</option>)}
                </select>
                </div>
                </>}
                {facialHair&&<>
                <div className="guicard"><label>Facial Hair</label>
                <select value={facialHair} onChange={e => setFacialHair(e.target.value)}>
                    <option value="">None</option>
                    {facialHairs.map(facialHair => <option key={facialHair.id} value={facialHair.id}>{facialHair.display}</option>)}
                </select>
                </div>
                </>}
            </div>
                {!firstCharacter&&<button className="righttopbutton" onClick={handleDelete}>Delete</button>}
                <button className="rightbottombutton" onClick={handleSubmit}>Submit</button>
            <HomeLink/>
        </div>
    );
}