import { Link } from 'react-router-dom'; 
import './WriteListItem.css';

const WriteListItem = ({ project }) => {

    console.log('wir', project.writes)
    

    return (
        <ul className='write_list_wrap'>
            {project.writes?.map(write => (
                <li key={write._id}>
                    <Link to={`/write/detail/${write._id}`}>
                        <strong className='write_list_title'>{write.title}</strong>
                        <span className='write_list_name'>{write.user._id.name}</span>
                        <span className='write_list_title'>{write.user._id.id}</span>
                        <span className='write_list_title'>{write.updatedAt}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default WriteListItem;