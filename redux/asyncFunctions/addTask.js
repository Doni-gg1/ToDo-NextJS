import axios from "axios"
import { addTask } from "../reducers/counter"


export const asyncAddTask = (payload) => {
    return async dispatch => {
        const response = await axios.post('http://localhost:3001/tasks', payload)
        dispatch(addTask(response))
    }
}