import cl from './Timetable.module.css';

const TimetableBar: React.FC = () => {

    const timetables = [
        {
            id: 1,
            weekDay: "Понедельник"
        },
        {
            id: 1,
            weekDay: "Вторник"
        },
        {
            id: 1,
            weekDay: "Среда"
        },
        {
            id: 1,
            weekDay: "Четверг"
        },
        {
            id: 1,
            weekDay: "Пятница"
        },
        {
            id: 1,
            weekDay: "Суббота "
        },
]


    return (
        <div className={cl.timetable_bar}>
            <div className={cl.timetable_holder}>
                <h2 className={cl.timetable_holder_h2}>Расписание</h2>
                <div className={cl.timetables_div}>
                        {timetables.map((div) => (
                            <div className={cl.timetable} key={div.id}>


                                <div className={cl.timetable_row}>
                                    <h3 className={cl.week_day}>{div.weekDay}</h3>
                                </div>
                                <div className={cl.timetable_row}></div>
                                <div className={cl.timetable_row}></div>
                                <div className={cl.timetable_row}></div>    
                                <div className={cl.timetable_row}></div>
                                <div className={cl.timetable_row}></div>
                            </div>
                        ))}

                    
                </div>
            </div>
        </div>
    )
}

export default TimetableBar;