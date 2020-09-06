import * as actionTypes from "../ActionTypes/ActionTypes";
import connection from "../../../Config/APIurl/connection";
import axios from "axios";
import swal from 'sweetalert';
import { toast } from "react-toastify";
import history from '../ActionTypes/ActionHistory';
import { getHeaders } from "../Header/AuthHeader";

let url
export const getSalesActionData = (data) => {
  if (data && data.add===true){url = connection.concat(`/api/proposalsubmission?status=${data.status}&clientName=${data.clientName}`)}
  else{
  url = connection.concat(`/api/proposalsubmission?limit=${data.limit}&page=${data.page}&userId=${data && data.employee}&timePeriod=${data && data.timeSlot}&from=${data.from}&to=${data.to}&portal=${data && data.source}&status=${data && data.status}&month=${data && data.monthly}`);}
  return async dispatch => {
    dispatch(actionTypes.PROP_SUB_INIT());
    return axios
    .get(url, { headers: await getHeaders(true)})
    .then(res => {
      console.log(res.data, "Sales data get Succesfully");
      dispatch(actionTypes.PROP_SUB_SUCCESS(res.data));
    })
    .catch(error => {
      console.log(error, "Sales data not found error");
      dispatch(actionTypes.PROP_SUB_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        window.location.reload();
      }
    });
  };
};

export const buttonSelectStatus = (data) => {
  let url = connection.concat(`/api/proposalsubmission?userId=${data}`);  
  return async dispatch => {
    dispatch(actionTypes.SELECT_STATUS_INIT());
    return axios
    .get(url, {headers: await getHeaders(true)})
    .then(res => {
      console.log(res.data, "Portal data get Succesfullt");
      dispatch(actionTypes.SELECT_STATUS_SUCCESS(res.data));
    })
    .catch(error => {
      console.log(error, "Portal data not found error");
      dispatch(actionTypes.SELECT_STATUS_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        window.location.reload();
      }
    });
  };
};

export const getSalesDropDownActionData = data => {
  let url = connection.concat("/api/salesUser?departmentName=sales");
  return async dispatch => {
    dispatch(actionTypes.GET_DROP_INIT());
    return axios
    .get(url, {headers: await getHeaders(true)})
    .then(res => {
      console.log(res, "sales DropDown get successfully");
      dispatch(actionTypes.GET_DROP_SUCCESS(res.data));
    })
    .catch(error => {
      console.log(error, "sales DropDown found error");
      dispatch(actionTypes.GET_DROP_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        window.location.reload();
      }
    });
  };
};

export const postProposalData = data => {
  //debugger
  let url = connection.concat("/api/proposalsubmission");
  return async dispatch => {
    dispatch(actionTypes.POST_PROP_SUB_INIT());
    return axios
    .post(url, data, {headers: await getHeaders(true)})
    .then(res => {
      console.log(res, "Proposal data successfully Submitted");
      dispatch(actionTypes.POST_PROP_SUB_SUCCESS(res));
      if(res.status === 200){
        swal({
          title: "Success",
          text: "Proposal Added",
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
      console.log(error, "Proposal data Submission error");
      dispatch(actionTypes.POST_PROP_SUB_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        window.location.reload();
      }
      if(error.response.status === 500){
        swal({
          icon: "warning",
          title: "Error",
          text: "Please select Sales user!",
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn-danger",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel plx!",
          closeOnConfirm: false,
          closeOnCancel: false

          })
    };
  });
};};

export const getProposalDataById = data => {
  let url = connection.concat(`/api/proposalsubmission/${data.id}`);
  if (data && data.edit) {
    url = connection.concat(`/api/proposalsubmission/${data.id}?edit=${data.edit}`);
  }
  return async dispatch => {
    dispatch(actionTypes.GET_PROP_ID_INIT());
    return axios
    .get(url, {headers: await getHeaders(true)})
    .then(res => {
      console.log(res, "get Proposal data By Id successfully");
      dispatch(actionTypes.GET_PROP_ID_SUCCESS(res));
    })
    .catch(error => {
      console.log(error, "get Proposal data By Id not found error");
      dispatch(actionTypes.GET_PROP_ID_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        window.location.reload();
      }
    });
  };
};

export const updateProposalData = data => {
  let url = connection.concat(`/api/proposalsubmission/${data.id}`);
  return async dispatch => {
    dispatch(actionTypes.UP_PROPOSAL_INIT());
    return axios
    .patch(url, data, {headers: await getHeaders(true)})
    .then(res => {
      console.log(res, "Proposal data Updated successfully");
      dispatch(actionTypes.UP_PROPOSAL_SUCCESS(res.data.data));
      if(res.status === 200){
        swal({
          title: "Success",
          text: "Proposal Updated",
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
      dispatch(actionTypes.UP_PROPOSAL_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        window.location.reload();
      }
    });
  };
};

export const updateStatusData = (data) => {
  let url = connection.concat(`/api/proposalsubmission/${data.id}`);
  return async dispatch => {
    dispatch(actionTypes.UP_FILTER_INIT());
    return axios
    .patch(url, data, {headers: await getHeaders(true)})
    .then(res => {
      console.log(data, "Status data Updated successfully");
      dispatch(actionTypes.UP_FILTER_SUCCESS(data));
    })
    .catch(error => {
      console.log(error, "Status data Updated error");
      dispatch(actionTypes.UP_FILTER_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        window.location.reload();
      }
    });
  };
};

export const deleteStatusData = (data) => {
  debugger
  console.log("dfghdfgdfhdf", data)
  let url = connection.concat(`/api/proposalsubmission/${data}`);
  return async dispatch => {
    dispatch(actionTypes.DELETE_STATUS_INIT());
    return axios
    .delete(url, {headers: await getHeaders(true)})
    .then(res => {
      console.log(data, "Active Status Change successfully");
      dispatch(actionTypes.DELETE_STATUS_SUCCESS(res.data));
    })
    .catch(error => {
      console.log(error, "Active Status Change error");
      dispatch(actionTypes.DELETE_STATUS_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        window.location.reload();
      }
    });
  };
};

export const getSalesTargetAction = (data) => {
  if (data === undefined) {
    url = connection.concat(`/api/salesTarget`);  
  }
  else {
    url = connection.concat(`/api/salesTarget?timeperiod=${data && data.timePeriod}`);  
  }
  return async dispatch => {
    dispatch(actionTypes.SALES_TARGET_INIT());
    return axios
    .get(url, { headers: await getHeaders(true)})
    .then(res => {
      console.log(res.data, "Sales Target data get Succesfullt");
      dispatch(actionTypes.SALES_TARGET_SUCCESS(res.data));
    })
    .catch(error => {
      console.log(error, "Sales Target not found error");
      dispatch(actionTypes.SALES_TARGET_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        window.location.reload();
      }
    });
  };
};

export const importCsvFileAction = (file) => {
  let url = connection.concat(`/api/csvfileupload`);
  const formData = new FormData();
  formData.append('file',file)
  return async dispatch => {
    dispatch(actionTypes.CSV_FILE_INIT());
    return axios
    .post(url, formData, { headers: await getHeaders(true)})
    .then(res => {
      console.log(res.data, "CSV File Upload Succesfully");
      dispatch(actionTypes.CSV_FILE_SUCCESS(res.data));
      toast.success("File Uploaded!", {
        autoClose: 1000
      });
    })
    .catch(error => {
      console.log(error, "CSV File Upload error");
      dispatch(actionTypes.CSV_FILE_ERROR(error));
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

export const getSalesTargetByIdAction = (data) => {
  if(data.timePeriod && data.timePeriod.timePeriod) {
    url = connection.concat(`/api/salesTarget/${data && data.userId}?timeperiod=${data.timePeriod && data.timePeriod.timePeriod}`);
  }
  else {
    url = connection.concat(`/api/salesTarget/${data && data.userId}`);
  }
  return async dispatch => {
    dispatch(actionTypes.TARGET_BY_ID_INIT());
    return axios
    .get(url, { headers: await getHeaders(true)})
    .then(res => {
      console.log(res.data, "Sales Target data get By ID Succesfullt");
      dispatch(actionTypes.TARGET_BY_ID_SUCCESS(res.data));
    })
    .catch(error => {
      console.log(error, "Sales Target By ID not found error");
      dispatch(actionTypes.TARGET_BY_ID_ERROR(error));
      if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("roleId");
        window.location.reload();
      }
    });
  };
};