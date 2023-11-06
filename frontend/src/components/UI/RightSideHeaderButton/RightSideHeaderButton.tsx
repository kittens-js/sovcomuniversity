import React from "react";
import cl from './RightSideHeaderButton.module.css';
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

interface Props {
    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const RightSideHeaderButton: React.FC<Props> = ({callback}) => {
    return (
        <button className={[cl.arrow_icon, cl.right_icon].join(' ')}
        onClick={callback}  
        > <KeyboardDoubleArrowRightIcon/> </button>
    )
}

export default RightSideHeaderButton