import Link from "next/link"
import {useSelector} from "react-redux";
import {Parallax, ParallaxLayer} from '@react-spring/parallax'
import {Spring, animated} from 'react-spring'
import {useState} from "react";


export default function Index() {
    return (<>
            <Parallax pages={2} style={{top: '0', left: '0'}} horizontal>
                <ParallaxLayer
                    offset={0}
                    speed={2.5}
                    style={{display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center'}}>
                    <h1>Hello, welcome to my task tracker</h1>
                    <h4>Scroll down to countinue</h4>
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={2} style={{backgroundColor: '#faa85e'}}/>
                <ParallaxLayer
                    offset={1}
                    speed={0.5}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        cursor: "pointer",
                    }}>
                    <Link href='/main'>
                        <h2>Go to ToDo</h2>

                    </Link>
                </ParallaxLayer>
            </Parallax>
        </>
    )
}