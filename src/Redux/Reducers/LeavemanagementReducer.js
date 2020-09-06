import {
ADD_LEAVE_INIT,
ADD_LEAVE_SUCCESS,
ADD_LEAVE_ERROR,

GET_LEAVE_DATA_INIT,
GET_LEAVE_DATA_SUCCESS,
GET_LEAVE_DATA_ERROR,

GET_LEAVE_DATA_BY_ID_INIT,
GET_LEAVE_DATA_BY_ID_SUCCESS,
GET_LEAVE_DATA_BY_ID_ERROR,

EDIT_LEAVE_DATA_INIT,
EDIT_LEAVE_DATA_SUCCESS,
EDIT_LEAVE_DATA_ERROR,

EDIT_LEAVE_STATUS_INIT,
EDIT_LEAVE_STATUS_SUCCESS,
EDIT_LEAVE_STATUS_ERROR,
} from "../Actions/ActionConstant/ActionConstants";

const initialState = {
    getleaveData: [],
    getleaveDatabyId: [],
    statusData: [],
    leaveData: [],
    editLeave:[],
    isLoading: false,
    error: null
}

const LeavemanagementReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_LEAVE_DATA_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case GET_LEAVE_DATA_SUCCESS :
        return {
            ...state,
            getleaveData : action.data,
            isLoading : false
        };
        case GET_LEAVE_DATA_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };

        case GET_LEAVE_DATA_BY_ID_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case GET_LEAVE_DATA_BY_ID_SUCCESS :
        return {
            ...state,
            getleaveDatabyId : action.data,
            isLoading : false
        };
        case GET_LEAVE_DATA_BY_ID_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };

        case ADD_LEAVE_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case ADD_LEAVE_SUCCESS : 
        return {
            ...state,
            leaveData : action.data,
            isLoading : false
        };
        case ADD_LEAVE_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };

        case EDIT_LEAVE_DATA_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case EDIT_LEAVE_DATA_SUCCESS :
        return {
            ...state,
            editLeave : action.data,
            isLoading : false
        };
        case EDIT_LEAVE_DATA_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };

        case EDIT_LEAVE_STATUS_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case EDIT_LEAVE_STATUS_SUCCESS :
            console.log(state.getleaveData)
            let getleaveData =  state.getleaveData.map(leave => 
                {
                    if(action.data.id === leave.id){
                       return {...leave , status: action.data.status }
                    }
                    return {...leave }

                })
            
        return {
            ...state,
            getleaveData,
            statusData : action.data,
            isLoading : false
        };
        case EDIT_LEAVE_STATUS_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };
        default : 
    }
    return state;
};

export default LeavemanagementReducer;
