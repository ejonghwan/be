import React from 'react';

const ProjectItem = ({ type }) => {
    return (
        <div>
            {type === 'create' && (
                <div>
                    <button>+</button>
                </div>
            )}
        </div>
    );
};

export default ProjectItem;