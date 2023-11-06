import React, { useEffect, useState } from "react";
import cl from './TaskList.module.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useSWR from "swr";
import { Api } from "../../../../service/api";

interface Props {
    visible: boolean;
    id: number | null;
}

const TaskList: React.FC<Props> = ({ visible, id }) => {

    const { data, error, isLoading } = useSWR('/assignments', () => Api.Groups.getTask(Number(id)));

    const [selectTaskId, setSelectTaskId] = useState<number | null>(null);

    useEffect(() => {
        console.log('asig:', data)
    }, [data])

    return (
        <div className={visible ? [cl.modal, cl.modal_active].join(' ') : cl.modal}>
            <div className={cl.modal_content}>
                {
                    (data ? data.isOk ? (data?.data ?? []) : [] : []).map((item, index) => (
                        <div
                            key={index}
                            className={cl.task_item}
                            onClick={() => setSelectTaskId(item.id)}
                        >
                            <div className={cl.up_side}>
                                <div className={cl.left_block}></div>
                                <div className={cl.right_block}>
                                    <div className={cl.name}>
                                        {item.text}
                                    </div>
                                    <div className={cl.time}>
                                        {String(new Date(item.createdAt).getDate())} {(new Date(item.createdAt)).toLocaleString('default', { month: 'long' }).slice(0, ((new Date(item.createdAt)).toLocaleString('default', { month: 'long' })).length - 1) + 'я'}
                                    </div>
                                </div>
                            </div>
                            <div className={cl.down_side}>
                                <ArrowForwardIosIcon/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

}

export default TaskList