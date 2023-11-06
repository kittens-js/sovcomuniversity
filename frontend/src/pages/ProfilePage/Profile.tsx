import React, { useState } from "react";
import cl from './Profile.module.css';
import Slide from "../../components/Slide";
import Navbar from "../../components/UI/Navbar/Navbar";

import TaskBar from "./TaskBar/TaskBar";
import ProgressBar from "./ProgressBar/ProgressBar";
import TimetableBar from "./TimetableBar/TimetableBar";
import EducationMaterial from "./EducationMaterial/EducationMaterial";

import useSWR from "swr";
import { Api } from "../../service/api";

const Profile: React.FC = () => {

    const [activeButtons, setActiveButtons] = useState([true, false, false]);

    const { data, error, isLoading } = useSWR('/me', Api.Users.me);
    const { data: dataStudents, error: errorStudents, isLoading: loadingStudents } = useSWR('/students/me', Api.Students.me);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <div className={cl.root}>
            <Slide heightValue="105vh">
                <Navbar type="transparent" />

                <div className={cl.mainpage}>
                    <div className={cl.mainpage_content}>
                        <div className={cl.header}>
                            <span className={cl.fcs}>
                                {
                                    data !== undefined ? data.isOk ?
                                    <>{data.data.name} {data.data.surname} {data.data.middleName}</>
                                    : <></> : <></>
                                }
                            </span>
                            <span className={cl.other_data}>
                            {dataStudents !== undefined ? dataStudents.isOk ? dataStudents.data.group.name : <></> : <></>}
                            </span>
                        </div>
                        <div className={cl.menu}>
                            <div className={cl.left_bar}>
                                <nav className={cl.select_process_buttons}>
                                    {
                                        data?.isOk ?
                                            <>
                                                {
                                                    !data?.data?.isTeacher
                                                        // If user have teacher perms
                                                        ?
                                                        <>
                                                            <button
                                                                className={activeButtons[0] ? [cl.select_button, cl.active_button].join(' ') : cl.select_button}
                                                                onClick={() => { setActiveButtons([true, false, false]) }}
                                                            >Задание</button>
                                                        </>
                                                        
                                                        // If user hvnt teacher perms

                                                        :
                                                        <>
                                                            <button
                                                                className={activeButtons[0] ? [cl.select_button, cl.active_button].join(' ') : cl.select_button}
                                                                onClick={() => { setActiveButtons([true, false, false]) }}
                                                            >Учебный материал</button>
                                                        </>
                                                }
                                            </>
                                            
                                        : null
                                    }
                                    
                                    <button
                                        className={activeButtons[1] ? [cl.select_button, cl.active_button].join(' ') : cl.select_button}
                                        onClick={() => { setActiveButtons([false, true, false]) }}
                                    >Прогресс</button>
                                    <button
                                        className={activeButtons[2] ? [cl.select_button, cl.active_button].join(' ') : cl.select_button}
                                        onClick={() => { setActiveButtons([false, false, true]) }}
                                    >Расписание</button>
                                </nav>
                                <div className={cl.logout}>
                                    <button
                                        className={cl.logout_button}
                                        onClick={logout}
                                    >Выход</button>
                                </div>
                            </div>
                            <div className={cl.right_bar}>
                                {
                                    data?.isOk ?
                                        <>
                                            {
                                                data?.data?.isTeacher
                                                    ?
                                                    // If user have teacher perms
                                                    <> 
                                                        {activeButtons[0] ? <EducationMaterial/> : null}
                                                    </>
                                                    :
                                                    // If user hvnt teacher perms
                                                    <> 
                                                        {activeButtons[0] ? <TaskBar /> : null}
                                                    </>
                                            }
                                        </>
                                    : null
                                }
                                {activeButtons[1] ? <ProgressBar /> : null}
                                {activeButtons[2] ? <TimetableBar /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </Slide>
        </div>
    )
}

export default Profile;