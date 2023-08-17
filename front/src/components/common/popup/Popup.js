import { Fragment } from 'react';
import { useGlobalData } from '../../../context/UiContext';
import './Popup.css';

const Popup = ({ children, className }) => {

    const { popOpen } = useGlobalData();

    return (
        <Fragment>
            <div id='popup' className={`${className} ${popOpen && 'on'}`}>
                {children} 
            </div>
        </Fragment>
    );
};

export default Popup;