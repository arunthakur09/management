import * as actionTypes from "../ActionTypes/ActionTypes";
import connection from "../../../Config/APIurl/connection";
import axios from "axios";
import swal from 'sweetalert';
import history from '../ActionTypes/ActionHistory';
import { getHeaders } from "../Header/AuthHeader"

let url;
export const getLeaveDataAction = (data) => {
        url = connection.concat(`/api/leaveManagement`);
        if (data) {
            url = connection.concat(`/api/leaveManagement?status=${data.status}&from=${data.from}&to=${data.to}&userid=${data.userid }&timePeriod=${data.timePeriod}&month=${data.monthly}`);
        }
    return async dispatch => {
      dispatch(actionTypes.GET_LEAVEDATA_INIT());
      return axios
      .get(url, {headers: await getHeaders(true)})
      .then(res => {
        console.log(res, "Leave data get successfully");
        dispatch(actionTypes.GET_LEAVEDATA_SUCCESS(res.data));
      })
      .catch(error => {
        console.log(error, "Leave data not found error");
        dispatch(actionTypes.GET_LEAVEDATA_ERROR(error));
        if(error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          localStorage.removeItem("roleId");
          window.location.reload();
        }
      });
    };
  };

  export const getLeaveDataById = (data) => {
    let url = connection.concat(`/api/leaveManagement/${data.id}`);
    return async dispatch => {
        dispatch(actionTypes.GET_LEAVEDATA_BY_ID_INIT());
        return axios
        .get(url, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res, "Leave Data By Id data get successfully");
            dispatch(actionTypes.GET_LEAVEDATA_BY_ID_SUCCESS(res.data.data));
        })
        .catch(error => {
            console.log(error, "Leave Data By Id data not found error");
            dispatch(actionTypes.GET_LEAVEDATA_BY_ID_ERROR(error));
            if(error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("roleId");
                window.location.reload();
            }
        });
    };
};

export const editDashboardLeaveData = data => {
    let url = connection.concat(`/api/leaveManagement/${data.id}`);
    return async dispatch => {
        dispatch(actionTypes.EDIT_LEAVEDATA_INIT());
        return axios
        .patch(url, data, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res, "Leave data edit successfully");
            dispatch(actionTypes.EDIT_LEAVEDATA_SUCCESS(data));
            if(res.status === 200) {
                swal({
                    title: "Success",
                    text: "Leave Data Edited",
                    icon: "success",
                    dangerMode: false,
                })
                .then((result => {
                    if(result) {
                        history.push('/Dashboard')
                    }
                }));
            }
        })
        .catch(error => {
            console.log(error, "Leave data not edited error");
            dispatch(actionTypes.EDIT_LEAVEDATA_ERROR(error));
            if(error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("roleId");
                window.location.reload();
            }
        });
    };
  };
export const editLeavedata = data => {
  let url = connection.concat(`/api/leaveManagement/${data.id}`);
  return async dispatch => {
      dispatch(actionTypes.EDIT_LEAVEDATA_INIT());
      return axios
      .patch(url, data, {headers: await getHeaders(true)})
      .then(res => {
          console.log(res, "Leave data edit successfully");
          dispatch(actionTypes.EDIT_LEAVEDATA_SUCCESS(data));
          if(res.status === 200) {
              swal({
                  title: "Success",
                  text: "Leave Data Edited",
                  icon: "success",
                  dangerMode: false,
              })
              .then((result => {
                  if(result) {
                      history.push('/Leavemanagement')
                  }
              }));
          }
      })
      .catch(error => {
          console.log(error, "Leave data not edited error");
          dispatch(actionTypes.EDIT_LEAVEDATA_ERROR(error));
          if(error.response && error.response.status === 401) {
              localStorage.removeItem("token");
              localStorage.removeItem("userRole");
              localStorage.removeItem("roleId");
              window.location.reload();
          }
      });
  };
};

export const editLeavestatus = data => {
    let url = connection.concat(`/api/Leavemanagement/${data.id}`);
    return async dispatch => {
        dispatch(actionTypes.EDIT_LEAVESTATUS_INIT());
        return axios
        .patch(url, data, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res, "Leave Status data edit successfully");
            dispatch(actionTypes.EDIT_LEAVESTATUS_SUCCESS(data));
        })
        .catch(error => {
            console.log(error, "Leave Status data not edited error");
            dispatch(actionTypes.EDIT_LEAVESTATUS_ERROR(error));
            if(error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("roleId");
                window.location.reload();
            }
        });
    };
};

export const addLeaveRequestAction = (data) => {
    url = connection.concat(`/api/leaveManagement`);
    return async dispatch => {
        dispatch(actionTypes.ADD_REQ_LEAVE_INIT());
        return axios
        .post(url, data, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res, "Add Leave data get successfully");
            dispatch(actionTypes.ADD_REQ_LEAVE_SUCCESS(res));
            if(res.status === 200){
                swal({
                    title: "Success",
                    text: "Leave Requested",
                    icon: "success",
                    dangerMode: false,
                })
                .then((result => {
                    if(result) {
                        window.location.reload();
                    }
                }));
            }
        })
        .catch(error => {
            console.log(error, "Add Leave data not found error");
            dispatch(actionTypes.ADD_REQ_LEAVE_ERROR(error));
            if(error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("roleId");
                window.location.reload();
            }
        });
    };
};