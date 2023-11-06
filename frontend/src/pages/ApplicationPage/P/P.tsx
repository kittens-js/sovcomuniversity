import React, { Component } from "react";
import cl from './P.module.css';

interface Props {
    text: string;
}

const P: React.FC<Props> = ({text}) => {
    return (
        <p className = {cl.p}>{text}</p>
    )
}

export default P;