import React from "react";
import { connect } from 'react-redux';
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment-timezone';

class SelectedCandidate extends React.Component {
    constructor() {
        super()
        this.state = {
            timePeriodStep: 1,
            timePeriod: {
                timePeriod: '',
                outcome: 'selected',
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
        this.props.getCandidateData({outcome: "selected", timePeriod: '', hiringManager: '', skills: '',from: '',to: '',isActive:'',candidateName:''});
        var data = {dept:"HR",jobTitle:'',supervisor:'',userid:'',employeeStatus:'',isActive:'',firstName:'',from:'',to:'',timePeriod:'',monthly:''}
        this.props.getHr(data)
    }
    componentDidUpdate = () => {
        window.jQuery('.selectpicker').selectpicker('refresh');
    }

    timePeriod = (e) => {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
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
        outcome: 'selected',
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

    allCandidate = () => {
        let path = `/hrCandidacy`;
        this.props.history.push(path);
    }

    pendingCandidate = () => {
        let path = `/hrCandidacy/pending`;
        this.props.history.push(path);
    }

    archivedCandidate = () => {
        let path = `/hrCandidacy/archived`;
        this.props.history.push(path);
    }

    addEmployee = (data) => {
        this.props.candidateById({id: data, emp: "true"})
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
            { Header: () => (<div style={{textAlign: "left", marginLeft:"20px"}}>Candidate Name</div>), accessor: "candidateName",
            Cell : props =>
                <div className="client"  data-toggle="modal" data-target="#clientdetails" title="" data-original-title="View" style={{ marginLeft: "20px" }}>
                    <span className='clientName'>{props.original.candidateName}</span>
                </div>
            },
            { Header: "Email", accessor: "email",
            },
            { Header: "InterView Date", accessor: "interviewDate",
            Cell : props =>
                <div className="client"  data-toggle="modal" data-target="#projectdetails" title="" data-original-title="View" style={{ textAlign: "center" }}>
                    <span className='submissionTitle'>{moment(props.original.interviewDate).format("DD MMMM YYYY")}</span>
                </div>
            },
            { Header: "InterView Mode", accessor: "interviewMode",
            },
            { Header: "Actions",
            Cell: props =>
                <div>
                    <ul className="table-actions">
                        <span><Link to="#" className="fa fa-plus" data-toggle="modal" data-target="#viewprofile" title="Add Employee" data-original-title="View"
                        style={{ marginLeft: "20px" }} onClick={() => this.addEmployee(props.original.id)}></Link></span>
                    </ul>
                </div>,
                width: 100,
                maxWidth: 100,
                minWidth: 100,
            }
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
                                    <button className="nav-link" onClick={this.pendingCandidate}>Pending</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link active">Selected</button>
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
                                        </form></li>:null
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
    const datas = state.CtrlHrCandidacy.getCandidateById
    return {
      hrData: data,
      candidateData: datas,
      hrData2: state.CtrUser.userData.result
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
      getCandidateData: (data) => dispatch(actionCreator.getHrCandidacyAction(data)),
      candidateById: data => dispatch(actionCreator.getCandidateById(data)),
      getHr: data =>dispatch(actionCreator.getUsersDataAction(data))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(SelectedCandidate);
