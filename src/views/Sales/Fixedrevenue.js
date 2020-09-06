import React from "react";
import { connect } from 'react-redux';
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from "react-router-dom";
import "../../assets/css/Theme/Main.css";
import "../../assets/css/Theme/rstyle.css";

class DepartmentTable extends React.Component {
    constructor() {
        super()
        this.state = {
            viewData: {},
            filterState:false,
            timePeriodStep: 1,
            filteredData: {
                month: '',
                projectType:"Fixed",
                from:'',
                to:'',
                timePeriod:''
            },
            pageSize:10,
        }
    }

    componentDidMount = () => {
        let data={month:"",projectType:"Fixed",from:'',to:'',timePeriod:''}
        this.props.getRevData(data);
        this.props.getUsersData();
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
        filteredData: {
        ...this.state.filteredData,
        month: '',
        projectType:"fixed",
        from:'',
        to:'',
        timePeriod:''}
        },
        ()=> {this.props.getRevData(this.state.filteredData)}
        )
    }

    employeeSelect = (e) => {
        console.log(e.target.name)
        this.setState({
            filteredData:{
            ...this.state.filteredData,
            [e.target.name]:e.target.value
            },
            filterState:true
        },
        // () => {
        //     this.props.getRevData(data);
        // }
        )
    }

    Fixed = () => {
        let path = `/revenue`;
        this.props.history.push(path);
    }

    render () {
        const columns = [
            { Header: "Sr No.", id: "row",
                Cell: (row) => {
                    return <div>{row.index+1}</div>
                },
                style: {
                    textAlign: "center",
                },
                width: 70,
                maxWidth: 70,
                minWidth: 70,
                
            },
            { Header: "Client Name", accessor: "clientName",
            Cell : props =>
                <div className="client" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}>
                    <span className='departmentName'><Link to={{ pathname: `/revenue/edit/${props.original.id}`}} className="green">{props.original.clientName}</Link></span>
                </div>,
                style: {
                    textAlign: "center",
                },
               
            },
            { Header: "Resource", accessor: "resourceId",
            Cell : props =>
                <div>
                    <span>{props.original.firstName}</span>
                </div>,
                style: {
                    textAlign: "center",
                },
            },
            { Header: "Upwork ID", accessor: "upworkId",
                style: {
                    textAlign: "center",
                },
            },
            { Header: "Milestone Date", accessor: "fromTo",
            Cell : props =>
                <div>{props.original.fromTo && props.original.fromTo.split(",").map((val,id) => {
                return(<span key={id}>Mile{id+1}:{val}<br/></span>)
                })}
                </div>,
                style: {
                    textAlign: "center",
                },
            },
            { Header: "Amount Paid", accessor: "milestone",
            Cell : props =>
                <div>{props.original.milestone && props.original.milestone.split("|").map((val,id) => {
                return(<span key={id}>Mile{id+1} => ${val}<br/></span>)
                })}
                </div>,
                style: {
                    textAlign: "center",
                },
            },
            { Header: "Actual Revenue", accessor: "actualRevenue",
            Cell : props =>
                <div className="form-group"title="" data-original-title="View">
                    <span className='clientName'>{"$" + props.original.actualRevenue}</span>
                </div>,
                style: {
                    textAlign: "center",

    flex: "100 0 auto",
    width: "100px"
                },
                Footer: (
                    <span style={{fontSize: "17px"}}><b>${
                    // Get the total of the price
                    this.props.revData.data && this.props.revData.data.reduce((total, { actualRevenue }) => total += actualRevenue, 0)
                    }</b></span>
                ),
                getFooterProps: (dsadsad,dadsa,element) =>
                {
                   return {
                        style: {
                            background:"rgb(131, 210, 32)"
                         }, 
                    }
                } ,
                headerStyle: {
                    background:"rgb(131, 210, 32)"
                }
            },
        ]

        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Revenue Report Records</strong></div>
                        <ul className="page-top-actions">
                            <li><Link to="/revenue/add" className="green">Add Report</Link></li>
                        </ul>
                    </div>
                    <div className="theme-panel">
                <div className="prosess-tab">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.Fixed}>Hourly Projects</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link active">Fixed Projects</button>
                                </li>
                            </ul>
                        </div>
                        <div id="searchfields" className="search-fields collapse show">
                            <div className="searchfields-box">
                                <ul className="searchfields-ul">
                                    {/* <li className="single-search-field">
                                        <div className="label">Year</div>
                                        <select className="form-control" name="year">
                                            <option value="">Year</option>
                                        </select>
                                    </li> */}
                                    <li className="single-search-field single" style={{textAlign:"center"}}>
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
                                        <input type="date" name='from' value={this.state.filteredData.from} onChange={this.employeeSelect}/>
                                    </form>
                                    </li>
                                    <li className="single-search-field">
                                    <form className="filters">
                                        <div className="label">To Date</div>
                                        <input type="date" name='to'  value={this.state.filteredData.to} onChange={this.employeeSelect}/>
                                    </form>
                                    </li></>:null}
                                    {this.state.timePeriodStep=== 1  ? 
                                    <li className="single-search-field">
                                        <form className="filters">
                                            <div className="label">Time Period</div>
                                            <select className="selectpicker" name="timePeriod" onChange={this.employeeSelect}
                                                value={this.state.filteredData.timePeriod}>
                                                <option value="">All</option>
                                                <option value="today" style={{display: "none"}}>Today</option>
                                                <option value="weekly" style={{display: "none"}}>Weekly</option>
                                                <option value="monthly">Monthly</option>
                                                <option value="last3months">Last 3 Months</option>
                                                <option value="last6months">Last 6 Months</option>
                                                <option value="1year">Yearly</option>
                                                {/* <option value="yearlysalesTarget">Yearly Graph</option> */}
                                            </select>
                                        </form>
                                    </li>:null}
                                    {/* <li className="single-search-field">
                                        <div className="label">Month</div>
                                        <select className="form-control" name="month" onChange={this.employeeSelect}
                                        value={this.state.filteredData.month}>
                                            <option value="">Annual</option>
                                            <option value="January">January</option>
                                            <option value="February">February</option>
                                            <option value="March">March</option>
                                            <option value="April">April</option>
                                            <option value="May">May</option>
                                            <option value="June">June</option>
                                            <option value="July">July</option>
                                            <option value="August">August</option>
                                            <option value="September">September</option>
                                            <option value="October">October</option>
                                            <option value="November">November</option>
                                            <option value="December">December</option>
                                        </select>
                                    </li> */}
                                    <li className="single-search-field" style={{float:"right",color:"green",fontSize:"23px"}}>
                                    Overall Revenue:{this.props.revData && this.props.revData.data && this.props.revData.data[0] && this.props.revData.data[0].overallRevenues}</li>
                                </ul>
                                <ul className="searchfields-ul">
                                    <li><button className="btn-submit" style={{background:"#4ac103"}} onClick={()=> {this.props.getRevData(this.state.filteredData)}}>Submit</button>
                                    <button className="btn-submit" style={{background:"#6c757d"}} onClick={()=> {this.reset()}}>Reset</button></li>
                                </ul>
                            </div></div>
                        <div className="table-overflow priority-list">
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
                            data={this.props.revData.data}
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
                                    <div className="user-details">
                                        <div className="heading">
                                            Details :
                                        </div>
                                        <div className="user-details-list">
                                            Short Code
                                            <span>{this.state.viewData.shortCode}</span>
                                        </div>
                                        <div className="user-details-list">
                                            KRA
                                            <span>{this.state.viewData.kra}</span>
                                        </div>
                                        <div className="user-details-list">
                                            IsActive
                                            <span>{this.state.viewData.isActive === 1 ? "true" : "false"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-edit btn-sm" data-toggle="modal" data-target="#viewprofile"><Link to={{ pathname: `/departments/edit/${this.state.viewData.id}`}} title="" data-original-title="Copy"><font color="white">Edit</font></Link></button>
                                <button type="button" className="btn btn-theme btn-sm" data-dismiss="modal">Back</button>
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
    const data = state.CtrRevenue.revData 
    return {
        usersData: state.CtrUser.userData.result,
        revData: data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRevData: (data) => dispatch(actionCreator.getRevenueDataAction(data)),
        getUsersData: () => dispatch(actionCreator.getUsersDataAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentTable);
