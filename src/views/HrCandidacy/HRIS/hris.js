import React from "react";
import { connect } from 'react-redux';
import * as actionCreator from "../../../Redux/Actions/ActionTypes/index";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from "react-router-dom";
import moment from "moment";
import Autocomplete from "react-autocomplete";

class DepartmentTable extends React.Component {
    constructor() {
        super()
        this.state = {
            viewData: {},
            isActive:'',
            timePeriodStep: 1,
            timePeriod: {
                timePeriod: '',
                outcome: '',
                userid: '',
                from: '',
                to: (new Date()).toISOString().split('T')[0],
                monthly:''
            },
        }
    }

    componentDidMount = () => {
        this.props.getHRIS()
        this.props.getUsersData()
    }
    componentDidUpdate = () => {
        window.jQuery('.selectpicker').selectpicker('refresh');
    }
    viewDetail = (viewData) => {
        this.setState({ viewData })
    }
    handleSwitchChange = (data,isActive) => {
        const dataisActive = {
            id:data.id,
            departmentName: data.departmentName,
            shortCode: data.shortCode,
            kra: data.kra,
            isActive:isActive
        };
        this.props && this.props.updatedeptisActiveData(dataisActive);
    };

    timePeriod = (e) => {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        })
    }
    filterTimePeriod = (e) => {
        const { timePeriod } = this.state
        timePeriod[e.target.name] = e.target.value ? e.target.value : ""
        this.setState({
            timePeriod
        },
        //  () => {
        //     this.props.getHRIS(timePeriod)
        // }
        )
    }

    filterEmp = (val) => {
        this.setState ({
        timePeriod: {
        ...this.state.timePeriod,
        userid: val}
        }, 
        // ()=> {
        //     this.props.getHRIS(this.state.timePeriod)

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
        timePeriod: '',
        outcome: '',
        userid: '',
        from: '',
        to: (new Date()).toISOString().split('T')[0],
        monthly:''
        }
        },
        ()=> {this.props.getHRIS(this.state.timePeriod)}
        )
    }

    render () {
        const columns = [
            { Header: "Sr No.", id: "row",
                Cell: (row) => {
                    return <div>{row.index+1}</div>
                },
                style: {
                    textAlign: "center"
                }
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
            { Header: "Designation", accessor: "designation",
            // Cell : props =>
            //     <div className="client"  data-toggle="modal" data-target="#viewprofile" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}>
            //         <span className='departmentName'>{props.original.departmentName}</span>
            //     </div>,
                style: {
                    textAlign:"center"
                },
            },
            { Header:  () =>
                <span className='clientName'>Experience<br />Before Joining</span>,
                Cell : props =>
                        <span>{props.original.exBeforeJoin} Years</span>,
                style: {
                    textAlign: "center",
                },
            },
            { Header:  () =>
                <span className='clientName'>Experience<br />After Joining</span>,
                Cell : props =>
                        <span>{props.original.exAfterJoin} Years</span>,
                style: {
                    textAlign: "center",
                },
            },
            { Header: () =>
                <span className='clientName'>Total <br/>Experience</span> ,
            Cell : props =>
                    <span>{parseInt(props.original.exBeforeJoin)+parseInt(props.original.exAfterJoin)} Years</span>,
                style: {
                    textAlign: "center",
                },
            },
            { Header: "DOB", accessor: "dob",
            Cell : props =>
                    <span>{moment(props.original.dob).format("DD MMM  YYYY")}</span>,
                style: {
                    textAlign: "center",
                },
            },
            { Header: "Phone", accessor: "phoneP",
                style: {
                    textAlign: "center",
                },
            },
            { Header: () =>
                <span className='clientName'>Reference <br/>Contact</span>, accessor: "referenceContact",
                style: {
                    textAlign: "center",
                },
            },
            { Header: () =>
                <span className='clientName'>Permanent <br/>Address</span>, accessor: "streetAddress",
                style: {
                    textAlign: "center",
                },
            },
            { Header: () =>
                <span className='clientName'>Temporary <br/>Address</span>, accessor: "temporaryAddress",
                style: {
                    textAlign: "center",
                },
            },
            { Header: "Work Email", accessor: "gmailId",
                style: {
                    textAlign: "center",
                },
            },
            { Header:() =>
            <span className='clientName'>Work Email<br/>Password</span>, accessor: "gmailPassword",
                style: {
                    textAlign: "center",
                },
            },
            { Header:() =>
            <span className='clientName'>Work Email<br/>New Password</span>, accessor: "gmailNewPassword",
                style: {
                    textAlign: "center",
                },
            },
            { Header: "Slack Id", accessor: "slackId",
                style: {
                    textAlign: "center",
                },
            },
            { Header: () => <span className='clientName'>Slack<br/>Password</span>, accessor: "slackPassword",
                style: {
                    textAlign: "center",
                },
            },
            { Header:() =>
            <span className='clientName'>Slack<br/>New Password</span>, accessor: "slackNewPassword",
                style: {
                    textAlign: "center",
                },
            },
            { Header:  () => <span className='clientName'>Increment<br/>Date</span>, accessor: "incrementDate",
            Cell : props =>
                    <span>{moment(props.original.incrementDate).format("DD MMM  YYYY")}</span>,
                style: {
                    textAlign: "center",
                },
            },
            { Header: "Increment", accessor: "increment",
                style: {
                    textAlign: "center",
                },
            },
            { Header: "Skills", accessor: "skills",
                style: {
                    textAlign: "center",
                },
            },
            { Header: () =>
                <span className='clientName'>Skills <br/>Of Interest</span>, accessor: "skillOfInterest",
                style: {
                    textAlign: "center",
                },
            },
            { Header: () => <span>Reason Of<br />Leaving</span>, accessor: "reasonOfWork",
                style: {
                    textAlign: "center",
                },
            },
            { Header: <span>Notice Period<br/>Serve</span>, accessor: "served",
                style: {
                    textAlign: "center",
                },
            },
            { Header: "Comments", accessor: "comments",
                style: {
                    textAlign: "center",
                },
            },
            { Header: "Remarks", accessor: "remarks",
                style: {
                    textAlign: "center",
                },
            },
            { Header: "Exit Formalities", accessor: "exitFormalities",
                style: {
                    textAlign: "center",
                },
            },
            
            { Header: "Actions",
                Cell: props => {
                    return (
                        <ul className="table-actions">
                            <span><Link to="#" className="fa fa-eye" data-toggle="modal" data-target="#viewprofile" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}></Link></span>
                            <span><Link to={{ pathname: `/hris/edit/${props.original.id}`}} className="fa fa-edit" title="" data-original-title="Copy"></Link></span>
                            {/* <span><Link to="#" className="fa fa-trash-o text-danger" data-toggle="modal" data-target="#delete" title="delete" data-original-title="delete"></Link></span> */}
                        </ul>
                    )
                },
                style: {
                    textAlign: "center",
                    justifyContent: "center",
                    display: "flex"
                    
                },
            },
        ]
        const hrdata = this.props.hrData2 ? this.props.hrData2.map((e) => {
            return (
                {ename: e.firstName+" "+e.lastName,eid: e.id.toString()}
            )
        }): [];

        return (
            <div className="mainPanel">
                <div className="page-content-inner ">
                    <div className="page-header">
                        <div className="main-title"><strong>Human Resource Information System</strong></div>
                        <ul className="page-top-actions">
                            <li><Link to="/hris/add" className="green">Add To HRIS</Link></li>
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
                                {localStorage.getItem('roleId')==='3' ? null :
                                <li className="single-search-field">
                                    <form className="filters">
                                    <div className="label">Employee</div>
                                    <Autocomplete 
                                    shouldItemRender={(item, value) => item.ename.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                    items={hrdata}
                                    getItemValue={(item) => item.ename} name="userid"
                                     renderItem={ (item, highlighted) => (
                                        <div  className= "filter"
                                          style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                                          key={ item.eid } >
                                          { item.ename }
                                        </div>
                                      )} 
                                    value={this.state.displayName}
                                    onChange={(e) => {
                                      this.setState({ displayName: e.target.value })
                                      if (e.target.value==='')
                                        this.filterEmp(e.target.value)}}
                                    onSelect={ (ename, allData)   => {
                                      this.filterEmp(allData.eid)
                                      this.setState({
                                        displayName: ename,
                                           userid: allData.eid 
                                      })}}/>
                                      </form>
                                </li>}
                                    <li className="single-search-field single" style={{textAlign:"left"}}>
                                        <div className="label">Time Period Filters</div>
                                        {/* <select className="form-control" name="timePeriodStep" onChange={this.timePeriod}
                                        value={this.state.timePeriodStep} style={{width:'101%'}}>
                                            <option value="0">Please Select Time Period</option>
                                            <option value="2">Custom Time Period</option>
                                            <option value="1">Dropdown Time Period</option>
                                        </select> */}
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
                                        <select className="form-control" name="monthly" onChange={this.filterTimePeriod}
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
                                        </form></li>:null
                                    }
                                
                            </ul>
                            <ul className="searchfields-ul">
                                <li><button className="btn-submit" style={{background:"#4ac103"}} onClick={()=> {this.props.getHRIS(this.state.timePeriod)}}>Submit</button>
                                <button className="btn-submit" style={{background:"#6c757d"}} onClick={()=> {this.reset()}}>Reset</button></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="theme-panel">
                        <div className="table-overflow">
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
                            data={this.props.departmentData}
                            defaultPageSize={10}>
                        </ReactTable>
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
                                    </div>
                                    <div className="heading">
                                            <strong>Details :</strong>
                                        </div>
                                    <div className="users-details">
                                        
                                        <div className="user-details-list">
                                        <div className="name">Designation</div>
                                            <span>{this.state.viewData.designation}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Experience Before Joining</div>
                                            <span>{this.state.viewData.exBeforeJoin}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Experience After Joining</div>
                                            <span>{this.state.viewData.exAfterJoin}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Total Experience</div>
                                            <span>{parseInt(this.state.viewData.exBeforeJoin)+parseInt(this.state.viewData.exAfterJoin)} Years</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">DOB</div>
                                            <span>{moment(this.state.viewData.dob).format("DD MMM  YYYY")}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Phone</div>
                                            <span>{this.state.viewData.phoneP}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Reference Contact</div>
                                            <span>{this.state.viewData.referenceContact}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Working Email</div>
                                            <span>{this.state.viewData.gmailId}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Gmail Password</div>
                                            <span>{this.state.viewData.gmailPassword}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Gmail New Password</div>
                                            <span>{this.state.viewData.gmailNewPassword}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Temporary Address</div>
                                            <span>{this.state.viewData.temporaryAddress}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Slack Id</div>
                                            <span>{this.state.viewData.slackId}</span>
                                        </div>
                                    </div>
                                    <div className="users-details">
                                        <div className="user-details-list">
                                        <div className="name">Slack Password</div>
                                            <span>{this.state.viewData.slackPassword}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Slack New Password</div>
                                            <span>{this.state.viewData.slackNewPassword}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Working Email</div>
                                            <span>{this.state.viewData.gmailId}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">IncrementDate</div>
                                            <span>{this.state.viewData.incrementDate}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Increment</div>
                                            <span>{this.state.viewData.increment}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Reason Of Work</div>
                                            <span>{this.state.viewData.reasonOfWork}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Skill Of Interest</div>
                                            <span>{this.state.viewData.skillOfInterest}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Served</div>
                                            <span>{this.state.viewData.served}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Comments</div>
                                            <span>{this.state.viewData.comments}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Remarks</div>
                                            <span>{this.state.viewData.remarks}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Exit Formalities</div>

                                            <span>{this.state.viewData.exitFormalities}</span>
                                        </div>
                                        <div className="user-details-list">
                                            <div className="name">IsActive</div>
                                            <span>{this.state.viewData.isActive === 1 ? "true" : "false"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-gray btn-sm" data-dismiss="modal">Back</button>
                                
                                    <Link to={{ pathname: `/hris/edit/${this.state.viewData.id}`}} title="" data-original-title="Copy">
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
                                <p>Department Status Deactivated</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-theme btn-sm" data-dismiss="modal">ok</button>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        )
    }
}

const mapStateToProps = state => {
    const data = state.CtrlHRIS.getHRISData.data
    return {
        departmentData: data,
        hrData2: state.CtrUser.userData.result
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHRIS: (data) => dispatch(actionCreator.getHris(data)),
        getUsersData: (data) => dispatch(actionCreator.getUsersDataAction(data)),
        updatedeptisActiveData: (data) => dispatch(actionCreator.updatedeptisActiveData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentTable);