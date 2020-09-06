import {
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
} from "../Actions/ActionConstant/ActionConstants";

const initialState = {
  employeeFilters: [],
  userData: [],
  userDepartData: [],
  addUserData: [],
  userDataById: [],
  permissionData: [],
  updateUserData: [],
  picData: [],
  isLoading: false,
  error: null
};

const UserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_DATA_INIT:
    return {
      ...state,
      isLoading: true
    };
    case GET_USERS_DATA_SUCCESS:
    return {
      ...state,
      userData: action.data,
      isLoading: false
    };
    case GET_USERS_DATA_ERROR:
    return {
      ...state,
      error: action.data ? action.data : null,
      isLoading: false
    };

    case GET_USERS_DEPARTMENTS_INIT:
    return {
      ...state,
      isLoading: true
    };
    case GET_USERS_DEPARTMENTS_SUCCESS:
    return {
      ...state,
      userDepartData: action.data ? action.data : null,
      isLoading: false
    };
    case GET_USERS_DEPARTMENTS_ERROR:
    return {
      ...state,
      error: action.data ? action.data : null,
      isLoading: false
    };

    case ADD_USERS_DATA_INIT:
    return {
      ...state,
      isLoading: true
    };
    case ADD_USERS_DATA_SUCCESS:
    return {
      ...state,
      addUserData: action.data,
      isLoading: false
    };
    case ADD_USERS_DATA_ERROR:
    return {
      ...state,
      error: action.data ? action.data : null,
      isLoading: false
    };
      
    case EDIT_USERS_INIT:
    return {
      ...state,
      isLoading: true
    };
    case EDIT_USERS_SUCCESS:
    return {
      ...state,
      userDataById: action.data,
      isLoading: false
    };
    case EDIT_USERS_ERROR:
    return {
      ...state,
      error: action.data ? action.data : null,
      isLoading: false
    };

    case GET_USERS_PERMISSION_INIT:
    return {
      ...state,
      isLoading: true
    };
    case GET_USERS_PERMISSION_SUCCESS:
    return {
      ...state,
      permissionData: action.data,
      isLoading: false
    };
    case GET_USERS_PERMISSION_ERROR:
    return {
      ...state,
      error: action.data ? action.data : null,
      isLoading: false
    };

    case UPDATE_USERS_INIT:
    return {
      ...state,
      isLoading: true
    };
    case UPDATE_USERS_SUCCESS:
    return {
      ...state,
      updateUserData: action.data,
      isLoading: false
    };
    case UPDATE_USERS_ERROR:
    return {
      ...state,
      error: action.data ? action.data : null,
      isLoading: false
    };

    case IMPORT_PIC_FILE_INIT : 
        return {
            ...state,
            isLoading : true
        };
        case IMPORT_PIC_FILE_SUCCESS : 
        return {
            ...state,
            picData : action.data,
            isLoading : false
        };
        case IMPORT_PIC_FILE_ERROR : 
        return {
            ...state,
            error : action.data ? action.data : null,
            isLoading : false
        };

    case GET_USERS_AUTOCOMPLETE_INIT:
      return {
        ...state,
        isLoading: true
      };
      case GET_USERS_AUTOCOMPLETE_SUCCESS:
      return {
        ...state,
        employeeFilters: action.data,
        isLoading: false
      };
      case GET_USERS_AUTOCOMPLETE_ERROR:
      return {
        ...state,
        error: action.data ? action.data : null,
        isLoading: false
      };
      case UPDATE_USER_ISACTIVE_INIT :
      return {
          ...state,
          isLoading : true
      };
      case UPDATE_USER_ISACTIVE_SUCCESS :
      const userId = action.data.id;
      const isActive = action.data.isActive;

      let userData = state.userData;
      
      return {
          ...state,
          userData:{
              ...userData,
              result: state.userData.result.map(user=> {
                  if(user.id === userId) {
                    user.isActive = isActive;
                  }
                  return user;
              })
          },
          isLoading : !state.isLoading,
      };

      case UPDATE_USER_ISACTIVE_ERROR : 
      return {
          ...state,
          error : action.data ? action.data : null,
          isLoading : false
      };
    default:
  }
  return state;
};

export default UserProfileReducer;
