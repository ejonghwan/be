import { useReducer, createContext } from 'react';
import { SearchIntialState, SearchReducer } from '../reducers/index.js';


export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
    const [ SearchState, SearchDispatch ] = useReducer(SearchReducer, SearchIntialState);
    return (
        <SearchContext.Provider value={{ SearchState, SearchDispatch }}>
            {children}
        </SearchContext.Provider>
    );
};

