import { Fragment } from 'react';
import './ViewDate.css';


const ViewDate = ({ className = '', dates = []  }) => {
    return (
        <article className={`view_date_wrap ${className}`}>
           {dates.map((date, idx) => (
            <div key={idx} className='view_date_item'>
                {date.icon && <span className="view_date_icon">{date.icon}</span>} 
                {date.txt && <span className="view_date_txt">{date.txt}</span>}
                <span className="view_date">{date.date}</span>
            </div>
           ))}
        </article>
    );
};

export default ViewDate;