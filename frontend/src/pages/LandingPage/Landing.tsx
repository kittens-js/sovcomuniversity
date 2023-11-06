import React from "react";
import cl from './Landing.module.css';
import Navbar from "../../components/UI/Navbar/Navbar";
import Header from "../../components/UI/Header/Header";
import Slide from "../../components/Slide";
import OfferTitle from "../../components/UI/OfferTitle/OfferTitle";
import OfferSelect from "../../components/UI/OfferSelect/OfferSelect";
import Awards from "../../components/UI/Awards/Awards";
import Footer from "../../components/UI/Footer/Footer";
import Feedback from "../../components/UI/Feedback/Feedback";

const Landing: React.FC = () => {
    return (
        <div className={cl.root}>
            <Slide heightValue = '100vh'>
                <Navbar/>
                <Header/>
            </Slide>
            <Slide heightValue = '100vh'>
                <OfferTitle text='Что мы предлагаем?' />
                <OfferSelect/>
            </Slide>
            <Slide heightValue = '100vh'>
                <Awards/>
            </Slide>
            <Slide heightValue = '50vh'>
                <Feedback/>
                <Footer/>
            </Slide>
        </div>
    )
}

export default Landing;