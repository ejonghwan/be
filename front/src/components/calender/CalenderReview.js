import React, { Fragment, memo } from 'react'


const CalenderReview = ({ date, originDate, project }) => {

    console.log('review?', project)

    console.log('review date?', date, project.writes[0].createdAt)

    console.log('match??', date , new Date(project.writes[0].createdAt))
    // const writes = () => {
    //     console.log(project.writes)
    // }

    return (
        <Fragment>
            <br /><br />
            dateNumber: {date} - {originDate}<br />
            캘린더 리뷰어페이지
        </Fragment>
    )
}

export default memo(CalenderReview);