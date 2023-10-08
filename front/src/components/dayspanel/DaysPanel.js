import { useEffect, useMemo, memo, useRef, Fragment } from 'react';
import { format } from 'date-fns';
import './DaysPanel.css';



const DaysPanel = ({ className = '', userDays = [] }) => {

    const calcDays = () => {
        const daysArr = [];
        
        //날짜를 넣기전 52주의 2차원 배열 생성
        for (let i = 0; i < 52; i++) {
          daysArr.push([]);
          for (let j = 0; j < 7; j++) {
            daysArr[i].push({date: null});
          };
        };
        
        let dayNum = 0;
        let week = 51;
        
        //시간을 제외한 오늘 날짜
        const today = new Date(new Date().setHours(new Date().getHours() + 9)).toISOString().substr(0, 10);
        const todayStr = String(today);
        
        //날짜 넣기
        while (week !== -1) {
          //? 요일 구하기
          const dayOfDate = new Date(new Date(todayStr).setDate(new Date(todayStr).getDate() - dayNum)).getDay();
          //0~6은 일~토를 가리키는 것을 이용해 할당
          daysArr[week][dayOfDate].date = new Date(new Date(todayStr).setDate(new Date(todayStr).getDate() - dayNum)).toISOString().substr(0, 10);
          if (dayOfDate === 0) {
            week -= 1;
          }
          dayNum += 1;
        };
        return daysArr;
      };

    const daysValue = useMemo(() => calcDays(), []);
    const panelDataRef = useRef(daysValue); 
    const overviewwrapRef= useRef(null);

    useEffect(() => {
      const { current } = overviewwrapRef;
      current.scrollTo(current.clientWidth, 0)
    }, [])

    return (
        <div className={`overview_wrap ${className}`} ref={overviewwrapRef}>
         
            {panelDataRef.current?.map((day, idx) => (
                <div key={idx} className='week'>
                    {day.map((panelDay, idx) => (
                        <span 
                            className={`day ${userDays.map(userDay => userDay.count >= 0 && format(new Date(userDay.date), 'yyyy/MM/dd') === format(new Date(panelDay.date), 'yyyy/MM/dd') ? `active lv_${userDay.count}` : null ).join(' ')}`} 
                            key={idx}
                            title={panelDay.date}
                          >
                            {/* <span className='hover_date'>{format(new Date(panelDay.date), 'yy.M.dd')}</span> */}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default memo(DaysPanel);