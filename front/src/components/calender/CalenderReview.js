import React, { Fragment, memo } from 'react'


const CalenderReview = ({ date }) => {


    return (
        <Fragment>
            <br /><br />
            dateNumber: {date}
            캘린더 리뷰어페이지
        </Fragment>
    )
}

export default memo(CalenderReview);