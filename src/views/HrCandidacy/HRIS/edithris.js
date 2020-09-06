import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
//import Autocomplete from "react-autocomplete";

class EditHris extends React.Component {
    constructor() {
        super();
        this.state = {
            candidate: {},
        };
    }
    componentDidMount = () => {
        this.props.hrisById({id: this.props.match.params.id});
    }
    componentWillReceiveProps = (nextProps) => {
        const data = nextProps.hrisData
        this.setState({
            candidate: data.length > 0 ? data[0] : {},
        })
    }

    handleChange = (e) => {
        this.setState ({
            candidate: {
            ...this.state.candidate,
            [e.target.name]: e.target.value}
        })
        console.log(this.state)
    }

    filterEmp = (val) => {
        this.setState ({
        userId: val
        })
    }

    hrisSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: this.state.candidate.id,
            designation: this.state.candidate.designation,
            exBeforeJoin: this.state.candidate.exBeforeJoin,
            exAfterJoin: this.state.candidate.exAfterJoin,
            referenceContact: this.state.candidate.referenceContact,
            temporaryAddress: this.state.candidate.temporaryAddress,
            slackId: this.state.candidate.slackId,
            slackPassword: this.state.candidate.slackPassword,
            slackNewPassword: this.state.candidate.slackNewPassword,
            gmailId: this.state.candidate.gmailId,
            gmailPassword: this.state.candidate.gmailPassword,
            gmailNewPassword: this.state.candidate.gmailNewPassword,
            userId: this.state.candidate.userId,
            incrementDate: this.state.candidate.incrementDate,
            increment: this.state.candidate.increment,
            reasonOfWork: this.state.candidate.reasonOfWork,
            skillOfInterest: this.state.candidate.skillOfInterest,
            served: this.state.candidate.served,
            comments: this.state.candidate.comments,
            remarks: this.state.candidate.remarks,
            exitFormalities: this.state.candidate.exitFormalities,
            isActive: this.state.candidate.isActive  === true ? 1 : 0
        }
        this.props.hrisEdit(data);
    };

    render() {
        return (
            <div className="page-content-inner mainPanel">
                <div className="page-header">
                    <div className="main-title"><strong>Edit HRIS</strong></div>
                    <ul className="page-top-actions">
                        <li><Link to="/hris" className="green">Back</Link></li>
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
                                                {/* <div className="heading-title">
                                                    Add Details
                                                </div> */}
                                                <div className="form-vertical">
                                                    <div className="row">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Employee:</label> {((this.state.candidate.firstName))}  {((this.state.candidate.lastName))}
                                                                </div>
                                                            </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Designation</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="designation" placeholder="Designation"
                                                                    value={this.state.candidate.designation ? this.state.candidate.designation : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Experience Before Joining</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="exBeforeJoin" placeholder="Experience Before Joining"
                                                                    value={this.state.candidate.exBeforeJoin ? this.state.candidate.exBeforeJoin : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Experience After Joining</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="exAfterJoin" placeholder="Experience After Joining"
                                                                    value={this.state.candidate.exAfterJoin ? this.state.candidate.exAfterJoin : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Reference Contact</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="referenceContact" placeholder="Reference Contact"
                                                                    value={this.state.candidate.referenceContact ? this.state.candidate.referenceContact : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Temporary Address</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="temporaryAddress" placeholder="Temporary Address"
                                                                    value={this.state.candidate.temporaryAddress ? this.state.candidate.temporaryAddress : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Slack Id</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="slackId" placeholder="Slack Id"
                                                                    value={this.state.candidate.slackId ? this.state.candidate.slackId : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Slack Password</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="slackPassword" placeholder="Slack Password"
                                                                    value={this.state.candidate.slackPassword ? this.state.candidate.slackPassword : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Slack New Password</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="slackNewPassword" placeholder="Slack New Password"
                                                                    value={this.state.candidate.slackNewPassword ? this.state.candidate.slackNewPassword : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>		
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Gmail Id</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="gmailId" placeholder="Gmail Id"
                                                                    value={this.state.candidate.gmailId ? this.state.candidate.gmailId : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Gmail Password</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="gmailPassword" placeholder="Gmail Password"
                                                                    value={this.state.candidate.gmailPassword ? this.state.candidate.gmailPassword : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Gmail New Password</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="gmailNewPassword" placeholder="Gmail New Password"
                                                                    value={this.state.candidate.gmailNewPassword ? this.state.candidate.gmailNewPassword : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Increment Date</label>
                                                                <div className="controls">
                                                                    <input type="date" className="form-control" name="incrementDate"
                                                                    value={this.state.candidate.incrementDate ? this.state.candidate.incrementDate : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Increment</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="increment" placeholder="Increment"
                                                                    value={this.state.candidate.increment ? this.state.candidate.increment : "" }onChange={this.handleChange}/>
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Reason Of Leaving</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="reasonOfWork" placeholder="Reason Of Leaving"
                                                                    value={this.state.candidate.reasonOfWork ? this.state.candidate.reasonOfWork : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Skill Of Interest</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="skillOfInterest" placeholder="Skill Of Interest"
                                                                    value={this.state.candidate.skillOfInterest ? this.state.candidate.skillOfInterest : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Notice Period Served</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="served" placeholder="Notice Period Served"
                                                                    value={this.state.candidate.served ? this.state.candidate.served : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Comments</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="comments" placeholder="Comments"
                                                                    value={this.state.candidate.comments ? this.state.candidate.comments : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Remarks</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="remarks" placeholder="Remarks"
                                                                    value={this.state.candidate.remarks ? this.state.candidate.remarks : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Exit Formalities</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="exitFormalities" placeholder="Exit Formalities"
                                                                    value={this.state.candidate.exitFormalities ? this.state.candidate.exitFormalities : ""} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Temporary Address</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="temporaryAddress" placeholder="Temporary Address"
                                                                    value={this.state.temporaryAddress} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Temporary Address</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="temporaryAddress" placeholder="Temporary Address"
                                                                    value={this.state.temporaryAddress} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="theme-footer">
                                                <Link to="/hris" className="btn btn-gray btn-sm">Back</Link>
                                                <button type="button" onClick={this.hrisSubmit} className="btn btn-theme btn-sm float-right">Save</button>
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
    console.log("state21w31w",state)
    return {
        //hrData2: state.CtrUser.userData.result
        hrisData: state.CtrlHRIS.getHRISDataById
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        hrisById: (data) => dispatch(actionCreator.getHrisDataById(data)),
        hrisEdit: data => dispatch(actionCreator.editHrisdata(data))
        // hrisAdd: (data) => dispatch(actionCreator.addhris(data)),
        // getUser: () => dispatch(actionCreator.getUsersDataAction())
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(EditHris);
