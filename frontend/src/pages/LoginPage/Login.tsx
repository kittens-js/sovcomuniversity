import React, { useState, useEffect } from "react";
import cl from './Login.module.css';
import Slide from "../../components/Slide";
import Navbar from "../../components/UI/Navbar/Navbar";
import InfoButton from "../../components/UI/InfoButton/InfoButton";
import Checkbox from "../../components/UI/Checkbox/Checkbox";
import { Api } from "../../service/api";


const Login: React.FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [passwordDirty, setPasswordDirty] = useState<boolean>(false)
    const [emailDirty, setEmailDirty] = useState<boolean>(false)

    const [emailError, setEmailError] = useState('Некорректный емейль 😈')
    const [passwordError, setPasswordError] = useState('Некорректный пароль 😈')

    const [checked, setChecked] = useState<boolean>(false)

    const [validValueInputs, setValidValueInputs] = useState<boolean>(false)

    const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "password":
                setPasswordDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
        }

    }

    useEffect(() => {
        if (emailError || passwordError || !checked) {
            setValidValueInputs(true)
        } else {
            setValidValueInputs(false)
        }

    }, [emailError, passwordError, checked])


    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный емейль')
        } else {
            setEmailError('')
        }
    }


    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        if (e.target.value.length < 5) {
            setPasswordError('Слишком короткий пароль')
        } else {
            setPasswordError('')
        }
    }

    const checkboxHandler = (checked: boolean) => {
        checked ? setChecked(true) : setChecked(false)
    }

    const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        
        console.log(email, password)
        await Api.login({email, password});
        window.location.reload();
    }

    return (
        <div className={cl.root}>
            <Slide heightValue="100vh">
                <Navbar
                    type="transparent"
                    color='white'
                />
                <div className={cl.main}>
                    <div className={cl.login_panel}>
                        <form action="">
                            <div className={cl.header_login_panel}>
                                <h1 className={cl.authorization_title}>Авторизация</h1>
                            </div>

                            <div className={cl.main_login_panel}>
                                <input onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name="email" className={cl.input} placeholder="Введите почту" />
                                {(emailDirty && emailError) && <div className={cl.error}>{emailError}</div>}
                                <input onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name="password" className={cl.input} placeholder="Введите пароль" type="password" />
                                {(passwordDirty && passwordError) && <div className={cl.error}>{passwordError}</div>}
                            </div>

                            <div className={cl.footer_login_panel}>
                                <InfoButton
                                    text='Войти'
                                    callback={login}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </Slide>
        </div>
    )
}

export default Login;
