import {
    GET_HR_CANDIDACY_INIT,
    GET_HR_CANDIDACY_SUCCESS,
    GET_HR_CANDIDACY_ERROR,

    GET_HR_CANDIDACY_BY_ID_INIT,
    GET_HR_CANDIDACY_BY_ID_SUCCESS,
    GET_HR_CANDIDACY_BY_ID_ERROR,

    ADD_HR_CANDIDACY_INIT,
    ADD_HR_CANDIDACY_SUCCESS,
    ADD_HR_CANDIDACY_ERROR,

    ADD_HR_HOLIDAY_INIT,
    ADD_HR_HOLIDAY_SUCCESS, 
    ADD_HR_HOLIDAY_ERROR,

    EDIT_HOLIDAY_DATA_INIT,
    EDIT_HOLIDAY_DATA_SUCCESS,
    EDIT_HOLIDAY_DATA_ERROR,

    GET_HOLIDAY_DATA_BY_ID_INIT,
    GET_HOLIDAY_DATA_BY_ID_SUCCESS,
    GET_HOLIDAY_DATA_BY_ID_ERROR,

    EDIT_HR_CANDIDACY_INIT,
    EDIT_HR_CANDIDACY_SUCCESS,
    EDIT_HR_CANDIDACY_ERROR,

    EDIT_HR_CANDIDACY_STATUS_INIT,
    EDIT_HR_CANDIDACY_STATUS_SUCCESS,
    EDIT_HR_CANDIDACY_STATUS_ERROR,

    GET_HRS_AUTOCOMPLETE_INIT ,
    GET_HRS_AUTOCOMPLETE_SUCCESS,
    GET_HRS_AUTOCOMPLETE_ERROR,

    GET_RESUME_DATA_INIT,
    GET_RESUME_DATA_SUCCESS,
    GET_RESUME_DATA_ERROR,

    IMPORT_CSV_HRFILE_INIT,
    IMPORT_CSV_HRFILE_SUCCESS,
    IMPORT_CSV_HRFILE_ERROR,
} from "../Actions/ActionConstant/ActionConstants";

const initialState = {
    employeeFilters :[],
    getCandidate: [],
    getCandidateById: [],
    getHolidayDataByI:[],
    addCandidate: [],
    editCandidate: [],
    //holidayData:[],
    resume:[],
    isLoading: false,
    error: null,
    csvHRData: [],
    addHoliday:[],
    editHoliday:[],
}

const LoginReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_HR_CANDIDACY_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case GET_HR_CANDIDACY_SUCCESS :
        return {
            ...state,
            getCandidate : action.data,
            isLoading : false
        };
        case GET_HR_CANDIDACY_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };

        case GET_HR_CANDIDACY_BY_ID_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case GET_HR_CANDIDACY_BY_ID_SUCCESS :
        return {
            ...state,
            getCandidateById : action.data,
            isLoading : false
        };
        case GET_HR_CANDIDACY_BY_ID_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };
        case GET_HRS_AUTOCOMPLETE_INIT :
            return {
              ...state,
              isLoading: true
            };
            case GET_HRS_AUTOCOMPLETE_SUCCESS:
            return {
              ...state,
              employeeFilters: action.data,
              isLoading: false
            };
            case GET_HRS_AUTOCOMPLETE_ERROR:
            return {
              ...state,
              error: action.data ? action.data : null,
              isLoading: false
            };

        case ADD_HR_CANDIDACY_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case ADD_HR_CANDIDACY_SUCCESS :
        return {
            ...state,
            addCandidate : action.data,
            isLoading : false
        };
        case ADD_HR_CANDIDACY_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };

        case EDIT_HR_CANDIDACY_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case EDIT_HR_CANDIDACY_SUCCESS :
        return {
            ...state,
            editCandidate : action.data,
            isLoading : false
        };
        case EDIT_HR_CANDIDACY_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };

        case EDIT_HR_CANDIDACY_STATUS_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case EDIT_HR_CANDIDACY_STATUS_SUCCESS :
        const datas = action.data.id
        const datasStatus = action.data.outcome
        state.getCandidate = state.getCandidate.map(candidate => {
            if (candidate.id === datas) {
                candidate.outcome = datasStatus
                return candidate
            }
            else {
                return candidate
            }
        })
        return {
            ...state,
            isLoading : false
        };
        case EDIT_HR_CANDIDACY_STATUS_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };


        case GET_RESUME_DATA_INIT :
            return {
                ...state,
                isLoading : false
            }
        case GET_RESUME_DATA_SUCCESS :
        return {
            ...state,
            resume : action.data ,
            isLoading : false
        }
        case GET_RESUME_DATA_ERROR :
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        }

        case IMPORT_CSV_HRFILE_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case IMPORT_CSV_HRFILE_SUCCESS : 
        return {
            ...state,
            csvHRData : action.data,
            isLoading : false
        };
        case IMPORT_CSV_HRFILE_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };

        case ADD_HR_HOLIDAY_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case ADD_HR_HOLIDAY_SUCCESS :
        return {
            ...state,
            addHoliday : action.data,
            isLoading : false
        };
        case ADD_HR_HOLIDAY_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };
        case EDIT_HOLIDAY_DATA_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case EDIT_HOLIDAY_DATA_SUCCESS :
        return {
            ...state,
            editHoliday : action.data,
            isLoading : false
        };
        case EDIT_HOLIDAY_DATA_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };
        case GET_HOLIDAY_DATA_BY_ID_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case GET_HOLIDAY_DATA_BY_ID_SUCCESS :
        return {
            ...state,
            getHolidayDataById : action.data,
            isLoading : false
        };
        case GET_HOLIDAY_DATA_BY_ID_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };
        default : 
    }
    return state;
};

export default LoginReducer;
