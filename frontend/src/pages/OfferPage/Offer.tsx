import React from "react";
import cl from './Offer.module.css';
import Slide from "../../components/Slide";
import Navbar from "../../components/UI/Navbar/Navbar";
import HeaderOffer from "./Header/HeaderOffer";

import firstImage from "../../images/collective/collective_first.jpg"
import secondImage from '../../images/collective/collective_second.jpg'
import thirdImage from '../../images/collective/collective_third.jpg'
import Footer from "../../components/UI/Footer/Footer";

const Offer: React.FC = () => {

    const slides = [
        {
            title: 'Дружный коллектив',
            text: 'В хорошем коллективе каждый сотрудник чувствует себя частью команды. Коллеги поддерживают друг друга, обмениваются опытом и знаниями, и вместе решают задачи. Этот единственный фактор способен повысить мотивацию и рабочий энтузиазм. Когда люди работают в дружелюбной и сплоченной команде, они могут достигать великих результатов.',
            image: firstImage
        },
        {
            title: 'Ценные знания',
            text: 'Ценные знания - это ключевой ресурс для роста и развития как компании, так и её сотрудников. Коллектив, в котором ценят знания и поддерживают их приобретение, становится более конкурентоспособным и инновационным. Обучение и развитие сотрудников - это важная инвестиция, которая приносит высокие дивиденды в будущем.',
            image: secondImage
        },
        {
            title: 'Комфортные условия',
            text: 'Комфортные условия на рабочем месте также играют важную роль. Они включают в себя удобные офисы, современное оборудование, эргономичную мебель и дружелюбную рабочую атмосферу. Все это способствует увеличению производительности и снижению стресса, что в свою очередь позволяет сотрудникам сосредотачиваться на задачах и более эффективно их выполнять.',
            image: thirdImage
        },
    ]

    return (
        <div className={cl.root}>
            <Slide heightValue='100vh'>
                <Navbar/>
                <HeaderOffer />
            </Slide>
            <div className={[cl.collective, cl.first_collective].join(' ')}>
                <h1 className={cl.title_collective}>
                    {slides[0].title}
                </h1>
                <section className={cl.first_section_collective}>
                    <p className={cl.text_collective}>
                        {slides[0].text}
                    </p>
                    <img src={slides[0].image} alt="" className={cl.image_collective} />
                </section>
            </div>
            <div className={cl.collective}>
                <h1 className={cl.title_collective}>
                    {slides[1].title}
                </h1>
                <section className={cl.first_section_collective}>
                    <img src={slides[1].image} alt="" className={cl.image_collective} />
                    <p className={cl.text_collective}>
                        {slides[1].text}
                    </p> 
                </section>
            </div>
            <div className={[cl.collective, cl.last_collective].join(' ')}>
                <h1 className={cl.title_collective}>
                    {slides[2].title}
                </h1>
                <section className={cl.first_section_collective}>
                    <p className={cl.text_collective}>
                        {slides[2].text}
                    </p>
                    <img src={slides[2].image} alt="" className={cl.image_collective} />
                </section>
            </div>
            <div className={cl.end}>
                В итоге, хороший коллектив, комфортные условия и ценные знания создают среду, в которой сотрудники могут проявить свой потенциал, достичь выдающихся результатов и чувствовать себя удовлетворенными своей работой. Эти факторы не только улучшают рабочий процесс, но также способствуют общему успеху компании.
            </div>
            <Footer/>
        </div>
    )
}

export default Offer