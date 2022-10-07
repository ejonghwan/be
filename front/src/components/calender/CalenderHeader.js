
import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';

import { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


const CalenderHeader = ({ currentMonth, prevMonth, nextMonth, prevYears, nextYears, y, m }) => {

    // const [mSwiper, setMSwiper] = useState(null)
    const mswiper = useRef(null);
    const yswiper = useRef(null);
    
    const yy = Array.from({ length: 100 }).map((el, index) => {
        return Math.abs(index + 1972);
    }
      );
    const mm = Array.from({ length: 13 }).map((el, index) => {
        return index;
    });


    const handleMonthSlide = () => {
        console.log('m', Number(m));
        mswiper.current.swiper.slideTo(m);
    }

    // useEffect(() => {
    //     handleMonthSlide();
    // }, [m])
    useEffect(() => {
        // console.log('y', y);
        // if(y) { yswiper.current.swiper.slideTo( Math.abs(y - 1972) ); };
        // console.log(yswiper.current.swiper.activeIndex)
    }, [y])


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
                        // className="mySwiper"
                        onSlideChange={(swiper) => {

                            // console.log('y', swiper.activeIndex + 1972)
                            setTimeout(() => {
                                if(swiper.activeIndex > swiper.previousIndex) nextYears();
                                if(swiper.activeIndex < swiper.previousIndex) prevYears();
                                
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
                        onSlideChange={(swiper) => {
                            // console.log('m', swiper.activeIndex)
                            // console.log(swiper.previousIndex)
                            setTimeout(() => {
                                console.log(111)
                                if(swiper.activeIndex > swiper.previousIndex) nextMonth();
                                if(swiper.activeIndex < swiper.previousIndex) prevMonth();
                                mswiper.current.swiper.slideTo(m) //???????dhodkjseho
                            }, 0);
                        }}
                        onSwiper={(swiper) => swiper.previousIndex = format(currentMonth, 'M') }
                    >
                        {mm.map((item, index) => {
                            return (
                                <SwiperSlide key={item} virtualIndex={index}>
                                    {item}
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
