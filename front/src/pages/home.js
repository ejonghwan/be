import { Fragment } from 'react';
// import { Calender } from '../components/calender/Calender.js'
import Project from '../components/project/Project.js';
import './home.css';

const Home = () => {


    return (
        <Fragment>
            <ul className='project_wrap'>
                {Array(4).fill().map((project, idx) => {
                    return (
                        <li key={idx}><Project /></li>
                    )
                })}
            </ul>
            {/* <Calender /> */}
        </Fragment>
    );
};

export default Home;
