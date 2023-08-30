import { Fragment, useRef } from 'react';
import { useGlobalState } from '../../../context/UiContext';
import './Popup.css';

const Popup = ({ children, className }) => {

    const { popOpen } = useGlobalState();
    const popRef = useRef();

    return (
        <Fragment>
                <div id='popup' className={`${className} ${popRef.current?.classList.contains(popOpen.matched) && popOpen.isPop && 'on'}`} ref={popRef}>
                    {children} 
                </div>
        
        </Fragment>
    );
};

export default Popup;