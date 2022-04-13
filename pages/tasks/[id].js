import {useRouter} from "next/router"
import {useEffect, useRef, useState} from "react"
import styles from "../../styles/task.module.css"
import {asyncEditTask, asyncGetTaskForEdit} from "../../redux/asyncFunctions/addTask"
import {useDispatch, useSelector} from "react-redux"
import Link from "next/link"
import {Spring, animated} from "react-spring";
import styles1 from "../../styles/Home.module.css";


export default function Task() {
    const dispatch = useDispatch()
    const {query} = useRouter()
    const task = useSelector(state => state.counter.taskForEdit)
    const idTask = useSelector(state => state.counter.id)
    const [value, setValue] = useState(null)
    const [isVisible, setIsVisible] = useState(false)


    const changeTask = () => {
        let obj = {
            id: task.id,
            title: value,
            completed: task.completed
        }
        // console.log(obj)
        dispatch(asyncEditTask(obj))
    }
    return (

                        <Spring
                            from={{transform: "scale(2)", opacity: 0}}
                            to={{transform: "scale(1)", opacity: 1}}

                            config={{duration: 700}}
                        >
                            {
                                props => (
                                    <animated.div style={props} className={styles.wrapper}>
                                        <div className={styles.wrapperMain}>
                                            <Spring
                                                from={{opacity: 0}}
                                                to={{opacity: 1}}
                                                delay={1000}
                                                config={{duration: 1000}}

                                            >{
                                                props => (
                                                    <animated.h2 style={props}
                                                                 className={styles.title}>Edit Task</animated.h2>
                                                )
                                            }
                                            </Spring>
                                            <div className={styles.taskBlock}>
                                                <h2>Task №{query.id}</h2>
                                                <input defaultValue={task.title} type="text"
                                                       onChange={(e) => setValue(e.target.value)}/>
                                                <div className={styles.modalBtns}>
                                                    <button className={styles.btnModal}
                                                            onClick={() => changeTask()}>Save
                                                    </button>
                                                    <Link href={`/main`}>
                                                        <button className={styles.btnModal} onClick={() => setIsVisible(!isVisible)}>Cancel</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </animated.div>
                                )
                            }
                        </Spring>

    )
}