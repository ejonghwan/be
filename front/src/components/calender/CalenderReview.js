import React, { Fragment, useState, memo, useCallback, useEffect, useRef } from 'react'
import { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import WriteListItem from '../write/WriteListItem';
import NoData from '../common/notData/NoData';
import { PiSmileyXEyesDuotone } from "react-icons/pi";
import { changeViewDate } from '../../utils/utils';
import Button from '../common/form/Button';




const CalenderReview = ({ project, prevDay, nextDay, onDateClick, currentMonth, slideState, className = '' }) => {

    /* 
        다음에 보면 까먹을까봐 정리
        currentMonth 가 현재 날짜 
        onDateClick 은 달력 클릭 할때 발생하는 이벤트

        현재날짜가 변경될 때 온클릭에서 데이+-1을 해주고 
        슬라이드 변경시킴.
        스와이프가 이전으로 넘기면-  다음으로 넘기면+ 해줌

        이 컴포넌트에선
        1. 이번달의 총 날짜를  setEndDay 에 셋팅
        2. 이번달 날짜들의 버츄얼 슬라이드를 사용하기 위해 setVirtualEndNum에 이번 달 총 날짜(endDay)를 배열로 셋팅해둠. 
        3. 그 배열을 스와이프에 적용. 
        4. 달력 클릭 시에도 스와이프 되기 위해 ref 이용해서 slideTo로 이동 시킴
        5. 다음 달인 날짜를 클릭하면 월이 넘어가게 캘린더 헤더의 월함수, 년함수 와 연결
      
   
    */

    const dswiper = useRef(null);
    const monthStart = startOfMonth(currentMonth); //이달의 시작 9/1
    const monthEnd = endOfMonth(monthStart); //이달의 끝 9/30

    const [touch, setTouch] = useState(false);
    const [endDay, setEndDay] = useState(new Date(monthEnd).getDate() + 1)
    const [virtualEndNum, setVirtualEndNum] = useState([]);


    const handleCalcTime = useCallback(date => {
        const year = new Date(date).getFullYear();
        const month = new Date(date).getMonth() + 1;
        const day = new Date(date).getDate();
        return `${year} ${month} ${day}`;
    }, [])

    useEffect(() => {
        dswiper.current.swiper.slideTo(new Date(currentMonth).getDate() - 1)
    }, [onDateClick])

    useEffect(() => {
        setVirtualEndNum(() => Array.from({ length: endDay }).map((el, index) => {
            // 이번달의 마지막 넘버를 구해서 버츄얼 슬라이드에 적용할 배열 생성
            return project?.writes;
        }))
        setEndDay(new Date(monthEnd).getDate())
    }, [endDay, onDateClick]) // 변경될때마다 엔드데이 재셋팅

    // 현재날짜를 달력에서 클릭 했을 때 이 날짜로 이동
    useEffect(() => {
        onDateClick(currentMonth, )
    }, [currentMonth])


   

    return (
        <article className={`write_auth_wrap ${className}`}>

                <Swiper
                    ref={dswiper}
                    centeredSlides={true}
                    freeMode={true}
                    autoHeight={false}
                    modules={[Virtual, Navigation]} 
                    spaceBetween={0} 
                    slidesPerView={1} 
                    virtual
                    touchRatio={.5}
                    initialSlide={new Date(currentMonth).getDate()}
                    navigation={{
                        prevEl: '.dprev',
                        nextEl: '.dnext',
                    }}
                    onTouchMove={swiper => setTouch(true)}
                    onTouchEnd={swiper => setTouch(false)}
                    // className="mySwiper"
                    onSlideChange={(swiper) => {
                        if(swiper.activeIndex > swiper.previousIndex && touch) nextDay();
                        if(swiper.activeIndex < swiper.previousIndex && touch) prevDay();
                    }}
                    onSwiper={(swiper) => {
                        swiper.previousIndex = 500
                    }}
                >

                    {virtualEndNum.map((item, idx) => {

                        return (
                            <SwiperSlide key={idx} virtualIndex={idx}>
                                
                                <WriteListItem 
                                    writes={
                                        item?.filter(write => 
                                            handleCalcTime(write.createdAt) === handleCalcTime(currentMonth)).reverse()
                                    } 
                                />

                                {/* 인증글 없을 때 */}
                                {project.writes?.filter(write => 
                                    handleCalcTime(write.createdAt) === handleCalcTime(currentMonth)).length === 0 && 
                                    <NoData 
                                        icon={<PiSmileyXEyesDuotone />} 
                                        title={'오늘은 인증글이 없습니다.'} 
                                        subText={'인증글을 남겨주세요.'} 
                                    />
                                }
    
                            </SwiperSlide>
                        )
                    })}
            </Swiper>
                    
            <div className='write_auth_btn_wrap'>
                <strong className='review_title'>{changeViewDate(currentMonth)}</strong>
                <Button type={'button'} className='button_type_arrow_l button_reset dprev hover_type2' onClick={prevDay}>
                    <span className='blind'>어제 보기</span>
                </Button>
                <Button type={'button'} className='button_type_arrow_r button_reset dnext hover_type2' onClick={nextDay}>
                    <span className='blind'>다음날 보기</span>
                </Button>
            </div>
        </article>
    )
}

export default memo(CalenderReview);