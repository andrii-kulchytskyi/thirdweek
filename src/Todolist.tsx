import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (valueTitle: string) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState("")

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        // setTitle('')
    }

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle("")
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
        console.log(event.key)
    }
    const changeFilterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)
    }
    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }
    const mappedTask = props.tasks.map((t, index) => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => removeTaskHandler(t.id)}>x
                </button>
            </li>
        )
    })
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onChange={onChangeHandler} value={title} onKeyDown={onKeyDownHandler}/>
            <button onClick={addTaskHandler}>+
            </button>
        </div>
        <ul>
            {mappedTask}
        </ul>
        <div>
            <Button buttonName={"All"} callBack={()=>changeFilterHandler('all')}/>
            <Button buttonName={"Active"} callBack={()=>changeFilterHandler('active')}/>
            <Button buttonName={"Completed"} callBack={()=>changeFilterHandler('completed')}/>
            {/*<button onClick={() => changeFilterHandler("all")}>*/}
            {/*    All*/}
            {/*</button>*/}
            {/*<button onClick={() => changeFilterHandler("active")}>*/}
            {/*    Active*/}
            {/*</button>*/}
            {/*<button onClick={() => changeFilterHandler("completed")}>*/}
            {/*    Completed*/}
            {/*</button>*/}
        </div>
    </div>
}
