import { useReducer, createContext } from 'react';
import { CommentIntialState, CommentReducer } from '../reducers/index.js';


export const CommentContext = createContext(null);

export const CommentProvider = ({ children }) => {
    const [ CommentState, CommentDispatch ] = useReducer(CommentReducer, CommentIntialState);
    return (
        <CommentContext.Provider value={{ CommentState, CommentDispatch }}>
            {children}
        </CommentContext.Provider>
    );
};

