import './UserThum.css';

const UserThumItem = ({ users = [], className = '', isButton = false }) => {
    console.log(users)
    return (
        <ul className={`user_thum_wrap ${className}`}>
            {users.map(user => (
                <li key={user._id._id}>
                    <div className="user_thum_imgwrap">
                        <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${user._id.profileImage.key}`} alt="유저 프로필 이미지" />
                    </div>
                    <div className='user_thum_txtwrap'>
                        <span className='user_thum_id'>{user._id.id}</span>
                        <span className='user_thum_name'>{user._id.name} 님</span>
                    </div>
                    {isButton && <button>aa</button>}
                </li>
            ))}
        </ul>
    );
};

export default UserThumItem;