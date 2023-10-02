import Button from '../form/Button';
import { useGlobalState } from '../../../context/UiContext';
import './MenuButton.css';
import { useCallback, useEffect } from 'react';


const PopupButton = ({ children, className }) => {
  
    const { menuOpen, setMenuOpen } = useGlobalState();
    
    const handlePopOpen = useCallback(e => {
      if(e.target.closest(`.menu.button_type3`)) setMenuOpen(true)
      if(!e.target.closest('#menu') && menuOpen) setMenuOpen(false)
      // if(e.target.closest(`#menu .list`) && menuOpen) setMenuOpen(false)
    }, [menuOpen, setMenuOpen])

      useEffect(() => {
        window.addEventListener('click', handlePopOpen)
        return () => window.removeEventListener('click', handlePopOpen)
      }, [handlePopOpen])
      

    return (
        <Button className={`button_type3 ${className}`}>
            {children}
        </Button>
    );
};

export default PopupButton;