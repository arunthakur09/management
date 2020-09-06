import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import Autocomplete from "react-autocomplete";

class EditProject extends React.Component {
    constructor() {
        super ();
        this.state = {
            editData: {},
            userId:"",
            person:""
        };
    }

    componentWillReceiveProps = (nextProps) => {
        const editedData = nextProps.salesData && nextProps.salesData.data.map(data => data);
        if (editedData) {
            this.setState({
                editData: editedData.length > 0 ? editedData[0] : {}
            });
        }
    }

    componentDidMount = () => {
        this.props.getProjectDataByID({ id: this.props.match.params.id });
        this.props.getUser();
    }

    filterEmp = (val) => {
        this.setState ({
            editData: {
            ...this.state.editData,
            person: val}
        });
    }

    handleChange = (e) => {
        this.setState ({
            editData: {
            ...this.state.editData,
            [e.target.name]: e.target.value}
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const projectData = {
            id:                         this.state.editData.id,
            title:                      this.state.editData.title,
            description:                this.state.editData.description,
            status:                     this.state.editData.status,
            startDate:                  this.state.editData.startDate, 
            endDate:                    this.state.editData.endDate,
            customerDeadline:           this.state.editData.customerDeadline, 
            taskPresets:                this.state.editData.taskPresets, 
            commentFallback:            this.state.editData.commentFallback,
            person:                     this.state.editData.person,
            projectRole:                this.state.editData.projectRole,
            comment:                    this.state.editData.comment,
            isActive:                   this.state.editData.isActive
        };
        this.props.upProjectData(projectData);
    }

    render () {
        const hrdata = this.props.hrData2 ? this.props.hrData2.map((e) => {
            return (
                {ename: e.firstName+" "+e.lastName,eid: e.id.toString()}
            )
        }): [];
        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Edit Project Details</strong></div>
                        <ul className="page-top-actions">
                            <li><Link to="/ProjectManagement" className="green">Back</Link></li>
                        </ul>
                    </div>
                    <div className="theme-panel">
                        <div className="main-page-content">
                            <div className="theme-header">
                                
                            </div>
                            <div className="page-main">
                                <div className="theme-content">
                                    <div className="form-vertical">
                                        <div className="row">
                                            {/* <div className={this.state.editData.portal!=='LinkedIn' ? "col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 b-right":"col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 b-right"}><br />
                                            <h3>Employee Details</h3><br />
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Sales User's</label>
                                                    <div className="controls">
                                                        <select className="form-control" name="userId" onChange={this.handleChange}
                                                        value={this.state.editData.userId}>
                                                            <option value="">Select Please</option>{usersData}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Profile</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="profile"
                                                        value={this.state.editData.profile ? this.state.editData.profile : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Source</label>
                                                    <div className="controls">
                                                    <select className="form-control" name="portal" onChange={this.handleChange}  value={this.state.editData.portal ? this.state.editData.portal : ""}>
                                                            <option value="">-- Please Select Source --</option>
                                                            <option value="freelancer">Freelancer</option>
                                                            <option value="upwork">Upwork</option>
                                                            <option value="LinkedIn">LinkedIn</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div></div> */}
                                                                                      {/* <h3>Client Details</h3><br /> */}
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Title</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="title"  placeholder="Title"
                                                        value={this.state.editData.title ? this.state.editData.title : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Description</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="description"  placeholder="Description"
                                                        value={this.state.editData.description ? this.state.editData.description : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Status</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="status"  placeholder="Status"
                                                        value={this.state.editData.status ? this.state.editData.status : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Start Date</label>
                                                    <div className="controls">
                                                        <input type="date" className="form-control" name="startDate"
                                                        value={this.state.editData.startDate ? this.state.editData.startDate : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">End Date</label>
                                                    <div className="controls">
                                                        <input type="date" className="form-control" name="endDate"
                                                        value={this.state.editData.endDate ? this.state.editData.endDate : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Customer Deadline</label>
                                                    <div className="controls">
                                                        <input type="date" className="form-control" name="customerDeadline" placeholder="customer Deadline"
                                                        value={this.state.editData.customerDeadline ? this.state.editData.customerDeadline : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Task Presets</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="taskPresets" placeholder="Task Presets"
                                                        value={this.state.editData.taskPresets ? this.state.editData.taskPresets : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Comment Fallback</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="commentFallback" placeholder="Comment Fallback"
                                                        value={this.state.editData.commentFallback ? this.state.editData.commentFallback : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Person</label>
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
                                                          value={this.state.displayName ? this.state.displayName :  this.state.editData.fullName}
                                                          onChange={(e) => {
                                                              this.setState({ displayName: e.target.value })
                                                              if (e.target.value==='')
                                                                this.filterEmp(e.target.value)
                                                                this.setState ({
                                                                    editData: {
                                                                    ...this.state.editData,
                                                                    fullName: e.target.value}
                                                                });}}
                                                          onSelect={ (ename, allData)   => {
                                                              this.filterEmp(allData.eid)
                                                              this.setState({
                                                                displayName: ename,
                                                                   userid: allData.eid 
                                                              })}}/>
                                                        {/* <input type="tel" className="form-control" name="person" placeholder="Person"
                                                        value={this.state.editData.person ? this.state.editData.person : ""} onChange={this.handleChange} /> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Project Role</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="projectRole" placeholder="Project Role"
                                                        value={this.state.editData.projectRole ? this.state.editData.projectRole : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Comment</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="comment" placeholder="Comment"
                                                        value={this.state.editData.comment ? this.state.editData.comment : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                                {/* {this.state.editData.portal!=='LinkedIn' ? null:
                                                <>
                                                <div className="form-group">
                                                    <label className="control-label">Client Designation</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="clientDesignation" placeholder="Client Designation"
                                                        value={this.state.editData.clientDesignation} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Lead Status </label>
                                                    <div className="controls">
                                                        <select className="form-control" name="leadStatus" onChange={this.handleChange}
                                                        value={this.state.editData.leadStatus}>
                                                            <option value="">-- Please Select Status --</option>
                                                            <option value="Qualifiedlead">Qualified Lead</option>
                                                            <option value="NonQualifiedlead">Non Qualified Lead</option>
                                                        </select>
                                                    </div>
                                                </div></>} */}
                                            {/* <div >
                                                <div className="form-group">
                                                    <label className="control-label">Country City State</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="countryCityState"
                                                        value={this.state.editData.countryCityState ? this.state.editData.countryCityState : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Client Posted Date Time</label>
                                                    <div className="controls">
                                                        <input type="date" className="form-control" name="clientPostedDateTime"
                                                        value={this.state.editData.clientPostedDateTime ? this.state.editData.clientPostedDateTime.slice(0,10) : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div> */}
                                        
                                            {/* <div className={this.state.portal!=='LinkedIn' ? "col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 b-right":"col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 b-right"} ><br />
                                            <h3>Company Details</h3><br />                                            
                                            <div className="form-group">
                                                    <label className="control-label">Company</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="company" placeholder="Company"
                                                        value={this.state.editData.company} onChange={this.handleChange} />
                                                    </div>
                                                </div><div className="form-group">
                                                    <label className="control-label">Company URL</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="companyEmail" placeholder="Company Email"
                                                        value={this.state.editData.companyUrl} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Industry</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="domain" placeholder="Industry"
                                                        value={this.state.domain} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Company Phone</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="companyPhone" placeholder="Company Phone"
                                                        value={this.state.companyPhone} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                {this.state.editData.portal!=='LinkedIn' ? null:
                                                <><div className="form-group">
                                                    <label className="control-label">Company Email</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="companyEmail" placeholder="Company Email"
                                                        value={this.state.editData.companyEmail} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Company Pattern Email</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="patternEmail" placeholder="Company Pattern Email"
                                                        value={this.state.editData.patternEmail} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Company LinkedIn Profile</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="companylinkedInProfile" placeholder="Company LinkedIn Profile"
                                                        value={this.state.companylinkedInProfile} onChange={this.handleChange} />
                                                    </div>
                                                </div></>}
                                        </div> */}
                                        {/* {this.state.editData.portal!=='LinkedIn' ? */}
                                            {/* <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 b-right"><br />
                                            <h3>Proposal Details</h3><br />
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Proposal Link</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="proposalLink"
                                                        value={this.state.editData.proposalLink ? this.state.editData.proposalLink : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Project Type</label>
                                                    <div className="controls">
                                                        <select className="form-control" name="portal" onChange={this.handleChange}
                                                        value={this.state.editData.projectType}>
                                                            <option value="">-- Please Select Source --</option>
                                                            <option value="Fixed">Fixed</option>
                                                            <option value="Hourly">Hourly</option>
                                                        </select></div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Submission Title</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="submissionTitle"
                                                        value={this.state.editData.submissionTitle ? this.state.editData.submissionTitle : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Proposal Submission Date Time</label>
                                                    <div className="controls">
                                                        <input type="date" className="form-control" name="proposalSubmissionDateTime"
                                                        value={this.state.editData.proposalSubmissionDateTime ? this.state.editData.proposalSubmissionDateTime.slice(0,10) : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Time</label>
                                                    <div className="controls">
                                                        <input type="time" className="form-control" name="proposalTime"
                                                        value={this.state.editData.proposalTime ? this.state.editData.proposalTime : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Job Req Link</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="jobReqLink"
                                                        value={this.state.editData.jobReqLink ? this.state.editData.jobReqLink : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Budget</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="budget"
                                                        value={this.state.editData.budget ? this.state.editData.budget : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Job Requirement</label>
                                                    <div className="controls">

                                                        <textarea rows="4" cols="50" className="form-controlArea" name="jobRequirement" placeholder="Please write here..."
                                                        value={this.state.editData.jobRequirement ? this.state.editData.jobRequirement : ""}
                                                        onChange={this.handleChange}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Pitch Content</label>
                                                    <div className="controls"><textarea rows="4" cols="50" className="form-controlArea" name="pitchContent" placeholder="Please write here..."
                                                        value={this.state.editData.pitchContent ? this.state.editData.pitchContent : ""}
                                                        onChange={this.handleChange}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Status</label>
                                                    <div className="controls">
                                                        <select className="form-control" name="status"
                                                        onChange={this.handleChange} value={this.state.editData.status} >
                                                            <option value="pending">Pending</option>
                                                            <option value="discussion">Discussion</option>
                                                            <option value="approved">Approved</option>
                                                            <option value="reject">Reject</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div> */}
                                            {/* </div>:null} */}
                                            {/* <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 b-right" ><br />
                                            <h3>Call Details</h3><br />
                                                <div className="form-group">
                                                    <label className="control-label">Contact Found</label>
                                                    <div className="controls">
                                                        <input type="number" className="form-control" name="contactFound" placeholder="contactFound"
                                                        value={this.state.editData.contactFound} onChange={this.handleChange} />
                                                    </div>
                                                </div>	
                                                <div className="form-group">
                                                    <label className="control-label">Mail Sent</label>
                                                    <div className="controls">
                                                        <input type="number" className="form-control" name="mailSent" placeholder="mailSent"
                                                        value={this.state.editData.mailSent} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Call Timings</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="callTimings" placeholder="callTimings"
                                                        value={this.state.editData.callTimings} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Call Source</label>
                                                    <div className="controls">
                                                        <select className="form-control" name="callSource" onChange={this.handleChange} value={this.state.editData.callSource}>
                                                            <option value="">-- Please Select Source --</option>
                                                            <option value="Hangout">Hangout</option>
                                                            <option value="Skype">Skype</option>
                                                            <option value="Telephone">Telephone</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Minutes of the call</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="minutes" placeholder="minutes"
                                                        value={this.state.editData.minutes} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="theme-footer">
                                    <Link to="/ProjectManagement" className="btn btn-gray btn-sm">Back</Link>
                                    <button onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right">Save</button>
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
    console.log(state,"fyt")
    return {
        salesData: state.CtrProjectManagement.getProjectDataById && state.CtrProjectManagement.getProjectDataById.data,
       // salesDropDown: state.CtrUser.userData,
        hrData2: state.CtrUser.userData.result
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProjectDataByID: (data) => dispatch(actionCreator.getProjectActionDataById(data)),
         //getDropDownData: (data) => dispatch(actionCreator.getUsersDataAction(data)),
        upProjectData: (data) => dispatch(actionCreator.updateProjectData(data)),
        getUser: () => dispatch(actionCreator.getUsersDataAction())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);
