import {createSlice} from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "data",
    initialState: {
        data: [],
        taskForEdit: {}
    },

    reducers: {
        editStatus(state, payload) {
            state.data = payload.payload.data.data
        },
        addTask(state, payload) {
            // console.log(payload.payload.data)
            state.data.push(payload.payload.data)
        },
        setData(state, payload) {
            state.data = payload.payload
            // console.log(payload.data)
        },
        getTaskForEdit(state, {payload}) {
            // console.log(payload)
            state.taskForEdit = payload
        }
    }
})

export default counterSlice.reducer
export const  {editStatus, setData, addTask, getTaskForEdit} = counterSlice.actions