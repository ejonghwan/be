import React, { Fragment, memo } from 'react'


const CalenderReview = ({ date, project, originDate }) => {

    // console.log('review?', project)
    // console.log('review date?', date, project.writes[0].createdAt)
    // console.log('match??', date , new Date(project.writes[0].createdAt))


    const handleCalcTime = date => {
        const year = new Date(date).getFullYear();
        const month = new Date(date).getMonth() + 1;
        const day = new Date(date).getDay();
        return `${year} ${month} ${day}`
    }


    return (
        <Fragment>
            <br /><br />
            dateNumber: {date} - <br />
            캘린더 리뷰어페이지


            
            {project.writes
                ?.filter(write => handleCalcTime(write.createdAt) === handleCalcTime(originDate))
                .map(write => (
                    <div key={write._id}>
                        {write.title}
                    </div>
                ))
            }
        {project.writes?.filter(write => handleCalcTime(write.createdAt) === handleCalcTime(originDate)).length === 0 && '인증글이 없습니다'}
        
        </Fragment>
    )
}

export default memo(CalenderReview);