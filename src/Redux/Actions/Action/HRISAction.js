import * as actionTypes from "../ActionTypes/ActionTypes";
import connection from "../../../Config/APIurl/connection";
import axios from "axios";
import swal from 'sweetalert';
import history from '../ActionTypes/ActionHistory';
import { getHeaders } from "../Header/AuthHeader"

export const getHris = (data) => {
  let url = connection.concat("/api/HRIS");
  if (data) {
    url = connection.concat(`/api/HRIS?userId=${data.userid}&from=${data.from}&to=${data.to}&timePeriod=${data.timePeriod}&month=${data.monthly}`);
}
  return async dispatch => {
    dispatch(actionTypes.GET_HR_HRIS_INIT());
    return axios
    .get(url, {headers: await getHeaders(true)})
    .then(res => {
      console.log(res, "HRIS data get successfully");
      dispatch(actionTypes.GET_HR_HRIS_SUCCESS(res.data));
    })
    .catch(error => {
      console.log(error, "HRIS data not found error");
      dispatch(actionTypes.GET_HR_HRIS_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        window.location.reload();
      }
    });
  };
};

export const addhris = data => {
    let url = connection.concat("/api/HRIS");
    return async dispatch => {
      dispatch(actionTypes.GET_HR_HRIS_INIT());
      return axios
      .post(url, data, {headers: await getHeaders(true)})
      .then(res => {
        console.log(res, "HRIS data add successfully");
        dispatch(actionTypes.GET_HR_HRIS_SUCCESS(res));
        if(res.status === 200){
          swal({
            title: "Success",
            text: "HRIS Added",
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
        console.log(error, "HRIS data not add error");
        dispatch(actionTypes.GET_HR_HRIS_ERROR(error));
        if(error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          localStorage.removeItem("roleId");
          window.location.reload();
        }
      });
    };
  };
  
  export const getHrisDataById = (data) => {
    let url = connection.concat(`/api/HRIS/${data.id}`);
    
    return async dispatch => {
        dispatch(actionTypes.GET_HR_HRIS_BY_ID_INIT());
        return axios
        .get(url, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res, "HRIS Data By Id data get successfully");
            dispatch(actionTypes.GET_HR_HRIS_BY_ID_SUCCESS(res.data.data));
        })
        .catch(error => {
            console.log(error, "HRIS Data By Id data not found error");
            dispatch(actionTypes.GET_HR_HRIS_BY_ID_ERROR(error));
            if(error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("roleId");
                window.location.reload();
            }
        });
    };
};

  export const editHrisdata = data => {
    let url = connection.concat(`/api/HRIS/${data.id}`);
    return async dispatch => {
        dispatch(actionTypes.EDIT_HR_HRIS_INIT());
        return axios
        .patch(url, data, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res, "HRIS data edit successfully");
            dispatch(actionTypes.EDIT_HR_HRIS_SUCCESS(data));
            if(res.status === 200) {
                swal({
                    title: "Success",
                    text: "HRIS Data Edited",
                    icon: "success",
                    dangerMode: false,
                })
                .then((result => {
                    if(result) {
                        history.push('/HRIS')
                    }
                }));
            }
        })
        .catch(error => {
            console.log(error, "HRIS data not edited error");
            dispatch(actionTypes.EDIT_HR_HRIS_ERROR(error));
            if(error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("roleId");
                window.location.reload();
            }
        });
    };
  };