import Button from '../form/Button';
import { useGlobalState } from '../../../context/UiContext';
import './PopupButton.css';
import { useCallback, useEffect } from 'react';


const PopupButton = ({ children }) => {

    const { popOpen, setPopopen } = useGlobalState();
    
    const handlePopOpen = useCallback(e => {
      if(e.target.closest('.popup.button_type3')) setPopopen(true)
      if(!e.target.closest('#popup') && popOpen) setPopopen(false)
    }, [popOpen, setPopopen])

      useEffect(() => {
        window.addEventListener('click', handlePopOpen)
        return () => window.removeEventListener('click', handlePopOpen)
      }, [handlePopOpen])
      

    return (
        <Button className={'popup button_type3'}>
            {children}
        </Button>
    );
};

export default PopupButton;