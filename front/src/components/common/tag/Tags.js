import { Link } from 'react-router-dom';
import { PiXCircleDuotone } from "react-icons/pi";
import './Tags.css';

// to 링크는 나중에 태그 누르면 검색페이지로 가게 할때 작업
const Tags = ({ className = '', tags = [], isLink = false, handleDelete }) => {
    console.log(tags)
    return (
        <ul className={`tag_wrap ${className}`}>
            {tags.map((tag, idx) => {
                return (
                    <li key={idx}>
                        {isLink ? 
                            <Link to={`/${tag}`}>{`# ${tag}`}</Link> 
                            : 
                            (<div className='no_link'>
                                {tag}
                                <button type="button" className='button_reset button_delete' onClick={() => handleDelete(tag)}>
                                    <span className='blind'>{`${tag} 없애기`}</span>
                                </button>
                            </div>)
                        }
                    </li>
                )
            })}
        </ul>
    );
};

export default Tags;