import React, { useEffect } from 'react';

const Main = ({ children }) => {

    return (
        <main id="contents">
            <div className='b_conts'>
                {children}
            </div>
        </main>
    );
};

export default Main;