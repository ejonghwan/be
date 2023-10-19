import { Fragment, useContext } from 'react';
import { UserContext } from '../../context/UserContext.js';
import ProjectItemsHorizon from '../../components/project/ProjectItemsHorizon.js';
import { PiFolderDashedDuotone } from "react-icons/pi";
import { Link } from 'react-router-dom';
import CompleteMsg from '../../components/common/complete/CompleteMsg.js';
import HeadMetaTag from '../../components/common/HeadMetaTag.js';

const MyLikeProject = ({ page }) => {

    const { state } = useContext(UserContext);
    
    

    return (
        <Fragment>
            <HeadMetaTag title={`HOBBYIST. 습관 만들기 | ${page}`} />
            <div className='b_conts'>
                <h2 className='gap_0'>{page}</h2>
            </div>
            <div className='b_conts full bg_gray h_100'>
                <div className='b_conts pd_0'>
                    <ul className='project_items_hor'>
                        {state.user?.likeProject?.map(project => (
                            <li key={project._id} className='project_items'>
                                <ProjectItemsHorizon project={project} isRequestUser={true}/>
                            </li>
                        ))}
                    </ul>
                    {state.user?.likeProject.length === 0 && (
                            <div className='align_c'>
                            <CompleteMsg 
                                icon={<PiFolderDashedDuotone />}
                                title={'내가 좋아요한 습관이 없습니다.'}
                                subText={'다른 습관을 좋아해보세요.'}
                            />
                            <Link to="/project/list/likes" className='button_type7 gapt_10'>다른 습관 보러가기</Link>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default MyLikeProject;
