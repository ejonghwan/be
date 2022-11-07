import React, { useState } from 'react'

const TestChild = props => {

    const { inc, state, setChildData } = props
    const [hoho, setHoho] = useState(20)

    const handleChildClick = e => {
        setHoho(hoho => hoho + 1)
        setChildData(hoho)
    }
    console.log(inc, state)

    return (
        <div>
            <button onClick={handleChildClick}>자식버튼</button>
            {state}
        </div>
    )
}


export default TestChild;