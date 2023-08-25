import { Fragment } from 'react';
import { useGlobalState } from '../../../context/UiContext';
import './Popup.css';

const Popup = ({ children, className }) => {

    const { popOpen } = useGlobalState();

    return (
        <Fragment>
            <div id='popup' className={`${className} ${popOpen && 'on'}`}>
                {children} 
            </div>
        </Fragment>
    );
};

export default Popup;