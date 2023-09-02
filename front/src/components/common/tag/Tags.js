import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { PiLinkBreakDuotone } from "react-icons/pi";
import NoData from '../notData/NoData';
import './Tags.css';


// to 링크는 나중에 태그 누르면 검색페이지로 가게 할때 작업
const Tags = ({ className = '', tags = [], isLink = false, handleDelete }) => {
    return (
        <Fragment>
            {tags.length === 0 && <NoData icon={<PiLinkBreakDuotone />} title={"카테고리가 등록되지 않았습니다."} />}
            <ul className={`tag_wrap ${className}`}>
                {tags.length > 0 && tags.map((tag, idx) => {
                    return (
                        <li key={idx}>
                            {isLink ? 
                                <Link to={`/${tag.categoryName}`}>{`# ${tag.categoryName}`}</Link> 
                                : 
                                (<div className='no_link'>
                                    {tag.categoryName}
                                    <button type="button" className='button_reset button_delete' onClick={() => handleDelete(tag)}>
                                        <span className='blind'>{`${tag} 없애기`}</span>
                                    </button>
                                </div>)
                            }
                        </li>
                    )
                })}
            </ul>
        </Fragment>
    );
};

export default Tags;