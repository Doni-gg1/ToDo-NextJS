import {createSlice} from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "data",
    initialState: {
        data: [],
    },

    reducers: {
        addTask(state, payload) {
            // console.log(payload.payload.data)
            state.data.push(payload.payload.data)
        },
        setData(state, payload) {
            state.data = payload.payload
        }
    }
})

export default counterSlice.reducer
export const  {setData, addTask} = counterSlice.actions