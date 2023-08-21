import { useState } from 'react';
import './Accordion.css';

const Accordion = ({ data, className, device }) => {
    const [Index, setIndex] = useState(null);
    const handleClick = idx => e => idx === Index ? setIndex(null) : setIndex(idx);

    return (
        <div className={`${className} ${device}`}>
            {data.map((item, idx) => {
                return (
                    <div key={idx} className='aco_wrap'>
                         <button type="button" id={`footer_secall_menu_accoBody_${idx}`} aria-controls={`footer_secall_menu_accoHead_${idx}`} aria-expanded={`${idx === Index && !data.done ? true : false}`} className={`acco_head ${idx === Index && !data.done ? 'on' : ''}`} onClick={handleClick(idx)}>
                            {item.header}
                         </button>
                         <div id={`footer_secall_menu_accoHead_${idx}`} aria-labelledby={`footer_secall_menu_accoBody_${idx}`} className={`acco_body ${idx === Index && !data.done && 'on'}`}>
                            {item.body}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Accordion;