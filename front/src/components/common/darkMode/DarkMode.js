import { useCallback, useContext, useState } from 'react';
import { PiSunDuotone, PiMoonDuotone } from "react-icons/pi";
import Button from '../form/Button';
import _debounce from 'lodash.debounce';
import { UserContext } from '../../../context/UserContext';
import UserRequest from '../../../reducers/UserRequest';


const DarkMode = ({ className = '' }) => {

    const { state, dispatch } = useContext(UserContext);
    const { changeDarkmode } = UserRequest();
    const [thema, setThema] = useState(state.user.darkMode);
    const [themaApiState, setThemaApiState] = useState(false);
    const handleThemaChange = mode => {
        let html = document.querySelector('html');
        html.setAttribute('data-color', mode);
        setThema(mode);
        handleThemaChageRequest(mode);
    };

    const handleThemaChageRequest = useCallback(_debounce((mode) => {
        dispatch({ type: "USER_DARKMODE_CHANGE_REQUEST" });
        changeDarkmode({ userId: state.user._id, mode: mode });
        setThemaApiState(!themaApiState);
    }, 500), [themaApiState]);

    return (
        <div className={`${className}`}>
            {thema === 'dark' ? (
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
        </div>
    );
};

export default DarkMode;