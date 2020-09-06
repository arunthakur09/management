import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";

class SalesTarget extends React.Component {
    constructor () {
        super()
        this.state = {
            timePeriod: {}
        }
    }

    componentDidMount = () => {
        this.props.salesTargetData()
    }

    filterTimePeriod = (e) => {
        const { timePeriod } = this.state
        timePeriod[e.target.name] = e.target.value ? e.target.value : ""
        this.setState({
            timePeriod
        }, () => {
            this.props.salesTargetData(timePeriod)
        })
    }

    render () {
        const targetData = this.props.salesData
        
        //const employeeTarget = targetData && targetData.map(val => val.employeeTarget)
        //const sumEmployeeTarget = employeeTarget && employeeTarget.reduce((partial_sum, a) => partial_sum + a,0)

        //const targetAchieved = targetData && targetData.map(val => val.Revenue)
        //const sumTargetAchieved = targetAchieved && targetAchieved.reduce((partial_sum, a) => partial_sum + a,0)

        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Leave Record of all employees</strong></div>
                        <ul className="page-top-actions">
                            {/* <li><Link to="/sales" className="green">Target Records</Link></li> */}
                            <li><Link to="/Leavemanagement" className="green">Back</Link></li>
                        </ul>
                    </div>
                    <div className="theme-panel">
                        <div className="performance-box">
                            <div className="title">
                                <div className="action-btn">
                                    <div className="input-form">
                                        {/* <select className="form-control" name="timePeriod" onChange={this.filterTimePeriod}>
                                            <option value="">All</option>
                                            <option value="today" style={{display: "none"}}>Today</option>
                                            <option value="weekly" style={{display: "none"}}>Weekly</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="last3months">Last 3 Months</option>
                                            <option value="last6months">Last 6 Months</option>
                                            <option value="1year">Yearly</option>
                                        </select> */}
                                    </div>
                                </div>
                            </div>
                            {targetData && targetData.map(target => {
                                return (
                                    <div className="performance-details" key={target.id}>
                                        <div className="business-user">
                                            <div className="user-collaps collapsed" data-toggle="collapse" data-target={`#${target.fullName}`} aria-expanded="false" aria-controls="collapseExample" key={target.fullName}>
                                                <div className="user-name">
                                                    <div className="user-im"></div>
                                                    <div className="name-t">{target.fullName}</div>
                                                </div>
                                                <div className="employee-progress">
                                                    <div className="title">Employee Progress</div>
                                                    {(parseInt(target.leaves) * 100)/12 > 100 ?
                                                    <div className="progress">
                                                    <div className="progress-bar-danger" role="progressbar" style={{width: `${(parseInt(target.leaves) * 100)/12}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{target.leaves} </div>
                                                </div>
                                                    :
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: `${(parseInt(target.leaves) * 100)/12}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{target.leaves} </div>
                                                    </div>}
                                                    <span style={{float: "right"}}><b>Total Leaves:{12}</b></span>
                                                </div>
                                                <span>{target.employeeTarget}</span>
                                            </div>
                                            <div id={target.fullName} className="collapse">
                                                <div className="work-senario">
                                                    <div className="row">
                                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                            <div className="work-target-box green">
                                                                <img src="themes/images/progress-icon1.png" alt="icon1" />
                                                                <div className="title">
                                                                    Leaves Taken
                                                                </div>
                                                                <div className="count green">
                                                                    {target.leaves}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                            <div className="work-target-box darkblue">
                                                                <img src="themes/images/progress-icon2.png" alt="icon2" />
                                                                <div className="title">
                                                                    Leaves Remaining
                                                                </div>
                                                                <div className="count darkblue">
                                                                    {12-parseInt(target.leaves)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                            <div className="work-target-box purple">
                                                                <img src="themes/images/progress-icon3.png" alt="icon3" />
                                                                <div className="title">
                                                                    Total Leaves
                                                                </div>
                                                                <div className="count purple">
                                                                    {12}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Link to={{ pathname: `/Leavemanagement/dashboard/${target.id}`}} className="btn btn-theme">Graphical View</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {/* <div className="title">Total Sales Targets of all Employees</div>
                            <div className="work-senario">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="work-target-box green">
                                            <img src="themes/images/progress-icon1.png" alt="icon13" />
                                            <div className="title">
                                                Expected Target
                                            </div>
                                            <div className="count green">
                                                {`$${sumEmployeeTarget}`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="work-target-box darkblue">
                                            <img src="themes/images/progress-icon2.png" alt="icon14" />
                                            <div className="title">
                                                Remaining Target
                                            </div>
                                            <div className="count darkblue">
                                                {`$${sumEmployeeTarget-sumTargetAchieved}`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="work-target-box purple">
                                            <img src="themes/images/progress-icon3.png" alt="icon15" />
                                            <div className="title">
                                                Achieved Target
                                            </div>
                                            <div className="count purple">
                                                {`$${sumTargetAchieved}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.CtrlLeave.getleaveData.getCountFields)
    const data = state.CtrlLeave.getleaveData.getCountFields
    return {
        salesData: data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSalesDataByID: (data) => dispatch(actionCreator.getLeaveDataAction(data)),
        salesTargetData: (data) => dispatch(actionCreator.getLeaveDataAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesTarget);
