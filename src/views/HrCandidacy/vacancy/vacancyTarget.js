import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";

class SalesTarget extends React.Component {
    constructor () {
        super()
        this.state = {
            timePeriod: {
                id: '',
                from: '',
                to: ''
            }
        }
    }

    componentDidMount = () => {
        this.props.hrTargetData()
    }

    filterTimePeriod = (e) => {
        const { timePeriod } = this.state
        timePeriod[e.target.name] = e.target.value ? e.target.value : ""
        this.setState({
            timePeriod
        }, () => {
            this.props.hrTargetData(timePeriod)
        })
    }

    render () {
        const targetData = this.props.salesData && this.props.salesData.data
        
        const employeeTarget = targetData && targetData.map(val => parseInt(val.positions))
        const sumEmployeeTarget = employeeTarget && employeeTarget.reduce((partial_sum, a) => partial_sum + a,0)

        const targetAchieved = targetData && targetData.map(val => val.Selected)
        const sumTargetAchieved = targetAchieved && targetAchieved.reduce((partial_sum, a) => partial_sum + a,0)

        return (
            <div className="mainPanel">
                <div className="page-content-inner ">
                    <div className="page-header">
                        <div className="main-title"><strong>HR Target</strong></div>
                        <ul className="page-top-actions">
                            {/* <li><Link to="/sales" className="green">Target Records</Link></li> */}
                            <li><Link to="/vacancy" className="green">Back</Link></li>
                        </ul>
                    </div>
                    <div className="theme-panel">
                        <div className="performance-box">
                            <div className="title">
                                Targets
                                <div className="action-btn">
                                    <div className="input-form">
                                    <ul style={{display:"inline-flex"}}>
                                    <li className="single-search-field"style={{marginRight:"13px"}}>
                                        <div className="label">From Date</div>
                                        <input type="date" name='from' onChange={this.filterTimePeriod}/>
                                    </li>
                                    <li className="single-search-field">
                                        <div className="label">To Date</div>
                                        <input type="date" name='to' onChange={this.filterTimePeriod}/>
                                    </li>
                                    </ul>
                                    </div>
                                </div>
                            </div>
                            {targetData && targetData.map((target,index) => {
                                return (
                                    <div className="performance-details" key={index}>
                                        <div className="business-user">
                                            <div className="user-collaps collapsed" data-toggle="collapse" data-target={`#${target.fullName}`} aria-expanded="false" aria-controls="collapseExample" key={target.fullName}>
                                                <div className="user-name">
                                                    <div className="user-im"></div>
                                                    <div className="name-t">{target.fullName}</div>
                                                </div>
                                                <div className="employee-progress">
                                                    <div className="title">Employee Progress</div>
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: `${(parseInt(target.Selected) * 100)/parseInt(target.positions)}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{((target.Selected * 100)/target.positions).toFixed(0)}% </div>
                                                    </div><span style={{float: "right"}}><b>{target.positions}</b></span>
                                                </div>
                                                {/* <span>{target.positions}</span> */}
                                            </div>
                                            <div id={target.fullName} className="collapse">
                                                <div className="work-senario">
                                                    <div className="row">
                                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                            <div className="work-target-box green">
                                                                <img src="themes/images/progress-icon1.png" alt="icon1" />
                                                                <div className="title">
                                                                    Selected Candidates
                                                                </div>
                                                                <div className="count green">
                                                                    {target.Selected}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                            <div className="work-target-box darkblue">
                                                                <img src="themes/images/progress-icon2.png" alt="icon2" />
                                                                <div className="title">
                                                                    Remaining Positions
                                                                </div>
                                                                <div className="count darkblue">
                                                                    {parseInt(target.positions)-parseInt(target.Selected)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                                            <div className="work-target-box purple">
                                                                <img src="themes/images/progress-icon3.png" alt="icon3" />
                                                                <div className="title">
                                                                    Total Positions
                                                                </div>
                                                                <div className="count purple">
                                                                    {target.positions}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Link to={{ pathname: `/vacancy/target/${target.id}`}} className="btn btn-theme">Graphical View</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="title">Total Sales Targets of all Employees</div>
                            <div className="work-senario">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="work-target-box green">
                                            <img src="themes/images/progress-icon1.png" alt="icon13" />
                                            <div className="title">
                                               Filled Vacancies 
                                            </div>
                                            <div className="count green">
                                                {`${sumTargetAchieved}`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="work-target-box darkblue">
                                            <img src="themes/images/progress-icon2.png" alt="icon14" />
                                            <div className="title">
                                            Remaining Vacancies
                                            </div>
                                            <div className="count darkblue">
                                                {`${sumEmployeeTarget-sumTargetAchieved}`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="work-target-box purple">
                                            <img src="themes/images/progress-icon3.png" alt="icon15" />
                                            <div className="title">
                                               Total Vacancies
                                            </div>
                                            <div className="count purple">
                                                {`${sumEmployeeTarget}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
        salesData: state.CtrVacancy.hrTargetDataById
    };
};

const mapDispatchToProps = dispatch => {
    return {
        hrTargetData: (data) => dispatch(actionCreator.getVacancyTargetAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesTarget);
