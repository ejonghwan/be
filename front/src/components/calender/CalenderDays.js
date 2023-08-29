import { memo, useMemo } from 'react';

const CalenderDays = () => {
    const days = [];
    const date = useMemo(() => {
        return ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat']
        // return ['일', '월', '화', '수', '목', '금', '토']
    }, [])

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className="days row">{days}</div>;
};


export default memo(CalenderDays);