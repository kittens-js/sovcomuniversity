import React from 'react';
import cl from './TaskBar.module.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const TaskBar: React.FC = () => {
    return (
        // <div className={cl.task_bar}>
        //     <div className = {cl.inner_content}>
        //         <button className={cl.create_button}>+ Создать</button>
        //         <div className = {cl.whole_task}>
        //             <div className={cl.first_task_part}>
        //                 <div className={cl.roundabout}></div>
        //                 <div className = {cl.p_div}>
        //                     <p className = {cl.first_task_name}>Название задания</p>
        //                     <p className={cl.first_task_date}>22 сентября</p>
        //                 </div>
        //             </div>
        //             <div className = {cl.second_task_part}>
        //                 <button className = {cl.go_button}><ArrowForwardIosIcon></ArrowForwardIosIcon></button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
            <div className={cl.task_bar}>
                <div className = {cl.inner_content}>
                    <h1 className = {cl.groups_h1}>Выбор группы</h1>
                    <div className = {cl.group_div}>
                        <p className = {cl.p_group_div}>Название Группы</p>
                        <button className = {cl.go_button_group}><ArrowForwardIosIcon></ArrowForwardIosIcon></button>
                    </div>
                    <div className = {cl.group_div}>
                        <p className = {cl.p_group_div}>Название Группы</p>
                        <button className = {cl.go_button_group}><ArrowForwardIosIcon></ArrowForwardIosIcon></button>
                    </div>
                    <div className = {cl.group_div}>
                        <p className = {cl.p_group_div}>Название Группы</p>
                        <button className = {cl.go_button_group}><ArrowForwardIosIcon></ArrowForwardIosIcon></button>
                    </div>
                    <div className = {cl.group_div}>
                        <p className = {cl.p_group_div}>Название Группы</p>
                        <button className = {cl.go_button_group}><ArrowForwardIosIcon></ArrowForwardIosIcon></button>
                    </div>
                </div>
            </div>
    )
}

export default TaskBar;


    {/* //         <div className={cl.task_header}>
    //             <div className={cl.teacker_avatar}>
    //                 <h3 className={cl.user_fio}>НИК</h3>
    //             </div>
    //             <div className={cl.task_name}>
    //                 <h3 className={cl.task_name_h3}>название задания</h3>
                    
    //             </div>
    //         </div>
    //             <div className={cl.task}>
    //                 <div className={cl.message}>
    //                       <input type="text" placeholder='Сообщение' className={cl.message_input}/>
    //                       <button className={cl.message_btn}>Отправить</button>      
    //                 </div>
    //             </div> */}