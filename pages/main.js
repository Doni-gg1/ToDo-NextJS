import {useDispatch, useSelector} from "react-redux";
import {decrement, setData} from "../redux/reducers/counter";
import {Spring, animated} from 'react-spring'
import styles1 from "../styles/Home.module.css"
import axios from "axios";
import {useEffect} from "react";

export default function Main({ tasks }) {
    const data = useSelector(state => state.counter.data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setData(tasks))
    }, [])


    return <Spring
             from={{width: "0%", opacity: 0}}
            to={{width: "100%", opacity: 1}}
            config={{duration: 1000}}
        >{styles => (
            <animated.div className={styles1.mainWrapper} style={styles}>
                <div className={styles1.input}>
                    <input type="text"/>
                </div>
                <div className={styles1.todoBlock}>
                    <div>
                    {data.length ?
                        data.map(item => <h2>{item.title}</h2>)
                        : <h3>Задач нету (</h3>
                    }
                    </div>
                </div>
            </animated.div>
        ) }
        </Spring>

}

Main.getInitialProps = async () => {
    const data = await fetch("http://localhost:3001/tasks")
    const tasks = await data.json()
    return {
        tasks
    }
}