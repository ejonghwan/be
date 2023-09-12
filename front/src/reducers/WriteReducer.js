export const WriteIntialState = {
    successMessage: '',
    errorMessage: '',
    loading: false,
    createWrites: {},
    writes: {},
}


const WriteReducer = (state = WriteIntialState, action) => {
    switch(action.type) {
            case "WRITE_REQUEST" : 
                return {
                    ...state,
                    loading: true,
                }

            case "ERROR_LOADING_CLEAR" : 
                return {
                    ...state,
                    loading: false,
                    successMessage: '',
                    errorMessage: '',
                }

            
            case "WRITE_CREATE_SUCCESS": 
                // action  {type: "", data: ...} 
                return {
                    ...state,
                    loading: false,
                    writes: action.data,
                }

            case "WRITE_CREATE_FAILUE" : 
                return {
                    ...state,
                    loading: false,
                    errorMessage: action.data,
                }



            default: return { state }
    }
}

export default WriteReducer;