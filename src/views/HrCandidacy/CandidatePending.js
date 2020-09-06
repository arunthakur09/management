import React from "react";
import { connect } from 'react-redux';
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment-timezone';

class CandidatePending extends React.Component {
    constructor() {
        super()
        this.state = {
            timePeriodStep: 1,
            timePeriod: {
                timePeriod: '',
                outcome: 'pending',
                hiringManager: '',
                skills: '',
                from: '',
                to: (new Date()).toISOString().split('T')[0],
                isActive: '',
                candidateName: '',
                monthly:''
            },
        }
    }

    componentDidMount = () => {
        this.props.getCandidateData({outcome: "pending",timePeriod: '', hiringManager: '', skills: '',from: '',to: '',isActive:'',candidateName:''});
        var data = {dept:"HR",jobTitle:'',supervisor:'',userid:'',employeeStatus:'',isActive:'',firstName:'',from:'',to:'',timePeriod:'',monthly:''}
        this.props.getHr(data);
    }
    componentDidUpdate = () => {
        window.jQuery('.selectpicker').selectpicker('refresh');
    }

    timePeriod = (e) => {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        })
    }

    allCandidate = () => {
        let path = `/hrCandidacy`;
        this.props.history.push(path);
    }

    selectedCandidate = () => {
        let path = `/hrCandidacy/selected`;
        this.props.history.push(path);
    }

    archivedCandidate = () => {
        let path = `/hrCandidacy/archived`;
        this.props.history.push(path);
    }

    reset = () => {
        this.setState({
            displayName:''
        })
        this.setState ({
        timePeriod: {
        ...this.state.timePeriod,
        timePeriod: '',
        outcome: 'pending',
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

    salesDataClick = (data, outcome) => {
        this.forceUpdate()
        const statusData = {
            id: data.id,
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
                <div className="client"  data-toggle="modal" data-target="#clientdetails" title="" data-original-title="View" style={{marginLeft: "30px"}}>
                    <span className='clientName'>{props.original.candidateName}</span>
                </div>
            },
            { Header: "Email", accessor: "email"},
            { Header: "InterView Date", accessor: "interviewDate",
            Cell : props =>
                <div className="client"  data-toggle="modal" data-target="#projectdetails" title="" data-original-title="View" style={{textAlign: "center"}}>
                    <span className='submissionTitle'>{moment(props.original.interviewDate).format("DD MMMM YYYY")}</span>
                </div>
            },
            { Header: "InterView Mode", accessor: "interviewMode",
            style: {
                textAlign: "center"
            },},
            { Header: "Round", accessor: "rounds",
            style: {
                textAlign: "center"
            },},
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
        ]
        const hrData = this.props.hrData2 && this.props.hrData2.map((e,index) => {
            return (
                <option key={index} value={e.id}>{e.firstName}</option>
            )
        })
        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Candidate List</strong></div>
                        <ul className="page-top-actions">
                            <li><Link to="/hrCandidacy/add" className="green">Add Candidate</Link></li>
                        </ul>
                    </div>
                    <div className="theme-panel">
                        <div className="prosess-tab">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.allCandidate}>All</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link active">Pending</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.selectedCandidate}>Selected</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.archivedCandidate}>Reject</button>
                                </li>
                            </ul>
                            <div id="searchfields" className="search-fields collapse show">
                            <div className="searchfields-box">
                                <ul className="searchfields-ul custom">
                                    {localStorage.getItem('roleId')==='3' ? null :
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
                                        </form>
                                        </li>:null
                                    }}
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
                            <ul>
                                {/* <div className="action-btn" style={{width: "15%", float: "right"}}>
                                    <div className="input-form">
                                        <select className="form-control" name="timePeriod" onChange={this.filterTimePeriod}>
                                            <option value="">All</option>
                                            <option value="today">Today</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                </div> */}
                            </ul>
                        </div>
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
                                columns={columns}
                                data={this.props.hrData}
                                defaultPageSize={10}>
                            </ReactTable>
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
      getHr: data =>dispatch(actionCreator.getUsersDataAction(data))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(CandidatePending);
