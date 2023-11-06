import React, { useState, useEffect } from "react";
import cl from './InHeader.module.css'

import oneHeader from '../../../images/header/header_image_one.png';
import twoHeader from '../../../images/header/header_image_two.png';
import threeHeader from '../../../images/header/header_image_three.png'

interface Props {
    array: {
        id: number;
        type: number;
        text: string;
        description?: string;
        image?: string | undefined;
    }[];
    index: number;
    changeLeft: number;
    changeRight: number;
}

const InHeader: React.FC<Props> = ({ array, index, changeLeft, changeRight }) => {

    const [transform, setTransform] = useState('0%');

    useEffect(() => {
        if (changeLeft !== 0) {
            setTransform('-200%');
            setTimeout(() => {
                setTransform('0%');
            }, 250)
        }
    }, [changeLeft]);

    useEffect(() => {
        if (changeRight !== 0) {
            setTransform('200%');
            setTimeout(() => {
                setTransform('0%');
            }, 250)
        }
    }, [changeRight])

    return (
        <div
            className={cl.header_content}

            style={
                { 
                    transform: `translateX(${transform})`,
                }
            }

        >
            <div className={cl.text_block}>
                {
                    array[index].type === 0 ?

                        <div className={cl.main_text}>
                            {array[index].text}
                        </div>

                        :

                        <div>
                            <div className={cl.main_text}>
                                {array[index].text}
                            </div>
                            <div className={cl.sub_text}>
                                {array[index].description}
                            </div>
                        </div>
                }


                <div className={cl.select_points}>
                    {
                        array.map((item, itemIndex) => (
                            <div
                                key={itemIndex}
                                className={
                                    index === itemIndex ? [cl.point_active, cl.point].join(' ') : cl.point
                                }
                            ></div>
                        ))
                    }
                </div>
            </div>
            <div className={cl.pictures_block}>
                {
                    array[index].type === 0 ?
                        <div>
                            <img src={oneHeader} className={cl.first_image} alt="first image" />
                            <img src={threeHeader} className={cl.third_image} alt="third image" />
                            <img src={twoHeader} className={cl.second_image} alt="second image" />
                        </div>
                        :
                        <div>
                            <img src={array[index].image} className={cl.header_image} alt="two image" />
                        </div>
                }
            </div>
        </div>
    )
}

export default InHeader;