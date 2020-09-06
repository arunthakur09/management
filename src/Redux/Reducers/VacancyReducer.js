import {
    ADD_VACANCY_INIT,
    ADD_VACANCY_SUCCESS,
    ADD_VACANCY_ERROR,
    
    GET_VACANCY_DATA_INIT,
    GET_VACANCY_DATA_SUCCESS,
    GET_VACANCY_DATA_ERROR,
    
    GET_VACANCY_DATA_BY_ID_INIT,
    GET_VACANCY_DATA_BY_ID_SUCCESS,
    GET_VACANCY_DATA_BY_ID_ERROR,
    
    EDIT_VACANCY_DATA_INIT,
    EDIT_VACANCY_DATA_SUCCESS,
    EDIT_VACANCY_DATA_ERROR,

    GET_HR_TARGET_BY_ID_INIT,
    GET_HR_TARGET_BY_ID_SUCCESS,
    GET_HR_TARGET_BY_ID_ERROR,
    } from "../Actions/ActionConstant/ActionConstants";

    const initialState = {
        getvacancyData: [],
        getvacancyDatabyId: [],
        vacancyData: [],
        editvacancy:[],
        hrTargetDataById:[],
        isLoading: false,
        error: null
    }
    
    const VacancyReducer = (state = initialState, action) => {
        switch(action.type) {
            case GET_VACANCY_DATA_INIT : 
            return {
                ...state,
                isLoading : true
            };
            case GET_VACANCY_DATA_SUCCESS :
            return {
                ...state,
                getvacancyData : action.data,
                isLoading : false
            };
            case GET_VACANCY_DATA_ERROR : 
            return {
                ...state,
                error : action.data ? action.data : null,
                isLoading : false
            };
    
            case GET_VACANCY_DATA_BY_ID_INIT : 
            return {
                ...state,
                isLoading : true
            };
            case GET_VACANCY_DATA_BY_ID_SUCCESS :
            return {
                ...state,
                getvacancyDatabyId : action.data,
                isLoading : false
            };
            case GET_VACANCY_DATA_BY_ID_ERROR : 
            return {
                ...state,
                error : action.data ? action.data : null,
                isLoading : false
            };
    
            case ADD_VACANCY_INIT : 
            return {
                ...state,
                isLoading : true
            };
            case ADD_VACANCY_SUCCESS : 
            return {
                ...state,
                vacancyData : action.data,
                isLoading : false
            };
            case ADD_VACANCY_ERROR : 
            return {
                ...state,
                error : action.data ? action.data : null,
                isLoading : false
            };
    
            case EDIT_VACANCY_DATA_INIT : 
            return {
                ...state,
                isLoading : true
            };
            case EDIT_VACANCY_DATA_SUCCESS :
            return {
                ...state,
                editvacancy : action.data,
                isLoading : false
            };
            case EDIT_VACANCY_DATA_ERROR : 
            return {
                ...state,
                error : action.data ? action.data : null,
                isLoading : false
            };

            case GET_HR_TARGET_BY_ID_INIT : 
            return {
                ...state,
                isLoading : true
            };
            case GET_HR_TARGET_BY_ID_SUCCESS : 
            return {
                ...state,
                hrTargetDataById : action.data,
                isLoading : false
            };
            case GET_HR_TARGET_BY_ID_ERROR : 
            return {
                ...state,
                error : action.data ? action.data : null,
                isLoading : false
            };
            default : 
        }
        return state;
    };
    
    export default VacancyReducer;