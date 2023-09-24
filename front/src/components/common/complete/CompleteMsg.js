import './CompleteMsg.css';

const NoData = ({ icon, title, subText }) => {
    return (
        <div className='complete_msg_wrap'>
            <div className='icon'>{icon}</div>
            <strong className='title'>{title}</strong>
            <p className='sub_text'>{subText}</p>
        </div>
    );
};

export default NoData;