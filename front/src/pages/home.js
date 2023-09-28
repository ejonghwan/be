import { Fragment, useContext } from 'react';
import { UserContext } from '../context/UserContext.js';
// import { Calender } from '../components/calender/Calender.js'
import ProjectItems from '../components/project/ProjectItems.js';
import CreateProject from '../components/project/CreateProject.js';
import './home.css';

const Home = ({ page }) => {

    const { state } = useContext(UserContext);
    console.log('home?', state.user?.projects)
    
    return (
        <Fragment>
            <h2><span className='blind'>{page}</span></h2>
            <div className='b_conts full bg_gray'>
                <div className='b_conts'>
                    <ul className='project_items_wrap'>
                        {state.user?.projects?.map(project => (
                            <li key={project._id} className='project_items'>
                                <ProjectItems project={project} isRequestUser={true}/>
                            </li>
                        ))}
                        <li><CreateProject /></li>
                    </ul>
                    {/* <Calender /> */}
                    각 플젝마다 잔디밭 넣기

                    <h3>인기 있는 습관</h3>
                    디비에서 좋아요 표시 많은거 뽑아서 습관 목록

                    <h3>달력 일자로 ? </h3>
                </div>
            </div>

            <div className='b_conts'>
                asdasdasd
            </div>
        </Fragment>
     
            
          
    
    );
};

export default Home;
