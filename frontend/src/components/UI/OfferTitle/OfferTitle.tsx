import React from "react";
import cl from './OfferTitle.module.css';
import line from '../../../images/title/line.svg'

interface Props {
    text: string;
}

const OfferTitle: React.FC<Props> = ({text}) => {
    return (
        <div className={cl.root}>
            <div className={cl.background}>
                {/* <img className={cl.line} src={line} alt="" /> */}
                <div className={cl.line}></div>
            </div>
            <div className={cl.title}>{text}</div>
        </div>
    )
}

export default OfferTitle;