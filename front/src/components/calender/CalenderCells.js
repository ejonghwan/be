
import React, { useState, useEffect, Fragment } from 'react';
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

    // console.log('this', monthStart)
    // console.log('addDays', addDays(new Date(), 3))

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    let testc = ["2022, 10, 15", "2022, 10, 16", "2022, 10, 15", "2022, 10, 16", "2022, 11, 15", "2022, 11, 16", "2022, 11, 17", "2022, 11, 18", "2022, 11, 19", "2022, 11, 20", "2022, 11, 21", "2022, 11, 22", ]

    // console.log(day) //렌더링 3번씩 됨?  이거 해결해야됨.. 아마 3개로 나눈거 한쪽 변화하면 다 다시 렌더링 되는듯
    while (day <= endDate) {
   
        // console.log('day', day, '#######', 'endDate', endDate)
        // 하루 > 엔드데이를 각 주마다 7번쨰 돌게끔
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            // console.log('parse c????????', parse('50', 'yy',cloneDay))
            /*
                testc
                221115 아직 작업안함 (프론트 할떄 해야됨)
                ${isSameDay(day, new Date("2022-11-15")) ? `hehehehe` : ``} 
                이부분 나중에 데이터 들어오면 수정해야됨.
                1. back에서 날짜 데이터 배열로 주면 
                2. 해당되는 날짜에 특정 클래스를 주고 
                3. 특정 클래스는 스타트와 엔드를 구분해서 
                4. 시작과 끝엔 라운드 처리와 
                5. 며칠 연속으로 했는지 계산해서 목표달성했는지 체크   
            */
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart) ? 'disabled' : isSameDay(day, selectedDate)
                            ? 'selected' : format(currentMonth, 'M') !== format(day, 'M')
                            ? 'not-valid'
                            : 'valid'} 
                            ${isSameDay(day, new Date()) ? `today` : ``}
                            ${testc.map(item => {
                                // console.log('d?: ',  isSameDay(day, new Date("2022, 11, 16")))
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
            // testc.map(item => {
            //     return isSameDay(day, Date.now(item)) ? `hehehehe` : ``
            // })
            day = addDays(day, 1); //day 하루씩 늘림 와일문 조건
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>
        );
        days = [];
    }

    return (<div className="body">{rows}</div>);
};



export default CalenderCells;

