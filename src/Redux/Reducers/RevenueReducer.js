import {
    GET_REVENUE_DATA_INIT,
    GET_REVENUE_DATA_SUCCESS,
    GET_REVENUE_DATA_ERROR,
    
    ADD_REVENUE_DATA_INIT,
    ADD_REVENUE_DATA_SUCCESS,
    ADD_REVENUE_DATA_ERROR,

    GET_REVENUE_BY_ID_INIT,
    GET_REVENUE_BY_ID_SUCCESS,
    GET_REVENUE_BY_ID_ERROR,

    EDIT_REVENUE_DATA_INIT,
    EDIT_REVENUE_DATA_SUCCESS,
    EDIT_REVENUE_DATA_ERROR,
  } from "../Actions/ActionConstant/ActionConstants";

  const initialState = {
    revData: [],
    addRevData: [],
    editRevData: [],
    getRevDataById:[],
    isLoading: false,
    error: null
  };
  
  const RevenueReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_REVENUE_DATA_INIT:
      return {
        ...state,
        isLoading: true
      };
      case GET_REVENUE_DATA_SUCCESS:
      return {
        ...state,
        revData: action.data,
        isLoading: false
      };
      case GET_REVENUE_DATA_ERROR:
      return {
        ...state,
        error: action.data ? action.data : null,
        isLoading: false
      };
  
      case ADD_REVENUE_DATA_INIT:
      return {
        ...state,
        isLoading: true
      };
      case ADD_REVENUE_DATA_SUCCESS:
      return {
        ...state,
        addRevData: action.data,
        isLoading: false
      };
      case ADD_REVENUE_DATA_ERROR:
      return {
        ...state,
        error: action.data ? action.data : null,
        isLoading: false
      };

      case GET_REVENUE_BY_ID_INIT : 
      return {
          ...state,
          isLoading : true
      };
      case GET_REVENUE_BY_ID_SUCCESS : 
      return {
          ...state,
          getRevDataById : action.data,
          isLoading : false
      };
      case GET_REVENUE_BY_ID_ERROR : 
      return {
          ...state,
          error : action.data ? action.data : null,
          isLoading : false
      };
      case EDIT_REVENUE_DATA_INIT:
      return {
        ...state,
        isLoading: true
      };
      case EDIT_REVENUE_DATA_SUCCESS:
      return {
        ...state,
        editRevData: action.data,
        isLoading: false
      };
      case EDIT_REVENUE_DATA_ERROR:
      return {
        ...state,
        error: action.data ? action.data : null,
        isLoading: false
      };
      default:
    }
    return state;
  };
  
  export default RevenueReducer;
  