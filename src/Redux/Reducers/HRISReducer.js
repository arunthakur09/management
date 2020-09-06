import {
    GET_HRIS_INIT,
    GET_HRIS_SUCCESS,
    GET_HRIS_ERROR,
  
    GET_HRIS_BY_ID_INIT,
    GET_HRIS_BY_ID_SUCCESS,
    GET_HRIS_BY_ID_ERROR,
  
    ADD_HRIS_INIT,
    ADD_HRIS_SUCCESS,
    ADD_HRIS_ERROR,
  
    EDIT_HRIS_INIT,
    EDIT_HRIS_SUCCESS,
    EDIT_HRIS_ERROR,
} from "../Actions/ActionConstant/ActionConstants";

const initialState = {
    getHRISData: [],
    addHRISData: [],
    getHRISDataById: [],
    editHRISData: [],
    isLoading: false,
    error: null,
}

const HRISReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_HRIS_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case GET_HRIS_SUCCESS : 
        return {
            ...state,
            getHRISData : action.data,
            isLoading : false
        };
        case GET_HRIS_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };

        case ADD_HRIS_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case ADD_HRIS_SUCCESS : 
        return {
            ...state,
            addHRISData : action.data,
            isLoading : false
        };
        case ADD_HRIS_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };

        case GET_HRIS_BY_ID_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case GET_HRIS_BY_ID_SUCCESS : 
        return {
            ...state,
            getHRISDataById : action.data,
            isLoading : false
        };
        case GET_HRIS_BY_ID_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };

        case EDIT_HRIS_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case EDIT_HRIS_SUCCESS : 
        return {
            ...state,
            editHRISData : action.data ? action.data : null,
            isLoading : false
        };
        case EDIT_HRIS_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };
        default : 
    }
    return state;
};

export default HRISReducer;