import { Fragment, useContext } from 'react';
// import { Calender } from '../components/calender/Calender.js'
import Project from '../components/project/Project.js';
import { UserContext } from '../context/UserContext.js';
import './home.css';

const Home = () => {

    const { state } = useContext(UserContext);
    // console.log('home?', state.user.projects)

    return (
        <Fragment>
            <ul className='project_wrap'>
                {state.user.projects?.map(project => <li key={project._id}><Project data={project} /></li>)}
            </ul>
            {/* <Calender /> */}
        </Fragment>
    );
};

export default Home;
