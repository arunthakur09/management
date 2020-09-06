import {
    GET_TARGET_DATA_INIT,
    GET_TARGET_DATA_SUCCESS,
    GET_TARGET_DATA_ERROR,
  
    ADD_TARGET_DATA_INIT,
    ADD_TARGET_DATA_SUCCESS,
    ADD_TARGET_DATA_ERROR,
  
    GET_TARGET_BY_ID_INIT,
    GET_TARGET_BY_ID_SUCCESS,
    GET_TARGET_BY_ID_ERROR,
  
    EDIT_TARGET_DATA_INIT,
    EDIT_TARGET_DATA_SUCCESS,
    EDIT_TARGET_DATA_ERROR,
  } from "../Actions/ActionConstant/ActionConstants";

  const initialState = {
    TargetData: [],
    addTargetData: [],
    editTargetData: [],
    getTargetDataById:[],
    isLoading: false,
    error: null
  };
  
  const SalestargetReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_TARGET_DATA_INIT:
      return {
        ...state,
        isLoading: true
      };
      case GET_TARGET_DATA_SUCCESS:
      return {
        ...state,
        TargetData: action.data,
        isLoading: false
      };
      case GET_TARGET_DATA_ERROR:
      return {
        ...state,
        error: action.data ? action.data : null,
        isLoading: false
      };
  
      case ADD_TARGET_DATA_INIT:
      return {
        ...state,
        isLoading: true
      };
      case ADD_TARGET_DATA_SUCCESS:
      return {
        ...state,
        addTargetData: action.data,
        isLoading: false
      };
      case ADD_TARGET_DATA_ERROR:
      return {
        ...state,
        error: action.data ? action.data : null,
        isLoading: false
      };

      case GET_TARGET_BY_ID_INIT : 
      return {
          ...state,
          isLoading : true
      };
      case GET_TARGET_BY_ID_SUCCESS : 
      return {
          ...state,
          getTargetDataById : action.data,
          isLoading : false
      };
      case GET_TARGET_BY_ID_ERROR : 
      return {
          ...state,
          error : action.data ? action.data : null,
          isLoading : false
      };
      case EDIT_TARGET_DATA_INIT:
      return {
        ...state,
        isLoading: true
      };
      case EDIT_TARGET_DATA_SUCCESS:
      return {
        ...state,
        editTargetData: action.data,
        isLoading: false
      };
      case EDIT_TARGET_DATA_ERROR:
      return {
        ...state,
        error: action.data ? action.data : null,
        isLoading: false
      };
      default:
    }
    return state;
  };
  
  export default SalestargetReducer;
  