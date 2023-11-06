import React, { useState } from "react";
import cl from './HeaderOffer.module.css'

import offerImageOne from '../../../images/offerimages/offer_image_one.png';
import offerImageTwo from '../../../images/offerimages/offer_image_two.png';
import offerImageThree from '../../../images/offerimages/offer_image_three.png';

const HeaderOffer: React.FC = () => {
    return (
        <div className={cl.root}>
          <div className={cl.background}></div>
          {/* <div className={cl.content}>
            <div className = {cl.main_text}>
              Хороший коллектив, комфортные условия и ценные знания - это тройка ключевых составляющих 
              успешной и приятной работы. 
              Когда эти элементы объединяются, они создают идеальную атмосферу 
              для процветания как для сотрудников, так и для компании в целом. 
            </div>

            <div className = {cl.main_picture_div}>
              <img src = {offerImageOne} className = {cl.main_picture}></img>
            </div>
          </div> */}
            
            <div className={cl.content}>
                <div className={cl.text}>
                    Хороший коллектив, комфортные условия и ценные знания - это тройка ключевых составляющих 
                    успешной и приятной работы. 
                    Когда эти элементы объединяются, они создают идеальную атмосферу 
                    для процветания как для сотрудников, так и для компании в целом. 
                </div>
                <div className={cl.picture}>
                    <img src = {offerImageOne} className = {cl.main_picture}></img>
                </div>
            </div>
        </div>
      );
}

export default HeaderOffer;