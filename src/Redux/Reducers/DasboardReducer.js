import {
    GET_DOB_DEPT_DATA_INIT,
    GET_DOB_DEPT_DATA_SUCCESS,
    GET_DOB_DEPT_DATA_ERROR,

    GET_TIMELOGTODAY_DATA_INIT,
    GET_TIMELOGTODAY_DATA_SUCCESS,
    GET_TIMELOGTODAY_DATA_ERROR,

    DELETE_HOLIDAY_STATUS_INIT,
    DELETE_HOLIDAY_STATUS_SUCCESS, 
    DELETE_HOLIDAY_STATUS_ERROR,
} from "../Actions/ActionConstant/ActionConstants";

const initialState = {
    getDashboardData: [],
    isLoading: false,
    error: null,
    deleteHoliday:[],
}

const DashboardReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DOB_DEPT_DATA_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case GET_DOB_DEPT_DATA_SUCCESS : 
        return {
            ...state,
            getDashboardData : action.data,
            isLoading : false
        };
        case GET_DOB_DEPT_DATA_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };

        case GET_TIMELOGTODAY_DATA_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case GET_TIMELOGTODAY_DATA_SUCCESS : 
        return {
            ...state,
            getDashboardTimeLogData : action.data,
            isLoading : false
        };
        case GET_TIMELOGTODAY_DATA_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };

        case DELETE_HOLIDAY_STATUS_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case DELETE_HOLIDAY_STATUS_SUCCESS : 
        const deletedId = action.data.id;
        let dashboardData = state.getDashboardData;
        return {
            ...state,
            getDashboardData : {
                ...dashboardData,
                holiday: state.getDashboardData.holiday.filter(dash => dash.id !== deletedId)
            },
            deleteHoliday : action.data,
            isLoading : false
        };
        case DELETE_HOLIDAY_STATUS_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };

        default : 
    }
    return state;
};

export default DashboardReducer;