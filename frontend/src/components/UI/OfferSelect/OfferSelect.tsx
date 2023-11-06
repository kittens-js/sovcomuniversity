import React from "react";
import cl from './OfferSelect.module.css';
import InfoButton from "../InfoButton/InfoButton";
import offerImageOne from '../../../images/offerimages/offerimg_one.jpg';
import offerImageTwo from '../../../images/offerimages/offer_image_two.png';
import offerImageThree from '../../../images/offerimages/offer_image_three.png';
import { Link } from "react-router-dom";


const OfferSelect: React.FC = () => {

    const elements = [{
        title: 'Дружный коллектив',
        description: 'Приятное время только с нашими ребятами!',
        image: offerImageOne
    }, {
        title: 'Ценные знания',
        description: 'Повышение квалфикации с лучшими сециалистами',
        image: offerImageTwo
    }, {
        title: 'Комфортные условия',
        description: 'Учимся работаем и отдыхаем качественно',
        image: offerImageThree
    }]

    return (
        <div className={cl.root}>
            <div className={cl.content}>
                {
                    elements.map((item, index) => (
                        <div key={index} className={cl.item}>
                            <img src={item.image} alt="" />
                            <div className={cl.text}>
                                <h3 className={cl.title}>{item.title}</h3>
                                <p className={cl.description}>{item.description}</p>
                                {/* <button className={cl.info_button}>Подробнее</button> */}
                                <Link to = '/offer'>
                                    <InfoButton text="Подробнее" />
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default OfferSelect;