import {createSlice} from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "data",
    initialState: {
        data: [],
    },

    reducers: {
        setData(state, payload) {
            state.data = payload.payload
        }
    }
})

export default counterSlice.reducer
export const  {setData} = counterSlice.actions