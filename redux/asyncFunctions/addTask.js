import axios from "axios"
import { addTask, getTaskForEdit, setData } from "../reducers/counter"
import { editStatus } from "../reducers/counter"


export const getTask = () => {
    return async dispatch => {
        // console.log(1)
        const response = await axios.get("http://localhost:3001/tasks")
        dispatch(setData(response.data))
    }
}

export const asyncAddTask = (payload) => {
    return async dispatch => {
        const response = await axios.post('http://localhost:3001/tasks', payload)
        dispatch(getTask())
    }
}



export const asyncComplateTask = (payload) => {
    return async dispatch => {
        const response = await axios.patch(`http://localhost:3001/tasks/${payload.id}`, payload)
        dispatch(getTask())
    }
}

export const asyncDeleteTask = (payload) => {
    return async dispatch => {
        await axios.delete(`http://localhost:3001/tasks/${payload.id}`)
        dispatch(getTask())
    }
}

export const asyncGetTaskForEdit = (payload) => {
    return async dispatch => {
        // return console.log(payload)
        const response = await axios.get(`http://localhost:3001/tasks/${payload}`)
        dispatch(getTaskForEdit(response.data))
        // console.log(response.data)
    }
}

export const asyncEditTask = (payload) => {
    return async dispatch => {
        // console.log(payload)
        await axios.patch(`http://localhost:3001/tasks/${payload.id}`, payload)
    }
}