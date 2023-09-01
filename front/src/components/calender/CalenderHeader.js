
import React, { useState, useEffect, useRef, memo } from 'react';
import { format } from 'date-fns';

import { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '../common/form/Button';


const CalenderHeader = props => {

    const { currentMonth, prevMonth, nextMonth, prevYears, nextYears, y, m, slideState } = props;
    // 스와이프 이벤트 정리 
    // https://velog.io/@rhtjdrhkd123/20220516-swiper-events-%EC%A0%95%EB%A6%AC
    const mswiper = useRef(null);
    const yswiper = useRef(null);
    const [touch, setTouch] = useState(false);

    
    const yy = Array.from({ length: 100 }).map((el, index) => {
        return Math.abs(index + 1972);
    }
      );
    const mm = Array.from({ length: 12 }).map((el, index) => {
        return index;
    });


    useEffect(() => {
        mswiper.current.swiper.slideTo(m - 1);
        yswiper.current.swiper.slideTo(Math.abs(y - 1972));
    }, [slideState, currentMonth])
  


    return (
        <div className="header row">
            {/* <div className="col col-start">
                <span className="text">
                    {format(currentMonth, 'yyyy')} <span className="text month">{format(currentMonth, 'M')}월</span>
                </span>
            </div> */}
            <div className="col col-end">
                <div className="yy">
                    <Swiper ref={yswiper}
                        // direction={"vertical"}
                        modules={[Virtual, Navigation]} 
                        spaceBetween={0} 
                        slidesPerView={3} 
                        centeredSlides={true}
                        virtual
                        autoHeight={false}
                        freeMode={true}
                        initialSlide={50}
                        navigation={{
                            prevEl: '.yprev',
                            nextEl: '.ynext',
                        }}
                        onTouchMove={swiper => setTouch(true)}
                        onTouchEnd={swiper => setTouch(false)}
                        
                        // className="mySwiper"
                        onSlideChange={(swiper) => {
                            // console.log('y', swiper.activeIndex + 1972)
                            setTimeout(() => {
                                if(swiper.activeIndex > swiper.previousIndex && touch) nextYears();
                                if(swiper.activeIndex < swiper.previousIndex && touch) prevYears();
                            }, 0);
                        }}
                        onSwiper={(swiper) => swiper.previousIndex = 50}
                    >
                        {yy.map((item, index) => {
                            return (
                                <SwiperSlide key={item} virtualIndex={index}>
                                    {item}년
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <Button type={'button'} className='button_type_arrow_l button_reset yprev hover_type2' onClick={prevYears}>
                        <span className='blind'>이전 년도 보기</span>
                    </Button>
                    <Button type={'button'} className='button_type_arrow_r button_reset ynext hover_type2' onClick={nextYears}>
                        <span className='blind'>다음 년도 보기</span>
                    </Button>
                </div>

                <div className="mm">
                    <Swiper ref={mswiper}
                        // direction={"vertical"}
                        modules={[Virtual, Navigation]} 
                        spaceBetween={0} 
                        slidesPerView={3} 
                        centeredSlides={true}
                        virtual
                        autoHeight={false}
                        freeMode={true}
                        initialSlide={format(currentMonth, 'M')}
                        navigation={{
                            prevEl: '.mprev',
                            nextEl: '.mnext',
                        }}
                        // className="mySwiper"
                        onTouchMove={swiper => setTouch(true)}
                        onTouchEnd={swiper => setTouch(false)}
                        onSlideChange={(swiper) => {
                            setTimeout(() => {
                                if(swiper.activeIndex > swiper.previousIndex && touch) nextMonth();
                                if(swiper.activeIndex < swiper.previousIndex && touch) prevMonth();
                            }, 0);
                        }}
                        onSwiper={(swiper) => swiper.previousIndex = format(currentMonth, 'M') }
                    >
                        {mm.map((item, index) => {
                            return (
                                <SwiperSlide key={item} virtualIndex={index}>
                                    {index + 1}월
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <Button type={'button'} className='button_type_arrow_l button_reset mprev hover_type2' onClick={prevMonth}>
                        <span className='blind'>이전 월 보기</span>
                    </Button>
                    <Button type={'button'} className='button_type_arrow_r button_reset mnext hover_type2' onClick={nextMonth}>
                        <span className='blind'>다음 월 보기</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default memo(CalenderHeader);
