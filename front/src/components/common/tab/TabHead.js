import { useRef, useCallback } from "react";

const TabHead = ({ heads, setIndex, Index, onClick }) => {

    const tabHeaderRef = useRef(null);
    const handleTabClick = useCallback(idx => e => setIndex(idx), [setIndex])

    return (
        <ul className="tab_header" role="tablist" ref={tabHeaderRef}>
            {heads.map((item, idx) => (
                <li id={`tab_type1_${idx}`} role="tab" aria-controls={`tab_type1_con_${idx}`} aria-selected={`${ Index === idx && true }`} className={`tab_header_item ${ Index === idx && 'active' }`} onClick={handleTabClick(idx)} key={idx} >
                    <button type="button" onClick={() => onClick(idx)}>{item}</button>
                </li>
            ))}
        </ul>
)
}

export default TabHead;