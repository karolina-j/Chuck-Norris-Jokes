import React, { useState, useEffect } from "react"
import ChuckNorrisPhoto from '../images/chuck.jpg'
import UnknownPhoto from '../images/unknown.jpg'


interface ImageDisplayProps {
    nameInput: string;
}


const JokeImage: React.FC<ImageDisplayProps> = ({ nameInput }) => {    
    
    const backgroundImageCustom = `url(${UnknownPhoto})`;
    const backgroundImageDefault = `url(${ChuckNorrisPhoto})`;

    const [backgroundImage, setBackgroundImage] = useState(backgroundImageDefault);

    useEffect(() => {
        if (nameInput !== '') {
            setBackgroundImage(backgroundImageCustom);
        } else {
            setBackgroundImage(backgroundImageDefault);
        }
    }, [nameInput]);


    
    return (
        <div className="imageSection">
            <div 
                className="jokeImageCmp" 
                style={{
                    backgroundImage
            }}> 
            </div>
        </div>
    )
}

export default JokeImage