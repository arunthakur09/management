import * as actionTypes from "../ActionTypes/ActionTypes";
import connection from "../../../Config/APIurl/connection";
import axios from "axios";
//import { toast } from "react-toastify";
import swal from 'sweetalert';
import history from '../ActionTypes/ActionHistory';
import { getHeaders } from "../Header/AuthHeader";

let url
export const getProjectDataAction = (data) => {
  url = connection.concat("/api/projectManagement");
  // if (data!==undefined){
  //   url = connection.concat(`/api/users?departmentName=${data.dept}&jobTitle=${data.jobTitle}&supervisor=${data.supervisor}&userId=${data.userid}&employeeStatus=${data.employeeStatus}&isActive=${data.isActive}&firstName=${data.firstName}&from=${data.from}&to=${data.to}&timePeriod=${data.timePeriod}&month=${data.monthly}`);
  // }
  return async dispatch => {
    dispatch(actionTypes.PROJECT_DATA_INIT());
    return axios
    .get(url, {headers: await getHeaders(true)})
    .then(res => {
      console.log(res, "Project data get successfully");
      dispatch(actionTypes.PROJECT_DATA_SUCCESS(res.data));
    })
    .catch(error => {
      console.log(error, "Project data not found error");
      dispatch(actionTypes.PROJECT_DATA_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        //window.location.reload();
      }
    });
  };
};
export const getProjectActionDataById = data => {
  let url = connection.concat(`/api/projectManagement/${data.id}`);
  // if (data && data.edit) {
  //   url = connection.concat(`/api/projectManagement/${data.id}?edit=${data.edit}`);
  // }
  return async dispatch => {
    dispatch(actionTypes.GET_PROJECT_ID_INIT());
    return axios
    .get(url, {headers: await getHeaders(true)})
    .then(res => {
      console.log(res, "get Proposal data By Id successfully");
      dispatch(actionTypes.GET_PROJECT_ID_SUCCESS(res));
    })
    .catch(error => {
      console.log(error, "get Proposal data By Id not found error");
      dispatch(actionTypes.GET_PROJECT_ID_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
       // window.location.reload();
      }
    });
  };
};
export const addTaskAction = (data) => {
  let url = connection.concat(`/api/taskManagement`);
  return async dispatch => {
      dispatch(actionTypes.ADD_TASK_INIT());
      return axios
      .post(url, data, {headers: await getHeaders(true)})
      .then(res => {
          console.log(res, "Added TASK successfully");
          dispatch(actionTypes.ADD_TASK_SUCCESS(res));
          if(res.status === 200){
              swal({
                  title: "Success",
                  text: "TASK Added",
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
          console.log(error, "Failed error");
          dispatch(actionTypes.ADD_TASK_ERROR(error));

          // if(error.response.status === 401) {
          //     localStorage.removeItem("token");
          //     localStorage.removeItem("userRole");
          //     localStorage.removeItem("roleId");
          //     window.location.reload();
          // }
      });
  };
};
export const updateProjectData = data => {
  let url = connection.concat(`/api/projectManagement/${data.id}`);
  return async dispatch => {
    dispatch(actionTypes.UP_PROJECT_INIT());
    return axios
    .patch(url, data, {headers: await getHeaders(true)})
    .then(res => {
      console.log(res, "Proposal data Updated successfully");
      dispatch(actionTypes.UP_PROJECT_SUCCESS(res.data.data));
      if(res.status === 200){
        swal({
          title: "Success",
          text: "Project Details Updated",
          icon: "success",
          dangerMode: false,
          }).then((result => {
          if(result) {
            if (parseInt(localStorage.getItem('roleId'))===3)
              history.push('/user/proposal')
            else {
             // history.push('/proposal')
            }
          }
      }));
      }
    })
    .catch(error => {
      console.log(error, "Proposal data Updated error");
      dispatch(actionTypes.UP_PROJECT_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
       // window.location.reload();
      }
    });
  };
};
export const getMonthlyDataAction = () => {
  let url = connection.concat("/api/taskManagement");
  return async dispatch => {
    dispatch(actionTypes.MONTHLY_DATA_INIT());
    return axios
    .get(url, {headers: await getHeaders(true)})
    .then(res => {
      console.log(res, "Dashboard data get successfully");
      dispatch(actionTypes.MONTHLY_DATA_SUCCESS(res.data));
    })
    .catch(error => {
      console.log(error, "Dashboard data not found error");
      dispatch(actionTypes.MONTHLY_DATA_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        // window.location.reload();
      }
    });
  };
};