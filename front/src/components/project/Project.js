import { Fragment } from 'react';
import './Project.css'



const Project = ({ data }) => {
    // console.log(data)
    return (
        <Fragment>
            <div>제목: {data?.title}</div>
            <div>소개: {data?.content}</div>
            <div>습관장: {data?.constructorUser.id}{data?.constructorUser.rank}</div>
            <div>{data?.categorys?.map(item => <div key={item._id}>{item.categoryName}</div> )}</div>
            <div>생성일: {data?.createdAt}</div>
            <div>수정일: {data?.updatedAt}</div>
            <div>참여유저: 
                {data?.instanceUser.length === 0 ? (
                    <div>참여유저가 없습니다.</div>
                ) : (
                    data?.instanceUser.map(item => <div>{item.id}</div>)
                )}
            </div>
            <div>신청한 유저: 
                {data?.instanceUser.length === 0 ? (
                    <div>참여유저가 없습니다.</div>
                ) : (
                    data?.instanceUser.map(item => <div>{item.id}</div>)
                )}
            </div>
            <div>프로젝트 공개: {data?.projectPublic ? (<div>공개</div>) : (<div>비공개</div>) }</div>
        </Fragment>
    );
};

export default Project;