import React from "react";
import { connect } from 'react-redux';
import * as actionCreator from "../../../Redux/Actions/ActionTypes/index";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from "react-router-dom";

class VacancyTable extends React.Component {
    constructor() {
        super()
        this.state = {
            viewData: {},
            timePeriodStep: 1,
            timePeriod: {
                timePeriod: '',
                outcome: '',
                hiringManager: '',
                jobTitle:'',
                skills: '',
                from: '',
                to: (new Date()).toISOString().split('T')[0],
                isActive:'',
                monthly:''
            },
        }
    }

    componentDidMount = () => {
        this.props.getVacancydata({from:'',to:'',timePeriod:'',jobTitle:'',hiringManager:''});
        var data = {dept:"HR",jobTitle:'',supervisor:"",userid:'',employeeStatus:'',isActive:'',firstName:'',from:'',to:'',timePeriod:'',monthly:''};
        this.props.getHr(data)
    }
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

    reset = () => {
        this.setState({
            displayName:''
        })
        this.setState ({
        timePeriod: {
        ...this.state.timePeriod,
        timePeriod: '',
        outcome: '',
        hiringManager: '',
        jobTitle:'',
        skills: '',
        from: '',
        to: (new Date()).toISOString().split('T')[0],
        isActive:'',
        monthly:''
    }
        },
        ()=> {this.props.getVacancydata(this.state.timePeriod)}
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
            { Header: "Job Title", accessor: "jobTitle",
            Cell : props =>
                <div className="client"  data-toggle="modal" data-target="#viewprofile" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}>
                    <span className='departmentName'>{props.original.jobTitle}</span>
                </div>,
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Positions", accessor: "positions",
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Target Met", accessor: "targetMet",
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Hiring Manager", accessor: "firstName",
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Actions",
                Cell: props => {
                    return (
                        <ul className="table-actions">
                            <span><Link to="#" className="fa fa-eye" data-toggle="modal" data-target="#viewprofile" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}></Link></span>
                            <span><Link to={{ pathname: `/vacancy/edit/${props.original.id}`}} className="fa fa-edit" title="" data-original-title="Copy"></Link></span>
                            <span><Link to="#" className="fa fa-trash-o text-danger" data-toggle="modal" data-target="#delete" title="delete" data-original-title="delete"></Link></span>
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
        const hrData = this.props.hrData2 && this.props.hrData2.map((e,index) => {
            
            return (
                <option key={index} value={e.id}>{e.firstName}</option>
            )
        });

        return (
            <div className="mainPanel">
                <div className="page-content-inner ">
                    <div className="page-header">
                        <div className="main-title"><strong>Job Vacancy List</strong></div>
                        <ul className="page-top-actions">
                            <li><Link to="/vacancy/add" className="green">Add Job Vacancy</Link></li>
                            <li><Link to="/vacancy/target">HR Target Report</Link></li>
                        </ul>
                    </div>
                    <div className="theme-panel">
                        <div className="prosess-tab">
                            {/* <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button className="nav-link active">All</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.pendingCandidate} >Pending</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.selectedCandidate} title="Add Candidate to be an Employee from here">Selected</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.archivedCandidate}>Reject</button>
                                </li>
                            </ul> */}
                            <div id="searchfields" className="search-fields collapse show">
                            <div className="searchfields-box">
                                <ul className="searchfields-ul custom">
                                    {localStorage.getItem('roleId')==='3' && localStorage.getItem('userRole')!=='3' ? null :
                                    <li className="single-search-field">
                                        <form className="filters">
                                        <div className="label">Hiring Manager</div>
                                        <select className="selectpicker" name="hiringManager" onChange={this.filterTimePeriod}>
                                            <option value="">All</option>
                                            {hrData}
                                        </select>
                                        </form>
                                    </li>}
                                    <li className="single-search-field">
                                    <form className="filters">
                                        <div className="label">Job Title</div>
                                        <select className="selectpicker" name="jobTitle" onChange={this.filterTimePeriod}
                                        value={this.state.timePeriod.jobTitle}>                                            
                                            <option value="">All</option>
                                            <option value="Web Developer">Web Developer</option>
                                            <option value="Trainee">Trainee</option>
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
                                    <li><button className="btn-submit" style={{background:"#4ac103"}} onClick={()=> {this.props.getVacancydata(this.state.timePeriod)}}>Submit</button>
                                    <button className="btn-submit" style={{background:"#6c757d"}} onClick={()=> {this.reset()}}>Reset</button></li>
                                </ul>
                                </div>
                            </div>
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
                            data={this.props.vacancyData}
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
                                        <div className="user-name">{this.state.viewData.departmentName}</div>
                                    </div>
                                    <div className="user-details using-details">
                                        <div className="heading">
                                            <strong>Details :</strong>
                                        </div>
                                        <div className="user-details-list">
                                            <div className="name">Job Title</div>
                                            <span>{this.state.viewData.jobTitle}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Vacancy Name</div>
                                            <span>{this.state.viewData.vacancyName}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Positions</div>
                                            <span>{this.state.viewData.positions}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Hiring Manager</div>
                                            <span>{this.state.viewData.firstName}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Description</div>
                                            <span>{this.state.viewData.description}</span>
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
                                
                                    <Link to={{ pathname: `/vacancy/edit/${this.state.viewData.id}`}} title="" data-original-title="Copy">
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
    return {
        hrData2:state.CtrUser.userData.result,
        vacancyData: state.CtrVacancy.getvacancyData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getVacancydata: (data) => dispatch(actionCreator.getVacancyDataAction(data)),
        getHr: data =>dispatch(actionCreator.getUsersDataAction(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VacancyTable);
