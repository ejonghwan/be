
import Icon from './Icon';
import './IconList.css';

const IconList = ({ icons }) => {
    return (
        <div className='icon_list_wrap'>
            {icons.map((item, idx) => <Icon icon={item} key={idx} className={'icon_more'} />)}
        </div>
    );
};

export default IconList;