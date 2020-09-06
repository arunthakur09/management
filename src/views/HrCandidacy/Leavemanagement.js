import React from "react";
import { connect } from 'react-redux';
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Autocomplete from "react-autocomplete";
import moment from 'moment-timezone';

class LeaveManage extends React.Component {
    constructor() {
        super()
        this.state = {
            viewData: {},
            timePeriodStep: 1,
            timePeriod: {
                timePeriod: '',
                outcome: '',
                userid: '',
                status: '',
                from: '',
                to: (new Date()).toISOString().split('T')[0],
                monthly:''
            },
        }
    }

    componentDidMount = () => {
        this.props.GetleaveData();
        this.props.getUser()
    };
    componentDidUpdate = () => {
        window.jQuery('.selectpicker').selectpicker('refresh');
    }

    timePeriod = (e) => {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        })
    }

    viewDetail = (viewData) => {
        this.setState({ viewData })
    }

    pendingLeave = () => {
        let path = `/leaveManagement/pending`;
        this.props.history.push(path);
    }

    approvedLeave = () => {
        let path = `/leaveManagement/selected`;
        this.props.history.push(path);
    }

    filterEmp = (val) => {
        this.setState ({
        timePeriod: {
        ...this.state.timePeriod,
        userid: val}
        }, 
        // ()=> {
        //     this.props.GetleaveData(this.state.timePeriod)

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
        status: '',
        from: '',
        to: '',
        monthly:''
        }
        },
        ()=> {this.props.GetleaveData(this.state.timePeriod)}
        )
    }

    filterTimePeriod = (e) => {
        const { timePeriod } = this.state
        timePeriod[e.target.name] = e.target.value ? e.target.value : ""
        this.setState({
            timePeriod
        },
        //  () => {
        //     this.props.GetleaveData(timePeriod)
        // }
        )
    }

    salesDataClick = (data,status) => {
        this.forceUpdate()
        const Data = {
            id:             data.id,
            dateFrom:       data.dateFrom.slice(0, 10),
            dateTo:         data.dateTo.slice(0, 10),
            departmentHead: data.departmentHead,
            status:         status,
            reason:         data.reason,
            isActive:       data.isActive
        }
        this.props.leaveEdit(Data);
    }

    render () {
        const columns = [
            { Header: "Sr No.", id: "row",
                Cell: (row) => {
                    return <div>{row.index+1}</div>
                },
                style: {
                    textAlign: "center"
                },
                width: 50,
                maxWidth: 50,
                minWidth: 50,
            },
            { Header: "Employee Name", accessor: "employeeName",
            Cell : props =>
                <div className="client"  data-toggle="modal" data-target="#viewprofile" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)} >
                    <span className='clientName'>{props.original.firstName + " "}</span>
                    <span className='clientName'>{props.original.lastName}</span>
                </div>,
                style: {textAlign: "center"
                },
            },
            { Header: "Leave Type", accessor: "leaveType",
                style: {
                    
                    textAlign: "center"
                },
            },
            { Header: "DateFrom", accessor: "dateFrom",
            Cell : props =>
                    <span className='submissionTitle'>{moment(props.original.dateFrom).format("DD MMM YYYY")}</span>,
                style: {

                    textAlign: "center",
                    marginLeft: "0px"
                },
            },
            { Header: "DateTo", accessor: "dateTo",
            Cell : props =>
                    <span className='submissionTitle'>{moment(props.original.dateTo).format("DD MMM YYYY")}</span>,
                style: {
                    textAlign: "center",
                    marginLeft: "0px"
                },
            },
            { Header: "Reason", accessor: "reason",
                style: {

                    textAlign: "center",
                    marginLeft: "0px"
                },
            },
            { Header: "Status", accessor: "status",
                style: {
                    textAlign: "center"
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100,
                Cell : props =>
                    <div>
                        {props.original.status === "pending" ?
                        <div className="status-step">
                            <ul>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "pending")} className="propsal" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Pending"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "approved")} data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Approved"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "reject")} data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Reject"></button>
                                </li>
                            </ul>
                            <span>Pending</span>
                        </div> :
                        props.original.status === "approved" ?
                        <div className="status-step">
                            <ul>
                                <li >
                                    <button onClick={() => this.salesDataClick(props.original, "pending")} className="underprogress" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Pending"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "approved")} className="underprogress" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Approved"></button>
                                </li>
                                <li >
                                    <button onClick={() => this.salesDataClick(props.original, "reject")} data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Reject"></button>
                                </li>
                            </ul>
                            <span>Approved</span>
                        </div> :
                        props.original.status === "reject" ?
                        <div className="status-step">
                            <ul>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "pending")} className="close" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Pending"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "approved")} className="close" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Approved"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "reject")} className="close" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Reject"></button>
                                </li>
                            </ul>
                            <span>Reject</span>
                        </div> : null
                    }
                </div>
            },
            { Header: "Actions",
                Cell: props => {
                    return (
                        <ul className="table-actions">
                            <span><Link to="#" className="fa fa-eye" data-toggle="modal" data-target="#viewprofile" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}></Link></span>
                            <span><Link to={{ pathname: `/Leavemanagement/edit/${props.original.id}`}} className="fa fa-edit" title="" data-original-title="Copy"></Link></span>
                            <span><Link to="#" className="fa fa-trash-o text-danger" data-toggle="modal" data-target="#delete" title="delete" data-original-title="delete"></Link></span>
                        </ul>
                    )
                },
                style: {
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
        // eslint-disable-next-line no-sequences
        let counts = this.props.leaveData && this.props.leaveData.reduce((c, { firstName: key }) => (c[key] = (c[key] || 0) + 1, c), {});
        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Employee Leave Record</strong></div>
                        <ul className="page-top-actions">
                        {localStorage.getItem('roleId')==='2' || localStorage.getItem('userRole')==='3' ? <li><Link to="/Leavemanagement/assign" className="green">Assign Leave</Link></li>:null}
                            <li><Link to="/Leavemanagement/request" className="green">Request Leave</Link></li>
                            {localStorage.getItem('roleId')==='2' || localStorage.getItem('userRole')==='3' ? <li><Link to="/Leavemanagement/dashboard">Leave Dashboard</Link></li>:null}
                        </ul>
                    </div>
                    <div className="theme-panel">
                        <div className="prosess-tab">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button className="nav-link active" >All</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.pendingLeave}>Pending</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.approvedLeave}>Approved</button>
                                </li>
                            </ul><div id="searchfields" className="search-fields collapse show">
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
                                </ul>
                                <ul className="searchfields-ul">
                                    <li><button className="btn-submit" style={{background:"#4ac103"}} onClick={()=> {this.props.GetleaveData(this.state.timePeriod)}}>Submit</button>
                                    <button className="btn-submit" style={{background:"#6c757d"}} onClick={()=> {this.reset()}}>Reset</button></li>
                                </ul>
                            </div>
                        </div>
                        </div>
                        <div className="user-bidding-list">
                        <div className="leftId">
                        <ul>
                        {counts && Object.keys(counts).length && Object.keys(counts).map((rk)=> <li key={rk}>
                            <span className="bidder" >
                                {rk}
                                <span>{counts[rk]}</span>
                            </span>
                        </li>)}
                               
                   </ul></div></div>
                        <div className="user-bid-list">
                            <ul>
                                <li>
                                    <Link to="#" className="bidder" data-toggle="modal" data-target="#source-view" style={{display: "none"}}>
                                        <span></span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
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
                                data={this.props.leaveData}
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
                                    <div className="client"  data-toggle="modal" data-target="#clientdetails" title="" data-original-title="View">
                                        <span className='clientName'>{this.state.viewData.firstName + " "}</span>
                                        <span className='clientName'>{this.state.viewData.lastName}</span>
                                    </div>
                                    </div>
                                    <div className="user-details using-details">
                                        <div className="heading"><strong>Details :</strong></div>
                                        <div className="user-details-list"><div className="name">Leave Type</div><span>{this.state.viewData.leaveType}</span></div>
                                        <div className="user-details-list"><div className="name">From</div><span>{moment(this.state.viewData.dateFrom).format("DD MMMM YYYY")}</span></div>
                                        <div className="user-details-list"><div className="name">To</div><span>{moment(this.state.viewData.dateTo).format("DD MMMM YYYY")}</span></div>
                                        <div className="user-details-list"><div className="name">Reason</div><span>{this.state.viewData.reason}</span></div>
                                        <div className="user-details-list"><div className="name">Status</div><span>{this.state.viewData.status}</span></div>
                                        <div className="user-details-list"><div className="name">Department Head</div><span>{this.state.viewData.departmentHead}</span></div>
                                        <div className="user-details-list"><div className="name">Applied on</div><span>{moment(this.state.viewData.createdOn).format("DD MMMM YYYY")}</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-gray btn-sm" data-dismiss="modal">Back</button>
                                
                                    <Link to={{ pathname: `/Leavemanagement/edit/${this.state.viewData.id}`}} title="" data-original-title="Copy"><button type="button" className="btn btn-edit btn-sm" data-toggle="modal" data-target="#viewprofile">Edit</button></Link>
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
                                <button type="button" className="btn btn-gray btn-sm" data-dismiss="modal">Cancel</button>
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
    console.log(state)
    const data = state.CtrlLeave.getleaveData.data
    return {
        leaveData: data,
        hrData2: state.CtrUser.userData.result
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        GetleaveData: (data) => dispatch(actionCreator.getLeaveDataAction(data)),
        leaveEdit: (data) => dispatch(actionCreator.editLeavestatus(data)),
        getUser: () => dispatch(actionCreator.getUsersDataAction())
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LeaveManage);
