import React, { useState } from 'react'
import TestChild from './TestChild';

const Test = () => {

    const [n, setN] = useState(0)
    const [childData, setChildData] = useState('default data')

    const inc = () => {
        setN(n => n + 1)
    }

    return (
        <div>
            여긴 부모영역~~~~~~~~~~~~~<br />
            자식에서 받은 데이터: {childData}


            <button onClick={inc}>inc</button>
            <TestChild inc={inc} state={n} setChildData={setChildData}/>
        </div>
    )
}


export default Test;