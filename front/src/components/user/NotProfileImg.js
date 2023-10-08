import './NotProfileImg.css';

const NotProfileImg = ({ style = {}, userBgColor = '', firstString = '' }) => {
    return (
        <span className='not_profileImg' style={{ backgroundColor: userBgColor, ...style }}>{firstString.toUpperCase()}</span>
    );
};

export default NotProfileImg;