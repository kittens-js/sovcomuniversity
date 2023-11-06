import React, { useState } from "react";
import { Slide } from 'react-slideshow-image';
import cl from './Header.module.css'

import oneHeader from '../../../images/header/header_image_one.png';
import twoHeader from '../../../images/header/header_image_two.png';
import threeHeader from '../../../images/header/header_image_three.png';

import twoInheader from '../../../images/header/inheader_picture_two.jpg';
import threeInheader from '../../../images/header/inheader_picture_three.jpg'
import fourInheader from '../../../images/header/header_image_four.jpg';

import LeftSideHeaderButton from "../LeftSideHeaderButton/LeftSideHeaderButton";
import RightSideHeaderButton from "../RightSideHeaderButton/RightSideHeaderButton";
import InHeader from "../InHeader/InHeader";


const Header: React.FC = () => {

    const [index, setIndex] = useState(0);
    const [changeLeftSlide, setChangeLeftSlide] = useState(0)
    const [changeRightSlide, setChangeRightSlide] = useState(0)

    const headerVariables = [
        {
            id: 0,
            type: 0,
            text: "СОВКОМБАНК РАССКАЖЕТ О ПРАКТИКЕ ВЫПУСКА ФИНАНСОВЫХ ИНСТРУМЕНТОВ УСТОЙЧИВОГО РАЗВИТИЯ В ФИНАНСОВОМ УНИВЕРСИТЕТЕ ПРИ ПРАВИТЕЛЬСТВЕ РФ",
            images: [oneHeader, twoHeader, threeHeader]
        },
        {
            id: 1,
            type: 1,
            text: "СОВКОМБАНК — ЛУЧШИЙ ИНВЕСТИЦИОННЫЙ БАНК НА РЫНКЕ СИНДИКАЦИЙ",
            description: `СОВКОМБАНК РАССКАЖЕТ О ПРАКТИКЕ ВЫПУСКА 
ФИНАНСОВЫХ ИНСТРУМЕНТОВ... Совкомбанк 
подтвердил свое лидерство на рынке синдицированного кредитования. 
Четвертый год подряд банк побеждает в премии Loans Cbonds Awards. 
В этом году Совкомбанк стал первым в номинации 
«Лучший инвестиционный банк на рынке синдикаций СНГ».
РАЗВИТИЯ В ФИНАНСОВОМ УНИВЕРСИТЕТЕ ПРИ ПРАВИТЕЛЬСТВЕ РФ`,
            image: twoInheader
        },
        {
            id: 2,
            type: 1,
            text: "РУКОВОДИТЕЛИ ГРУППЫ СОВКОМБАНКА ВОШЛИ В СПИСОК ТОП-1000 МЕНЕДЖЕРОВ РОССИИ",
            description: `В «Топ-100 директоров по персоналу» вошла Имаметдинова Надия, HR-директор Совкомбанка.Рейтинг «Топ-1000 российских менеджеров» публикуется ежегодно с 2001 года в газете «Коммерсантъ». Он подводит итоги работы за год и называет наиболее профессиональных управленцев России по более чем 20 отраслям и 16 функциональным направлениям. Методология рейтинга основана на принципе «лучшие выбирают лучших» — в ходе экспертного голосования топ-менеджеры оценивают успехи коллег в своих сферах деятельности.`,
            image: threeInheader
        },
        {
            id: 3,
            type: 1,
            text: "СОВКОМБАНК ПЕРЕЧИСЛИЛ В БЛАГОТВОРИТЕЛЬНЫЕ ФОНДЫ БОЛЕЕ 7 МЛН РУБЛЕЙ ПО АКЦИИ «ГОТОВИМСЯ К ШКОЛЕ С ХАЛВОЙ»",
            description: `Александр Дворский, управляющий директор Совкомбанка:
            «За 6 недель действия «школьной» акции к ней присоединились почти 80 000 клиентов «Халвы». Каждый из них смог принять участие в благотворительности, просто совершая свои обычные покупки в рассрочку по карте. Общая сумма перечисленных в фонды пожертвований превысила 7 млн рублей. В этом году вместе с нашими клиентами и партнерами-ритейлерами мы провели уже несколько социально значимых проектов и продолжим реализацию наших благотворительных инициатив».`,
            image: fourInheader
        },
        
    ]

    const btnHandlerLeft = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (index != 0) {
            setChangeLeftSlide(changeLeftSlide + 1);
            setTimeout(() => {
                setIndex(index-1)
            }, 300)
        }
    }

    const btnHandlerRight = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (index != 3) {
            setChangeRightSlide(changeRightSlide + 1);
            setTimeout(() => {
                setIndex(index+1)
            }, 300)
        }
    }

    return (
        <div className={cl.root}>
          <div className={cl.background}></div>
          <div className={cl.content}>
            <LeftSideHeaderButton callback={btnHandlerLeft} />
            <InHeader
                array={headerVariables} index={index}
                changeLeft={changeLeftSlide}
                changeRight={changeRightSlide}
            />
            <RightSideHeaderButton callback={btnHandlerRight} />
          </div>
        </div>
      );
}

export default Header;