import React from "react";
import cl from './Feedback.module.css';
import InfoButton from "../InfoButton/InfoButton";
import Checkbox from "../Checkbox/Checkbox";

const Feedback: React.FC = () => {
    return (
        <div className={cl.root}>
            <div className={cl.content}>
                <div className={cl.text_side}>
                    <h1 className={cl.title}>
                        Узнай о нас первым !
                    </h1>
                    <p className={cl.subtitle}>
                        Подпишись на нас в Телеграмме и Вконтакте, чтобы быть  в курсе всех дел 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Feedback;