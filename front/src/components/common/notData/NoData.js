import './NoData.css';

const NoData = ({ icon, title, subText }) => {
    return (
        <div className='no_data_wrap'>
            <div className='icon'>{icon}</div>
            <strong className='title'>{title}</strong>
            <p className='sub_text'>{subText}</p>
        </div>
    );
};

export default NoData;