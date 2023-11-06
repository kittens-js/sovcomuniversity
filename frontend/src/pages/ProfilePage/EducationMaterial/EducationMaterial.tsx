import React, { useState, useEffect } from 'react';
import cl from './EducationMaterial.module.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useSWR from 'swr';
import { Api } from '../../../service/api';
import TaskList from './TaskList/TaskList';


const EducationMaterial: React.FC = () => {

    const { data, error, isLoading } = useSWR('/groups', Api.Groups.get);

    const [visible, setVisible] = useState(false);
    const [selectId, setSelectId] = useState<number | null>(null);

    console.log(data)
    return (
        
        <>
            <div className={!visible ? [cl.task_bar, cl.active].join(' ') : cl.task_bar}>
                <div className={cl.inner_content}>
                    <h1 className={cl.groups_h1}>Выбор группы bobik</h1>
                    {   
                        (data ? data.isOk ? (data?.data ?? []) : [] : []).map((item, index) => (
                            <div
                                className={cl.group_div}
                                key={index}
                                onClick={() => { setVisible(true);  setSelectId(item.id)}}
                            >
                            {}
                                <p className={cl.p_group_div}>{item.name}</p>
                                <button className={cl.go_button_group}>
                                    <ArrowForwardIosIcon></ArrowForwardIosIcon>
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* <div className={visible ? [cl.modal, cl.modal_active].join(' ') : cl.modal}>
                {selectId}
            </div> */}
            {/* <component visible = {visible} selectId = {selectId}/> */}
            <TaskList visible = {visible} id = {selectId} />
        </>
    )
}
export default EducationMaterial;


