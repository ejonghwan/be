import { Fragment, useState, memo, forwardRef, useImperativeHandle, useEffect, useCallback } from 'react';
import Button from '../form/Button';
import './Popup.css';

const Popup = forwardRef(({ children, className, isHead = false, title, closeClick, dimd = false, isButton = false, buttons = [] }, ref) => {

    const [popOpen, setPopOpen] = useState(false);

    useImperativeHandle(ref, () => {
		return { 
			popupOpen: () => { 
                setPopOpen(true)
			 }, 
			 popupClose: () => {
                handlePopClose()
                // setPopOpen(false)
			 },
		};
	});

    const handlePopClose = () => {
		// document.body.style.overflow = '';
		document.body.classList.remove('popup_active');
		setPopOpen(false)
	}

	useEffect(() => {
		if(popOpen) {
			// document.body.style.overflow = 'hidden';
			document.body.classList.add('popup_active');
		}
	}, [popOpen])


    return (
        <Fragment>
            {popOpen && (
                <Fragment>
                    <div id='popup' className={`popup ${className}`}>
                        {isHead && (
                            <div className='popup_head'>
                                <strong>{title}</strong>
                                <Button type={'button'} className={'button_type_close hover_type1'} onClick={closeClick}>
                                    <span className='blind'>팝업 닫기</span>
                                </Button>
                            </div>
                        )}
                        <div className='popup_body'>
                            {children}
                        </div> 

                        {isButton && (
                             <div className='popup_bottom'>
                                {buttons.map((button, idx) => <Fragment key={idx}>{button}</Fragment>)}
                             </div>
                        )}
                    </div>
                    { popOpen && dimd && <div className='dimd' onClick={handlePopClose}></div>}
                </Fragment>
            )}
         </Fragment>
    );
})

export default memo(Popup);