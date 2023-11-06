import React from "react";
import cl from './Footer.module.css';

import logo from '../../../images/sovkom_logo.svg';

import logotg from '../../../images/logos/logotg.svg';
import logovk from '../../../images/logos/logovk.svg';

const Footer: React.FC= () => {
    return (
        <div className={cl.footer}>
            <img src={logo} alt="" className={cl.logo} />

            <div className={cl.contacts}>
                <img src={logovk} alt="" className={cl.vk} />
                <img src={logotg} alt="" className={cl.tg} />
            </div>

            <p className={cl.text}>
                Генеральная лицензия Банка России №963 от 5 декабря 2014 г. © 2004-2023, ПАО «Совкомбанк» Все права защищены. 
                <br />
                <br />
                ПАО «Совкомбанк» использует cookie (файлы с данными о прошлых посещениях сайта) для персонализации сервисов и удобства пользователей. Совкомбанк серьезно относится к защите персональных данных — ознакомьтесь с условиями и принципами их обработки. 
                Вы можете запретить сохранение cookie в настройках своего браузера.
            </p>
        </div>
    )
}

export default Footer;