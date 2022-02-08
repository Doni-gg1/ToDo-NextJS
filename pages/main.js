import {useDispatch, useSelector} from "react-redux";
import {decrement, setData} from "../redux/reducers/counter";
import {Spring, animated} from 'react-spring'
import styles1 from "../styles/Home.module.css"
import axios from "axios";
import {useEffect, useState} from "react";

export default function Main({tasks}) {
    const data = useSelector(state => state.counter.data)
    const dispatch = useDispatch()
    const [isActiveModal, setIsActiveModal] = useState(false)
    const [isVisible, setIsVisible] = useState(false)


    const createTask = () => {
        setIsActiveModal(!isActiveModal)
        setIsVisible(!isVisible)
    }
    const closeModal = () => {
        setIsVisible(!isVisible)
        setTimeout(function () {
            setIsActiveModal(!isActiveModal)
        }, 300)

    }


    useEffect(() => {
        dispatch(setData(tasks))
    }, [])


    return <Spring
        from={{width: "0%", opacity: 0}}
        to={{width: "100%", opacity: 1}}
        config={{duration: 1000}}
    >{styles => (
        <animated.div className={styles1.mainWrapper} style={styles}>
            <div className={styles1.btnBlock} onClick={() => createTask()}>
                <svg width="60" height="60">
                    <g>
                        <path fill="#ffffff" stroke-width="1.0000000pt" id="path837"
                              d="m23.51757,23.95549l0,-14.30111c0,-2.00059 0.547039,-3.62607 1.641109,-4.87644c1.09407,-1.28163 2.65704,-1.92245 4.68889,-1.92245c2.031847,0 3.594809,0.64082 4.68889,1.92245c1.125328,1.25037 1.688,2.87585 1.688,4.87644l0,14.30111l14.113548,0c2.06311,0 3.688591,0.56267 4.876442,1.688c1.219109,1.09407 1.828671,2.641411 1.828671,4.642c0,2.031851 -0.609562,3.610441 -1.828671,4.735781c-1.187851,1.125328 -2.813332,1.688 -4.876442,1.688l-14.113548,0l0,14.254219c0,2.031849 -0.562672,3.672962 -1.688,4.923332c-1.125332,1.25037 -2.688301,1.875549 -4.68889,1.875549c-2.000591,0 -3.56356,-0.625179 -4.68889,-1.875549c-1.09407,-1.25037 -1.641109,-2.891483 -1.641109,-4.923332l0,-14.254219l-14.11355,0c-2.000601,0 -3.626081,-0.609562 -4.876451,-1.828671c-1.21911,-1.25037 -1.82866,-2.78207 -1.82866,-4.59511c0,-2.000589 0.59392,-3.54793 1.78177,-4.642c1.21911,-1.12533 2.86023,-1.688 4.92334,-1.688l14.11355,0z"/>
                    </g>
                </svg>
            </div>
            <div className={styles1.todoBlock}>
                <div>
                    {data.length ?
                        data.map(item => <h2>{item.title}</h2>)
                        : <h3>Задач нету (</h3>
                    }
                </div>
            </div>
            <div className={styles1.modalWrapper + " " + (!isActiveModal ? styles1.notActive : null)}>
                <Spring
                    reset={true}
                    from={{opacity: 0, transform: "rotate3d(1, 0, 0, 180deg)"}}
                    to={{opacity: 1, transform: "rotate3d(1, 0, 0, 0deg)"}}
                    reverse={!isVisible}
                >
                    {
                        styles => (

                                <animated.div style={styles} className={styles1.modalBlock}>
                                    <div>
                                        <input type="text"/>
                                    </div>
                                    <button>Create</button>
                                    <button onClick={() => closeModal()}>Close</button>
                                </animated.div>

                        )
                    }
                </Spring>
            </div>
        </animated.div>
    )}
    </Spring>

}

Main.getInitialProps = async () => {
    const data = await fetch("http://localhost:3001/tasks")
    const tasks = await data.json()
    return {
        tasks
    }
}
