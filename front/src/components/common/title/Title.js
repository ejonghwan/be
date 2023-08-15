import React from 'react';

const Title = ({ children, id, className }) => {
    return (
        <strong id={id} className={className}>
            {children}
        </strong>
    );
};

export default Title;