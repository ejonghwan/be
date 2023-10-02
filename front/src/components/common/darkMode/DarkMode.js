import { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { PiSunDuotone, PiMoonDuotone } from "react-icons/pi";
import Button from '../form/Button';
import _debounce from 'lodash.debounce';
// import './Menu.css';


const DarkMode = () => {

    const [thema, setThema] = useState(false);
    const [themaApiState, setThemaApiState] = useState(false)
    const handleThemaChange = type => {
        let html = document.querySelector('html');
        html.setAttribute('data-color', type)
        setThema(!thema)
        handleThemaChageRequest()
    }

    const handleThemaChageRequest = useCallback(_debounce(() => {
        console.log('mode c')
        setThemaApiState(!themaApiState)
    }, 1000), [themaApiState])

    return (
        <Fragment>
            {thema ? (
                <Button 
                    className={'button_type3 list'} 
                    onClick={() => handleThemaChange('light')}
                ><PiSunDuotone /><span>밝은화면으로 보기</span></Button>
            ) : (
                <Button 
                    className={'button_type3 list'} 
                    onClick={() => handleThemaChange('dark')}
                ><PiMoonDuotone /><span>어두운화면으로 보기</span></Button>
            )}
        </Fragment>
    );
};

export default DarkMode;