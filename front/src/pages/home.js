

import ImageUploadForm from '../components/image/ImageUploadForm.js'
import { Calender } from '../components/calender/Calender.js'
import Project from '../components/project/Project.js';
import './home.css';
import { Fragment } from 'react';

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
            <br />
            <ImageUploadForm />
            <br />
            <Calender />
        </Fragment>
    );
};

export default Home;
