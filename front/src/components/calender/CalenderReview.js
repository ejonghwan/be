import React, { Fragment, memo, useCallback, useEffect } from 'react'
import { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import WriteListItem from '../write/WriteListItem';
import NoData from '../common/notData/NoData';
import { PiSmileyXEyesDuotone } from "react-icons/pi";



const CalenderReview = ({ date, project, originDate, prevDay, nextDay, onDateClick, currentMonth }) => {

    // console.log('rev?', project)


    const handleCalcTime = useCallback(date => {
        const year = new Date(date).getFullYear();
        const month = new Date(date).getMonth() + 1;
        const day = new Date(date).getDate();
        return `${year} ${month} ${day}`;
    }, [])

    const dd = Array.from({ length: 1000 }).map((el, index) => {
        return index;
    });

    
    useEffect(() => {
        // console.log('??', new Date(date), 'aaa', currentMonth)
      
        
        window.addEventListener('click', () => {
        
            // nextDay()
            // onDateClick(new Date(currentMonth))
            
        })
    }, [])

    



    return (
        <article>

                <Swiper
                    modules={[Virtual, Navigation]} 
                    spaceBetween={0} 
                    slidesPerView={1} 
                    virtual
                    touchRatio={.5}
                    initialSlide={500}
                    navigation={{
                        // prevEl: '.mprev',
                        // nextEl: '.mnext',
                    }}
                    // className="mySwiper"
                    onSlideChange={(swiper) => {
                        
                        setTimeout(() => {
                            if(swiper.activeIndex > swiper.previousIndex) nextDay();
                            if(swiper.activeIndex < swiper.previousIndex) prevDay();
                            console.log('??', new Date(date), 'aaa', currentMonth)
                            // onDateClick(new Date(currentMonth))
                        }, 0);
                    }}
                    onSwiper={(swiper) => {
                        swiper.previousIndex = 500
                    }}
                >

                    {dd.map((item, index) => {
                        return (
                            <SwiperSlide key={item} virtualIndex={index}>
                                {/* {console.log('item??', item)} */}
                                <strong className='review_title'>{date}</strong>
                                <WriteListItem 
                                    writes={
                                        project.writes?.filter(write => 
                                            handleCalcTime(write.createdAt) === handleCalcTime(originDate)).reverse()
                                    } 
                                />

                                {/* 인증글 없을 때 */}
                                {project.writes?.filter(write => 
                                    handleCalcTime(write.createdAt) === handleCalcTime(originDate)).length === 0 && 
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
        </article>
    )
}

export default memo(CalenderReview);