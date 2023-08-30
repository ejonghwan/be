import { Fragment, useRef, useState, memo, forwardRef, useImperativeHandle } from 'react';
import { useGlobalState } from '../../../context/UiContext';
import './Popup.css';
import Button from '../form/Button';

const Popup = forwardRef(({ children, className, isHead = false, title, closeClick, dimd = false }, ref) => {

    // const { popOpen, setPopopen } = useGlobalState();
    const [Open, setOpen] = useState(false);

    useImperativeHandle(ref, () => {
		return { 
			open: () => { 
				// setPopopen({ ...popOpen, isOpen: true });
                setOpen(true)
			 }, 
			 close: () => {
				// setPopopen({ ...popOpen, isOpen: false })
                setOpen(false)
			 },
		};
	});


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
            {Open && (
                <Fragment>
                    <div id='popup' className={`${className}`}>
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
                    { Open && dimd && <div className='dimd'></div>}
                </Fragment>
            )}
         </Fragment>
    );
})

export default memo(Popup);