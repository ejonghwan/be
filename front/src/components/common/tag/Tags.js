import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { PiLinkBreakDuotone } from "react-icons/pi";
import NoData from '../notData/NoData';
import './Tags.css';


const Tags = ({ className = '', tags = [], isLink = false, handleDelete, contentName = '카테고리',  isNoData = true }) => {
    return (
        <Fragment>
            {tags.length === 0 && isNoData && <NoData icon={<PiLinkBreakDuotone />} title={`${contentName}가 등록되지 않았습니다.`} />}
            <ul className={`tag_wrap ${className}`}>
                {tags.length > 0 && tags.map((tag, idx) => {
                    return (
                        <li key={idx}>
                            {isLink ? 
                                <Link to={`/search/tag/result/total/${tag.categoryName}`}>{`# ${tag.categoryName}`}</Link> 
                                : 
                                (<div className='no_link'>
                                    {tag}
                                    <button type="button" className='button_reset button_delete' onClick={e => handleDelete(e, tag)}>
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