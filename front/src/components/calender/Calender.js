import React, { useState, Fragment, useRef } from 'react';
import { format, addMonths, subMonths, addYears, subYears } from 'date-fns';
// import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { addDays, subDays } from 'date-fns';
import { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import CalenderHeader from './CalenderHeader.js';
import CalenderDays from './CalenderDays.js';
import CalenderCells from './CalenderCells.js';
import CalenderReview from './CalenderReview.js';
import './Calender.css'



const Calender = ({ project }) => {
    // console.log('format', format(hoho, 'M')) //지금시간에서 특정 추출해주는거 
    // console.log('addMonths', addMonths(hoho, 3))  //지금부터 다음달 다다음달 
    // console.log('subMonths', subMonths(hoho, 2))  //지금부터 이전달 이이전달 
    // console.log('startOfMonth', startOfMonth(hoho))  //시작일
    // console.log('endOfMonth', endOfMonth(startOfMonth(hoho)))  //끝일
    // console.log('startOfWeek', startOfWeek(startOfMonth(hoho)))  //new Date 넣으면 그 주의 시작, startmonth 넣으면 이전 월 구분없이 시작값
    // console.log('endOfWeek', endOfWeek(endOfMonth(hoho)))  //new Date 넣으면 그 주의 끝, endmonth 넣으면 이전 월 구분없이 끝값
    // console.log('isSameMonth', isSameMonth( startOfWeek(startOfMonth(hoho)), startOfMonth(hoho) ))  //리턴값은 날짜전부이고 첫번째 값이 두번째 값에 속해있는지 불린값으로 반환
    // addDays() //addDays(지금날짜, 1) 지금날짜로부터 두번쨰 인자만큼 지난 날짜 반환 
    // const hehe = parse('50', 'yy', new Date())
    // console.dir('fnspasse?????', hehe, parse('50', 'yy', new Date(2018, 0, 1)))


    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [slideState, setSlideState] = useState(false);
    const calenderSwiper = useRef(null);

    const prevYears = () => setCurrentMonth(subYears(currentMonth, 1));
    const nextYears = () => setCurrentMonth(addYears(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevDay = () => setCurrentMonth(subDays(currentMonth, 1));
    const nextDay = () => setCurrentMonth(addDays(currentMonth, 1));

    const onDateClick = (day) => {
        if(format(day, 'M') < format(currentMonth, 'M')) prevMonth();  
        if(format(day, 'M') > format(currentMonth, 'M')) nextMonth();
        setSelectedDate(day);
        setCurrentMonth(day);
    }

    
    const slides = Array.from({ length: 1000 }).map(
        (el, index) => `${index + 1}` 
      );


    return (
        <Fragment>
            <article className="calendar">
                <CalenderHeader
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                    prevYears={prevYears}
                    nextYears={nextYears}
                    m={format(currentMonth, 'M')}
                    y={format(currentMonth, 'yyyy')}
                    slideState={slideState}
                />
                <CalenderDays />
                <Swiper ref={calenderSwiper}
                    modules={[Virtual, Navigation]} 
                    spaceBetween={0} 
                    slidesPerView={1} 
                    virtual
                    // touchRatio={.3}
                    initialSlide={500}
                    navigation={{
                        prevEl: '.mprev',
                        nextEl: '.mnext',
                    }}
                    // className="mySwiper"
                    onSlideChange={(swiper) => {
                       
                        setTimeout(() => {
                            if(swiper.activeIndex > swiper.previousIndex) nextMonth();
                            if(swiper.activeIndex < swiper.previousIndex) prevMonth();
                            setSlideState(!slideState)
                        }, 0);
                    }}
                    onSwiper={(swiper) => {
                        swiper.previousIndex = 500
                    }}
                >
                    {slides.map((item, index) => {
                        return (
                            <SwiperSlide key={item} virtualIndex={index}>
                                <CalenderCells
                                    currentMonth={currentMonth}
                                    selectedDate={selectedDate}
                                    onDateClick={onDateClick}
                                    project={project}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </article>

            <CalenderReview 
                currentMonth={currentMonth}
                project={project} 
                prevDay={prevDay}
                nextDay={nextDay}
                onDateClick={onDateClick}
                slideState={slideState}
                className={'review'}
            />
                 
        </Fragment>
    );
};

export default Calender;