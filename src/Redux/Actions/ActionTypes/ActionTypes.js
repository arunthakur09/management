import {
  // User Module
  GET_USERS_DATA_INIT,
  GET_USERS_DATA_SUCCESS,
  GET_USERS_DATA_ERROR,

  GET_USERS_DEPARTMENTS_INIT,
  GET_USERS_DEPARTMENTS_SUCCESS,
  GET_USERS_DEPARTMENTS_ERROR,

  ADD_USERS_DATA_INIT,
  ADD_USERS_DATA_SUCCESS,
  ADD_USERS_DATA_ERROR,

  EDIT_USERS_INIT,
  EDIT_USERS_SUCCESS,
  EDIT_USERS_ERROR,

  GET_USERS_PERMISSION_INIT,
  GET_USERS_PERMISSION_SUCCESS,
  GET_USERS_PERMISSION_ERROR,

  UPDATE_USERS_INIT,
  UPDATE_USERS_SUCCESS,
  UPDATE_USERS_ERROR,

  IMPORT_PIC_FILE_INIT,
  IMPORT_PIC_FILE_SUCCESS,
  IMPORT_PIC_FILE_ERROR,

  GET_USERS_AUTOCOMPLETE_INIT,
  GET_USERS_AUTOCOMPLETE_SUCCESS,
  GET_USERS_AUTOCOMPLETE_ERROR,

  UPDATE_USER_ISACTIVE_INIT,
  UPDATE_USER_ISACTIVE_SUCCESS,
  UPDATE_USER_ISACTIVE_ERROR,

  // Department Module
  GET_DEPARTMENTS_INIT,
  GET_DEPARTMENTS_SUCCESS,
  GET_DEPARTMENTS_ERROR,

  ADD_DEPARTMENTS_INIT,
  ADD_DEPARTMENTS_SUCCESS,
  ADD_DEPARTMENTS_ERROR,

  GET_DEPARTMENTS_BY_ID_INIT,
  GET_DEPARTMENTS_BY_ID_SUCCESS,
  GET_DEPARTMENTS_BY_ID_ERROR,

  EDIT_DEPARTMENTS_INIT,
  EDIT_DEPARTMENTS_SUCCESS,
  EDIT_DEPARTMENTS_ERROR,

  UPDATE_DEPT_ISACTIVE_INIT ,
  UPDATE_DEPT_ISACTIVE_SUCCESS ,
  UPDATE_DEPT_ISACTIVE_ERROR ,

  // Performance Main Parameter
  GET_PERFORMANCE_INIT,
  GET_PERFORMANCE_SUCCESS,
  GET_PERFORMANCE_ERROR,

  ADD_PERFORMANCE_INIT,
  ADD_PERFORMANCE_SUCCESS,
  ADD_PERFORMANCE_ERROR,

  GET_PERFORMANCE_BY_ID_INIT,
  GET_PERFORMANCE_BY_ID_SUCCESS,
  GET_PERFORMANCE_BY_ID_ERROR,

  EDIT_PERFORMANCE_INIT,
  EDIT_PERFORMANCE_SUCCESS,
  EDIT_PERFORMANCE_ERROR,

  UPDATE_PER_ISACTIVE_INIT ,
  UPDATE_PER_ISACTIVE_SUCCESS ,
  UPDATE_PER_ISACTIVE_ERROR ,

  // Sub Performance
  GET_SUBPERFORMANCE_INIT,
  GET_SUBPERFORMANCE_SUCCESS,
  GET_SUBPERFORMANCE_ERROR,

  ADD_SUBPERFORMANCE_INIT,
  ADD_SUBPERFORMANCE_SUCCESS,
  ADD_SUBPERFORMANCE_ERROR,

  GET_SUBPERFORMANCE_BY_ID_INIT,
  GET_SUBPERFORMANCE_BY_ID_SUCCESS,
  GET_SUBPERFORMANCE_BY_ID_ERROR,

  EDIT_SUBPERFORMANCE_INIT,
  EDIT_SUBPERFORMANCE_SUCCESS,
  EDIT_SUBPERFORMANCE_ERROR,

// Evaluation
  GET_CALCULATION_INIT,
  GET_CALCULATION_SUCCESS,
  GET_CALCULATION_ERROR,

  SAVE_CALCULATION_INIT,
  SAVE_CALCULATION_SUCCESS,
  SAVE_CALCULATION_ERROR,

// Mom Modules
  GET_MOM_INIT,
  GET_MOM_SUCCESS,
  GET_MOM_ERROR,

  SUBMIT_MOM_INIT,
  SUBMIT_MOM_SUCCESS,
  SUBMIT_MOM_ERROR,

  EDIT_MOM_DATA_INIT,
  EDIT_MOM_DATA_SUCCESS,
  EDIT_MOM_DATA_ERROR,

// Time Log
  ADD_CHECKIN_INIT,
  ADD_CHECKIN_SUCCESS,
  ADD_CHECKIN_ERROR,

  UPDATE_CHECKOUT_INIT,
  UPDATE_CHECKOUT_SUCCESS,
  UPDATE_CHECKOUT_ERROR,

  GET_TIME_TABLE_INIT,
  GET_TIME_TABLE_SUCCESS,
  GET_TIME_TABLE_ERROR,

// Sales Modules
  PROPOSAL_SUBMISSION_INIT,
  PROPOSAL_SUBMISSION_SUCCESS,
  PROPOSAL_SUBMISSION_ERROR,

  POST_PROPOSAL_SUBMIT_INIT,
  POST_PROPOSAL_SUBMIT_SUCCESS,
  POST_PROPOSAL_SUBMIT_ERROR,

  GET_PROPOSAL_BY_ID_INIT,
  GET_PROPOSAL_BY_ID_SUCCESS,
  GET_PROPOSAL_BY_ID_ERROR,

  UPLOAD_PROPOSAL_INIT,
  UPLOAD_PROPOSAL_SUCCESS,
  UPLOAD_PROPOSAL_ERROR,

  GET_SALES_DROPDOWN_INIT,
  GET_SALES_DROPDOWN_SUCCESS,
  GET_SALES_DROPDOWN_ERROR,

  UPDATE_STATUS_INIT,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_ERROR,

  BUTTON_SELECT_STATUS_INIT,
  BUTTON_SELECT_STATUS_SUCCESS,
  BUTTON_SELECT_STATUS_ERROR,

  GET_SALES_TARGET_INIT,
  GET_SALES_TARGET_SUCCESS,
  GET_SALES_TARGET_ERROR,

  DELETE_ACTIVE_STATUS_INIT,
  DELETE_ACTIVE_STATUS_SUCCESS,
  DELETE_ACTIVE_STATUS_ERROR,

  IMPORT_CSV_FILE_INIT,
  IMPORT_CSV_FILE_SUCCESS,
  IMPORT_CSV_FILE_ERROR,

  GET_SALES_TARGET_BY_ID_INIT,
  GET_SALES_TARGET_BY_ID_SUCCESS,
  GET_SALES_TARGET_BY_ID_ERROR,

  //Revenue Report
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

  //Target
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

  // Authentication
  LOGIN_AUTHENTICATION_INIT,
  LOGIN_AUTHENTICATION_SUCCESS,
  LOGIN_AUTHENTICATION_ERROR,

  LOGOUT_AUTHENTICATION_INIT,
  LOGOUT_AUTHENTICATION_SUCCESS,
  LOGOUT_AUTHENTICATION_ERROR,

  // Hr Candidacy
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


  EDIT_HOLIDAY_DATA_INIT ,
  EDIT_HOLIDAY_DATA_SUCCESS, 
  EDIT_HOLIDAY_DATA_ERROR, 

  GET_HOLIDAY_DATA_BY_ID_INIT ,
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
  //HRIS
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
  
  // Leave Management
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

  // JOB VACANCY Management
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

  // Dashboard Module
  GET_DOB_DEPT_DATA_INIT,
  GET_DOB_DEPT_DATA_SUCCESS,
  GET_DOB_DEPT_DATA_ERROR,

  GET_TIMELOGTODAY_DATA_INIT,
  GET_TIMELOGTODAY_DATA_SUCCESS,
  GET_TIMELOGTODAY_DATA_ERROR,


  DELETE_HOLIDAY_STATUS_INIT,
  DELETE_HOLIDAY_STATUS_SUCCESS, 
  DELETE_HOLIDAY_STATUS_ERROR, 

  //Project Management

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

} from "../ActionConstant/ActionConstants";

export const USERS_DATA_INIT = () => ({ type: GET_USERS_DATA_INIT });
export const USERS_DATA_SUCCESS = data => ({ type: GET_USERS_DATA_SUCCESS, data: data });
export const USERS_DATA_ERROR = data => ({ type: GET_USERS_DATA_ERROR, data: data });

export const USER_DEPARTMENTS_INIT = () => ({ type: GET_USERS_DEPARTMENTS_INIT });
export const USER_DEPARTMENTS_SUCCESS = data => ({ type: GET_USERS_DEPARTMENTS_SUCCESS, data: data });
export const USER_DEPARTMENTS_ERROR = data => ({ type: GET_USERS_DEPARTMENTS_ERROR, data: data });

export const ADD_USER_INIT = () => ({ type: ADD_USERS_DATA_INIT });
export const ADD_USER_SUCCESS = data => ({ type: ADD_USERS_DATA_SUCCESS, data: data });
export const ADD_USER_ERROR = data => ({ type: ADD_USERS_DATA_ERROR, data: data });

export const EDIT_USER_INIT = () => ({ type: EDIT_USERS_INIT });
export const EDIT_USER_SUCCESS = data => ({ type: EDIT_USERS_SUCCESS, data: data });
export const EDIT_USER_ERROR = data => ({ type: EDIT_USERS_ERROR, data: data });

export const USERS_PERMISSION_INIT = () => ({ type: GET_USERS_PERMISSION_INIT });
export const USERS_PERMISSION_SUCCESS = data => ({ type: GET_USERS_PERMISSION_SUCCESS, data: data });
export const USERS_PERMISSION_ERROR = data => ({ type: GET_USERS_PERMISSION_ERROR, data: data });

export const UPDATE_USER_INIT = () => ({ type: UPDATE_USERS_INIT });
export const UPDATE_USER_SUCCESS = data => ({ type: UPDATE_USERS_SUCCESS, data: data });
export const UPDATE_USER_ERROR = data => ({ type: UPDATE_USERS_ERROR, data: data });

export const PIC_FILE_INIT = () => ({ type: IMPORT_PIC_FILE_INIT });
export const PIC_FILE_SUCCESS = (data) => ({ type: IMPORT_PIC_FILE_SUCCESS, data: data });
export const PIC_FILE_ERROR = data => ({ type: IMPORT_PIC_FILE_ERROR, data: data });

export const USERS_AUTOCOMPLETE_INIT = () => ({ type: GET_USERS_AUTOCOMPLETE_INIT });
export const USERS_AUTOCOMPLETE_SUCCESS = data => ({ type: GET_USERS_AUTOCOMPLETE_SUCCESS, data: data });
export const USERS_AUTOCOMPLETE_ERROR = data => ({ type: GET_USERS_AUTOCOMPLETE_ERROR, data: data });

export const UPDATE_USERS_ISACTIVE_INIT = () => ({ type: UPDATE_USER_ISACTIVE_INIT });
export const UPDATE_USERS_ISACTIVE_SUCCESS = data => ({ type: UPDATE_USER_ISACTIVE_SUCCESS, data: data });
export const UPDATE_USERS_ISACTIVE_ERROR = data => ({ type: UPDATE_USER_ISACTIVE_ERROR, data: data });

// Department Module
export const DEPARTMENTS_INIT = () => ({ type: GET_DEPARTMENTS_INIT });
export const DEPARTMENTS_SUCCESS = data => ({ type: GET_DEPARTMENTS_SUCCESS, data: data });
export const DEPARTMENTS_ERROR = data => ({ type: GET_DEPARTMENTS_ERROR, data: data });

export const ADD_DEPT_INIT = () => ({ type: ADD_DEPARTMENTS_INIT });
export const ADD_DEPT_SUCCESS = data => ({ type: ADD_DEPARTMENTS_SUCCESS, data: data });
export const ADD_DEPT_ERROR = data => ({ type: ADD_DEPARTMENTS_ERROR, data: data });

export const DEPT_BY_ID_INIT = () => ({ type: GET_DEPARTMENTS_BY_ID_INIT });
export const DEPT_BY_ID_SUCCESS = data => ({ type: GET_DEPARTMENTS_BY_ID_SUCCESS, data: data });
export const DEPT_BY_ID_ERROR = data => ({ type: GET_DEPARTMENTS_BY_ID_ERROR, data: data });

export const EDIT_DEPT_INIT = () => ({ type: EDIT_DEPARTMENTS_INIT });
export const EDIT_DEPT_SUCCESS = data => ({ type: EDIT_DEPARTMENTS_SUCCESS, data: data });
export const EDIT_DEPT_ERROR = data => ({ type: EDIT_DEPARTMENTS_ERROR, data: data });

export const UPDATE_DEPTS_ISACTIVE_INIT = () => ({ type :UPDATE_DEPT_ISACTIVE_INIT});
export const UPDATE_DEPTS_ISACTIVE_SUCCESS = data => ({ type: UPDATE_DEPT_ISACTIVE_SUCCESS , data :data});
export const UPDATE_DEPTS_ISACTIVE_ERROR = data =>({ type:UPDATE_DEPT_ISACTIVE_ERROR , data:data});

// Performance Main Parameter
export const GET_PERF_INIT = () => ({ type: GET_PERFORMANCE_INIT });
export const GET_PERF_SUCCESS = data => ({ type: GET_PERFORMANCE_SUCCESS, data: data });
export const GET_PERF_ERROR = data => ({ type: GET_PERFORMANCE_ERROR, data: data });

export const ADD_PERF_INIT = () => ({ type: ADD_PERFORMANCE_INIT });
export const ADD_PERF_SUCCESS = data => ({ type: ADD_PERFORMANCE_SUCCESS, data: data });
export const ADD_PERF_ERROR = data => ({ type: ADD_PERFORMANCE_ERROR, data: data });

export const GET_PERF_BY_ID_INIT = () => ({ type: GET_PERFORMANCE_BY_ID_INIT });
export const GET_PERF_BY_ID_SUCCESS = data => ({ type: GET_PERFORMANCE_BY_ID_SUCCESS, data: data });
export const GET_PERF_BY_ID_ERROR = data => ({ type: GET_PERFORMANCE_BY_ID_ERROR, data: data });

export const EDIT_PERF_INIT = () => ({ type: EDIT_PERFORMANCE_INIT });
export const EDIT_PERF_SUCCESS = data => ({ type: EDIT_PERFORMANCE_SUCCESS, data: data });
export const EDIT_PERF_ERROR = data => ({ type: EDIT_PERFORMANCE_ERROR, data: data });

export const UPDATE_PERS_ISACTIVE_INIT = () => ({ type: UPDATE_PER_ISACTIVE_INIT });
export const UPDATE_PERS_ISACTIVE_SUCCESS = data => ({ type: UPDATE_PER_ISACTIVE_SUCCESS, data: data });
export const UPDATE_PERS_ISACTIVE_ERROR = data => ({ type: UPDATE_PER_ISACTIVE_ERROR, data: data });

// Sub Performance
export const GET_SUBPERF_INIT = () => ({ type: GET_SUBPERFORMANCE_INIT });
export const GET_SUBPERF_SUCCESS = data => ({ type: GET_SUBPERFORMANCE_SUCCESS, data: data });
export const GET_SUBPERF_ERROR = data => ({ type: GET_SUBPERFORMANCE_ERROR, data: data });

export const ADD_SUBPERF_INIT = () => ({ type: ADD_SUBPERFORMANCE_INIT });
export const ADD_SUBPERF_SUCCESS = data => ({ type: ADD_SUBPERFORMANCE_SUCCESS, data: data });
export const ADD_SUBPERF_ERROR = data => ({ type: ADD_SUBPERFORMANCE_ERROR, data: data });

export const GET_SUBPERF_BY_ID_INIT = () => ({ type: GET_SUBPERFORMANCE_BY_ID_INIT });
export const GET_SUBPERF_BY_ID_SUCCESS = data => ({ type: GET_SUBPERFORMANCE_BY_ID_SUCCESS, data: data });
export const GET_SUBPERF_BY_ID_ERROR = data => ({ type: GET_SUBPERFORMANCE_BY_ID_ERROR, data: data });

export const EDIT_SUBPERF_INIT = () => ({ type: EDIT_SUBPERFORMANCE_INIT });
export const EDIT_SUBPERF_SUCCESS = data => ({ type: EDIT_SUBPERFORMANCE_SUCCESS, data: data });
export const EDIT_SUBPERF_ERROR = data => ({ type: EDIT_SUBPERFORMANCE_ERROR, data: data });

// Evaluation
export const GET_CAL_INIT = () => ({ type: GET_CALCULATION_INIT });
export const GET_CAL_SUCCESS = data => ({ type: GET_CALCULATION_SUCCESS, data: data });
export const GET_CAL_ERROR = data => ({ type: GET_CALCULATION_ERROR, data: data });

export const SAVE_CAL_INIT = () => ({ type: SAVE_CALCULATION_INIT });
export const SAVE_CAL_SUCCESS = data => ({ type: SAVE_CALCULATION_SUCCESS, data: data });
export const SAVE_CAL_ERROR = data => ({ type: SAVE_CALCULATION_ERROR, data: data });

// Mom Modules
export const MOM_GET_INIT = () => ({ type: GET_MOM_INIT });
export const MOM_GET_SUCCESS = data => ({ type: GET_MOM_SUCCESS, data: data });
export const MOM_GET_ERROR = data => ({ type: GET_MOM_ERROR, data: data });

export const SUB_MOM_INIT = () => ({ type: SUBMIT_MOM_INIT });
export const SUB_MOM_SUCCESS = data => ({ type: SUBMIT_MOM_SUCCESS, data: data });
export const SUB_MOM_ERROR = data => ({ type: SUBMIT_MOM_ERROR, data: data });

export const EDIT_MOM_INIT = () => ({ type: EDIT_MOM_DATA_INIT });
export const EDIT_MOM_SUCCESS = data => ({ type: EDIT_MOM_DATA_SUCCESS, data: data });
export const EDIT_MOM_ERROR = data => ({ type: EDIT_MOM_DATA_ERROR, data: data });

// Time Log
export const CHECKIN_INIT = () => ({ type: ADD_CHECKIN_INIT });
export const CHECKIN_SUCCESS = data => ({ type: ADD_CHECKIN_SUCCESS, data: data });
export const CHECKIN_ERROR = data => ({ type: ADD_CHECKIN_ERROR, data: data });

export const CHECKOUT_INIT = () => ({ type: UPDATE_CHECKOUT_INIT });
export const CHECKOUT_SUCCESS = data => ({ type: UPDATE_CHECKOUT_SUCCESS, data: data });
export const CHECKOUT_ERROR = data => ({ type: UPDATE_CHECKOUT_ERROR, data: data });

export const GET_TIME_INIT = () => ({ type: GET_TIME_TABLE_INIT });
export const GET_TIME_SUCCESS = data => ({ type: GET_TIME_TABLE_SUCCESS, data: data });
export const GET_TIME_ERROR = data => ({ type: GET_TIME_TABLE_ERROR, data: data });

// Sales Modules
export const PROP_SUB_INIT = () => ({ type: PROPOSAL_SUBMISSION_INIT });
export const PROP_SUB_SUCCESS = data => ({ type: PROPOSAL_SUBMISSION_SUCCESS, data: data });
export const PROP_SUB_ERROR = data => ({ type: PROPOSAL_SUBMISSION_ERROR, data: data });

export const POST_PROP_SUB_INIT = () => ({ type: POST_PROPOSAL_SUBMIT_INIT });
export const POST_PROP_SUB_SUCCESS = data => ({ type: POST_PROPOSAL_SUBMIT_SUCCESS, data: data });
export const POST_PROP_SUB_ERROR = data => ({ type: POST_PROPOSAL_SUBMIT_ERROR, data: data });

export const GET_PROP_ID_INIT = () => ({ type: GET_PROPOSAL_BY_ID_INIT });
export const GET_PROP_ID_SUCCESS = data => ({ type: GET_PROPOSAL_BY_ID_SUCCESS, data: data });
export const GET_PROP_ID_ERROR = data => ({ type: GET_PROPOSAL_BY_ID_ERROR, data: data });

export const UP_PROPOSAL_INIT = () => ({ type: UPLOAD_PROPOSAL_INIT });
export const UP_PROPOSAL_SUCCESS = data => ({ type: UPLOAD_PROPOSAL_SUCCESS, data: data });
export const UP_PROPOSAL_ERROR = data => ({ type: UPLOAD_PROPOSAL_ERROR, data: data });

export const UP_FILTER_INIT = () => ({ type: UPDATE_STATUS_INIT });
export const UP_FILTER_SUCCESS = (data) => ({ type: UPDATE_STATUS_SUCCESS, data });
export const UP_FILTER_ERROR = data => ({ type: UPDATE_STATUS_ERROR, data: data });

export const GET_DROP_INIT = () => ({ type: GET_SALES_DROPDOWN_INIT });
export const GET_DROP_SUCCESS = (data) => ({ type: GET_SALES_DROPDOWN_SUCCESS, data });
export const GET_DROP_ERROR = data => ({ type: GET_SALES_DROPDOWN_ERROR, data: data });

export const SELECT_STATUS_INIT = () => ({ type: BUTTON_SELECT_STATUS_INIT });
export const SELECT_STATUS_SUCCESS = (data) => ({ type: BUTTON_SELECT_STATUS_SUCCESS, data: data });
export const SELECT_STATUS_ERROR = data => ({ type: BUTTON_SELECT_STATUS_ERROR, data: data });

export const SALES_TARGET_INIT = () => ({ type: GET_SALES_TARGET_INIT });
export const SALES_TARGET_SUCCESS = (data) => ({ type: GET_SALES_TARGET_SUCCESS, data: data });
export const SALES_TARGET_ERROR = data => ({ type: GET_SALES_TARGET_ERROR, data: data });

export const DELETE_STATUS_INIT = () => ({ type: DELETE_ACTIVE_STATUS_INIT });
export const DELETE_STATUS_SUCCESS = (data) => ({ type: DELETE_ACTIVE_STATUS_SUCCESS, data: data });
export const DELETE_STATUS_ERROR = data => ({ type: DELETE_ACTIVE_STATUS_ERROR, data: data });


export const CSV_FILE_INIT = () => ({ type: IMPORT_CSV_FILE_INIT });
export const CSV_FILE_SUCCESS = (data) => ({ type: IMPORT_CSV_FILE_SUCCESS, data: data });
export const CSV_FILE_ERROR = data => ({ type: IMPORT_CSV_FILE_ERROR, data: data });

export const TARGET_BY_ID_INIT = () => ({ type: GET_SALES_TARGET_BY_ID_INIT });
export const TARGET_BY_ID_SUCCESS = (data) => ({ type: GET_SALES_TARGET_BY_ID_SUCCESS, data: data });
export const TARGET_BY_ID_ERROR = data => ({ type: GET_SALES_TARGET_BY_ID_ERROR, data: data });

//Revenue Report
export const REVENUE_DATA_INIT = () => ({ type: GET_REVENUE_DATA_INIT });
export const REVENUE_DATA_SUCCESS = data => ({ type: GET_REVENUE_DATA_SUCCESS, data: data });
export const REVENUE_DATA_ERROR = data => ({ type: GET_REVENUE_DATA_ERROR, data: data });

export const ADD_REVENUE_INIT = () => ({ type: ADD_REVENUE_DATA_INIT });
export const ADD_REVENUE_SUCCESS = data => ({ type: ADD_REVENUE_DATA_SUCCESS, data: data });
export const ADD_REVENUE_ERROR = data => ({ type: ADD_REVENUE_DATA_ERROR, data: data });

export const REVENUE_BY_ID_INIT = () => ({ type: GET_REVENUE_BY_ID_INIT });
export const REVENUE_BY_ID_SUCCESS = (data) => ({ type: GET_REVENUE_BY_ID_SUCCESS, data: data });
export const REVENUE_BY_ID_ERROR = data => ({ type: GET_REVENUE_BY_ID_ERROR, data: data });

export const REVENUE_EDIT_INIT = () => ({ type: EDIT_REVENUE_DATA_INIT });
export const REVENUE_EDIT_SUCCESS = data => ({ type: EDIT_REVENUE_DATA_SUCCESS, data: data });
export const REVENUE_EDIT_ERROR = data => ({ type: EDIT_REVENUE_DATA_ERROR, data: data });

//TARGET
export const TARGET_DATA_INIT = () => ({ type: GET_TARGET_DATA_INIT });
export const TARGET_DATA_SUCCESS = data => ({ type: GET_TARGET_DATA_SUCCESS, data: data });
export const TARGET_DATA_ERROR = data => ({ type: GET_TARGET_DATA_ERROR, data: data });

export const ADD_TARGET_INIT = () => ({ type: ADD_TARGET_DATA_INIT });
export const ADD_TARGET_SUCCESS = data => ({ type: ADD_TARGET_DATA_SUCCESS, data: data });
export const ADD_TARGET_ERROR = data => ({ type: ADD_TARGET_DATA_ERROR, data: data });

export const TARGET_DATA_BY_ID_INIT = () => ({ type: GET_TARGET_BY_ID_INIT });
export const TARGET_DATA_BY_ID_SUCCESS = (data) => ({ type: GET_TARGET_BY_ID_SUCCESS, data: data });
export const TARGET_DATA_BY_ID_ERROR = data => ({ type: GET_TARGET_BY_ID_ERROR, data: data });

export const TARGET_EDIT_INIT = () => ({ type: EDIT_TARGET_DATA_INIT });
export const TARGET_EDIT_SUCCESS = data => ({ type: EDIT_TARGET_DATA_SUCCESS, data: data });
export const TARGET_EDIT_ERROR = data => ({ type: EDIT_TARGET_DATA_ERROR, data: data });

// Authentication
export const LOGIN_AUTH_INIT = () => ({ type: LOGIN_AUTHENTICATION_INIT });
export const LOGIN_AUTH_SUCCESS = (data) => ({ type: LOGIN_AUTHENTICATION_SUCCESS, data: data });
export const LOGIN_AUTH_ERROR = data => ({ type: LOGIN_AUTHENTICATION_ERROR, data: data });

export const LOGOUT_AUTH_INIT = () => ({ type: LOGOUT_AUTHENTICATION_INIT });
export const LOGOUT_AUTH_SUCCESS = (data) => ({ type: LOGOUT_AUTHENTICATION_SUCCESS, data: data });
export const LOGOUT_AUTH_ERROR = data => ({ type: LOGOUT_AUTHENTICATION_ERROR, data: data });

// Hr Candidacy
export const GET_CANDIDACY_INIT = () => ({ type: GET_HR_CANDIDACY_INIT });
export const GET_CANDIDACY_SUCCESS = (data) => ({ type: GET_HR_CANDIDACY_SUCCESS, data: data });
export const GET_CANDIDACY_ERROR = data => ({ type: GET_HR_CANDIDACY_ERROR, data: data });

export const GET_CANDIDACY_BY_ID_INIT = () => ({ type: GET_HR_CANDIDACY_BY_ID_INIT });
export const GET_CANDIDACY_BY_ID_SUCCESS = (data) => ({ type: GET_HR_CANDIDACY_BY_ID_SUCCESS, data: data });
export const GET_CANDIDACY_BY_ID_ERROR = data => ({ type: GET_HR_CANDIDACY_BY_ID_ERROR, data: data });

export const ADD_CANDIDACY_INIT = () => ({ type: ADD_HR_CANDIDACY_INIT });
export const ADD_CANDIDACY_SUCCESS = (data) => ({ type: ADD_HR_CANDIDACY_SUCCESS, data: data });
export const ADD_CANDIDACY_ERROR = data => ({ type: ADD_HR_CANDIDACY_ERROR, data: data });


export const ADD_HOLIDAY_INIT = () => ({ type: ADD_HR_HOLIDAY_INIT });
export const ADD_HOLIDAY_SUCCESS = (data) => ({ type: ADD_HR_HOLIDAY_SUCCESS, data: data });
export const ADD_HOLIDAY_ERROR = data => ({ type: ADD_HR_HOLIDAY_ERROR, data: data });

export const EDIT_HOLIDAY_INIT = () => ({ type: EDIT_HOLIDAY_DATA_INIT });
export const EDIT_HOLIDAY_SUCCESS = (data) => ({ type: EDIT_HOLIDAY_DATA_SUCCESS, data: data });
export const EDIT_HOLIDAY_ERROR = data => ({ type: EDIT_HOLIDAY_DATA_ERROR, data: data });

export const GET_HOLIDAY_BY_ID_INIT = () => ({ type: GET_HOLIDAY_DATA_BY_ID_INIT });
export const GET_HOLIDAY_BY_ID_SUCCESS = (data) => ({ type: GET_HOLIDAY_DATA_BY_ID_SUCCESS, data: data });
export const GET_HOLIDAY_BY_ID_ERROR = data => ({ type: GET_HOLIDAY_DATA_BY_ID_ERROR, data: data });

export const EDIT_CANDIDACY_INIT = () => ({ type: EDIT_HR_CANDIDACY_INIT });
export const EDIT_CANDIDACY_SUCCESS = (data) => ({ type: EDIT_HR_CANDIDACY_SUCCESS, data: data });
export const EDIT_CANDIDACY_ERROR = data => ({ type: EDIT_HR_CANDIDACY_ERROR, data: data });

export const EDIT_CANDIDACY_STATUS_INIT = () => ({ type: EDIT_HR_CANDIDACY_STATUS_INIT });
export const EDIT_CANDIDACY_STATUS_SUCCESS = (data) => ({ type: EDIT_HR_CANDIDACY_STATUS_SUCCESS, data: data });
export const EDIT_CANDIDACY_STATUS_ERROR = data => ({ type: EDIT_HR_CANDIDACY_STATUS_ERROR, data: data });

export const HRS_AUTOCOMPLETE_INIT = () => ({ type: GET_HRS_AUTOCOMPLETE_INIT });
export const HRS_AUTOCOMPLETE_SUCCESS = data => ({ type: GET_HRS_AUTOCOMPLETE_SUCCESS, data: data });
export const HRS_AUTOCOMPLETE_ERROR = data => ({ type: GET_HRS_AUTOCOMPLETE_ERROR, data: data });

export const GET_RESUME_INIT = () => ({ type: GET_RESUME_DATA_INIT });
export const GET_RESUMEE_SUCCESS = (data) => ({ type: GET_RESUME_DATA_SUCCESS, data: data });
export const GET_RESUMEE_ERROR = data => ({ type: GET_RESUME_DATA_ERROR, data: data });

export const CSV_HRFILE_INIT = () => ({ type: IMPORT_CSV_HRFILE_INIT });
export const CSV_HRFILE_SUCCESS = (data) => ({ type: IMPORT_CSV_HRFILE_SUCCESS, data: data });
export const CSV_HRFILE_ERROR = data => ({ type: IMPORT_CSV_HRFILE_ERROR, data: data });


// HRIS
export const GET_HR_HRIS_INIT = () => ({ type: GET_HRIS_INIT });
export const GET_HR_HRIS_SUCCESS = (data) => ({ type: GET_HRIS_SUCCESS, data: data });
export const GET_HR_HRIS_ERROR = data => ({ type: GET_HRIS_ERROR, data: data });

export const GET_HR_HRIS_BY_ID_INIT = () => ({ type: GET_HRIS_BY_ID_INIT });
export const GET_HR_HRIS_BY_ID_SUCCESS = (data) => ({ type: GET_HRIS_BY_ID_SUCCESS, data: data });
export const GET_HR_HRIS_BY_ID_ERROR = data => ({ type: GET_HRIS_BY_ID_ERROR, data: data });

export const ADD_HR_HRIS_INIT = () => ({ type: ADD_HRIS_INIT });
export const ADD_HR_HRIS_SUCCESS = (data) => ({ type: ADD_HRIS_SUCCESS, data: data });
export const ADD_HR_HRIS_ERROR = data => ({ type: ADD_HRIS_ERROR, data: data });

export const EDIT_HR_HRIS_INIT = () => ({ type: EDIT_HRIS_INIT });
export const EDIT_HR_HRIS_SUCCESS = (data) => ({ type: EDIT_HRIS_SUCCESS, data: data });
export const EDIT_HR_HRIS_ERROR = data => ({ type: EDIT_HRIS_ERROR, data: data });

// Leave Management
export const ADD_REQ_LEAVE_INIT = () => ({ type: ADD_LEAVE_INIT });
export const ADD_REQ_LEAVE_SUCCESS = (data) => ({ type: ADD_LEAVE_SUCCESS, data: data });
export const ADD_REQ_LEAVE_ERROR = data => ({ type: ADD_LEAVE_ERROR, data: data });

export const GET_LEAVEDATA_INIT = () => ({ type: GET_LEAVE_DATA_INIT });
export const GET_LEAVEDATA_SUCCESS = (data) => ({ type: GET_LEAVE_DATA_SUCCESS, data: data });
export const GET_LEAVEDATA_ERROR = data => ({ type: GET_LEAVE_DATA_ERROR, data: data });

export const EDIT_LEAVEDATA_INIT = () => ({ type: EDIT_LEAVE_DATA_INIT });
export const EDIT_LEAVEDATA_SUCCESS = (data) => ({ type: EDIT_LEAVE_DATA_SUCCESS, data: data });
export const EDIT_LEAVEDATA_ERROR = data => ({ type: EDIT_LEAVE_DATA_ERROR, data: data });

export const EDIT_LEAVESTATUS_INIT = () => ({ type: EDIT_LEAVE_STATUS_INIT });
export const EDIT_LEAVESTATUS_SUCCESS = (data) => ({ type: EDIT_LEAVE_STATUS_SUCCESS, data: data });
export const EDIT_LEAVESTATUS_ERROR = data => ({ type: EDIT_LEAVE_STATUS_ERROR, data: data });

export const GET_LEAVEDATA_BY_ID_INIT = () => ({ type: GET_LEAVE_DATA_BY_ID_INIT });
export const GET_LEAVEDATA_BY_ID_SUCCESS = (data) => ({ type: GET_LEAVE_DATA_BY_ID_SUCCESS, data: data });
export const GET_LEAVEDATA_BY_ID_ERROR = data => ({ type: GET_LEAVE_DATA_BY_ID_ERROR, data: data });

// JOB VACANCY Management
export const ADD_REQ_VACANCY_INIT = () => ({ type: ADD_VACANCY_INIT });
export const ADD_REQ_VACANCY_SUCCESS = (data) => ({ type: ADD_VACANCY_SUCCESS, data: data });
export const ADD_REQ_VACANCY_ERROR = data => ({ type: ADD_VACANCY_ERROR, data: data });

export const GET_VACANCYDATA_INIT = () => ({ type: GET_VACANCY_DATA_INIT });
export const GET_VACANCYDATA_SUCCESS = (data) => ({ type: GET_VACANCY_DATA_SUCCESS, data: data });
export const GET_VACANCYDATA_ERROR = data => ({ type: GET_VACANCY_DATA_ERROR, data: data });

export const EDIT_VACANCYDATA_INIT = () => ({ type: EDIT_VACANCY_DATA_INIT });
export const EDIT_VACANCYDATA_SUCCESS = (data) => ({ type: EDIT_VACANCY_DATA_SUCCESS, data: data });
export const EDIT_VACANCYDATA_ERROR = data => ({ type: EDIT_VACANCY_DATA_ERROR, data: data });

export const GET_VACANCYDATA_BY_ID_INIT = () => ({ type: GET_VACANCY_DATA_BY_ID_INIT });
export const GET_VACANCYDATA_BY_ID_SUCCESS = (data) => ({ type: GET_VACANCY_DATA_BY_ID_SUCCESS, data: data });
export const GET_VACANCYDATA_BY_ID_ERROR = data => ({ type: GET_VACANCY_DATA_BY_ID_ERROR, data: data });

export const HRTARGET_BY_ID_INIT = () => ({ type: GET_HR_TARGET_BY_ID_INIT });
export const HRTARGET_BY_ID_SUCCESS = (data) => ({ type: GET_HR_TARGET_BY_ID_SUCCESS, data: data });
export const HRTARGET_BY_ID_ERROR = data => ({ type: GET_HR_TARGET_BY_ID_ERROR, data: data });

// Dashboard Module
export const GET_DASH_DOB_DEPT_DATA_INIT = () => ({ type: GET_DOB_DEPT_DATA_INIT });
export const GET_DASH_DOB_DEPT_DATA_SUCCESS = (data) => ({ type: GET_DOB_DEPT_DATA_SUCCESS , data: data });
export const GET_DASH_DOB_DEPT_DATA_ERROR = (data) => ({ type: GET_DOB_DEPT_DATA_ERROR , data: data });

export const GET_DASH_TIMELOGTODAY_DATA_INIT = () => ({ type: GET_TIMELOGTODAY_DATA_INIT });
export const GET_DASH_TIMELOGTODAY_DATA_SUCCESS = (data) => ({ type: GET_TIMELOGTODAY_DATA_SUCCESS , data: data });
export const GET_DASH_TIMELOGTODAY_DATA_ERROR = (data) => ({ type: GET_TIMELOGTODAY_DATA_ERROR , data: data });

export const DELETE_HOLIDAY_INIT = () => ({ type: DELETE_HOLIDAY_STATUS_INIT });
export const DELETE_HOLIDAY_SUCCESS = (free) => ({ type: DELETE_HOLIDAY_STATUS_SUCCESS, data: free });
export const DELETE_HOLIDAY_ERROR = free => ({ type: DELETE_HOLIDAY_STATUS_ERROR, data: free });

//Project Management
export const PROJECT_DATA_INIT = () => ({ type: GET_PROJECT_DATA_INIT });
export const PROJECT_DATA_SUCCESS = data => ({ type: GET_PROJECT_DATA_SUCCESS, data: data });
export const PROJECT_DATA_ERROR = data => ({ type: GET_PROJECT_DATA_ERROR, data: data });

export const GET_PROJECT_ID_INIT = () => ({ type: GET_PROJECTS_BY_ID_INIT });
export const GET_PROJECT_ID_SUCCESS = data => ({ type: GET_PROJECTS_BY_ID_SUCCESS, data: data });
export const GET_PROJECT_ID_ERROR = data => ({ type: GET_PROJECTS_BY_ID_ERROR, data: data });

export const ADD_TASK_INIT = () => ({ type: ADD_PRO_TASK_INIT });
export const ADD_TASK_SUCCESS = (data) => ({ type: ADD_PRO_TASK_SUCCESS, data: data });
export const ADD_TASK_ERROR = data => ({ type: ADD_PRO_TASK_ERROR, data: data });

export const UP_PROJECT_INIT = () => ({ type: UPDATE_PROJECT_INIT });
export const UP_PROJECT_SUCCESS = data => ({ type: UPDATE_PROJECT_SUCCESS, data: data });
export const UP_PROJECT_ERROR = data => ({ type: UPDATE_PROJECT_ERROR, data: data });

export const MONTHLY_DATA_INIT = () => ({ type: GET_MONTHLY_DATA_INIT });
export const MONTHLY_DATA_SUCCESS = (data) => ({ type: GET_MONTHLY_DATA_SUCCESS , data: data });
export const MONTHLY_DATA_ERROR = (data) => ({ type: GET_MONTHLY_DATA_ERROR , data: data });