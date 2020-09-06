import React from "react";
import { connect } from 'react-redux';
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from "moment";
import Autocomplete from "react-autocomplete";

class TimeTable extends React.Component {
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
        this.props.getTimeTableData();
        this.props.getUsersData()
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
        //     this.props.getTimeTableData(this.state.timePeriod)

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
        ()=> {this.props.getTimeTableData(this.state.timePeriod)}
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
            { Header: "Employee", accessor: "userId",
            Cell :props =>
                     <span>{props.original.fullName}</span>,   
                style: {
                    textAlign: "center"
                },
            },
            { Header: "CheckIn Date", accessor: "checkInDate",
            // Cell : props =>
            //     <div className="client"  data-toggle="modal" data-target="#viewprofile" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}>
            //         <span className='departmentName'>{props.original.checkInDate}</span>
            //     </div>,
            //     style: {
            //         textAlign: "center"
            //     },
            Cell : props=> 
                <span>{moment(props.original.checkInDate).format("DD MMM  YYYY")}</span>,
                style: {
                    textAlign: "center"
                },
            },
            { Header: "CheckIn Time", accessor: "checkInTime",
            Cell :props =>
                     <span>{props.original.checkInTime}</span>,   
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Delay Time", accessor: "delayedTime",
            Cell :props =>
                     <span>{parseInt(props.original.delayedTime/60)} Hrs {parseInt(props.original.delayedTime%60)} mins</span>,          
                style: {
                    textAlign: "center"
                },
            },
            { Header: "CheckOut Date", accessor: "checkOutDate",
            Cell : props=> 
            <span>{moment(props.original.checkOutDate).format("DD MMM  YYYY")}</span>,
                style: {
                    textAlign: "center"
                },
            },
            { Header: "CheckOut Time", accessor: "checkOutTime",
            Cell :props =>
                     <span>{props.original.checkOutTime}</span>,   
                style: {
                    textAlign: "center"
                },
            },      
            { Header: "Working Hours", accessor: "working hours",
            Cell :props =>
                     <span>{isNaN(parseInt(props.original.checkOutTime)-parseInt(props.original.checkInTime))===true? "Not yet Checked Out":parseInt(props.original.checkOutTime)-parseInt(props.original.checkInTime)+"Hrs"} </span>,          
                style: {
                    textAlign: "center"
                },
            },
            // { Header: "Actions",
            //     Cell: props => {
            //         return (
            //             <ul className="table-actions">
            //                 <span><Link to="#" className="fa fa-eye" data-toggle="modal" data-target="#viewprofile" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}></Link></span>
            //                 <span><Link to={{ pathname: `/vacancy/edit/${props.original.id}`}} className="fa fa-edit" title="" data-original-title="Copy"></Link></span>
            //                 <span><Link to="#" className="fa fa-trash-o text-danger" data-toggle="modal" data-target="#delete" title="delete" data-original-title="delete"></Link></span>
            //             </ul>
            //         )
            //     },
            //     style: {
            //         textAlign: "center"
            //     },
            // },
        ]
        const timeData1 = this.props.timeData2 ? this.props.timeData2.map((e) => {
            return (
                {ename: e.firstName+" "+e.lastName,eid: e.id.toString()}
            )
        }): [];

        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Time Log List</strong></div>
                        <ul className="page-top-actions">
                            {/* <li><Link to="/vacancy/add" className="green">Back</Link></li>
                            <li><Link to="/vacancy/target">HR Target Report</Link></li>  */}
                        </ul>
                    </div>
                    <div id="searchfields" className="search-fields collapse show">
                        <div className="searchfields-box">
                            <ul className="searchfields-ul custom">
                                {/* <li className="single-search-field">
                                    <div className="label">Employee</div>
                                    <select className="form-control" name="userid" onChange={this.filterTimePeriod}>
                                        <option value="">All</option>
                                        {timeData1}
                                    </select>
                                </li> */}
                                {localStorage.getItem('roleId')==='3' ? null :
                                <li className="single-search-field">
                                    <form className="filters">
                                        <div className="label">Employee</div>
                                        <Autocomplete 
                                        shouldItemRender={(item, value) => item.ename.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                        items={timeData1}
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
                                    </form>
                                </li>}

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
                            </ul>
                            <ul className="searchfields-ul">
                                <li><button className="btn-submit" style={{background:"#4ac103"}} onClick={()=> {this.props.getTimeTableData(this.state.timePeriod)}}>Submit</button>
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
                            data={this.props.timeData}
                            defaultPageSize={10}>
                        </ReactTable>
                        </div>
                    </div>
                </div>
                {/* <div className="modal modal-right fade" id="viewprofile" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
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
                                            Name
                                            <span>{this.state.viewData.name}</span>
                                        </div>
                                        <div className="user-details-list">
                                            Vacancy Name
                                            <span>{this.state.viewData.vacancyName}</span>
                                        </div>
                                        <div className="user-details-list">
                                            IsActive
                                            <span>{this.state.viewData.isActive === 1 ? "true" : "false"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-gray btn-sm" data-dismiss="modal">Back</button>
                                <button type="button" className="btn btn-edit btn-sm" data-toggle="modal" data-target="#viewprofile"><Link to={{ pathname: `/vacancy/edit/${this.state.viewData.id}`}} title="" data-original-title="Copy"><font color="white">Edit</font></Link></button>
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
                </div>    */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log("123456",state)
    return {
        timeData: state.ctrTimeLog.timeData,
        timeData2: state.CtrUser.userData.result
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTimeTableData: (data) => dispatch(actionCreator.getTimeTableDataAction(data)),
        getUsersData: (data) => dispatch(actionCreator.getUsersDataAction(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable);