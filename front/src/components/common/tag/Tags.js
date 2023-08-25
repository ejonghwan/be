import { Link } from 'react-router-dom';
import './Tags.css';

// to 링크는 나중에 태그 누르면 검색페이지로 가게 할때 작업
const Tags = ({ className = '', tags = [], isLink = false }) => {
    return (
        <ul className={`tag_wrap ${className}`}>
            {tags.map((tag, idx) => {
                return (
                    <li key={idx}>
                        {isLink ? <Link to={`/${tag.categoryName}`}>{`# ${tag.categoryName}`}</Link> : `# ${tag.categoryName}`}
                    </li>
                )
            })}
        </ul>
    );
};

export default Tags;