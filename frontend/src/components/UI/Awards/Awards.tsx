import React, { useState } from "react";
import cl from './Awards.module.css'
import imageOne from '../../../images/awards/image_one.jpg'
import imageTwo from '../../../images/awards/image_two.jpg'
import imageThree from '../../../images/awards/image_three.jpg'

import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';


const Awards: React.FC = () => {

    const [index, setIndex] = useState(0)

    const imgArray = [imageOne, imageTwo, imageThree]

    const buttonHandlerLeft = () => {
        if (index != 0) {
            setIndex(index-1)
        }
    }

    const buttonHandlerRight = () => {
        if (index != 2) {
            setIndex(index+1)
        }
    }

    return (
        <div className={cl.root}>
            <div className={cl.content}>
                <button className={[cl.arrow_button, cl.arrow_left].join(' ')}
                    onClick={buttonHandlerLeft}
                >
                    <div className={cl.arrow_icon_left}>
                        <WestIcon/>
                    </div>
                    <div className={cl.arrow_wrapper_left}></div>
                </button>
                <div className={cl.picture_block}>
                    <img src={imgArray[index]} alt="" className={cl.picture} />
                </div>
                <button className={[cl.arrow_button, cl.arrow_right].join(' ')}
                    onClick={buttonHandlerRight}
                >
                    <div className={cl.arrow_wrapper_right}></div>
                    <div className={cl.arrow_icon_right}>
                        <EastIcon/>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Awards;