import { useReducer, createContext } from 'react';
import { ProjectIntialState, ProjectReducer } from '../reducers/index.js';


export const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
    const [ ProjectState, ProjectDispatch ] = useReducer(ProjectReducer, ProjectIntialState);
    return (
        <ProjectContext.Provider value={{ ProjectState, ProjectDispatch }}>
            {children}
        </ProjectContext.Provider>
    );
};

