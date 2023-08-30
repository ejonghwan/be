import Button from '../form/Button';
import { useGlobalState } from '../../../context/UiContext';
import './PopupButton.css';
import { useCallback, useEffect } from 'react';


const PopupButton = ({ children, className, data }) => {

    // className는 바디 class랑 매치시켜줘야함 무조건
    // className은 무조건 한개만
    const { popOpen, setPopopen } = useGlobalState();
    
    const handlePopOpen = useCallback(e => {
      if(e.target.closest(`.popup.button_type3.${className}`)) setPopopen({ isPop: true, matched: className, data: data })
      if(!e.target.closest('#popup') && popOpen.isPop) setPopopen({ ...popOpen, isPop: false })
    }, [popOpen, setPopopen])

      useEffect(() => {
        window.addEventListener('click', handlePopOpen)
        return () => window.removeEventListener('click', handlePopOpen)
      }, [handlePopOpen])
      

    return (
        <Button className={`popup button_type3 ${className}`}>
            {children}
        </Button>
    );
};

export default PopupButton;