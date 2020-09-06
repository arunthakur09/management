import * as actionTypes from "../ActionTypes/ActionTypes";
import connection from "../../../Config/APIurl/connection";
import axios from "axios";
import swal from 'sweetalert';
import history from '../ActionTypes/ActionHistory';
import { getHeaders } from "../Header/AuthHeader"

let url;
export const getVacancyDataAction = (data) => {
        url = connection.concat(`/api/hrvacancies`);
        if (data){
            url = connection.concat(`/api/hrvacancies?jobTitle=${data.jobTitle}&from=${data.from}&to=${data.to}&timePeriod=${data.timePeriod}&hiringManager=${data.hiringManager}&month=${data.monthly}`);
        }
    return async dispatch => {
      dispatch(actionTypes.GET_VACANCYDATA_INIT());
      return axios
      .get(url, {headers: await getHeaders(true)})
      .then(res => {
        console.log(res, "Vacancy data get successfully");
        dispatch(actionTypes.GET_VACANCYDATA_SUCCESS(res.data.data));
      })
      .catch(error => {
        console.log(error, "Vacancy data not found error");
        dispatch(actionTypes.GET_VACANCYDATA_ERROR(error));
        if(error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          localStorage.removeItem("roleId");
          window.location.reload();
        }
      });
    };
  };

  export const getVacancyDataById = (data) => {
    let url = connection.concat(`/api/hrvacancies/${data.id}`);
    return async dispatch => {
        dispatch(actionTypes.GET_VACANCYDATA_BY_ID_INIT());
        return axios
        .get(url, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res, "Vacancy Data By Id data get successfully");
            dispatch(actionTypes.GET_VACANCYDATA_BY_ID_SUCCESS(res.data.data));
        })
        .catch(error => {
            console.log(error, "Vacancy Data By Id data not found error");
            dispatch(actionTypes.GET_VACANCYDATA_BY_ID_ERROR(error));
            if(error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("roleId");
                window.location.reload();
            }
        });
    };
};

export const editVacancydata = data => {
  let url = connection.concat(`/api/hrvacancies/${data.id}`);
  return async dispatch => {
      dispatch(actionTypes.EDIT_VACANCYDATA_INIT());
      return axios
      .patch(url, data, {headers: await getHeaders(true)})
      .then(res => {
          console.log(res, "Vacancy data edit successfully");
          dispatch(actionTypes.EDIT_VACANCYDATA_SUCCESS(data));
          if(res.status === 200) {
              swal({
                  title: "Success",
                  text: "Vacancy Data Edited",
                  icon: "success",
                  dangerMode: false,
              })
              .then((result => {
                  if(result) {
                      history.push('/vacancy')
                  }
              }));
          }
      })
      .catch(error => {
          console.log(error, "Vacancy data not edited error");
          dispatch(actionTypes.EDIT_VACANCYDATA_ERROR(error));
          if(error.response && error.response.status === 401) {
              localStorage.removeItem("token");
              localStorage.removeItem("userRole");
              localStorage.removeItem("roleId");
              window.location.reload();
          }
      });
  };
};

export const addVacancyRequestAction = (data) => {
    url = connection.concat(`/api/hrvacancies`);
    return async dispatch => {
        dispatch(actionTypes.ADD_REQ_VACANCY_INIT());
        return axios
        .post(url, data, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res, "Add Vacancy data get successfully");
            dispatch(actionTypes.ADD_REQ_VACANCY_SUCCESS(res));
            if(res.status === 200){
                swal({
                    title: "Success",
                    text: "Vacancy Requested",
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
            console.log(error, "Add Vacancy data not found error");
            dispatch(actionTypes.ADD_REQ_VACANCY_ERROR(error));
            if(error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("roleId");
                window.location.reload();
            }
        });
    };
};export const getVacancyTargetAction = (data) => {
    url = connection.concat(`/api/hrtargets`);
    if (data) {url = connection.concat(`/api/hrtargets?userId=${data.id}&from=${data.from}&to=${data.to}`)}
    return async dispatch => {
      dispatch(actionTypes.HRTARGET_BY_ID_INIT());
      return axios
      .get(url, { headers: await getHeaders(true)})
      .then(res => {
        console.log(res.data, "Vacancy data get Succesfull");
        dispatch(actionTypes.HRTARGET_BY_ID_SUCCESS(res.data));
      })
      .catch(error => {
        console.log(error, "Vacancy By ID not found error");
        dispatch(actionTypes.HRTARGET_BY_ID_ERROR(error));
        if(error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          localStorage.removeItem("roleId");
          window.location.reload();
        }
      });
    };
  };