import React from "react";
import cl from './LoginButton.module.css';
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';

const LoginButton: React.FC = () => {
    return (
        <button className={cl.button}>
            <Link to ='/login'><PersonIcon/></Link>
        </button>
    )
}

export default LoginButton