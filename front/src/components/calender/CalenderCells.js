
import React, { useState, useEffect, Fragment, memo, useRef } from 'react';
// import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';


// https://date-fns.org/v2.28.0/docs/subYears


const CalenderCells = ({ currentMonth, selectedDate, onDateClick }) => {

        const monthStart = startOfMonth(currentMonth); //이달의 시작 9/1
        const monthEnd = endOfMonth(monthStart); //이달의 끝 9/30
        const startDate = startOfWeek(monthStart); //달력의 시작 8/28
        const endDate = endOfWeek(monthEnd); //달력의 끝 10/1
    
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';
        let testc = ["2023, 08, 07", "2023, 08, 08", "2022, 10, 15", "2022, 10, 16", "2022, 11, 15", "2022, 11, 16", "2022, 11, 17", "2022, 11, 18", "2022, 11, 19", "2022, 11, 20", "2022, 11, 21", "2022, 11, 22", ]
    

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
                                ? 'not-valid'
                                : 'valid'} 
                                ${isSameDay(day, new Date()) ? `today` : ``}
                                ${testc.map(item => {
                                    return isSameDay(day, new Date(item)) ?  `zzzzzzzzzzzzzzz` : ``;
                                }).join(' ')}
                            `}
                        key={day}
                        // onClick={() => onDateClick(parse(cloneDay))}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        <span
                            className={
                                format(currentMonth, 'M') !== format(day, 'M')
                                    ? 'text not-valid'
                                    : ''
                            }
                        >
                            {formattedDate}
                        </span>
                    </div>,
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

