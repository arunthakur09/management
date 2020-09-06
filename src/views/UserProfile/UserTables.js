import React from "react";
import { connect } from 'react-redux';
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import connection from "../../Config/APIurl/connection";
// import moment from 'moment-timezone';
import { Spinner } from 'reactstrap'
import moment from 'moment'
import Autocomplete from "react-autocomplete";
import "../../assets/css/Theme/Main.css";

class UserTables extends React.Component {
    constructor() {
        super()
        this.state = {
            viewData: {},
            file: '',
            selected: -1,
            timePeriodStep: 1,
            timePeriod: {
                supervisor: '',
                employeeStatus: '',
                userid: '',
                jobTitle: '',
                dept: '',
                isActive: '',
                firstName: '',
                from:'',
                to:'',
                timePeriod:'',
                monthly:''
            },
        }
    }

    componentDidMount = () => {
        this.props.getUsersData({isActive:'',dept:'',jobTitle:'',supervisor:'',userid:'',employeeStatus:'',firstName:'',from:'',to:'',timePeriod:'',monthly:''});
        this.props.getUsersAutocomplete();
        this.props.getDepartmentData();

       // window.jQuery('.selectpicker').selectpicker('refresh');
    };

    componentDidUpdate = () => {
        window.jQuery('.selectpicker').selectpicker('refresh');
    }

    viewDetail = (viewData) => {
        this.setState({ viewData })
    }

    timePeriod = (e) => {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        })
    }

    followProposal = () => {
        let path = `/users/archived`;
        this.props.history.push(path);
    }

    filterEmp = (val) => {
        this.setState ({
        timePeriod: {
        ...this.state.timePeriod,
        userid: val}
        }, ()=> {
            this.props.getUsersData(this.state.timePeriod)

        })
    }

    filterEmpname = (val) => {
        this.setState ({
        timePeriod: {
        ...this.state.timePeriod,
        firstName: val}
        },
         // ()=> {this.props.getUsersData(this.state.timePeriod)}
        )
    }

    filterTimePeriod = (e) => {
        const { timePeriod } = this.state
        timePeriod[e.target.name] = e.target.value ? e.target.value : ""
        this.setState({
            timePeriod
        },
        //  () => {
        //     this.props.getUsersData(timePeriod)
        // }
        )
    }

    reset = () => {
        this.setState({
            displayName:''
        })
        this.setState ({
        timePeriod: {
        ...this.state.timePeriod,
        supervisor: '',
        employeeStatus: '',
        userid: '',
        jobTitle: '',
        dept: '',
        isActive: '',
        firstName: '',
        timePeriod: '',
        monthly:''}
        },
        ()=> {this.props.getUsersData(this.state.timePeriod)}
        )
    }

    handleSwitchChange = (data,isActive) => {
        const dataisActive = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            // employeeId: data.employeeId,
            gender: data.gender,
            // dob: data.dob.slice(0,10),
            maritalStatus: data.maritalStatus,
            nationality: data.nationality,
            streetAddress: data.streetAddress,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            country: data.country,
            phoneP: data.phoneP,
            phoneW: data.phoneW,
            emailP: data.emailP,
            email: data.email,
            jobTitle:  data.jobTitle,
            joiningDate: data.joiningDate.slice(0, 10),
            employeeStatus: data.employeeStatus,
            subordinate: data.subordinate,
            supervisor: data.supervisor,
            userKra: data.userKra,
            workExperience: data.workExperience,
            education: data.education,
            skills: data.skills,
            password: data.password,
            departmentId: data.departmentId,
            permissionId: data.permissionId,
            isActive: isActive
        };
        this.props && this.props.updateuserisActiveData(dataisActive);
    };

    render () {const columns = [
            // { Header: "Sr No.", id: "row",
            //     Cell: (row) => {
            //         return <div>{row.index+1}</div>
            //     },
            //     style: {
            //         textAlign: "center"
            //     },
            // },
            { Header: "Employee Id", accessor: "id",
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Profile", accessor: "profile",
            Cell : props =>
                <img style={{height:"46px",width:"46px"}} src={connection.concat(props.original.userImage)}  alt="profile"/>,
                style: {
                    textAlign: "center",
                },
            },
            { Header: "Full Name", accessor: "fullName",
            Cell : props =>
                <div className="client"  data-toggle="modal" data-target="#viewprofile" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}>
                    <span className='clientName'>{props.original.firstName + " "}</span>
                    <span className='clientName'>{props.original.lastName}</span>
                </div>,
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Email", accessor: "email",
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Job Title", accessor: "jobTitle",
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Employee Status", accessor: "employeeStatus",
            Cell: props =>
            <div>{props.original.employeeStatus}<br/>
            {props.original.employeeStatus==="Resigned" ? <>Deadline Date:<br/>
                <label style={{color:"red"}}>{moment(props.original.ResignedDate).diff(new Date(), 'days')} days</label></>:null}</div>
            ,
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Supervisor", accessor: "supervisor",
                style: {
                    textAlign: "center"
                },
            },
            { Header: "IsActive", accessor:"isActive",
            Cell : props =>
            <div className="form-group">
                <label className="switch"
                 onClick={() => this.handleSwitchChange(props.original,props.original.isActive ===1 ? 0 : 1)}
                >
                <input type="checkbox" name="isActive"
                checked={props.original.isActive}
                // onChange={() => this.handleSwitchChange(props.original,props.original.isActive ===1 ? 0 : 1)}
                />
                <span className="slider round"></span>
                </label>
            </div>,
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Actions",
                Cell: props => {
                    return (
                        <ul className="table-actions">
                            <span><Link to="#" className="fa fa-eye" data-toggle="modal" data-target="#viewprofile" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}></Link></span>
                            <span><Link to={{ pathname: `/users/edit/${props.original.id}`}} className="fa fa-edit" title="" data-original-title="Copy"></Link></span>
                            {/* <span><Link to="#" className="fa fa-trash-o text-danger" data-toggle="modal" data-target="#delete" title="delete" data-original-title="delete"></Link></span> */}
                        </ul>
                    )
                },
                style: {
                    textAlign: "center",
                },
            },
        ]
        const hrdata = this.props.getUserscomplete ? this.props.getUserscomplete.map((e) => {
            return (
                {ename: e.firstName+" "+e.lastName,eid: e.id.toString()}
            )
        }): [];

        const deptData = this.props.departmentData.data && this.props.departmentData.data.map( dept => {
            return(
                <option value={dept.departmentName}>{dept.departmentName}</option>
            )
        })

        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>User List</strong></div>
                        <ul className="page-top-actions">
                            <li><Link to="/users/add" className="green">Add User</Link></li>
                        </ul>
                    </div>
                    <div className="theme-panel">
                        <div className="prosess-tab">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button className="nav-link active">All</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.followProposal}>Archived</button>
                                </li>
                                {/* <li className="nav-item">
                                    <button className="nav-link" onClick={this.closedProposal}>Deals</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.rejectedProposal}>Reject</button>
                                </li> */}
                            </ul>
                        </div>
                            <div id="searchfields" className="search-fields collapse show">
                                <div className="searchfields-box">
                                    <ul className="searchfields-ul custom">
                                    {/* <li className="single-search-field">
                                        <div className="label">Employee</div>
                                        <select className="form-control" name="userid" onChange={this.filterTimePeriod}>
                                            <option value="">All</option>
                                            {hrData}
                                        </select>
                                    </li> */}
                                    <li className="single-search-field">
                                        <form className="filters">
                                            <div className="label">Employee</div>
                                                <Autocomplete 
                                                shouldItemRender={(item, value) => item.ename.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                                items={hrdata}
                                                getItemValue={(item) => item.ename} name="userid"
                                                renderItem={ (item, highlighted) => (
                                                    <div className= "filter"
                                                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                                                    key={ item.eid } >
                                                    { item.ename }
                                                    </div>
                                                )} 
                                                value={this.state.displayName}
                                                onChange={(e) => {
                                                    this.setState({ displayName: e.target.value })
                                                    //   if (e.target.value==='')
                                                        this.filterEmpname(e.target.value)}}
                                                onSelect={ (ename, allData)   => {
                                                    this.filterEmpname(allData.ename)
                                                    this.setState({
                                                        displayName: ename,
                                                        userid: allData.eid 
                                                    })}}/>
                                            </form>
                                    </li>
                                    <li className="single-search-field single" style={{textAlign:"left"}}>
                                        <div className="label">Time Period Filters</div>

                                        <li className="single-search-field custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="customRadio" name="timePeriodStep" 
                                        
                                        value={2} 
                                        checked={this.state.timePeriodStep === 2} 
                                        onChange={this.timePeriod} /><label class="custom-control-label" for="customRadio">Custom</label></li>
                                         <li className="single-search-field custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="customRadio2" name="timePeriodStep" 
                                        value={1} 
                                        checked={this.state.timePeriodStep === 1} 
                                        onChange={this.timePeriod} /><label class="custom-control-label" for="customRadio2">Standard</label>
                                        </li>
                                    </li>
                                    {this.state.timePeriodStep=== 2  ?
                                    <><li className="single-search-field">
                                        <form className="filters">
                                            <div className="label">From Date</div>
                                            <input type="date" name='from' value={this.state.timePeriod.from} onChange={this.filterTimePeriod}/>
                                        </form>
                                    </li>
                                    <li className="single-search-field">
                                        <form className="filters">
                                            <div className="label">To Date</div>
                                            <input type="date" name='to'  value={this.state.timePeriod.to} onChange={this.filterTimePeriod}/>
                                        </form>
                                    </li></>:null}
                                    {this.state.timePeriodStep=== 1  ? 
                                    <li className="single-search-field">
                                        <form className="filters">
                                            <div className="label">Time Period</div>
                                                <select className="selectpicker" name="timePeriod" onChange={this.filterTimePeriod} value={this.state.timePeriod.timePeriod}>
                                                    <option value="">All</option>
                                                    <option value="today" >Today</option>
                                                    <option value="weekly" >Weekly</option>
                                                    <option value="monthly">Monthly</option>
                                                    <option value="last3months">Last 3 Months</option>
                                                    <option value="last6months">Last 6 Months</option>
                                                    <option value="1year">Yearly</option>
                                                    {/* <option value="yearlysalesTarget">Yearly Graph</option> */}
                                                </select>
                                        </form>
                                    </li>:null}
                                    {this.state.timePeriod.timePeriod==="monthly" ?
                                    <li className="single-search-field">
                                        <form className="filters">
                                            <div className="label">Month</div>
                                            <select className="selectpicker" name="monthly" onChange={this.filterTimePeriod}
                                            value={this.state.timePeriod.monthly}>
                                                <option value="">Select Month</option>
                                                <option value="1">January</option>
                                                <option value="2">Febuary</option>
                                                <option value="3">March</option>
                                                <option value="4">April</option>
                                                <option value="5">May</option>
                                                <option value="6">June</option>
                                                <option value="7">July</option>
                                                <option value="8">August</option>
                                                <option value="9">September</option>
                                                <option value="10">October</option>
                                                <option value="11">November</option>
                                                <option value="12">December</option>
                                                {/* <option value="yearlysalesTarget">Yearly Graph</option> */}
                                            </select>
                                        </form> 
                                    </li>:null
                                    }
                                            
                                    <li className="single-search-field">
                                        <form className="filters">
                                        <div className="label">Employee Status</div>
                                        <select className="selectpicker" name="employeeStatus" onChange={this.filterTimePeriod}
                                            value={this.state.timePeriod.employeeStatus}>
                                            <option value="">All</option>
                                            <option value="Working">Working</option>
                                            <option value="Resigned">Resigned</option>
                                            <option value="Terminated">Terminated</option>
                                            </select>
                                        </form>
                                    </li>
                                    <li className="single-search-field">
                                        <form className="filters">
                                        <div className="label">Department</div>
                                        <select className="selectpicker" name="dept" onChange={this.filterTimePeriod}
                                            value={this.state.timePeriod.dept}>
                                                <option value="">All</option>
                                            {deptData}
                                            </select>
                                        </form>
                                        
                                    </li>
                                    <li className="single-search-field field"> Total Employees:{this.props.usersData && this.props.usersData.length}</li>
                                </ul>
                                <ul className="searchfields-ul">
                                    <li><button className="btn-submit" style={{background:"#4ac103"}} onClick={()=> {this.props.getUsersData(this.state.timePeriod)}} >Submit</button>
                                    <button className="btn-submit" style={{background:"#6c757d"}} onClick={()=> {this.reset()}}>Reset</button></li>
                                </ul>
                            </div>
                        </div>
                        <div className="table-overflow">
                        {this.props.usersData && this.props.usersData.length > 0 ?
                            <ReactTable 
                            getTrProps={(state, rowInfo, column, instance) => {
                                if (typeof rowInfo !== "undefined") {
                                    return {
                                        onClick: (e, handleOriginal) => {
                                            this.setState({
                                                selected: rowInfo.index
                                            });
                                            if (handleOriginal) {
                                                handleOriginal()
                                            }
                                        },
                                        style: {
                                            background: rowInfo.index === this.state.selected ? '#e8e7e3' : 'white',
                                            color: rowInfo.index === this.state.selected ? 'black' : 'black'
                                        },
                                    }
                                }
                                else {
                                    return {
                                        onClick: (e, handleOriginal) => {
                                            if (handleOriginal) {
                                                handleOriginal()
                                            }
                                        },
                                        style: {
                                            background: 'white',
                                            color: 'black'
                                        },
                                    }
                                }
                            }}
                                columns={columns}
                                data={this.props.usersData}
                                defaultPageSize={10}>
                            </ReactTable>:<div style={{textAlign: "center"}}><Spinner style={{ width: '3rem', height: '3rem'}}  color="success" /></div>}
                        </div>
                    </div>
                </div>
                <div className="modal modal-right fade" id="viewprofile" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog view-pop " role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="title">View Details</div>
                                <button className="close" data-dismiss="modal"><i className="fa fa-times" aria-hidden="true" ></i></button>
                            </div>
                            <div className="modal-body">
                                <div className="user-view-box">
                                    <div className="user-bio">
                                        <div className="user-name">{this.state.viewData.firstName + " " + this.state.viewData.lastName}</div>
                                        <div className="user-pic" style={{backgroundImage: `url(${`${connection.concat(this.state.viewData.userImage)}`})`}}></div>
                                    </div>
                                    <div className="users-details">
                                        <div className="heading">
                                            <strong>Personal Details :</strong>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Gender</div>
                                            <span>{this.state.viewData.gender}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">DOB</div>
                                            <span>{moment(this.state.viewData.dob).format("DD MMMM YYYY")}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Marital Status</div>
                                            <span>{this.state.viewData.maritalStatus}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">IsActive</div>
                                            <span>{this.state.viewData.isActive === 1 ? "true" : "false"}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Nationality</div>
                                            <span>{this.state.viewData.nationality}</span>
                                        </div>
                                        <div className="heading"><br/>
                                            <strong>Contact Details :</strong>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Street Address</div>
                                            <span>{this.state.viewData.streetAddress}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">City</div>
                                            <span>{this.state.viewData.city}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">State</div>
                                            <span>{this.state.viewData.state}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">PostalCode</div>
                                            <span>{this.state.viewData.postalCode}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Country</div>
                                            <span>{this.state.viewData.country}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Phone(Personal)</div>
                                            <span>{this.state.viewData.phoneP}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Phone(Work)</div>
                                            <span>{this.state.viewData.phoneW}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Email(Personal)</div>
                                            <span>{this.state.viewData.emailP}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Email(Work)</div>
                                            <span>{this.state.viewData.email}</span>
                                        </div>
                                    </div>
                                    <div className="users-details">
                                        <div className="heading">
                                            <strong>Job Details :</strong>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Job Title</div>
                                            <span>{this.state.viewData.jobTitle}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Date of Joining</div>
                                            <span>{this.state.viewData.joiningDate}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Employment Status</div>
                                            <span>{this.state.viewData.employeeStatus}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">KRA</div>
                                            <span>{this.state.viewData.userKra}</span>
                                        </div>
                                        <div className="heading" style={{marginTop: "35px"}}><br />
                                            <strong>Report To :</strong>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Assigned Supervisor</div>
                                            <span>{this.state.viewData.supervisor}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Assigned Subordinate</div>
                                            <span>{this.state.viewData.subordinate}</span>
                                        </div>
                                        <div className="heading"><br />
                                            <strong>Qualifications :</strong>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Work Experience</div>
                                            <span>{this.state.viewData.workExperience}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Education</div>
                                            <span>{this.state.viewData.education}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Skills</div>
                                            <span>{this.state.viewData.skills}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-gray btn-sm" data-dismiss="modal">Back</button>
                                
                                    <Link to={{ pathname: `/users/edit/${this.state.viewData.id}`}} title="" data-original-title="Copy">
                                    <button type="button" className="btn btn-edit btn-sm" data-toggle="modal" data-target="#viewprofile">Edit</button>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade modal-theme" id="delete" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body close-on-body">
                                <p>Are you really want to archive this entry?</p>
                            </div>
                            <div className="modal-footer">
                                <label  className="btn btn-gray btn-sm" data-dismiss="modal">Cancel</label>
                                <label  className="btn btn-theme btn-sm" data-dismiss="modal">ok</label>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    const data1 = state.CtrUser.employeeFilters.result
    const data = state.CtrUser.userData.result
    return {
      usersData: data,
      getUserscomplete: data1,
      departmentData: state.CtrDepartment.getDeptData
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
      getUsersData: (data) => dispatch(actionCreator.getUsersDataAction(data)),
      getUsersAutocomplete: () => dispatch(actionCreator.getUsersAutocompleteAction()),
      updateUserData: (data) => dispatch(actionCreator.updateUsers(data)),
      updateuserisActiveData: (data) => dispatch(actionCreator.updateuserisActiveData(data)),
      getDepartmentData: (data) => dispatch(actionCreator.getDepartment(data)),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(UserTables);
