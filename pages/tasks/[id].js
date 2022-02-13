import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import styles from "../../styles/task.module.css"
import {asyncGetTaskForEdit} from "../../redux/asyncFunctions/addTask"
import { useDispatch, useSelector } from "react-redux"

export default function Task() {
    const inputRef = useRef(null)
    const dispatch = useDispatch()
    const {query} = useRouter()
    const task = useSelector(state => state.counter.taskForEdit)
    console.log(query)
    const yaLox = ()=> {
        dispatch(asyncGetTaskForEdit(query.id))
    }
    useEffect(async() => {
    
        dispatch(()=>{
            yaLox()
        })
    }, [])
    return (
        <div className={styles.wrapper}>
            <div className={styles.taskBlock}>
                <h2>Task №{query.id}</h2>
                <input type="text" value={inputRef.current}/>
            </div>
        </div>
    )
}