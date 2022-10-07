
import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';

import { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


const CalenderHeader = props => {

    const { currentMonth, prevMonth, nextMonth, prevYears, nextYears, y, m, slideState } = props;

    // 여기 밖은 마운트 되기 전
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
        // console.log('m', m);
        mswiper.current.swiper.slideTo(m - 1);
        yswiper.current.swiper.slideTo(Math.abs(y - 1972));
    }, [slideState])
  


    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    {format(currentMonth, 'yyyy')} <span className="text month">{format(currentMonth, 'M')}월</span>
                </span>
            </div>
            <div className="col col-end">
                {/* <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} /> */}
                {/* <button onClick={prevMonth}>prev</button> */}
                {/* <button onClick={nextMonth}>next</button> */}
                <div className="yy">
                    <Swiper ref={yswiper}
                        // direction={"vertical"}
                        modules={[Virtual, Navigation]} 
                        spaceBetween={0} 
                        slidesPerView={8} 
                        centeredSlides={true}
                        virtual
                        autoHeight={false}
                        freeMode={true}
                        initialSlide={50}
                        navigation={true}
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
                                    {item}
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>

                <div className="mm">
                    <Swiper ref={mswiper}
                        // direction={"vertical"}
                        modules={[Virtual, Navigation]} 
                        spaceBetween={0} 
                        slidesPerView={8} 
                        centeredSlides={true}
                        virtual
                        autoHeight={false}
                        freeMode={true}
                        initialSlide={format(currentMonth, 'M')}
                        navigation={true}
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
                                    {index + 1}
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default CalenderHeader
