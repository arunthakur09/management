import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import Autocomplete from "react-autocomplete";

class AddDepartment extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    handleChange = (e) => {
        this.setState ({[e.target.name]: e.target.value});
    }

    filterEmp = (val) => {
        this.setState ({
        userId: val
        })
    }

    hrisSubmit = (e) => {
        e.preventDefault();
        const HrisAdd = {
            designation: this.state.designation,
            exBeforeJoin: this.state.exBeforeJoin,
            exAfterJoin: this.state.exAfterJoin,
            referenceContact: this.state.referenceContact,
            temporaryAddress: this.state.temporaryAddress,
            slackId: this.state.slackId,
            slackPassword: this.state.slackPassword,
            slackNewPassword: this.state.slackNewPassword,
            gmailId: this.state.gmailId,
            gmailPassword: this.state.gmailPassword,
            gmailNewPassword: this.state.gmailNewPassword,
            userId: this.state.userId,
            incrementDate: this.state.incrementDate,
            increment: this.state.increment,
            reasonOfWork: this.state.reasonOfWork,
            skillOfInterest: this.state.skillOfInterest,
            served: this.state.served,
            comments: this.state.comments,
            remarks: this.state.remarks,
            exitFormalities: this.state.exitFormalities,
            // isActive: "1"
        }
        this.props.hrisAdd(HrisAdd);
    };

    componentDidMount = () => {
        this.props.getUser();
    };

    render() {
        const hrdata = this.props.hrData2 ? this.props.hrData2.map((e) => {
            return (
                {ename: e.firstName+" "+e.lastName,eid: e.id.toString()}
            )
        }): [];
        return (
            <div className="page-content-inner mainPanel">
                <div className="page-header">
                    <div className="main-title"><strong>Add Information To HRIS</strong></div>
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
                                                                    <label className="control-label">Employee</label>
                                                                    <div className="controls">
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
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Designation</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="designation" placeholder="Designation"
                                                                    value={this.state.designation} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Experience Before Joining</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="exBeforeJoin" placeholder="Experience Before Joining"
                                                                    value={this.state.exBeforeJoin} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Experience After Joining</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="exAfterJoin" placeholder="Experience After Joining"
                                                                    value={this.state.exAfterJoin} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Reference Contact</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="referenceContact" placeholder="Reference Contact"
                                                                    value={this.state.referenceContact} onChange={this.handleChange} />
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
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Slack Id</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="slackId" placeholder="Slack Id"
                                                                    value={this.state.slackId} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Slack Password</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="slackPassword" placeholder="Slack Password"
                                                                    value={this.state.slackPassword} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Slack New Password</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="slackNewPassword" placeholder="Slack New Password"
                                                                    value={this.state.slackNewPassword} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>		
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Gmail Id</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="gmailId" placeholder="Gmail Id"
                                                                    value={this.state.gmailId} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Gmail Password</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="gmailPassword" placeholder="Gmail Password"
                                                                    value={this.state.gmailPassword} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Gmail New Password</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="gmailNewPassword" placeholder="Gmail New Password"
                                                                    value={this.state.gmailNewPassword} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Increment Date</label>
                                                                <div className="controls">
                                                                    <input type="date" className="form-control" name="incrementDate"
                                                                    value={this.state.incrementDate} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Increment</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="increment" placeholder="Increment"
                                                                    value={this.state.increment} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Reason Of Leaving</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="reasonOfWork" placeholder="Reason Of Leaving"
                                                                    value={this.state.reasonOfWork} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Skill Of Interest</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="skillOfInterest" placeholder="Skill Of Interest"
                                                                    value={this.state.skillOfInterest} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Notice Period Served</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="served" placeholder="Notice Period Served"
                                                                    value={this.state.served} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Comments</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="comments" placeholder="Comments"
                                                                    value={this.state.comments} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Remarks</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="remarks" placeholder="Remarks"
                                                                    value={this.state.remarks} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Exit Formalities</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="exitFormalities" placeholder="Exit Formalities"
                                                                    value={this.state.exitFormalities} onChange={this.handleChange} />
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
                                                <button type="button" onClick={this.hrisSubmit} className="btn btn-theme btn-sm float-right">Add</button>
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
        hrData2: state.CtrUser.userData.result
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        hrisAdd: (data) => dispatch(actionCreator.addhris(data)),
        getUser: () => dispatch(actionCreator.getUsersDataAction())
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(AddDepartment);
