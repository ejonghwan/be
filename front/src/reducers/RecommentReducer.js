export const RecommentIntialState = {
    Recomments: [],
}


const RecommentReducer = (state = RecommentIntialState, action) => {
    switch(action.type) {

        case "Recomment_LOAD_REQUEST": 
            return {
                ...state,
                Recomments: [...state.Recomments].concat(action.data),
            }

        case "Recomment_UPLOAD_REQUEST": 
            return {
                ...state,
                Recomments: [...state.Recomments].concat(action.data),
            }

        default: 
            return {
                ...state
            }
    }
}



export default RecommentReducer;