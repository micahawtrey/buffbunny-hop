import {
    FETCH_GYM_PICTURES_FAILURE,
    FETCH_GYM_PICTURES_REQUEST,
    FETCH_GYM_PICTURES_SUCCESS
} from './gymPicActions'

const initialState = {
    pictures: [],
    loading: false,
    error: null,
};

export const gymPicturesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GYM_PICTURES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_GYM_PICTURES_SUCCESS:
            return {
                ...state,
                pictures: action.payload,
                loading: false,
            };
        case FETCH_GYM_PICTURES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};


export default gymPicturesReducer;
