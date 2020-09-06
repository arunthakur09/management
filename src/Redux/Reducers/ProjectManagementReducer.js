import {
    GET_PROJECT_DATA_INIT,
    GET_PROJECT_DATA_SUCCESS,
    GET_PROJECT_DATA_ERROR,


    GET_PROJECTS_BY_ID_INIT,
    GET_PROJECTS_BY_ID_SUCCESS,
    GET_PROJECTS_BY_ID_ERROR,

    ADD_PRO_TASK_INIT,
    ADD_PRO_TASK_SUCCESS,
    ADD_PRO_TASK_ERROR,

    UPDATE_PROJECT_INIT,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_ERROR,

    GET_MONTHLY_DATA_INIT ,
    GET_MONTHLY_DATA_SUCCESS ,
    GET_MONTHLY_DATA_ERROR,

  } from "../Actions/ActionConstant/ActionConstants";
  
  const initialState = {
    getProjectData:[],
    getMonthlyData:[],
    getProjectDataById: [],
    addTask:[],
    getData:[],
    isLoading: false,

    error: null
  };
  
  const projectManagementReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PROJECT_DATA_INIT:
      return {
        ...state,
        isLoading: true
      };
      case GET_PROJECT_DATA_SUCCESS:
      return {
        ...state,
        getProjectData: action.data,
        isLoading: false
      };
      case GET_PROJECT_DATA_ERROR:
      return {
        ...state,
        error: action.data ? action.data : null,
        isLoading: false
      };

      case GET_PROJECTS_BY_ID_INIT : 
      return {
          ...state,
          isLoading : true
      };
      case GET_PROJECTS_BY_ID_SUCCESS : 
      return {
          ...state,
          getProjectDataById : action.data,
          isLoading : false
      };
      case GET_PROJECTS_BY_ID_ERROR : 
      return {
          ...state,
          error : action.data ? action.data : null,
          isLoading : false
      };

      case ADD_PRO_TASK_INIT : 
      return {
          ...state,
          isLoading : true
      };
      case ADD_PRO_TASK_SUCCESS :
      return {
          ...state,
          addTask : action.data,
          isLoading : false
      };
      case ADD_PRO_TASK_ERROR : 
      return {
          ...state,
          error : action.data ? action.data : null,
          isLoading : false
      };

      case UPDATE_PROJECT_INIT :
      return {
          ...state,
          isLoading : true
      };
      case UPDATE_PROJECT_SUCCESS :
      return {
          ...state,
          getData:action.data,
          isLoading:true 
      };

      case UPDATE_PROJECT_ERROR : 
      return {
          ...state,
          error : action.data ? action.data : null,
          isLoading : false
      };
      case GET_MONTHLY_DATA_INIT : 
      return {
          ...state,
          isLoading : true
      };
      case GET_MONTHLY_DATA_SUCCESS : 
      return {
          ...state,
          getMonthlyData : action.data,
          isLoading : false
      };
      case GET_MONTHLY_DATA_ERROR : 
      return {
          ...state,
          error : action.data ? action.data : null,
          isLoading : false
      };
      default:
    }
    return state;
  };
  
  export default projectManagementReducer;
  