import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import "../../assets/css/Theme/Main.css";

class EditCandidate extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            leave: {}
        }
    }

    componentDidMount = () => {
        this.props.leaveById({id: this.props.match.params.id});
    }

    componentWillReceiveProps = (nextProps) => {
        const data = nextProps.leaveData
        this.setState({
            leave: data.length > 0 ? data[0] : {}
        })
    }

    handleChange = (e) => {
        this.setState ({
            leave: {
            ...this.state.leave,
            [e.target.name]: e.target.value}
        })
        console.log(this.state)
    }

    handleSwitchChange = e => {
        this.setState({
            candidate: {
                ...this.state.leave,
                [e.target.name]: e.target.checked
            }
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            id: this.state.leave.id,
            dateFrom: this.state.leave.dateFrom.slice(0, 10),
            dateTo: this.state.leave.dateTo.slice(0, 10),
            departmentHead: this.state.leave.departmentHead,
            status: this.state.leave.status,
            leaveDuration: this.state.leave.leaveDuration,
            shift: this.state.leave.shift,
            leaveTime: this.state.leave.leaveTime,
            reason: this.state.leave.reason,
            leaveType:this.state.leave.leaveType,
            isActive: this.state.leave.isActive  === true ? 1 : 0
        };
        this.props.leaveEdit(data);
    };

    render () {
        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Edit Leave Request</strong></div>
                        <ul className="page-top-actions">
                            <li><Link to="/Dashboard" className="green">Back</Link></li>
                        </ul>
                    </div>
                    <div className="theme-panel">
                        <div className="main-page-content">
                            <div className="theme-header">
                                <div className="right-side"></div>
                            </div>
                            <div className="page-main">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                                        <div className="tab-content b_l" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <div className="theme-content">
                                                    <div className="heading-title">Leave Details</div>
                                                    <div className="form-vertical">
                                                        <div className="row">
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Candidate First Name</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" name="firstName"
                                                                        value={this.state.leave.firstName ? this.state.leave.firstName : "" }
                                                                        onChange={this.handleChange} disable/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Candidate Last Name</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" name="lastName"
                                                                        value={this.state.leave.lastName ? this.state.leave.lastName : "" }
                                                                        onChange={this.handleChange} disable/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Leave Type</label>
                                                                    <div className="controls">
                                                                        <select type="text" className="form-control" name="leaveType"
                                                                        value={this.state.leave.leaveType} onChange={this.handleChange}>
                                                                            <option value=''>---Select Leave Type---</option>
                                                                            <option value='Medical'>Medical</option>
                                                                            <option value='Emergency'>Emergency</option>
                                                                            <option value='Personal'>Personal</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div><div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Duration of Leave</label>
                                                                    <div className="controls">
                                                                        <select type="text" className="form-control" name="leaveDuration"
                                                                        value={this.state.leave.leaveDuration} onChange={this.handleChange}>
                                                                            <option value=''>---Select Leave Duration---</option>
                                                                            <option value='FullDay'>Full Day Leave</option>
                                                                            <option value='HalfDay'>Half Day Leave</option>
                                                                            <option value='Short'>Short Leave</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {this.state.leave.leaveDuration==='HalfDay' ? 
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Select Shift</label>
                                                                    <div className="controls">
                                                                        <select type="text" className="form-control" name="shift"
                                                                        value={this.state.leave.shift} onChange={this.handleChange}>
                                                                            <option value=''>---Select Leave Shift---</option>
                                                                            <option value='MorningShift'>Morning Shift</option>
                                                                            <option value='EveningShift'>Evening Shift</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>:null}
                                                            {this.state.leave.leaveDuration==='Short' ? 
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Select Leave Time</label>
                                                                    <div className="controls">
                                                                        <input type="time" className="form-control" name="leaveTime" 
                                                                        value={this.state.leave.leaveTime}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                            </div>:null}
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Department Head</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" name="departmentHead" placeholder="Email"
                                                                        value={this.state.leave.departmentHead ? this.state.leave.departmentHead : "" }
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">From</label>
                                                                    <div className="controls">
                                                                        <input type="date" className="form-control" name="dateFrom" placeholder="Email"
                                                                        value={this.state.leave.dateFrom ? this.state.leave.dateFrom.slice(0, 10) : "" }
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">To</label>
                                                                    <div className="controls">
                                                                        <input type="date" className="form-control" name="dateTo"
                                                                        value={this.state.leave.dateTo ? this.state.leave.dateTo.slice(0, 10) : ""}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* eslint-disable-next-line */}
                                                            {localStorage.getItem("roleId") == 2 || localStorage.getItem("userRole") == 3 ?
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Status</label>
                                                                    <div className="controls">
                                                                        <select className="form-control" name="status"
                                                                        value={this.state.leave.status} onChange={this.handleChange}>
                                                                            <option value="pending">Pending</option>
                                                                            <option value="approved">Approved</option>
                                                                            <option value="reject">Reject</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div> : null 
                                                            }
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Reason For Leave</label>
                                                                    <div className="controls">
                                                                        <textarea rows="4" cols="50" className="form-controlArea" name="reason"
                                                                        value={this.state.leave.reason ? this.state.leave.reason : ""}
                                                                        onChange={this.handleChange}></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="theme-footer">
                                    <Link to="/Dashboard" className="btn btn-gray btn-sm">Back</Link>
                                    <Link to="/Dashboard" className="btn btn-theme btn-sm float-right" onClick={this.handleSubmit}>Save</Link>
                                    {/* <button type="button" onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right">Save</button> */}
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
    
    const data = state.CtrlLeave.getleaveDatabyId
    return {
       leaveData: data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        leaveById: data => dispatch(actionCreator.getLeaveDataById(data)),
        leaveEdit: data => dispatch(actionCreator.editDashboardLeaveData(data))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(EditCandidate);
