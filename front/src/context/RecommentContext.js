import { useReducer, createContext } from 'react';
import { RecommentIntialState, RecommentReducer } from '../reducers/index.js';


export const RecommentContext = createContext(null);

export const RecommentProvider = ({ children }) => {
    const [ RecommentState, RecommentDispatch ] = useReducer(RecommentReducer, RecommentIntialState);
    return (
        <RecommentContext.Provider value={{ RecommentState, RecommentDispatch }}>
            {children}
        </RecommentContext.Provider>
    );
};

