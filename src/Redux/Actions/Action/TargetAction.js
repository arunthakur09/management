import * as actionTypes from "../ActionTypes/ActionTypes";
import connection from "../../../Config/APIurl/connection";
import axios from "axios";
import swal from 'sweetalert';
import history from '../ActionTypes/ActionHistory';
import { getHeaders } from "../Header/AuthHeader";
let url
export const getTargetDataAction = (data) => {
    url = connection.concat("/api/getTarget")
    return async dispatch => {
      dispatch(actionTypes.TARGET_DATA_INIT());
      return axios
      .get(url, {headers: await getHeaders(true)})
      .then(res => {
        console.log(res, "Target data get successfully");
        dispatch(actionTypes.TARGET_DATA_SUCCESS(res.data));
      })
      .catch(error => {
        console.log(error, "Target data not found error");
        dispatch(actionTypes.TARGET_DATA_ERROR(error));
        if(error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          localStorage.removeItem("roleId");
          window.location.reload();
        }
      });
    };
  };

  export const getTargetDataIdAction = (data) => {
    let url = connection.concat("/api/getTarget/"+data.id);
    return async dispatch => {
      dispatch(actionTypes.TARGET_DATA_BY_ID_INIT());
      return axios
      .get(url, {headers: await getHeaders(true)})
      .then(res => {
        console.log(res, "Target data get successfully");
        dispatch(actionTypes.TARGET_DATA_BY_ID_SUCCESS(res.data));
      })
      .catch(error => {
        console.log(error, "Target data not found error");
        dispatch(actionTypes.TARGET_DATA_BY_ID_ERROR(error));
        if(error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          localStorage.removeItem("roleId");
          window.location.reload();
        }
      });
    };
  };

  export const addTargetDataAction = data => {
    let url = connection.concat("/api/addsalesTarget");
    return async dispatch => {
      dispatch(actionTypes.ADD_TARGET_INIT());
      return axios
      .post(url, data, {headers: await getHeaders(true)})
      .then(res => {
        console.log(res, "Add Target successfully");
        dispatch(actionTypes.ADD_TARGET_SUCCESS(res.data));
        if(res.status === 200){
          swal({
            title: "Success",
            text: "Target Added",
            icon: "success",
            dangerMode: false,
            }).then((result => {
            if(result) {
              window.location.reload();
            }
        }));
        }
      })
      .catch(error => {
        console.log(error, "Add User error");
        dispatch(actionTypes.ADD_TARGET_ERROR(error));
        if(error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          localStorage.removeItem("roleId");
          window.location.reload();
        }
      });
    };
  };

  export const editTargetDataAction = data => {
    let url = connection.concat("/api/getTarget/" + data.id);
    return async dispatch => {
      dispatch(actionTypes.TARGET_EDIT_INIT());
      return axios
      .patch(url, data, {headers: await getHeaders(true)})
      .then(res => {
        console.log(res, "TARGET data success");
        dispatch(actionTypes.TARGET_EDIT_SUCCESS(res.data));
        if(res.status === 200){
          swal({
            title: "Success",
            text: "TARGET Data Updated",
            icon: "success",
            dangerMode: false,
            }).then((result => {
            if(result) {
              history.push('/sales')
            }
        }));
        }
      })
      .catch(error => {
        console.log(error, "revenue not found error");
        dispatch(actionTypes.REVENUE_EDIT_ERROR(error));
        if(error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          localStorage.removeItem("roleId");
          window.location.reload();
        }
        else {
          swal({
            title: "Error",
            text: "Something Went Wrong",
            icon: "error",
            dangerMode: true,
          })
        }
      });
    };
  };