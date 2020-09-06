import {
  ADD_CHECKIN_INIT,
  ADD_CHECKIN_SUCCESS,
  ADD_CHECKIN_ERROR,
  
  UPDATE_CHECKOUT_INIT,
  UPDATE_CHECKOUT_SUCCESS,
  UPDATE_CHECKOUT_ERROR,

  GET_TIME_TABLE_INIT,
  GET_TIME_TABLE_SUCCESS,
  GET_TIME_TABLE_ERROR,
} from "../Actions/ActionConstant/ActionConstants";

const initialState = {
  postData: [],
  patchData: [],
  timeData: [],
  isLoading: false,
  error: null
};

const TimeLogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHECKIN_INIT:
    return {
      ...state,
      isLoading: true
    };

    case ADD_CHECKIN_SUCCESS:
    return {
      ...state,
      timeData: [...action.data.data.data.getUsers],
      postData: action.data ? action.data : null,
      isLoading: false
    };

    // case ADD_CHECKIN_SUCCESS:
    //   var timelog= [...state.timeData];
    //   if (action.data.data.result==="Success"){
    //     timelog = [...state.timeData, action.data && action.data.data.data.getUsers[0]];
    //   };
    // return {
    //   ...state,
    //   timeData: timelog,
    //   postData: action.data ? action.data : null,
    //   isLoading: false
    // };
    case ADD_CHECKIN_ERROR:
    return {
      ...state,
      error: action.data ? action.data : null,
      isLoading: false
    };

    case UPDATE_CHECKOUT_INIT:
    return {
      ...state,
      isLoading: true
    };
    case UPDATE_CHECKOUT_SUCCESS:
    return {
      ...state,
      patchData: action.data ? action.data : null,
      isLoading: false
    };
    case UPDATE_CHECKOUT_ERROR:
    return {
      ...state,
      error: action.data ? action.data : null,
      isLoading: false
    };
    case GET_TIME_TABLE_INIT:
    return {
      ...state,
      isLoading: true
    };
    case GET_TIME_TABLE_SUCCESS:
    return {
      ...state,
      timeData: action.data,
      isLoading: false
    };
    case GET_TIME_TABLE_ERROR:
    return {
      ...state,
      error: action.data ? action.data : null,
      isLoading: false
    };
    default:
  }
  return state;
};

export default TimeLogReducer;
