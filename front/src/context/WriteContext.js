import { useReducer, createContext } from 'react';
import { WriteIntialState, WriteReducer } from '../reducers/index.js';


export const WriteContext = createContext(null);

export const WriteProvider = ({ children }) => {
    const [ WriteState, WriteDispatch ] = useReducer(WriteReducer, WriteIntialState) 
    return (
        <WriteContext.Provider value={{ WriteState, WriteDispatch }}>
            {children}
        </WriteContext.Provider>
    );
};

