import React, {useState} from "react";
import cl from './Checkbox.module.css';

interface Props {
    text: string;
    color?: string;
    callback?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<Props> = ({text, color, callback}) => {

    return (
        <div className={cl.checkbox}>
            <input type="checkbox" className={cl.checkbox_input} onChange={callback}/>
            <span 
            className={cl.checkbox_text}
            style={color ? {color: color} : undefined}
            >
                {text}
            </span>
        </div>
    )
}

export default Checkbox