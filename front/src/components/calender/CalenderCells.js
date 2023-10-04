
import { Fragment, memo } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';


// https://date-fns.org/v2.28.0/docs/subYears


const CalenderCells = ({ currentMonth, selectedDate, onDateClick, project }) => {

        const monthStart = startOfMonth(currentMonth); //이달의 시작 9/1
        const monthEnd = endOfMonth(monthStart); //이달의 끝 9/30
        const startDate = startOfWeek(monthStart); //달력의 시작 8/28
        const endDate = endOfWeek(monthEnd); //달력의 끝 10/1
    
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';
    

        while (day <= endDate) {
            // 하루 > 엔드데이를 각 주마다 7번쨰 돌게끔
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, 'd');
                const cloneDay = day;
                
                days.push(
                    <div
                        className={`col cell ${
                            !isSameMonth(day, monthStart) ? 'disabled' : isSameDay(day, selectedDate)
                                ? 'selected' : format(currentMonth, 'M') !== format(day, 'M')
                                ? 'not-valid' : 'valid'} ${project.constructorUser.days?.map(userDay => isSameDay(day, new Date(userDay.date.replaceAll('-', '/'))) && userDay.count >= 0 ? `constructor` : null).join('')} ${project.instanceUser?.map(user => user.days?.map((userDay, idx) => isSameDay(day, new Date(userDay.date.replaceAll('-', '/'))) && userDay.count >= 0 ? `constructor` : null).join(' ')).join(' ')} ${isSameDay(day, new Date()) ? `today` : ``}`}
                        key={day}
                        // onClick={() => onDateClick(parse(cloneDay))}
                        onClick={() => onDateClick(cloneDay, new Date(cloneDay))}
                        tabIndex="0"
                        // data-day={new Date(cloneDay)}
                    >
                        <span className={format(currentMonth, 'M') !== format(day, 'M') ? 'day text not-valid' : 'day'}>
                            {formattedDate}
                        </span>
                        <div className='day_cont'>
                            {/* 생성자 */}
                            {
                                project.constructorUser.days?.map((userDay, idx) => {
                                    return <Fragment key={idx}>
                                        { userDay.count >= 0 && isSameDay(day, new Date(userDay.date.replaceAll('-', '/'))) && (
                                            <div className='certified_wrap'>
                                                <div className='certified_img'>
                                                    <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${project.constructorUser._id.profileImage.key}`} alt="유저 프로파일" />
                                                </div>
                                                <span className='certified_name'>{project.constructorUser._id.name}</span>
                                            </div>
                                        )}
                                    </Fragment>
                                })
                            }
                            
                            {/* 참여유저 */}
                            {
                                project.instanceUser?.map(user => user.days?.map((userDay, idx) => (
                                    <Fragment key={idx}>
                                        {userDay.count >= 0 && isSameDay(day, new Date(userDay.date.replaceAll('-', '/'))) && (
                                            <div className='certified_wrap'>
                                                <div className='certified_img'>
                                                    <img src={`${process.env.REACT_APP_BACKEND_HOST}/uploads/${user._id.profileImage.key}`} alt="유저 프로파일" />
                                                </div>
                                                <span className='certified_name'>{user._id.id}</span>
                                            </div>
                                        )}
                                    </Fragment>
                                )))
                            }
                        </div>
                    </div>
                );
                day = addDays(day, 1); //day 하루씩 늘림 와일문 조건
            }
            rows.push(<div className="row" key={day}>{days}</div>);
            days = [];
        }

    return (
        <div className="body">{rows}</div>
    );
};



export default memo(CalenderCells);

