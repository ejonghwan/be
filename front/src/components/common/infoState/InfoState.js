import './InfoState.css';

const InfoState = ({ text }) => {
    return (
        <div className='info_state_wrap'>
            <span>{text}</span>
        </div>
    );
};

export default InfoState;