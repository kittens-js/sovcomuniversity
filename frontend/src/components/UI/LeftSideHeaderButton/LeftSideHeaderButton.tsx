import React from "react";
import cl from './LeftSideHeaderButton.module.css';
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

interface Props {
    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const LeftSideHeaderButton: React.FC<Props> = ({callback}) => {
    return (
        <button 
            className={[cl.arrow_icon, cl.left_icon].join(' ')}
            onClick={callback}
        > <KeyboardDoubleArrowLeftIcon/> </button>
    )
}

export default LeftSideHeaderButton