import React, { useState, useEffect } from "react";
import cl from './Application.module.css';
import Slide from "../../components/Slide";
import Navbar from "../../components/UI/Navbar/Navbar";
import Input from "./Input/Input";
import P from "./P/P";
import Checkbox from "../../components/UI/Checkbox/Checkbox";
import SendButton from "./SendButton/SendButton";
import { Api } from "../../service/api";
import useSWR from "swr";

const Application: React.FC = () => {

    const {data, error, isLoading} = useSWR("/specialties", Api.Specialties.getSpec);
    
    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [position, setPosition] = useState('')
    const [seniority, setSeniority] = useState('')
    const [achievements, setAchievements] = useState('')
    const [motivationLetter, setMotivationalLetter] = useState('')

    const [surnameError, setSurnameError] = useState('Некорректная фамилия')
    const [nameError, setNameError] = useState('Некорректное имя')
    const [lastNameError, setLastNameError] = useState('Некорректное отчество')
    const [positionError, setPositionError] = useState('')
    const [seniorityError, setSeniorityError] = useState('')
    const [achievementsError, setAchievementsError] = useState('')    
    const [motivationalLetterError, setMotivationalLetterError] = useState('')

    const [selectedOption, setSelectedOption] = useState(data?.isOk ? data.data[0].name : undefined)

    const [validInputs, setValidInputs] = useState<boolean>(false)
    const [lettersNum, setLetterNum] = useState(0)

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if(!checked || surnameError || nameError || lastNameError || positionError || seniorityError || achievementsError || motivationalLetterError) {
            setValidInputs(false)
        } else {
            setValidInputs(true)
        }
    }, 
    [checked, surnameError, nameError, lastNameError, positionError, seniorityError, achievementsError, motivationalLetterError])

    const surnameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^ЁёА-я]/, '')
        setSurname(e.target.value)
        surname.length < 2 ? setSurnameError("Фамилия слишком короткая") : setSurnameError('')
    }

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^ЁёА-я]/, '')
        setName(e.target.value)
        name.length < 2 ? setNameError("Имя слишком короткое") : setNameError('')

    }

    const lastNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^ЁёА-я]/, '')
        setLastName(e.target.value)
        lastName.length < 2 ? setLastNameError("Отчество слишком короткое") : setLastNameError('')

    }

    const positionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^ЁёА-я]/, '')
        setPosition(e.target.value)
        position.length < 2 ? setPositionError("Некорректная должность") : setPositionError('')
    }
    const achievementsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAchievements(e.target.value)

    }
    const seniorityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    }
    const motivationalLetterHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMotivationalLetter(e.target.value)
        setLetterNum(e.target.value.length)
    }

    const checkboxHandler = (checked: boolean) => {
        checked ? setChecked(true) : setChecked(false)
    }

    const send = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if(validInputs) {
            const response = await Api.Applications.sendApplication({motivationalLetter: motivationLetter, experienceInYears: Number(seniority), achievements: achievements, currentPosition: position, specialtyId: 0 })
            console.log(response.isOk);
            
        } 
    }

    useEffect(() => {
    }, [selectedOption])
    
    return (
        <div className={cl.root}>
            <Slide heightValue='300vh'>
                <Navbar type='transparent' />
                <div className = {cl.applcation_root}>
                    <h1 className = {cl.main_h}>Заявление на поступление</h1>
                    <div className = {cl.fio_div}>
                        <P text = "Введите свое ФИО" />
                        <Input callback={surnameHandler} len={30} text = 'Фамилия' />
                        <Input callback={nameHandler} len={30} text = 'Имя' />
                        <Input callback={lastNameHandler} len={30} text = 'Отчество' />
                    </div>
                    <div className = {cl.spec_div}>
                        <P text="Выберите подразделение" />
                        <select className= {cl.spec} defaultValue={selectedOption} onChange={
                            (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedOption(e.target.value)
                        }>
                            {data?.isOk ? data.data.map((option) => (<option key={option.id} value={option.name}>{option.name}</option>)) : <>  </>}
                        </select> 
                    </div>
                    <div className = {cl.position_div}>
                        <P text = "Введите текущую должность" />
                        <Input callback={positionHandler} len={30} text = '' />
                    </div>
                    <div className = {cl.seniority_div}>
                        <P text = "Стаж работы (в том числе с учетом предыдущих организаций, например при реогрганизации компании) " />
                        <Input callback={seniorityHandler} len={2} text = '' />
                    </div>
                    <div className = {cl.self_achievements_div}>
                        <P text = "Личные достижения в компании за последние 12 месяцев"  />
                        <Input callback={achievementsHandler} len={256} text = '' />
                    </div>
                    <div className = {cl.motivational_letter_div}>
                        <P text = "Мотивационное письмо" />
                        <div className = {cl.input_motivational_letter_div}>
                            <textarea onChange={e => motivationalLetterHandler(e)} className = {cl.input_motivator} maxLength = {500}></textarea>
                            <p className= {cl.input_motivator_chars}>{lettersNum}/500</p>
                        </div>
                        <div className = {cl.checkbox_div}>
                            <Checkbox callback={e => checkboxHandler(e.target.checked)} text = "" color = "#F3F3F3" />
                            <p className = {cl.checkbox_div_p}>Я даю согласие на обработку моих персональных данных и потдтверждаю, что ознакомлен с Политикой обработки персональных данных</p>
                        </div>
                        <div className = {cl.send_button_div}>
                            <SendButton callback={send}/>
                        </div>
                    </div>
                </div>
            </Slide>
        </div>
    )
}

export default Application;