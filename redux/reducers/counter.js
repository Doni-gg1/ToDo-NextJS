import {createSlice} from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "data",
    initialState: {
        data: [],
        taskForEdit: {},
        id: 0
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
        getTaskForEdit(state, action){
            state.taskForEdit = action.payload
            // console.log(action)
        },
        getIDForEdit(state, payload) {
            state.id =   payload.payload
            // console.log(payload)
        }
    }
})

export default counterSlice.reducer
export const  {editStatus, setData, addTask, getTaskForEdit, getIDForEdit} = counterSlice.actions