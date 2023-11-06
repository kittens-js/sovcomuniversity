import React from "react";
import cl from './InfoButton.module.css';

interface Props {
    text: string;
    callback?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const InfoButton: React.FC<Props> = ({text, callback}) => {
    return (
        <button 
        className = {cl.button}
        onClick = {callback}
        >{text}</button>
    )
}

export default InfoButton