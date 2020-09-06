import * as actionTypes from "../ActionTypes/ActionTypes";
import connection from "../../../Config/APIurl/connection";
import axios from "axios";
import swal from 'sweetalert';
import { toast } from "react-toastify";
import history from '../ActionTypes/ActionHistory';
import { getHeaders } from "../Header/AuthHeader"

let url;
export const getHrCandidacyAction = (data) => {
    
    if (data === undefined) {
        url = connection.concat(`/api/hrcandidacy`);
    }
    else {
        if (data) {
            url = connection.concat(`/api/hrcandidacy?timePeriod=${data.timePeriod}&outcome=${data.outcome}&userId=${data.hiringManager}&skills=${data.skills}&from=${data.from}&to=${data.to}&isActive=${data.isActive}&candidateName=${data.candidateName}&month=${data.monthly}`);
        }
    }
    return async dispatch => {
        dispatch(actionTypes.GET_CANDIDACY_INIT());
        return axios
        .get(url, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res, "Hr Candidacy data get successfully");
            dispatch(actionTypes.GET_CANDIDACY_SUCCESS(res.data.data));
        })
        .catch(error => {
            console.log(error, "Hr Candidacy data not found error");
            dispatch(actionTypes.GET_CANDIDACY_ERROR(error));
            if(error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("roleId");
                window.location.reload();
        }
        });
    };
};

export const getCandidateById = (data) => {
    let url = connection.concat(`/api/hrcandidacy/${data.id}?edit=${data.emp}`);
    return async dispatch => {
        dispatch(actionTypes.GET_CANDIDACY_BY_ID_INIT());
        return axios
        .get(url, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res, "Hr Candidacy By Id data get successfully");
            dispatch(actionTypes.GET_CANDIDACY_BY_ID_SUCCESS(res.data.data));
        })
        .catch(error => {
            console.log(error, "Hr Candidacy By Id data not found error");
            dispatch(actionTypes.GET_CANDIDACY_BY_ID_ERROR(error));
            if(error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("roleId");
                window.location.reload();
            }
        });
    };
};

export const addCandidateAction = (data) => {
    let url = connection.concat(`/api/hrcandidacy`);
    const formData = new FormData();
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }
    
    return async dispatch => {
        dispatch(actionTypes.ADD_CANDIDACY_INIT());
        return axios
        .post(url, formData, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res, "Add Hr Candidacy data get successfully");
            dispatch(actionTypes.ADD_CANDIDACY_SUCCESS(res));
            if(res.status === 200){
                swal({
                    title: "Success",
                    text: "Candidate Added",
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
            console.log(error, "Add Hr Candidacy data not found error");
            dispatch(actionTypes.ADD_CANDIDACY_ERROR(error));

            // if(error.response.status === 401) {
            //     localStorage.removeItem("token");
            //     localStorage.removeItem("userRole");
            //     localStorage.removeItem("roleId");
            //     window.location.reload();
            // }
        });
    };
};

export const editHrCandidacy = data => {
    let url = connection.concat(`/api/hrcandidacy/${data.id}`);
    return async dispatch => {
        dispatch(actionTypes.EDIT_CANDIDACY_INIT());
        return axios
        .patch(url, data, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res, "Hr Candidacy data edit successfully");
            dispatch(actionTypes.EDIT_CANDIDACY_SUCCESS(data));
            if(res.status === 200) {
                swal({
                    title: "Success",
                    text: "Hr Candidacy Edited",
                    icon: "success",
                    dangerMode: false,
                })
                .then((result => {
                    if(result) {
                        history.push('/hrCandidacy')
                    }
                }));
            }
        })
        .catch(error => {
            console.log(error, "Hr Candidacy data not edited error");
            dispatch(actionTypes.EDIT_CANDIDACY_ERROR(error));
            if(error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("roleId");
                window.location.reload();
            }
        });
    };
};

export const editHrCandidacyStatus = data => {
    let url = connection.concat(`/api/hrcandidacy/${data.id}`);
    return async dispatch => {
        dispatch(actionTypes.EDIT_CANDIDACY_STATUS_INIT());
        return axios
        .patch(url, data, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res, "Hr Candidacy Status data edit successfully");
            dispatch(actionTypes.EDIT_CANDIDACY_STATUS_SUCCESS(data));
        })
        .catch(error => {
            console.log(error, "Hr Candidacy Status data not edited error");
            dispatch(actionTypes.EDIT_CANDIDACY_STATUS_ERROR(error));
            if(error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("roleId");
                window.location.reload();
            }
        });
    };
};
export const getHRSAutocompleteAction = () => {
    url = connection.concat("/api/hrcandidacy");
    return async dispatch => {
      dispatch(actionTypes.HRS_AUTOCOMPLETE_INIT());
      return axios
      .get(url, {headers: await getHeaders(true)})
      .then(res => {
        console.log(res, "HR  AUTOCOMPLETE data get successfully");
        dispatch(actionTypes.HRS_AUTOCOMPLETE_SUCCESS(res.data));
      })
      .catch(error => {
        console.log(error, "HR AUTOCOMPLETE data not found error");
        dispatch(actionTypes.HRS_AUTOCOMPLETE_ERROR(error));
        if(error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          localStorage.removeItem("roleId");
          window.location.reload();
        }
      });
    };
  };
  
  export const resumeAction = (file) => {
    let url = connection.concat(`/api/uploadresume/${file.id}`);
    const formData = new FormData();
    formData.append('file',file.file)
    return async dispatch => {
        debugger
        dispatch(actionTypes.GET_RESUME_INIT());
        return axios
        .patch(url, formData, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res.data, "Resume uploaded successfully");
            dispatch(actionTypes.GET_RESUMEE_SUCCESS(res.data));
            toast.success("File Uploaded!", {
                autoClose: 1000
              });
        })
        .catch(error => {
            console.log(error, "resume error");
            dispatch(actionTypes.GET_RESUMEE_ERROR(error));
            if(error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("roleId");
                window.location.reload();
                toast.error("Something Went Wrong!", {
                    autoClose: 1000
                  })
            }
        });
    };
};
export const importCsvHRFileAction = (csv) => {

    let url = connection.concat(`/api/csvupload`);
    const formData = new FormData();
    formData.append('csv',csv)
    return async dispatch => {
      dispatch(actionTypes.CSV_HRFILE_INIT());
      return axios
      .post(url, formData, { headers: await getHeaders(true)})
      .then(res => {
        console.log(res.data, "CSV File Upload Succesfully");
        dispatch(actionTypes.CSV_HRFILE_SUCCESS(res.data));
        if(res.status === 200){
            swal({
                title: "Success",
                text: "Candidate Added",
                icon: "success",
                dangerMode: false,
            })
            .then((result => {
                if(result) {
                    window.location.reload();
                }
            }));
      }})
      .catch(error => {
        console.log(error, "CSV File Upload error");
        dispatch(actionTypes.CSV_HRFILE_ERROR(error));
        if(error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          localStorage.removeItem("roleId");
          window.location.reload();
          swal({
            title: "Warning",
            text: "Error",
            icon: "Warning",
            dangerMode: false,
        })
        }
      });
    };
  };
  export const addHolidayAction = (data) => {
    let url = connection.concat(`/api/holiday`);
    return async dispatch => {
        dispatch(actionTypes.ADD_HOLIDAY_INIT());
        return axios
        .post(url, data, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res, "Added Holiday successfully");
            dispatch(actionTypes.ADD_HOLIDAY_SUCCESS(res));
            if(res.status === 200){
                swal({
                    title: "Success",
                    text: "Holiday Added",
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
            console.log(error, "Failed error");
            dispatch(actionTypes.ADD_HOLIDAY_ERROR(error));

            // if(error.response.status === 401) {
            //     localStorage.removeItem("token");
            //     localStorage.removeItem("userRole");
            //     localStorage.removeItem("roleId");
            //     window.location.reload();
            // }
        });
    };
};
export const editDashboardHolidayData = data => {
    let url = connection.concat(`/api/holiday/${data.id}`);
    return async dispatch => {
        dispatch(actionTypes.EDIT_HOLIDAY_INIT());
        return axios
        .patch(url, data, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res, "Holiday data edit successfully");
            dispatch(actionTypes.EDIT_HOLIDAY_SUCCESS(data));
            if(res.status === 200) {
                swal({
                    title: "Success",
                    text: "Holiday Data Edited",
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
            console.log(error, "Holiday data not edited error");
            dispatch(actionTypes.EDIT_HOLIDAY_ERROR(error));
            if(error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("roleId");
                window.location.reload();
            }
        });
    };
  };



export const getHolidayDataById = (data) => {
    let url = connection.concat(`/api/holiday/${data.id}`);
    return async dispatch => {
        dispatch(actionTypes.GET_HOLIDAY_BY_ID_INIT());
        return axios
        .get(url, {headers: await getHeaders(true)})
        .then(res => {
            console.log(res, "HOLIDAY Data By Id data get successfully");
            dispatch(actionTypes.GET_HOLIDAY_BY_ID_SUCCESS(res.data.data));
        })
        .catch(error => {
            console.log(error, "HOLIDAY Data By Id data not found error");
            dispatch(actionTypes.GET_HOLIDAY_BY_ID_ERROR(error));
            if(error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                localStorage.removeItem("roleId");
                window.location.reload();
            }
        });
    };
};