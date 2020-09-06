import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import "../../assets/css/Theme/Main.css";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class RequestLeave extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            dateFrom: "",
            dateTo: "",
            leaveType: "",
            reason: "",
            departmentHead: "",
            duration: "",
            shift: "",
            leaveTime:""
        }
    }
    
    handleChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }
    handleKra = e => {console.log('>>>>>>>>>',e)
    this.setState({
        userKra: e.blocks[0].text
    });
    console.log(e.blocks[0].text)
    };

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            dateFrom: this.state.dateFrom.slice(0, 10),
            dateTo: this.state.dateTo.slice(0, 10),
            leaveType: this.state.leaveType,
            leaveDuration: this.state.duration,
            shift: this.state.shift,
            leaveTime: this.state.leaveTime,
            reason: this.state.reason,
            departmentHead: this.state.departmentHead
        };
        this.props.addLeaveRequest(data);
        console.log(data)
    };

    render () {
        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Request New Leave</strong></div>
                        <ul className="page-top-actions">
                            <li><Link to="/Leavemanagement" className="green">Back</Link></li>
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
                                                    <div className="form-vertical">
                                                        <div className="row">
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Date From</label>
                                                                    <div className="controls">
                                                                        <input type="date" className="form-control" name="dateFrom" placeholder="Email"
                                                                        value={this.state.dateFrom}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Date To</label>
                                                                    <div className="controls">
                                                                        <input type="date" className="form-control" name="dateTo" placeholder="Email"
                                                                        value={this.state.dateTo}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Leave Type</label>
                                                                    <div className="controls">
                                                                        <select type="text" className="form-control" name="leaveType"
                                                                        value={this.state.leaveType} onChange={this.handleChange}>
                                                                            <option value=''>---Select Leave Type---</option>
                                                                            <option value='Medical'>Medical</option>
                                                                            <option value='Emergency'>Emergency</option>
                                                                            <option value='Personal'>Personal</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Duration of Leave</label>
                                                                    <div className="controls">
                                                                        <select type="text" className="form-control" name="duration"
                                                                        value={this.state.duration} onChange={this.handleChange}>
                                                                            <option value=''>---Select Leave Duration---</option>
                                                                            <option value='FullDay'>Full Day Leave</option>
                                                                            <option value='HalfDay'>Half Day Leave</option>
                                                                            <option value='Short'>Short Leave</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {this.state.duration==='HalfDay' ? 
                                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Select Shift</label>
                                                                    <div className="controls">
                                                                        <select type="text" className="form-control" name="shift"
                                                                        value={this.state.shift} onChange={this.handleChange}>
                                                                            <option value=''>---Select Leave Shift---</option>
                                                                            <option value='MorningShift'>Morning Shift</option>
                                                                            <option value='EveningShift'>Evening Shift</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>:null}
                                                            {this.state.duration==='Short' ? 
                                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Select Leave Time</label>
                                                                    <div className="controls">
                                                                        <input type="time" className="form-control" name="leaveTime" 
                                                                        value={this.state.leaveTime}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                            </div>:null}
                                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Reason</label>
                                                                    <div className="controls">
                                                                    {/* <textarea rows="4" cols="50" className="form-controlArea" name="reason" placeholder="Reason for leave"
                                                                        value={this.state.reason}
                                                                        onChange={this.handleChange} ></textarea> */}
                                                                        <Editor
                                                                          toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName"
                                                                          editorClassName="editorClassName" name="reason" placeholder="Reason for leave"
                                                                          value={this.state.reason} onChange={this.handleKra}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Department Head</label>
                                                                    <div className="controls">
                                                                        <select type="text" className="form-control" name="departmentHead"
                                                                        value={this.state.departmentHead} onChange={this.handleChange}>
                                                                        <option value=''>---Select Department Head---</option>
                                                                        <option value='HR'>HR</option>
                                                                        <option value='Project_Manager'>Project Manager</option>
                                                                        <option value='Business_Manager'>Business Manager</option>
                                                                        </select>
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
                                    <Link to="/Leavemanagement" className="btn btn-gray btn-sm">Back</Link>
                                    <button type="button" onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right btn-save2">Save</button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addLeaveRequest: (data) => dispatch(actionCreator.addLeaveRequestAction(data))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(RequestLeave);
