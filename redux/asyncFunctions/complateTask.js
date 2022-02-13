import axios from "axios"
import { editStatus } from "../reducers/counter"

export const asyncComplateTask = (payload) => {
    return async dispatch => {
        const response = await axios.patch(`http://localhost:3001/tasks/${payload.id}`, payload)
        const data = await axios.get(`http://localhost:3001/tasks`)
        
        dispatch(editStatus({response, data}))
    }
}