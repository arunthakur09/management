import React from "react";
import { connect } from 'react-redux';
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment-timezone';

class HrCandidacy extends React.Component {
    constructor() {
        super()
        this.state = {
            id: '',
            viewData: {},
            timePeriodStep: 1,
            timePeriod: {
                timePeriod: '',
                outcome: 'reject',
                hiringManager: '',
                candidateName:'',
                skills: '',
                from: '',
                to: (new Date()).toISOString().split('T')[0],
                isActive:0,
                monthly:''
            },
        }
    }

    componentDidMount = () => {
        var data = {dept:"HR",jobTitle:'',supervisor:'',userid:'',employeeStatus:'',isActive:'',firstName:'',from:'',to:'',timePeriod:'',monthly:''}
        this.props.getCandidateData({timePeriod:'',outcome:'reject',candidateName:'',hiringManager:'',skills:'',from:'',to:'',isActive:0,monthly:''});
        this.props.getHr(data)
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

    pendingCandidate = () => {
        let path = `/hrCandidacy/pending`;
        this.props.history.push(path);
    }

    selectedCandidate = () => {
        let path = `/hrCandidacy/selected`;
        this.props.history.push(path);
    }

    archivedCandidate = () => {
        let path = `/hrCandidacy`;
        this.props.history.push(path);
    }

    filterTimePeriod = (e) => {
        const { timePeriod } = this.state
        timePeriod[e.target.name] = e.target.value ? e.target.value : ""
        this.setState({
            timePeriod
        },
        // () => {
        //     this.props.getCandidateData(timePeriod)
        // }
        )
    }    

    isActive = (data) => {
        this.setState({
            id:data.id
        })
    }

    reset = () => {
        this.setState({
            displayName:''
        })
        this.setState ({
        timePeriod: {
        ...this.state.timePeriod,
        timePeriod: '',
        outcome: 'reject',
        hiringManager: '',
        candidateName:'',
        skills: '',
        from: '',
        to: (new Date()).toISOString().split('T')[0],
        isActive:'',
        monthly:''
    }
        },
        ()=> {this.props.getCandidateData(this.state.timePeriod)}
        )
    }

    salesDataClick = (data, outcome) => {
        this.forceUpdate()
        const statusData = {
            id: data.id,
            candidateName: data.candidateName,
            email: data.email,
            skills: data.skills,
            rounds: data.rounds,
            experience: data.experience,
            currentSalary: data.currentSalary,
            expectedSalary: data.expectedSalary,
            noticePeriod: data.noticePeriod,
            interviewDate: data.interviewDate.slice(0, 10),
            interviewTime: data.interviewTime,
            interviewMode: data.interviewMode,
            reasonForChange: data.reasonForChange,
            outcome: outcome,
            isActive: outcome==='reject' ? 0:1
        }
        this.props.candidateEdit(statusData);
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
                width: 100,
                maxWidth: 100,
                minWidth: 100,
            },
            { Header: "Candidate Name", accessor: "candidateName",
            Cell : props =>
                <div className="client" data-toggle="modal" data-target="#viewprofile" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}>
                    <span className='clientName'>{props.original.candidateName}</span>
                </div>,
                style: {
                    marginLeft: "40px"
                },
            },
            { Header: "Phone", accessor: "phone",
                style: {
                    marginLeft: "40px"
                },
            },
            { Header: "Email", accessor: "email",
                style: {
                    marginLeft: "40px"
                },
            },
            { Header: "Skills", accessor: "skills",
                style: {
                    marginLeft: "40px"
                },
            },
            { Header: "InterView Date", accessor: "interviewDate",
            Cell : props =>
                    <span className='submissionTitle'>{moment(props.original.interviewDate).format("DD MMMM YYYY")}</span>,
                style: {
                    marginLeft: "60px"
                },
            },
            { Header: "Outcome", accessor: "outcome",
                style: {
                    textAlign: "center"
                },
                width: 100,
                maxWidth: 100,
                minWidth: 100,
                Cell : props =>
                    <div>
                        {props.original.outcome === "pending" ?
                        <div className="status-step">
                            <ul>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "pending")} className="propsal" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Pending"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "selected")} data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Selected"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "reject")} data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Reject"></button>
                                </li>
                            </ul>
                            <span>Pending</span>
                        </div> :
                        props.original.outcome === "selected" ?
                        <div className="status-step">
                            <ul>
                                <li >
                                    <button onClick={() => this.salesDataClick(props.original, "pending")} className="underprogress" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Pending"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "selected")} className="underprogress" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Selected"></button>
                                </li>
                                <li >
                                    <button onClick={() => this.salesDataClick(props.original, "reject")} data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Reject"></button>
                                </li>
                            </ul>
                            <span>selected</span>
                        </div> :
                        props.original.outcome === "reject" ?
                        <div className="status-step">
                            <ul>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "pending")} className="close" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Pending"></button>
                                </li>
                                <li>
                                    <button onClick={() => this.salesDataClick(props.original, "selected")} className="close" data-toggle="tooltip" data-placement="top"  data-original-title="disscussion" title="Selected"></button>
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
                            {/* <span><Link to={{ pathname: `/hrCandidacy/edit/${props.original.id}`}} className="fa fa-edit" title="" data-original-title="Copy"></Link></span>
                            <span><Link to="#" className="fa fa-trash-o text-danger" data-toggle="modal" data-target="#delete" title="delete" data-original-title="delete" onClick={() => this.isActive(props.original)}></Link></span> */}
                        </ul>
                    )
                },
                style: {
                    textAlign: "center",
                    marginLeft: "50px"
                },
            },
        ]
        const hrData = this.props.hrData2 && this.props.hrData2.map((e,index) => {
            return (
                <option key={index} value={e.id}>{e.firstName}</option>
            )
        });
        
        // eslint-disable-next-line no-sequences
        let counts = (this.props.hrData && this.props.hrData).reduce((c, { firstName: key }) => (c[key] = (c[key] || 0) + 1, c), {});
        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Candidate List</strong></div>
                        {localStorage.getItem('userRole') === '3' || localStorage.getItem('roleId') === '2' ?
                        <ul className="page-top-actions">
                            <li><Link to="/hrCandidacy/add" className="green">Add Candidate</Link></li>
                        </ul>:null}
                    </div>
                    <div className="theme-panel">
                        <div className="prosess-tab">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.archivedCandidate}>All</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.pendingCandidate}>Pending</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.selectedCandidate}>Selected</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link active">Reject</button>
                                </li>
                            </ul><div id="searchfields" className="search-fields collapse show">
                            <div className="searchfields-box">
                                <ul className="searchfields-ul custom">
                                    {localStorage.getItem('roleId')==='3' && localStorage.getItem('userRole')!=='3'? null :
                                    <li className="single-search-field">
                                        <form className="filters">
                                    <div className="label">Hiring Manager</div>
                                    <select className="selectpicker" name="hiringManager" onChange={this.filterTimePeriod}
                                    value={this.state.timePeriod.hiringManager}>
                                        <option value="">All</option>
                                        {hrData}
                                    </select>
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
                                        </form></li>:null
                                    }}
                                    <li className="single-search-field">
                                    <form className="filters">
                                        <div className="label">Status</div>
                                        <select className="selectpicker" name="outcome" onChange={this.filterTimePeriod}
                                        value={this.state.timePeriod.outcome}>
                                            <option value="">All</option>
                                            <option value="pending">Pending</option>
                                            <option value="selected">Selected</option>
                                            <option value="reject">Reject</option>
                                        </select>
                                        </form>
                                    </li>
                                    <li className="single-search-field">
                                    <form className="filters">
                                        <div className="label">Skills</div>
                                        <select className="selectpicker" name="skills" onChange={this.filterTimePeriod}
                                        value={this.state.timePeriod.skills}>
                                            <option value="">All</option>
                                            <option value="ReactJS">ReactJS</option>
                                            <option value="NodeJS">NodeJS</option>
                                            <option value="MeanStack">MeanStack</option>
                                            <option value="FullStack">FullStack</option>
                                            <option value="MernStack">MernStack</option>
                                        </select>
                                        </form>
                                    </li>
                                </ul>
                                <ul className="searchfields-ul">
                                    <li><button className="btn-submit" style={{background:"#4ac103"}} onClick={()=> {this.props.getCandidateData(this.state.timePeriod)}}>Submit</button>
                                    <button className="btn-submit" style={{background:"#6c757d"}} onClick={()=> {this.reset()}}>Reset</button></li>
                                </ul>
                            </div>
                        </div>
                        </div>
                        <div className="user-bidding-list">
                        <div className="leftId">
                        <ul>
                        {Object.keys(counts).length && Object.keys(counts).map((rk)=> <li key={rk}>
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
                                data={this.props.hrData}
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
                                        <div className="user-name">{this.state.viewData.candidateName}</div>
                                        <div className="user-post">{this.state.viewData.email}</div>
                                    </div>
                                    <div className="user-details">
                                        <div className="heading"><strong>Details :</strong></div>
                                        <div className="user-details-list">
                                        <div className="name">
                                            InterView Date
                                        </div>
                                        <span>{moment(this.state.viewData.interviewDate).format("DD MMMM YYYY")}</span></div>
                                        <div className="user-details-list">
                                            <div className="name">InterView Mode</div>
                                            <span>{this.state.viewData.interviewMode}</span></div>
                                        <div className="user-details-list">
                                            <div className="name">InterView Time</div>
                                            <span>{this.state.viewData.interviewTime}</span></div>
                                        <div className="user-details-list">
                                            <div className="name">Candidate Current Salary</div>
                                            <span>{this.state.viewData.currentSalary}</span></div>
                                        <div className="user-details-list">
                                            <div className="name">Candidate Expected Salary</div>
                                            <span>{this.state.viewData.expectedSalary}</span></div>
                                        <div className="user-details-list">
                                            <div className="name">Experience</div>
                                            <span>{this.state.viewData.experience}</span></div>
                                        <div className="user-details-list">
                                            <div className="name">Notice Period</div>
                                            <span>{this.state.viewData.noticePeriod}</span></div>
                                        <div className="user-details-list">
                                            <div className="name">Reason For Change</div>
                                            <span>{this.state.viewData.reasonForChange}</span></div>
                                        <div className="user-details-list">
                                            <div className="name">Outcome</div>
                                            <span>{this.state.viewData.outcome}</span></div>
                                        <div className="user-details-list">
                                            <div className="name">Hiring Manager</div>
                                            <span>{this.state.viewData.hiringManager}</span></div>
                                        <div className="user-details-list">
                                            <div className="name">Skills</div>
                                            <span>{this.state.viewData.skills}</span></div>
                                        <div className="user-details-list">
                                            <div className="name">Email</div>
                                            <span>{this.state.viewData.email}</span></div>
                                        <div className="user-details-list">
                                            <div className="name">Rounds</div>
                                            <span>{this.state.viewData.rounds}</span></div>
                                        <div className="user-details-list">
                                            <div className="name">Phone</div>
                                            <span>{this.state.viewData.phone}</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-gray btn-sm" data-dismiss="modal">Back</button>
                                {/* <button type="button" className="btn btn-edit btn-sm" data-toggle="modal" data-target="#viewprofile"><Link to={{ pathname: `/hrCandidacy/edit/${this.state.viewData.id}`}} title="" data-original-title="Copy"><font color="white">Edit</font></Link></button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade modal-theme" id="delete" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body close-on-body">
                                <p>Are you really want to restore this entry?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-gray btn-sm" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-theme btn-sm" name="isActive" data-dismiss="modal" onClick={() => this.props.isActive({id:this.state.id,isActive:1})}>ok</button>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        )
    }
}

const mapStateToProps = state => {
    const data = state.CtrlHrCandidacy.getCandidate
    return {
      hrData: data,
      hrData2: state.CtrUser.userData.result
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
      getCandidateData: (data) => dispatch(actionCreator.getHrCandidacyAction(data)),
      candidateEdit: data => dispatch(actionCreator.editHrCandidacyStatus(data)),
      getHr: data =>dispatch(actionCreator.getUsersDataAction(data)),
      isActive: data =>dispatch(actionCreator.editHrCandidacy(data)),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(HrCandidacy);
