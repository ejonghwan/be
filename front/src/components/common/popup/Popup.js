import { Fragment, useState, memo, forwardRef, useImperativeHandle, useEffect, useCallback } from 'react';
import Button from '../form/Button';
import './Popup.css';

const Popup = forwardRef(({ children, className, isHead = false, title, closeClick, dimd = false }, ref) => {

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

    // 딤드 없을 경우 다른곳을 눌러도 팝업 닫히기 나중에 해결해야됨
    // const handleClickClose = useCallback(e => {
    //     console.log(e.target, popOpen)
    //     if(e.target.classList.contains('popup')) {
    //         setPopOpen(false)
    //     }
    //     // setPopOpen(false)
    // }, [popOpen, setPopOpen])

    // useEffect(() => {
    //     window.addEventListener('click', handleClickClose)
    //     return () => window.removeEventListener('click', handleClickClose)
    // }, [])

    return (
        <Fragment>
            {/* {console.log('popref?', popRef.current)}
            <div id='popup' className={`${className} ${popRef.current?.classList.contains(popOpen.matched) && popOpen.isOpen && 'on'}`} ref={popRef}>
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
            </div>
            { popOpen.isOpen && dimd && <div className='dimd'></div>} */}
            {/* {popOpen.isOpen && ( */}

            
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
                    </div>
                    { popOpen && dimd && <div className='dimd' onClick={handlePopClose}></div>}
                </Fragment>
            )}
         </Fragment>
    );
})

export default memo(Popup);