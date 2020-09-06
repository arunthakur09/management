import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import ReactTable from 'react-table';
import connection from "../../Config/APIurl/connection";
import 'react-table/react-table.css';
import { Link } from "react-router-dom";
import moment from 'moment-timezone';
import { ToastContainer } from "react-toastify";
import StarRatings from 'react-star-ratings';
import { toast } from "react-toastify";

class ProposalTable extends React.Component {

    constructor (props) {
        super (props)
        this.state = {
            modal: {},
            filterUserData: [],
            viewData: {},
            timePeriodStep: 1,
            pages: null,
            filterState:false,
            filterBy: {
                employee: "",
                timeSlot: "today",
                monthly:"",
                source: "",
                status: "",
                from:'',
                to: (new Date()).toISOString().split('T')[0],
                page: '',
                limit: ''
            },
            pageSize:10,
            selected: -1,
            file: null,
            rating: 0
        }
    }

    componentDidMount = () => {
        this.props.getDropDownData();
    }

    timePeriod = (e) => {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        })
    }
    componentDidUpdate = () => {
        window.jQuery('.selectpicker').selectpicker('refresh');
    }
    
    handleFollowSubmit = (e) => {
        e.preventDefault();
        this.props.followpatchData({
            id:this.state.id,
            followUpDate:this.state.followdate,
            followUpTime:this.state.followTime,
            comment:this.state.Comments,
            isActive: this.state.isActive
        });
    }
    componentWillReceiveProps = (nextProps) => {
        const salesDatas = nextProps.salesDropDown.result;
        const filterDataShow = nextProps.salesData.tableRecords && nextProps.salesData.tableRecords.totalRecords;
        this.setState({
            filterUserData: salesDatas,
            pages:  Math.ceil(filterDataShow/this.state.pageSize)
        })
    }

    addProposal = (e) => {
        let path = `/proposal/add?${e.target.value}`;
        this.props.history.push(path);
    }

    viewDetail = (viewData) => {
        //console.log(viewData)
        this.setState({ 
            viewData
        })
    }

    discussionProposal = () => {
        let path = `/proposal/discussion`;
        this.props.history.push(path);
    }

    followupProposal = () => {
        let path = `/proposal/follow`;
        this.props.history.push(path);
    }

    closedProposal = () => {
        let path = `/proposal/close`;
        this.props.history.push(path);
    }

    rejectedProposal = () => {
        let path = `/proposal/reject`;
        this.props.history.push(path);
    }

    employeeSelect = (e, status) => {
        const { filterBy } = this.state;
        filterBy[e.target.name] = status ? status : e.target.value;
        this.setState({
            filterBy,
            filterState:true
        },
        // () => {
        //     this.props.getSalesDataByID({limit: this.state.pageSize, page: 1,...filterBy});
        // }
        )
    }

    reset = () => {
        this.setState({
            displayName:''
        })
        this.setState ({
            filterBy: {
        ...this.state.filterBy,
        employee: "",
        timeSlot: "today",
        monthly:"",
        source: "",
        status: "",
        from: '',
        to: ''}
        },
        ()=> {this.props.getSalesDataByID(this.state.filterBy)}
        )
    }

    calulatePortal = (viewData) => {
        this.props.calcutateSource(viewData);
    }

    onchangePage = (pageSize,b) => {
        this.setState({pageSize: pageSize})
    }

    deleteActiveStaus = (data) => {
        this.props.deleteStatus(data.id)
    }

    csvUpload = (e) => {
        this.setState({
            file: e.target.files[0]
        }, () => {
            this.props.csvFileUpload(this.state.file)
        })
    }
    
    changeRating=(newRating,name)=>{
        const Rating = {
            rating: newRating,
            id: parseInt(name),
            isActive: 1
        }
        this.props.upStatusData(Rating)        
        console.log(newRating,name,">>>")
    }
    
    salesDataClick = (data, status) => {
        this.setState({id: data.id,isActive:data.isActive});

        const statusData = {
            id:                         data.id,
            profile:                    data.profile,
            date:                       moment(data.date).format("YYYY/MM/DD"),
            portal:                     data.portal,
            clientName:                 data.clientName,
            countryCityState:           data.countryCityState,
            company:                    data.company,
            email:                      data.email,
            phone:                      data.phone,
            domain:                     data.domain,
            submissionTitle:            data.submissionTitle,
            pitchContent:               data.pitchContent,
            jobReqLink:                 data.jobReqLink,
            proposalLink:               data.proposalLink,
            clientPostedDateTime:       moment(data.clientPostedDateTime).format("YYYY/MM/DD"),
            projectType:                data.projectType,
            TargetAchieved:             data.TargetAchieved,
            proposalSubmissionDateTime: moment(data.proposalSubmissionDateTime).format("YYYY/MM/DD"),
            status:                     status,
            companyEmail:               data.companyEmail,
            patternEmail:               data.patternEmail,
            clientDesignation:          data.clientDesignation,
            leadStatus:                 data.leadStatus,
            companyPhone:               data.companyPhone,
            companylinkedInProfile:     data.companylinkedInProfile,
            followUpDate:               data.followUpDate,
            comment:                    data.comment,
            isActive:                   data.isActive,
        }
        if(data.leadStatus==="NonQualifiedlead"){
            toast.error("Your Lead is Not Qualified!", {
              autoClose: 1000
            })
        }
        else{
            this.props.upStatusData(statusData)
        }
    }

    render () {
        const userFilterData = this.state.filterUserData && this.state.filterUserData.map(employee => {
            return (
                <option value={employee.id} key={employee.id}>{employee.firstName + " " + employee.lastName}</option>
            )
        })
        
        const filterReturnDataSource = this.props.salesData.data && this.props.salesData.data.map(source => {
            return (
                source.userId
            )
        })

        const columns = [
            { Header: "Sr No.", id: "row",
                Cell: (row) => {
                    return <div>{row.index+1}</div>
                },
                style: {
                    maxWidth:"50px",
                    textAlign: "center"
                },
            },
            { Header: "Employee Name", accessor: "firstName",
            Cell : props =>
                <div className="client"  data-toggle="modal" data-target="#employeedetails" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}>
                    <span className='firstName'>{props.original.firstName + " "}</span>
                    <span className='lastName'>{props.original.lastName}</span>
                </div>,
                style: {
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center"
                }
            },
            { Header: "Client Name", accessor: "clientName",
            Cell : props =>
                <div className="client"  data-toggle="modal" data-target="#clientdetails" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}>
                    <span className='clientName'>{props.original.clientName}</span>
                </div>,
                style: {
                    textAlign: "center"
                }
            },
            { Header: "Company", accessor: "company",
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Pattern Email", accessor: "patternEmail",
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Industry", accessor: "domain",
                style: {
                    textAlign: "center"
                },
            },
            { Header: () =>
                <span>Project<br/>Title</span>, accessor: "submissionTitle",
            Cell : props =>
                <div className="client"  data-toggle="modal" data-target="#projectdetails" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}>
                    <span className='submissionTitle'>{props.original.submissionTitle}</span>
                </div>,
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Country", accessor: "countryCityState",
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Source", accessor: "portal",
                style: {
                    textAlign: "center"
                },
            },
            // { Header: "Date", accessor: "date",
            // Cell : props =>
            //     <div>
            //         <span className='firstName'>{moment(props.original.date).format("DD MMM YYYY")}</span>
            //     </div>,
            //     style: {
            //         textAlign: "center"
            //     }
            // },
            // { Header: "Submission Date", accessor: "proposalSubmissionDateTime",
            // Cell : props =>
            //     <div>
            //         <span className='firstName'>{moment(props.original.proposalSubmissionDateTime).format("DD MMM YYYY, h:mm A")}</span>
            //     </div>,
            //     style: {
            //         textAlign: "center"
            //     }
            // },
            { Header:() => <span>Proposal <br/>Submission <br/>Date</span> , accessor: "proposalSubmissionDateTime",
            Cell : props =>
                <div>
                    <span className='firstName'>{moment(props.original.proposalSubmissionDateTime).format("DD MMM YYYY")}</span>
                </div>,
                style: {
                    textAlign: "center"
                }
            },
            { Header:() => <span>Proposal<br/>Submission<br/>Time</span> , accessor: "proposalSubmissionDateTime",
            Cell : props =>
                <div>
                    <span className='firstName'>{props.original.proposalTime}</span>
                </div>,
                style: {
                    textAlign: "center"
                }
            },
            { Header: "Status", accessor: "status",
                style: {
                    textAlign: "center"
                },
                Cell : props =>
                    <div>
                        {props.original.status === "pending" ?
                        <div className="status-step">
                            <ul>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "pending")} className="propsal" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Pending"></button>
                                </li>
                                <li >
                                    <button onClick={() => this.salesDataClick(props.original, "discussion")} data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Discussion"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "followup")}  data-toggle="modal" data-target="#FollowUpSelection" data-placement="top"  data-original-title="disscussion" title="followup"></button>
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
                        props.original.status === "discussion" ?
                        <div className="status-step">
                            <ul>
                                <li >
                                    <button onClick={() => this.salesDataClick(props.original, "pending")} className="disscussion" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Pending"></button>
                                </li>
                                <li >
                                    <button onClick={() => this.salesDataClick(props.original, "discussion")} className="disscussion" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Discussion"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "followup")}  data-toggle="modal" data-target="#FollowUpSelection" data-placement="top"  data-original-title="disscussion" title="followup"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "approved")} className="" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Approved"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "reject")} className="" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Reject"></button>
                                </li>
                            </ul>
                            <span>Disscussion</span>
                        </div> :
                        props.original.status === "followup" ?
                        <div className="status-step">
                            <ul>
                                <li >
                                    <button onClick={() => this.salesDataClick(props.original, "pending")} className="followup" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Pending"></button>
                                </li>
                                <li >
                                    <button onClick={() => this.salesDataClick(props.original, "discussion")} className="followup" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Discussion"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "followup")} className="followup" data-toggle="modal" data-target="#FollowUpSelection" data-placement="top"  data-original-title="disscussion" title="followup"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "approved")} data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Approved"></button>
                                </li>
                                <li >
                                    <button onClick={() => this.salesDataClick(props.original, "reject")} data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Reject"></button>
                                </li>
                            </ul>
                            <span>Follow-Up</span>
                        </div> :
                        props.original.status === "approved" ?
                        <div className="status-step">
                            <ul>
                                <li >
                                    <button onClick={() => this.salesDataClick(props.original, "pending")} className="underprogress" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Pending"></button>
                                </li>
                                <li >
                                    <button onClick={() => this.salesDataClick(props.original, "discussion")} className="underprogress" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Discussion"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "followup")} className="underprogress"  data-toggle="modal" data-target="#FollowUpSelection" data-placement="top"  data-original-title="disscussion" title="followup"></button>
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
                                <li >
                                    <button onClick={() => this.salesDataClick(props.original, "discussion")} className="close" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Discussion"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "followup")} className="close"  data-toggle="modal" data-target="#FollowUpSelection" data-placement="top"  data-original-title="disscussion" title="followup"></button>
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
            style: {
                textAlign: "center"
            },
            Cell: props => {
                return (
                    <div className="flex">
                    <ul className="table-actions">
                        <li><Link to="#" className="fa fa-eye" data-toggle="modal" data-target="#viewprofile" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}></Link></li>
                        <li><Link to={{ pathname: `/proposal/edit/${props.original.id}`}} className="fa fa-edit" title="" data-original-title="Copy"></Link></li>
                        {/* <li><Link to="#" className="fa fa-trash-o text-danger" data-toggle="modal" data-target="#delete" title="delete" data-original-title="delete" onClick={() => this.deleteActiveStaus(props.original)}></Link></li> */}
                    </ul>
                    <StarRatings 
                    rating={props.original.rating===null ? this.state.rating : props.original.rating}
                    changeRating={this.changeRating}
                    starRatedColor="red"
                    numberOfStars={5}
                    name={''+props.original.id+''}
                    starDimension="20px"
                    starSpacing="2px" />
                    </div>
                );
            }},
        ]
        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <ToastContainer autoClose={3000} />
                    <div className="page-header">
                        <div className="main-title"><strong>User Proposal List</strong></div>
                        <ul className="page-top-actions">
                            <li><Link to="#" className="green" data-toggle="modal" data-target="#sourceSelection">Add Proposal</Link></li>
                            <li><Link to="/proposal/target">Sales Target Report</Link></li>
                        </ul>
                    </div>
                    <div className="theme-panel">
                        <div className="prosess-tab">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button className="nav-link active">All</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.discussionProposal}>Leads</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link"  onClick={this.followupProposal}>Followup</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.closedProposal}>Deals</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.rejectedProposal}>Reject</button>
                                </li>
                            </ul>
                        </div>
                         <div className="page-top-search ">
                            <Link to="#" data-toggle="collapse" data-target="#searchfields" aria-expanded="true"><i className="fa fa-filter"></i></Link>
                        </div>
                        <div id="searchfields" className="search-fields collapse show">
                            <div className="searchfields-box">
                                <ul className="searchfields-ul custom">
                                    <li className="single-search-field">
                                    <form className="filters">
                                        <div className="label">Employe Name</div>
                                        <select className="selectpicker" name="employee" onChange={this.employeeSelect}
                                        value={this.state.filterBy.employee}>
                                            <option value="">All</option>
                                            {userFilterData}
                                        </select>
                                        </form>
                                    </li>
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
                                        onChange={this.timePeriod} />
                                        <label class="custom-control-label" for="customRadio">Custom</label></li>
                                         <li className="single-search-field custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="customRadio2" name="timePeriodStep"  
                                        value={1} 
                                        checked={this.state.timePeriodStep === 1} 
                                        onChange={this.timePeriod} />
                                        <label class="custom-control-label" for="customRadio2">Standard</label>
                                        </li>
                                    </li>
                                    {this.state.timePeriodStep=== 2  ?
                                    <><li className="single-search-field">
                                        <form className="filters">
                                        <div className="label">From Date</div>
                                        <input type="date" name='from' value={this.state.filterBy.from} onChange={this.employeeSelect}/>
                                        </form>
                                    </li>
                                    <li className="single-search-field">
                                        <form className="filters">
                                        <div className="label">To Date</div>
                                        <input type="date" name='to'  value={this.state.filterBy.to} onChange={this.employeeSelect}/>
                                    </form>
                                    </li></>:null}
                                    {this.state.timePeriodStep=== 1  ? 
                                    <li className="single-search-field">
                                        <form className="filters">
                                        <div className="label">Time Period</div><select className="selectpicker" name="timeSlot" onChange={this.employeeSelect}
                                         value={this.state.filterBy.timeSlot}>
                                        <option value="">All</option>
                                        <option value="today">Today</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="last3months">Last 3 Months</option>
                                        <option value="last6months">Last 6 Months</option>
                                        <option value="1year">Yearly</option>
                                        {/* <option value="yearlysalesTarget">Yearly Graph</option> */}
                                    </select>
                                    </form>
                                    </li>:null}
                                    {this.state.filterBy.timeSlot==="monthly" ?
                                    <li className="single-search-field">
                                        <form className="filters">
                                        <div className="label">Month</div>
                                        <select className="selectpicker" name="monthly" onChange={this.employeeSelect}
                                        value={this.state.filterBy.monthly}>
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
                                        <div className="label">Source</div>
                                        <select className="selectpicker" name="source" onChange={this.employeeSelect}
                                        value={this.state.filterBy.source}>
                                            <option value="">All</option>
                                            <option value="upwork">Upwork</option>
                                            <option value="freelancer">Freelancer</option>
                                            <option value="LinkedIn">LinkedIn</option>
                                        </select>
                                        </form>
                                    </li>
                                    <li className="single-search-field">
                                    <form className="filters">
                                        <div className="label">Status</div>
                                        <select className="selectpicker" name="status" onChange={this.employeeSelect}
                                        value={this.state.filterBy.status}>
                                            <option value="">All</option>
                                            <option value="pending">Pending</option>
                                            <option value="discussion">Discussion</option>
                                            <option value="followUp">FollowUp</option>
                                            <option value="approved">Approved</option>
                                            <option value="reject">Reject</option>
                                        </select>
                                        </form>
                                    </li>
                                </ul>
                                <ul className="searchfields-ul">
                                    <li><button className="btn-submit" style={{background:"#4ac103"}} onClick={()=> {this.props.getSalesDataByID(this.state.filterBy)}}>Submit</button>
                                    <button className="btn-submit" style={{background:"#6c757d"}} onClick={()=> {this.reset()}}>Reset</button></li>
                                </ul>
                            </div>
                        </div>
                        <div className="user-bidding-list">
                            <div className="leftId">
                            <ul>
                                {this.state.filterUserData && this.state.filterUserData.map(employee => {
                                    return (
                                        // eslint-disable-next-line
                                        filterReturnDataSource && filterReturnDataSource.includes(employee.id) ?
                                        <li key={employee.id}>
                                            <Link to="#" className="bidder" data-toggle="modal" data-target="#source-view" onClick={() => this.calulatePortal(employee.id)}>
                                                {employee.firstName + " " + employee.lastName}
                                                <span>{employee.count}</span>
                                            </Link>
                                        </li> : null
                                    )
                                })}
                                {this.props.salesData.id && this.props.salesData.id ?
                                <>
                                {this.state.filterUserData && this.state.filterUserData.map(employee => {
                                    return (
                                        // eslint-disable-next-line
                                        filterReturnDataSource && filterReturnDataSource.includes(employee.id) ?
                                        <>{this.props.salesData && this.props.salesData.tableRecords.count.map((el,index) => 
                                        <li key={index}>
                                            <Link to="#" className="bidder" >
                                                {el.portal}
                                                <span>{el.count}</span>
                                            </Link>
                                        </li>)}</> : null
                                    )
                                })}</>:null}
                            </ul>
                            {this.props.salesData.id && this.props.salesData.id ?<>
                            {this.state.filterUserData && this.state.filterUserData.map(employee => {
                                return (
                                    // eslint-disable-next-line
                                    filterReturnDataSource && filterReturnDataSource.includes(employee.id) ?
                            <ul>
                                <li key={employee.id}>
                                    <Link to="#" className="bidder" onClick={() => this.calulatePortal(employee.id)}>
                                    Total Bids 
                                    <span>{this.props.salesData && this.props.salesData.tableRecords.totalRecords}</span>
                                    </Link>
                                </li>
                            </ul>:null)
                            })}
                            </>:null}
                            </div>
                            {this.props.salesData.id && this.props.salesData.id ?
                                <div style={{float:"right"}}>
                                {this.state.filterUserData && this.state.filterUserData.map(employee => {
                                    return (
                                        // eslint-disable-next-line
                                        filterReturnDataSource && filterReturnDataSource.includes(employee.id) ?
                                            <strong key={employee.id}>
                                                Average Rating <br />
                                                <span style={{fontSize:"23px",color:"green"}}>{this.props.salesData && (this.props.salesData.Rating.average).toFixed(1)}</span>
                                                <span><br /><StarRatings
                                                rating={this.props.salesData && this.props.salesData.Rating.average}
                                                starDimension="13px"
                                                starSpacing="3px"
                                                /></span>
                                            </strong>: null
                                    )
                                })}</div>:null}
                        </div>
                        <div className="tab-content"> 
                            <div className="tab-pane fade show active">
                                <div className="table-overflow">
                                    <ReactTable 
                                        loading={this.state.loading}
                                        manual  // this would indicate that server side pagination has been enabled 
                                        onFetchData={(state) => {this.props.getSalesDataByID({page: state.page+1, limit: state.pageSize, 
                                            employee: "",
                                            timeSlot: this.state.filterBy.timeSlot,
                                            monthly:"",
                                            source: "",
                                            status: "",
                                            from:'',
                                            to: (new Date()).toISOString().split('T')[0]})}}
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
                                        pages={this.state.pages} 
                                        columns={columns}
                                        data={this.props.salesData.data}
                                        defaultPageSize={this.state.pageSize}
                                        onPageSizeChange={this.onchangePage}>
                                    </ReactTable>
                                </div>
                            </div>
                            <div className="modal fade modal-theme" id="source-view" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body close-on-body">
                                            <div className="user-name">
                                                {this.props.salesButtonStatus.data ? this.props.salesButtonStatus.data[0].firstName + " " + this.props.salesButtonStatus.data[0].lastName : null}
                                            </div>
                                            <div className="source-detail">
                                                {this.props.salesButtonStatus.tableRecords && this.props.salesButtonStatus.tableRecords.count.map(count => {
                                                    return(
                                                        <div className="source-box">
                                                            {count.portal}
                                                            <span>{count.count}</span>
                                                        </div>)
                                                })}
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-theme btn-sm" data-dismiss="modal">ok</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal modal-right fade " id="employeedetails" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                                <div className="modal-dialog view-pop view-up" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <div className="title">
                                                Employee Details
                                            </div>
                                            <button className="close" data-dismiss="modal"><i className="fa fa-times" aria-hidden="true"></i></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="user-view-box">
                                                <div className="user-bio">
                                                    <div className="user-name">{this.state.viewData.firstName + " " + this.state.viewData.lastName}</div>
                                                    <div className="user-pic user-img"  style={{backgroundImage: `url(${`${connection.concat(this.state.viewData.userImage)}`})`}}></div>
                                                </div>
                                                <div className="user-details using-details">
                                                    
                                                    <div className="heading">
                                                        <strong>Details :</strong>
                                                    </div>
                                                    <div className="user-details-list">
                                                    <div className="name">
                                                        Target Achieved</div>
                                                        <span className="gmail">{this.state.viewData.TargetAchieved}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                    <div className="name">
                                                        Email</div>
                                                        <span>{this.state.viewData.email}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                    <div className="name">
                                                        Date of Birth</div>
                                                        <span>{moment(this.state.viewData.dob).format("DD MMMM YYYY")}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                    <div className="name">
                                                        Gender</div>
                                                        <span>{this.state.viewData.gender}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                    <div className="name">
                                                        Skills</div>
                                                        <span>{this.state.viewData.skills}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                    <div className="name">
                                                        phone Work</div>
                                                        <span>{this.state.viewData.phoneW}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                    <div className="name">
                                                        Nationality</div>
                                                        <span>{this.state.viewData.nationality}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                    <div className="name">
                                                        Marital Status</div>
                                                        <span>{this.state.viewData.maritalStatus}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">
                                                        Street Address</div>
                                                        <span>{this.state.viewData.streetAddress}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                               
                                    <Link to="/proposal/target" title="" data-original-title="Copy">
                                    <button type="button" className="btn btn-theme btn-sm" style={{marginRight:"49%"}} data-toggle="modal" data-target="#employeedetails">Sales Target</button>
                                        </Link>
                                            <button type="button" className="btn btn-gray btn-sm" data-dismiss="modal">Back</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal modal-right fade " id="clientdetails" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                                <div className="modal-dialog view-pop " role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <div className="title">
                                                Client Details
                                            </div>
                                            <button className="close" data-dismiss="modal"><i className="fa fa-times" aria-hidden="true"></i></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="user-view-box">
                                                <div className="user-bio">
                                                    <div className="user-name">{this.state.viewData.clientName}</div>
                                                </div>
                                                <div className="user-details">
                                                    <div className="heading">
                                                       <strong>Details :</strong>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Job Posted Date</div>
                                                        <span className="gmail">{moment(this.state.viewData.clientPostedDateTime).format("DD MMMM YYYY, h:mm A")}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Company</div>
                                                        <span>{this.state.viewData.company}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Country</div>
                                                        <span>{this.state.viewData.countryCityState}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Email</div>
                                                        <span>{this.state.viewData.email}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Phone</div>
                                                        <span>{this.state.viewData.phone}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                    <div className="client"  data-toggle="modal" data-target="#projectdetails" title="" data-original-title="View" onClick={() => this.viewDetail(this.state.viewData)}>{this.state.viewData.proposalLink}</div>
                                                        <span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-gray btn-sm" data-dismiss="modal">Back</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal modal-right fade " id="projectdetails" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                                <div className="modal-dialog view-pop full-view" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <div className="title">
                                                Project Details
                                            </div>
                                            <button className="close" data-dismiss="modal"><i className="fa fa-times" aria-hidden="true"></i></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="theme-panel">
                                                <div className="discussion-box">
                                                    <div className="discussion-header">
                                                        <div className="title"><strong>Assigned Person</strong></div>
                                                    </div>
                                                    <div className="discussion-detail">
                                                        <div className="discussion-date">{moment(this.state.viewData.date).format("DD MMMM YYYY")}</div>
                                                        <div className="details-title">
                                                            <span className="lable">Proposal Id   </span>{this.state.viewData.id}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable">Person Name   </span>{this.state.viewData.firstName + " " + this.state.viewData.lastName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="theme-panel">
                                                <div className="discussion-box">
                                                    <div className="discussion-header">
                                                        <div className="title"><strong>Client Discussion Details</strong></div>
                                                    </div>
                                                    <div className="discussion-detail">
                                                        <div className="discussion-date">{moment(this.state.viewData.clientPostedDateTime).format("DD MMMM YYYY")}</div>
                                                        <div className="details-title">
                                                            <span className="lable">Company Name   </span>{this.state.viewData.company}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable">Client Email</span>{this.state.viewData.email}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable">Client Phone</span>{this.state.viewData.phone}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable">Client Country / City / State</span>{this.state.viewData.countryCityState}
                                                        </div>
                                                    </div>
                                                    <div className="discussion-header">
                                                        <div className="title"><strong>Project Details</strong></div>
                                                    </div>
                                                    <div className="discussion-detail">
                                                        <div className="discussion-date">{moment(this.state.viewData.proposalSubmissionDateTime).format("DD MMMM YYYY")}</div>
                                                        <div className="details-title">
                                                            <span className="lable">Title   </span>{this.state.viewData.submissionTitle}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable">Profile</span>{this.state.viewData.profile}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable">Project Type</span>{this.state.viewData.projectType}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable">Domain</span>{this.state.viewData.domain}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable">Source</span>{this.state.viewData.portal}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable">Job Link</span>{this.state.viewData.jobReqLink}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable">Proposal Link</span>{this.state.viewData.proposalLink}
                                                        </div>
                                                        <div className="requirment-details">
                                                        <div className="requirment-title">
                                                            <strong>Job Requirement</strong><br />
                                                            </div>
                                                        <div className="requirment-details">{this.state.viewData.jobRequirement}</div>
                                                        </div>
                                                        <div className="details-title"><br />
                                                            <span className="lable">Pitch Content</span>{this.state.viewData.pitchContent}
                                                        </div>
                                                        <div className="details-title"><span className="lable">Rating</span>
                                                        <StarRatings 
                                                            rating={this.state.viewData.rating===null ? this.state.rating : this.state.viewData.rating}
                                                            changeRating={this.changeRating}
                                                            starRatedColor="red"
                                                            numberOfStars={5}
                                                            name={this.state.viewData.id}
                                                            starDimension="20px"
                                                            starSpacing="2px"/>
                                                        </div>
                                                    </div>
                                                    <div className="requirment-details">
                                                        <div className="requirment-title">
                                                            <strong>Discussion:</strong> 
                                                        </div>
                                                        <div className="requirment-details">
                                                            The right questions and resulting answers not only help you to provide better results for your clients, but the act of asking questions that prompt productive dialogues can improve your relationships. With a better understanding of the client's business, her goals and challenges, needs, and values, you can find new ways to provide value to the client and connect with the larger team.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-gray btn-sm" data-dismiss="modal">Back</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal modal-right fade " id="viewprofile" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                                <div className="modal-dialog view-pop " role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <div className="title">
                                                Details
                                            </div>
                                            <button className="close" data-dismiss="modal"><i className="fa fa-times" aria-hidden="true"></i></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="user-view-box">
                                                <div className="reverse">
                                                <div className="user-details">
                                                    <div className="heading">
                                                        <strong>Employee</strong>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Employee Name</div>
                                                        <span className="gmail">{this.state.viewData.firstName + " " + this.state.viewData.lastName}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Profile</div>
                                                        <span className="gmail">{this.state.viewData.profile}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Date of Birth</div>
                                                        <span>{moment(this.state.viewData.dob).format("DD MMMM YYYY")}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Gender</div>
                                                        <span>{this.state.viewData.gender}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Target Achieved</div>
                                                        <span>{this.state.viewData.TargetAchieved}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Skills</div>
                                                        <span>{this.state.viewData.skills}</span>
                                                    </div>
                                                </div>
                                                <div className="user-details">
                                                    <div className="heading">
                                                        <strong>Client</strong>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Client Name</div>
                                                        <span className="gmail">{this.state.viewData.clientName}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Client Designation</div>
                                                        <span className="gmail">{this.state.viewData.clientDesignation}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Job Posted Date</div>
                                                        <span>{moment(this.state.viewData.clientPostedDateTime).format("DD MMMM YYYY, h:mm A")}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Email</div>
                                                        <span>{this.state.viewData.email}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Phone</div>
                                                        <span>{this.state.viewData.phone}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Country / City / State</div>
                                                        <span>{this.state.viewData.countryCityState}</span>
                                                    </div>  
                                                </div></div>

                                                <div className="reverse1">
                                                <div className="user-details">
                                                    <div className="heading">
                                                    <strong> Company</strong>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Company Name</div>
                                                        <span className="gmail">{this.state.viewData.company}</span>
                                                    </div>
                                                    {this.state.viewData.portal === 'LinkedIn' ?
                                                    <><div className="user-details-list">
                                                        <div className="name">Company Phone</div>
                                                        <span>{this.state.viewData.companyPhone}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Company URL</div>
                                                        <span>{this.state.viewData.companyUrl}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Company Pattern Email</div>
                                                        <span>{this.state.viewData.patternEmail}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Company LinkedIn Profile</div> 
                                                        <span>{this.state.viewData.companylinkedInProfile}</span>
                                                    </div>
                                                    
                                                    </>:null}
                                                </div>
                                                {this.state.viewData.portal !== 'LinkedIn' ?
                                                <div className="user-details">
                                                    <div className="heading">
                                                    <strong> Project</strong>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Project Type</div>
                                                        <span>{this.state.viewData.projectType}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Project Title</div>
                                                        <span>{this.state.viewData.submissionTitle}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Domain</div>
                                                        <span>{this.state.viewData.domain}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Portal</div>
                                                        <span>{this.state.viewData.portal}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Job Link</div>
                                                        <span>{this.state.viewData.jobReqLink}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Proposal Link</div>
                                                        <span>{this.state.viewData.proposalLink}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Proposal Submission Date</div>
                                                        <span>{moment(this.state.viewData.proposalSubmissionDateTime).format("DD MMMM YYYY, h:mm A")}</span>
                                                    </div>
                                                    <div className="user-details-list">
                                                        <div className="name">Pitch Content</div>
                                                        <span>{this.state.viewData.pitchContent}</span>
                                                    </div>
                                                </div>:null}</div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            
                                                <Link to={{ pathname: `/proposal/edit/${this.state.viewData.id}`}} title="" data-original-title="Copy">
                                                <button type="button" className="btn btn-edit btn-sm" data-toggle="modal" data-target="#viewprofile">Edit</button>
                                                </Link>
                                            <button type="button" className="btn btn-gray btn-sm" data-dismiss="modal">Back</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Add Proposal Modal */}
                            <div className="modal fade" id="sourceSelection" role="dialog" >
                                <div className="modal-dialog custom-modal">
                                <div className="modal-content" style={{marginTop:"50%"}}>
                                    <div className="modal-header">
                                    <h4 className="modal-title">Select Source</h4>
                                    <button type="button" className="close" data-dismiss="modal" onClick={() => this.setState({modal:{modal:0,value:""}})}>&times;</button>
                                    </div>
                                    <div className="modal-body" style={{display: 'flex', justifyContent: 'space-around'}}>
                                        {/* <button type="button" className={this.state.modal.modal===1 ? "btn btn-success" : "btn btn-primary"} onClick={() => this.setState({modal:{modal:1,value:"upwork"}})}>Upwork</button>
                                        <button type="button" className={this.state.modal.modal===2 ? "btn btn-success" : "btn btn-primary"} onClick={() => this.setState({modal:{modal:2,value:"LinkedIn"}})} >LinkedIn</button>
                                        <button type="button" className={this.state.modal.modal===3 ? "btn btn-success" : "btn btn-primary"} onClick={() => this.setState({modal:{modal:3,value:"freelancer"}})} >Freelancer</button> */}
                                        <div className="addpro">
                                        <select className="selectpicker" data-dismiss="modal" data-target="#sourceSelection" name="source" onChange={(e) => {
                                            window.jQuery('#sourceSelection').modal('hide');
                                            this.addProposal(e)}}>
                                            <option value="" >Select source</option>
                                            <option value="upwork">Upwork</option>
                                            <option value="freelancer">Freelancer</option>
                                            <option value="LinkedIn">LinkedIn</option>
                                        </select>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            </div>

                            <div className="modal fade modal-theme" id="delete" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body close-on-body">
                                            <p>User Status Deactivated</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-theme btn-sm" data-dismiss="modal">ok</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/* Follow-Up Modal */}
                            <div className="modal fade" id="FollowUpSelection" role="dialog">
                                <div className="modal-dialog">
                                <div className="modal-content" style={{marginTop:"50%"}}>
                                    <div className="modal-header">
                                    <h3 className="modal-title">Welcome!</h3>
                                    <button type="button" className="close" data-dismiss="modal" onClick={() => this.setState({modal:{modal:0,value:""}})}>&times;</button>
                                    </div>
                                    <div className="modal-body">
                                    <h4>Follow-Up Date</h4><br />
                                        <input type="date" onChange={(e) => this.setState({followdate:e.target.value})} /><br /><br />
                                        <h4 >Follow-Up Time(24 Hour Format)</h4><br />
                                        <input type="time" onChange={(e) => this.setState({followTime:e.target.value})} />
                                        <h4 >Comments</h4><br />
                                        <textarea  rows="4" cols="37" onChange={(e) => this.setState({Comments:e.target.value})}></textarea>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-info" data-dismiss="modal"  onClick={this.handleFollowSubmit}>Ok</button>
                                        <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={() => this.setState({modal:{modal:0,value:""}})}>Cancel</button>
                                    </div>
                                </div>
                                </div>
                            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.CtrSales,">>>>>>")
    const data = state.CtrSales.getData
    const dropDown = state.CtrSales.getDropDown
    const status = state.CtrSales.statusData
    return {
        salesData: data,
        salesDropDown: dropDown,
        salesButtonStatus: status
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSalesDataByID: (data) => dispatch(actionCreator.getSalesActionData(data)),
        calcutateSource: (data) => dispatch(actionCreator.buttonSelectStatus(data)),
        getDropDownData: (data) => dispatch(actionCreator.getSalesDropDownActionData(data)),
        upStatusData: (data) => dispatch(actionCreator.updateStatusData(data)),
        deleteStatus: (data) => dispatch(actionCreator.deleteStatusData(data)),
        followpatchData: (data) => dispatch(actionCreator.updateProposalData(data)),
        csvFileUpload: (data) => dispatch(actionCreator.importCsvFileAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProposalTable);
