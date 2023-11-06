import React from "react";
import cl from './Navbar.module.css';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../../../images/sovkom_logo.svg'
import { Link } from "react-router-dom";
import LoginButton from "../LoginButton/LoginButton";
import useSWR from "swr";
import { Api } from "../../../service/api";

interface Props {
    type?: string;
    fcs?: string;
    color?: string;
}

const Navbar: React.FC<Props> = ({type, fcs, color}) => {

    const { data, error, isLoading } = useSWR('/me', Api.Users.me);

    console.log(data)

    return (
        <div className={cl.root}>
            <div 
                className={cl.background}
                style={type === 'transparent' ? {background: '0'} : undefined}
            ></div>
            <div className={cl.clear_block}></div>
            <div className={cl.navigation_block}>
                <Link to='/'><img src={logo} alt="logo" className={cl.logo} /></Link>
                <nav className={cl.nav_elements}>
                    {/* Change links */}
                    <div className={cl.info_buttons}>
                        <Link 
                            className={[cl.nav_item, cl.white_text].join(' ')} to='/offer'
                            style={
                                color ? {color} : undefined
                                ||
                                type === 'transparent' ? {color: '#0066ff'} : undefined
                            }
                        >
                            Образование
                        </Link>
                        <Link 
                            className={cl.nav_item} 
                            to='/application'
                            style = {color ? {color} : undefined}
                        >Абитуриентам</Link>
                        <Link 
                            className={cl.nav_item} 
                            to='/registration'
                            style = {color ? {color} : undefined}
                        >Студентам</Link>
                    </div>
                    {
                            data?.isErr ? 
                            <LoginButton />
                            : 
                            <span className={cl.nav_item}>
                                <Link 
                                    to = '/profile' 
                                    className={cl.nav_item}
                                    style={
                                        color ? {color} : undefined
                                        ||
                                        type === 'transparent' ? {color: '#0066ff'} : undefined
                                    }
                                >
                                    
                                    {
                                        data !== undefined ? data.isOk ?
                                            <>{data.data.name.slice(0, 1)}{data.data.surname.slice(0, 1)}{data.data.middleName.slice(0, 1)}</>
                                        : <></> : <></>
                                    }
                                
                                </Link>
                            </span>
                        }
                    
                </nav>
            </div>
        </div>
    )
}

export default Navbar;