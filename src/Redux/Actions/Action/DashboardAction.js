import * as actionTypes from "../ActionTypes/ActionTypes";
import connection from "../../../Config/APIurl/connection";
import axios from "axios";
import swal from 'sweetalert';
//import history from '../ActionTypes/ActionHistory';
import { getHeaders } from "../Header/AuthHeader";
//import { toast } from "react-toastify";

export const getDashboard = () => {
  let url = connection.concat("/api/getBirthday?isDepartmentHead=1");
  return async dispatch => {
    dispatch(actionTypes.GET_DASH_DOB_DEPT_DATA_INIT());
    return axios
    .get(url, {headers: await getHeaders(true)})
    .then(res => {
      console.log(res, "Dashboard data get successfully");
      dispatch(actionTypes.GET_DASH_DOB_DEPT_DATA_SUCCESS(res.data));
    })
    .catch(error => {
      console.log(error, "Dashboard data not found error");
      dispatch(actionTypes.GET_DASH_DOB_DEPT_DATA_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        // window.location.reload();
      }
    });
  };
};

export const getDashboardTimelog = () => {
  let url = connection.concat("/api/getAttendance");
  return async dispatch => {
    dispatch(actionTypes.GET_DASH_TIMELOGTODAY_DATA_INIT());
    return axios
    .get(url, {headers: await getHeaders(true)})
    .then(res => {
      console.log(res, "Dashboard TIMELOGTODAY data get successfully");
      dispatch(actionTypes.GET_DASH_TIMELOGTODAY_DATA_SUCCESS(res.data));
    })
    .catch(error => {
      console.log(error, "Dashboard TIMELOGTODAY data not found error");
      dispatch(actionTypes.GET_DASH_TIMELOGTODAY_DATA_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        // window.location.reload();
      }
    });
  };
};
export const deleteHolidayData = (data) => {
  console.log("dfghdfgdfhdf", data)
  let url = connection.concat(`/api/holiday/${data.id}`);
  return async dispatch => {
    dispatch(actionTypes.DELETE_HOLIDAY_INIT());
    return axios
    .delete(url, {headers: await getHeaders(true)})
    .then(res => {
      console.log(data, "HOLIDAY DELETED successfully");
      dispatch(actionTypes.DELETE_HOLIDAY_SUCCESS(data));
      if(res.status === 200){
        swal({
          title: "Success",
          text: "Holiday deleted!",
          icon: "success",
          dangerMode: false,
        })
        .then((result => {
            if(result) {
                //window.location.reload();
            }
        }));
    }
})
    .catch(error => {
      console.log(error, "HOLIDAY DELETEION Change error");
      dispatch(actionTypes.DELETE_HOLIDAY_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
       // window.location.reload();
      }
    });
  };
};
