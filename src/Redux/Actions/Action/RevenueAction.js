import * as actionTypes from "../ActionTypes/ActionTypes";
import connection from "../../../Config/APIurl/connection";
import axios from "axios";
import swal from 'sweetalert';
import history from '../ActionTypes/ActionHistory';
import { getHeaders } from "../Header/AuthHeader";
let url
export const getRevenueDataAction = (data) => {
  if(data.month===""){
    url = connection.concat("/api/revenue?projectType="+data.projectType);}
    url = connection.concat("/api/revenue?month="+data.month+"&projectType="+data.projectType+'&timeperiod='+data.timePeriod+'&from='+data.from+'&to='+data.to)
    return async dispatch => {
      dispatch(actionTypes.REVENUE_DATA_INIT());
      return axios
      .get(url, {headers: await getHeaders(true)})
      .then(res => {
        console.log(res, "Revenue data get successfully");
        dispatch(actionTypes.REVENUE_DATA_SUCCESS(res.data));
      })
      .catch(error => {
        console.log(error, "Revenue data not found error");
        dispatch(actionTypes.REVENUE_DATA_ERROR(error));
        if(error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          localStorage.removeItem("roleId");
          window.location.reload();
        }
      });
    };
  };

  export const getRevenueDataIdAction = (data) => {
    let url = connection.concat("/api/revenue/"+data.id);
    return async dispatch => {
      dispatch(actionTypes.REVENUE_BY_ID_INIT());
      return axios
      .get(url, {headers: await getHeaders(true)})
      .then(res => {
        console.log(res, "Revenue data get successfully");
        dispatch(actionTypes.REVENUE_BY_ID_SUCCESS(res.data));
      })
      .catch(error => {
        console.log(error, "Revenue data not found error");
        dispatch(actionTypes.REVENUE_BY_ID_ERROR(error));
        if(error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          localStorage.removeItem("roleId");
          window.location.reload();
        }
      });
    };
  };

  export const addRevenueDataAction = data => {
    let url = connection.concat("/api/revenue?"+data.week+"="+data.val);
    return async dispatch => {
      dispatch(actionTypes.ADD_REVENUE_INIT());
      return axios
      .post(url, data, {headers: await getHeaders(true)})
      .then(res => {
        console.log(res, "Add Revenue successfully");
        dispatch(actionTypes.ADD_REVENUE_SUCCESS(res.data));
        if(res.status === 200){
          swal({
            title: "Success",
            text: "Revenue Added",
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
        dispatch(actionTypes.ADD_REVENUE_ERROR(error));
        swal({
          title: "Error",
          text: "Fillout All fields",
          icon: "error",
          dangerMode: true,
          })
        if(error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          localStorage.removeItem("roleId");
          window.location.reload();
        }
      });
    };
  };

  export const editRevenueDataAction = data => {
    let url = connection.concat("/api/revenue/" + data.id+"?"+data.week+"="+data.val);
    return async dispatch => {
      dispatch(actionTypes.REVENUE_EDIT_INIT());
      return axios
      .patch(url, data, {headers: await getHeaders(true)})
      .then(res => {
        console.log(res, "Revenue data success");
        dispatch(actionTypes.REVENUE_EDIT_SUCCESS(res.data));
        if(res.status === 200){
          swal({
            title: "Success",
            text: "revenue Data Updated",
            icon: "success",
            dangerMode: false,
            }).then((result => {
            if(result) {
              history.push('/revenue')
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