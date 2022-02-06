import {configureStore, combineReducers} from "@reduxjs/toolkit";
import counterSlice from "./reducers/counter"


const rootReducer = combineReducers({
    counter: counterSlice
})

export const store = configureStore({
    reducer: rootReducer,
})