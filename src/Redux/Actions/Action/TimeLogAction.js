import * as actionTypes from "../ActionTypes/ActionTypes";
import connection from "../../../Config/APIurl/connection";
import axios from "axios";
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import { getHeaders } from "../Header/AuthHeader";
import * as actionCreator from "../ActionTypes/index";

export const addCheckIn = data => {
  let url = connection.concat("/api/timelog");
  let task = data.task;
  return async dispatch => {
    dispatch(actionTypes.CHECKIN_INIT());
    return axios
    .post(url, data, {headers: await getHeaders(true),isLoading:false})
    .then(res => {
      if(res.data.statusText === 'error'){
        return  toast.error(res.data.result)
      }
      console.log(res, "data Check In successfully");
      dispatch(actionTypes.CHECKIN_SUCCESS(res));
      if (res.data.result==="You have successfully Checked-in,Welcome back!"){
        toast.success(res.data.result)
        //window.location.reload();
        swal({
          title: "Your Assigned Tasks",
          text: "Tasks: "+task,
          icon: "info",
          timer: 3000,
          buttons:false,
          dangerMode: false,
      });
      } else {
        toast.info(res.data.result);
      }
    })
    .catch(error => {
      console.log(error, "data Check In error");
      dispatch(actionTypes.CHECKIN_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        window.location.reload();
      }
    });
  };
};

export const updateCheckout = (userId) => {
  let url = connection.concat(`/api/timelog/${userId.userId}`);
  return async dispatch => {
    dispatch(actionTypes.CHECKOUT_INIT());
    return axios
    .patch(url, userId, {headers: await getHeaders(true)})
    .then(res => {
      console.log(res, "checkout successfully");
      if(res.data.statusText === 'error'){
        return  toast.error(res.data.result)
      }
      dispatch(actionTypes.CHECKOUT_SUCCESS(userId));
      toast.success(res.data.result)
     //window.location.reload();
     dispatch(actionCreator.getTimeTableDataAction())
    })
    .catch(error => {
      console.log(error, "checkout error");
      dispatch(actionTypes.CHECKOUT_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        window.location.reload();
      }
    });
  };
};

export const getTimeTableDataAction =(data) => {
  let url = connection.concat("/api/timelog");
  if (data) {
    url = connection.concat(`/api/timelog?userId=${data.userid}&from=${data.from}&to=${data.to}&timePeriod=${data.timePeriod}&month=${data.monthly}`);
  }
  return async dispatch => {
    dispatch(actionTypes.GET_TIME_INIT());
    return axios
    .get(url, {headers: await getHeaders(true)})
    .then(timedata => {
      //console.log(">>>>>>>",timedata.data, "Time table data success");
      dispatch(actionTypes.GET_TIME_SUCCESS(timedata.data.data));
    })
    .catch(error => {
      console.log(error, "Time Table data error");
      dispatch(actionTypes.GET_TIME_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        //window.location.reload();
      }
    });
  };
};
