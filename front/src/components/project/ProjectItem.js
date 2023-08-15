import { Fragment } from 'react';
import './ProjectItem.css';

const ProjectItem = ({ type }) => {
    return (
        <Fragment>
            {type === 'create' && (
                <div className={type}>
                    <p>새 습관 만들기</p>
                    <button>+</button>
                </div>
            )}
        </Fragment>
    );
};

export default ProjectItem;