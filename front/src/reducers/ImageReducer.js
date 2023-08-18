export const ImageIntialState = {
    images: [],
}


const ImageReducer = (state = ImageIntialState, action) => {
    switch(action.type) {

        case "IMAGE_LOAD_REQUEST": 
            return {
                ...state,
                images: [...state.images].concat(action.data),
            }

        case "IMAGE_UPLOAD_REQUEST": 
            return {
                ...state,
                images: [...state.images].concat(action.data),
            }

        default: 
            return {
                ...state
            }
    }
}



export default ImageReducer;