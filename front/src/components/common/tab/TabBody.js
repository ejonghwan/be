import { memo } from 'react';


const TabBody = ({ children, Index }) => {
    return (
        <ul className="tab_body">
            {children.map((item, idx) => <li role="tabpanel" id={`tab_type1_con_${idx}`} aria-labelledby={`tab_type1_${idx}`} className={`tab_body_item ${ Index === idx && "active" }`} key={idx}>{ Index === idx && item}</li>)}
        </ul>
    )
}
export default memo(TabBody);