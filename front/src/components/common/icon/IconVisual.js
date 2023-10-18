import './IconVisual.css';

const IconVisual = ({ icon }) => {
    return (
        <div className='icon_wrap'>
            <div className='icon'>{icon}</div>
            {/* <div className='icon_btn'>
                <Button className={'button_type4'}  >
                    <span className='blind'>아이콘 변경하기</span>
                    <PiSquaresFourDuotone />
                </Button>
            </div> */}
        </div>
    );
};

export default IconVisual;