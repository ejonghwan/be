import React from 'react';
import Input from '../common/form/Input';

const Project = ({ type }) => {
    return (
        <div>
            {type === 'create' && (
                <div>
                    프로젝트 생성
                    <button>+</button>
                </div>
            )}
        </div>
    );
};

export default Project;