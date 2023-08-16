import Button from '../form/Button';
import { useGlobalData } from '../../../context/UiContext';
import './PopupButton.css';
import { useEffect } from 'react';


const PopupButton = ({ children }) => {

    const { popOpen, setPopopen } = useGlobalData();
    
    const handlePopOpen = e => {
        if(e.target.closest('.popup.button_type3')) setPopopen(true)
        if(!e.target.closest('#popup') && popOpen) setPopopen(false)
      }

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