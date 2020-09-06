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
                outcome: '',
                userid: '',
                status: 'pending',
                from: '',
                to: (new Date()).toISOString().split('T')[0],
                monthly:''
            },
        }
    }

    componentDidMount = () => {
        this.props.GetleaveData({status: "pending",from:"",to:"",userid:"",timePeriod:'',outcome:'',monthly:''});
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
        let path = `/leaveManagement`;
        this.props.history.push(path);
    }

    selectedCandidate = () => {
        let path = `/leaveManagement/selected`;
        this.props.history.push(path);
    }

    filterTimePeriod = (e) => {
        const { timePeriod } = this.state
        timePeriod[e.target.name] = e.target.value ? e.target.value : ""
        this.setState({
            timePeriod
        },
        // () => {
        //     this.props.GetleaveData({status: "pending", ...timePeriod})
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
        status: 'pending',
        from: '',
        to: '',
        monthly:''
        }
        },
        ()=> {this.props.GetleaveData(this.state.timePeriod)}
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
            },
            { Header: "Employee Name", accessor: "employeeName",
            Cell : props =>
                <div className="client"  data-toggle="modal" data-target="#clientdetails" title="" data-original-title="View">
                    <span className='clientName'>{props.original.firstName + " "}</span>
                    <span className='clientName'>{props.original.lastName}</span>
                </div>,
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Leave Type", accessor: "leaveType",
                style: {
                    textAlign: "center"
                },
            },
            { Header: "DateFrom", accessor: "dateFrom",
            Cell : props =>
                    <span className='submissionTitle'>{moment(props.original.dateFrom).format("DD MMMM YYYY")}</span>,
                style: {
                    textAlign: "center"
                },
            },
            { Header: "DateTo", accessor: "dateTo",
            Cell : props =>
                    <span className='submissionTitle'>{moment(props.original.dateTo).format("DD MMMM YYYY")}</span>,
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Reason", accessor: "reason",
                style: {
                    textAlign: "center"
                },
            }
        ]
        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Employee Leave Record</strong></div>
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
                                    <button className="nav-link" onClick={this.selectedCandidate}>Approved</button>
                                </li>
                            </ul>
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
                                    {/* {localStorage.getItem('roleId')==='3' ? null :
                                    <li className="single-search-field">
                                    <div className="label">Employee</div>
                                        <Autocomplete 
                                        shouldItemRender={(item, value) => item.ename.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                        items={hrdata}
                                        getItemValue={(item) => item.ename} name="userid"
                                         renderItem={ (item, highlighted) => (
                                            <div 
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
                                    </li>} */}
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
                                    }
                                </ul>
                                <ul className="searchfields-ul">
                                    <li style={{paddingLeft:"3%"}}><button className="btn-submit" style={{background:"#4ac103"}} onClick={()=> {this.props.GetleaveData(this.state.timePeriod)}}>Submit</button>
                                    <button className="btn-submit" style={{background:"#6c757d"}} onClick={()=> {this.reset()}}>Reset</button></li>
                                </ul>
                            </div>
                        </div>
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
                                data={this.props.leaveData}
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
    const data = state.CtrlLeave.getleaveData.data
    return {
        leaveData: data
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        GetleaveData: (data) => dispatch(actionCreator.getLeaveDataAction(data))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(CandidatePending);
