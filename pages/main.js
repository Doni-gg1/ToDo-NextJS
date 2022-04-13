import {useDispatch, useSelector} from "react-redux";
import {decrement, getIDForEdit, getTaskForEdit, setData} from "../redux/reducers/counter";
import {Spring, animated, useTransition} from 'react-spring'
import styles1 from "../styles/Home.module.css"
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {asyncAddTask, getTask, asyncDeleteTask, asyncGetTaskForEdit} from "../redux/asyncFunctions/addTask"
import {asyncComplateTask} from "../redux/asyncFunctions/addTask"
import Link from "next/link"


export default function Main({tasks}) {
    const data = useSelector(state => state.counter.data)
    const dispatch = useDispatch()
    const [isActiveModal, setIsActiveModal] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isVisibleWindow, setIsVisibleWindow] = useState(false)
    const [completedTask, setCompletedTask] = useState(false)
    const taskValue = useRef(null)
    const transitions = useTransition(data, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0}
    })

    // console.log(data)
    const creatTaskFunc = () => {
        let obj = {
            title: taskValue.current,
            completed: false
        }
        dispatch(asyncAddTask(obj))
        // taskValue.current = ""
    }

    const createTaskButton = () => {
        setIsActiveModal(!isActiveModal)
        setIsVisible(!isVisible)
    }
    const closeModal = () => {
        setIsVisible(!isVisible)
        setTimeout(function () {
            setIsActiveModal(!isActiveModal)
        }, 300)
        // taskValue.current = null
    }

    const completedFunction = (task, {id, title, completed}) => {
        setCompletedTask(!completedTask)
        let obj = {
            id,
            title,
            completed: !completedTask
        };
        // console.log(obj)

        dispatch(asyncComplateTask(obj))
    }

    const deleteTask = (item) => {
        // console.log(item.id)
        dispatch(asyncDeleteTask(item))
    }

    const dispatchId = (item) => {
        dispatch(getTaskForEdit(item))
        // dispatch(getIDForEdit(id))
        // console.log(id)
    }

    useEffect(() => {
        dispatch(getTask())
    }, [])

    return (


        <Spring
            from={{transform: "scale(2)", opacity: 0}}
            to={{transform: "scale(1)", opacity: 1}}

            config={{duration: 700}}
        >{styles => (
            <animated.div className={styles1.mainWrapper} style={styles}>
                <div className={styles1.btnBlock} onClick={() => createTaskButton()}>
                    <svg width="60" height="60">
                        <g>
                            <path fill="#ffffff" strokeWidth="1.0000000pt" id="path837"
                                  d="m23.51757,23.95549l0,-14.30111c0,-2.00059 0.547039,-3.62607 1.641109,-4.87644c1.09407,-1.28163 2.65704,-1.92245 4.68889,-1.92245c2.031847,0 3.594809,0.64082 4.68889,1.92245c1.125328,1.25037 1.688,2.87585 1.688,4.87644l0,14.30111l14.113548,0c2.06311,0 3.688591,0.56267 4.876442,1.688c1.219109,1.09407 1.828671,2.641411 1.828671,4.642c0,2.031851 -0.609562,3.610441 -1.828671,4.735781c-1.187851,1.125328 -2.813332,1.688 -4.876442,1.688l-14.113548,0l0,14.254219c0,2.031849 -0.562672,3.672962 -1.688,4.923332c-1.125332,1.25037 -2.688301,1.875549 -4.68889,1.875549c-2.000591,0 -3.56356,-0.625179 -4.68889,-1.875549c-1.09407,-1.25037 -1.641109,-2.891483 -1.641109,-4.923332l0,-14.254219l-14.11355,0c-2.000601,0 -3.626081,-0.609562 -4.876451,-1.828671c-1.21911,-1.25037 -1.82866,-2.78207 -1.82866,-4.59511c0,-2.000589 0.59392,-3.54793 1.78177,-4.642c1.21911,-1.12533 2.86023,-1.688 4.92334,-1.688l14.11355,0z"/>
                        </g>
                    </svg>
                </div>
                <div className={styles1.wrapperMain}>
                    <Spring
                        from={{opacity: 0}}
                        to={{opacity: 1}}
                        delay={1500}
                        config={{duration: 1000}}

                    >{
                        props => (
                            <animated.h2 style={props} className={styles1.title}>Tasks</animated.h2>
                        )
                    }
                    </Spring>
                    <div className={styles1.todoBlock}>
                        <div>
                            {data.length ?
                                data.map((item) =>

                                    <animated.div className={styles1.task} style={styles}
                                                  onDoubleClick={(e) => completedFunction(e.target, item)}>
                                        <Spring
                                            from={{opacity: 1, transform: "translateX(0px)"}}
                                            to={{opacity: 0, transform: "translateX(100px)"}}
                                            reverse={!isVisibleWindow}
                                        >
                                            {
                                                props => (
                                                    <animated.div style={props}
                                                                  className={(item.completed) ? styles1.taskCompleted : null}>
                                                        <h2>{item.title}</h2>
                                                        <Link href={`/tasks/${item.id}`}>
                                                            <svg onClick={() => {
                                                                dispatchId(item)
                                                            }}
                                                                 className={styles1.editIcon}
                                                                 fill="#000000"
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                 viewBox="0 0 24 24"
                                                                 width="25px"
                                                                 height="25px">
                                                                <path
                                                                    d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z"/>
                                                            </svg>
                                                        </Link>
                                                        <svg className={styles1.deletedIcon}
                                                             onClick={() => {
                                                                 deleteTask(item)
                                                                 // setIsVisibleWindow(!isVisibleWindow)
                                                             }}
                                                             fill="#000000"
                                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                             width="25px"
                                                             height="25px">
                                                            <path
                                                                d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"/>
                                                        </svg>
                                                    </animated.div>
                                                )
                                            }
                                        </Spring>


                                        {item.completed ?
                                            <svg className={styles1.completedIcon} width="122.88px"
                                                 height="122.88px"
                                                 viewBox="0 0 122.88 122.88">
                                                <g>
                                                    <path fill="#6BBE66"
                                                          d="M34.388,67.984c-0.286-0.308-0.542-0.638-0.762-0.981c-0.221-0.345-0.414-0.714-0.573-1.097 c-0.531-1.265-0.675-2.631-0.451-3.934c0.224-1.294,0.812-2.531,1.744-3.548l0.34-0.35c2.293-2.185,5.771-2.592,8.499-0.951 c0.39,0.233,0.762,0.51,1.109,0.827l0.034,0.031c1.931,1.852,5.198,4.881,7.343,6.79l1.841,1.651l22.532-23.635 c0.317-0.327,0.666-0.62,1.035-0.876c0.378-0.261,0.775-0.482,1.185-0.661c0.414-0.181,0.852-0.323,1.3-0.421 c0.447-0.099,0.903-0.155,1.356-0.165h0.026c0.451-0.005,0.893,0.027,1.341,0.103c0.437,0.074,0.876,0.193,1.333,0.369 c0.421,0.161,0.825,0.363,1.207,0.604c0.365,0.231,0.721,0.506,1.056,0.822l0.162,0.147c0.316,0.313,0.601,0.653,0.85,1.014 c0.256,0.369,0.475,0.766,0.652,1.178c0.183,0.414,0.325,0.852,0.424,1.299c0.1,0.439,0.154,0.895,0.165,1.36v0.23 c-0.004,0.399-0.042,0.804-0.114,1.204c-0.079,0.435-0.198,0.863-0.356,1.271c-0.16,0.418-0.365,0.825-0.607,1.21 c-0.238,0.377-0.518,0.739-0.832,1.07l-27.219,28.56c-0.32,0.342-0.663,0.642-1.022,0.898c-0.369,0.264-0.767,0.491-1.183,0.681 c-0.417,0.188-0.851,0.337-1.288,0.44c-0.435,0.104-0.889,0.166-1.35,0.187l-0.125,0.003c-0.423,0.009-0.84-0.016-1.241-0.078 l-0.102-0.02c-0.415-0.07-0.819-0.174-1.205-0.31c-0.421-0.15-0.833-0.343-1.226-0.575l-0.063-0.04 c-0.371-0.224-0.717-0.477-1.032-0.754l-0.063-0.06c-1.58-1.466-3.297-2.958-5.033-4.466c-3.007-2.613-7.178-6.382-9.678-9.02 L34.388,67.984L34.388,67.984z M61.44,0c16.96,0,32.328,6.883,43.453,17.987c11.104,11.125,17.986,26.493,17.986,43.453 c0,16.961-6.883,32.329-17.986,43.454C93.769,115.998,78.4,122.88,61.44,122.88c-16.961,0-32.329-6.882-43.454-17.986 C6.882,93.769,0,78.4,0,61.439C0,44.48,6.882,29.112,17.986,17.987C29.112,6.883,44.479,0,61.44,0L61.44,0z M96.899,25.981 C87.826,16.907,75.29,11.296,61.44,11.296c-13.851,0-26.387,5.611-35.46,14.685c-9.073,9.073-14.684,21.609-14.684,35.458 c0,13.851,5.611,26.387,14.684,35.46s21.609,14.685,35.46,14.685c13.85,0,26.386-5.611,35.459-14.685s14.684-21.609,14.684-35.46 C111.583,47.59,105.973,35.054,96.899,25.981L96.899,25.981z"/>
                                                </g>
                                            </svg>
                                            : null
                                        }
                                    </animated.div>
                                )
                                : <h3>Задач нету (</h3>
                            }
                        </div>
                    </div>
                </div>

                <div
                    className={styles1.modalWrapper + " " + (!isActiveModal ? styles1.notActive : null)}
                    onClick={(event) => event.stopPropagation()}
                >
                    <Spring
                        // reset={true}
                        from={{opacity: 0, transform: "rotate3d(1, 0, 0, 180deg)"}}
                        to={{opacity: 1, transform: "rotate3d(1, 0, 0, 0deg)"}}
                        reverse={!isVisible}
                    >
                        {
                            styles => (
                                <animated.div style={styles} className={styles1.modalBlock}>
                                    <div>
                                        <h3>Task Name</h3>
                                        <input type="text"
                                               onChange={(e) => taskValue.current = e.target.value}/>
                                    </div>
                                    <div className={styles1.modalBtns}>
                                        <button className={styles1.btnModal}
                                                onClick={() => creatTaskFunc()}>Create
                                        </button>
                                        <button className={styles1.btnModal}
                                                onClick={() => closeModal()}>Close
                                        </button>
                                    </div>
                                </animated.div>
                            )
                        }
                    </Spring>
                </div>
            </animated.div>
        )}
        </Spring>

    )

}

Main.getInitialProps = async () => {
    const data = await fetch("http://localhost:3001/tasks")
    const tasks = await data.json()
    return {
        tasks
    }
}
