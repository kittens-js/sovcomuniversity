import React from "react";
import cl from './SendButton.module.css';

interface Props {
    callback?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SendButton: React.FC<Props> = ({callback}) => {
    return (
        <button className = {cl.button} onClick={callback}>Отправить</button>
    )
}

export default SendButton