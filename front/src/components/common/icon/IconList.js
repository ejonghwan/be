import Icon from './Icon';
import './IconList.css';

const IconList = ({ icons, onClick, current }) => {

    return (
        <div className='icon_list_wrap'>
            {icons.map((item, idx) => 
                <Icon 
                    icon={item} 
                    id={idx} 
                    key={idx} 
                    className={`icon_more ${idx === current && 'on'}`} 
                    onClick={() => onClick(idx)} 
                />
            )}
        </div>
    );
};

export default IconList;