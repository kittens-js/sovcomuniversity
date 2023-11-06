import React, { Component } from "react";
import cl from './Input.module.css';

interface Props {
    text: string;
    len: number;
    callback?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({text, len, callback}) => {
    return (
        <input maxLength = {len} className = {cl.input} placeholder = {text} onChange={callback} />
    )
}

export default Input;