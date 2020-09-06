import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";

class EditProposal extends React.Component {
    constructor() {
        super ()
        this.state = {
            editData: {}
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const editedData = nextProps.salesData.data.map(data => data)
        if (editedData) {
            this.setState({
                editData: editedData.length > 0 ? editedData[0] : {}
            })
        }
    }

    componentDidMount = () => {
        this.props.proposalDataById({ id: this.props.match.params.id });
    };

    handleChange = (e) => {
        this.setState ({
            editData: {
            ...this.state.editData,
            [e.target.name]: e.target.value}
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const proposalData = {
            id:                         this.state.editData.id,
            profile:                    this.state.editData.profile,
            date:                       this.state.editData.date.slice(0,10),
            portal:                     this.state.editData.portal,
            clientName:                 this.state.editData.clientName,
            countryCityState:           this.state.editData.countryCityState,
            company:                    this.state.editData.company,
            email:                      this.state.editData.email,
            phone:                      this.state.editData.phone,
            domain:                     this.state.editData.domain,
            submissionTitle:            this.state.editData.submissionTitle,
            pitchContent:               this.state.editData.pitchContent,
            jobReqLink:                 this.state.editData.jobReqLink,
            proposalLink:               this.state.editData.proposalLink,
            clientPostedDateTime:       this.state.editData.clientPostedDateTime.slice(0,10),
            projectType:                this.state.editData.projectType,
            jobRequirement:             this.state.editData.jobRequirement,
            proposalSubmissionDateTime: this.state.editData.proposalSubmissionDateTime.slice(0,10),
            status:                     this.state.editData.status,
            companyEmail:               this.state.editData.companyEmail,
            patternEmail:               this.state.editData.patternEmail,
            clientDesignation:          this.state.editData.clientDesignation,
            leadStatus:                 this.state.editData.leadStatus,
            // contactFound:               this.state.editData.contactFound,
            // mailSent:                   this.state.editData.mailSent,
            // callTimings:                this.state.editData.callTimings,
            // minutes:                    this.state.editData.minutes,
            // callSource:                 this.state.editData.callSource,
            isActive:                   this.state.editData.isActive
        }
        this.props.upProposalData(proposalData)
    }

    render () {
        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Edit Client Proposal</strong></div>
                        <ul className="page-top-actions">
                            <li><Link to="/user/proposal" className="green">Back</Link></li>
                        </ul>
                    </div>
                    <div className="theme-panel">
                        <div className="main-page-content">
                            <div className="theme-header">
                                {/* <div className="left-side"><strong>Client Proposal</strong></div> */}
                            </div>
                            <div className="page-main">
                                <div className="theme-content">
                                    <div className="form-vertical">
                                        <div className="row">
                                            <div className={this.state.editData.portal!=='LinkedIn' ? "col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 b-right":"col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 b-right"}><br />
                                            <h3>Employee Details</h3><br />
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
                                                        {/* <input type="text" className="form-control" name="portal"
                                                        value={this.state.editData.portal ? this.state.editData.portal : ""} onChange={this.handleChange} /> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Industry</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="domain"
                                                        value={this.state.editData.domain ? this.state.editData.domain : ""} onChange={this.handleChange} />
                                                    </div>
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
                                            </div></div>
                                            <div className={this.state.editData.portal!=='LinkedIn' ? "col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 b-right":"col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 b-right"}><br />
                                            <h3>Client Details</h3><br />
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Client Name</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="clientName"
                                                        value={this.state.editData.clientName ? this.state.editData.clientName : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Email(Personal)</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="email"
                                                        value={this.state.editData.email ? this.state.editData.email : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Email(Work)</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="email"
                                                        value={this.state.editData.email ? this.state.editData.email : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Phone(Personal)</label>
                                                    <div className="controls">
                                                        <input type="number" className="form-control" name="phone"
                                                        value={this.state.editData.phone ? this.state.editData.phone : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Phone(Work)</label>
                                                    <div className="controls">
                                                        <input type="number" className="form-control" name="phone"
                                                        value={this.state.editData.phone ? this.state.editData.phone : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">LinkedIn Profile</label>
                                                    <div className="controls">
                                                        <input type="tel" className="form-control" name="phone" placeholder="Phone"
                                                        value={this.state.editData.phone ? this.state.editData.phone : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Company</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="company"
                                                        value={this.state.editData.company ? this.state.editData.company : ""} onChange={this.handleChange} />
                                                    </div>
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
                                                </div></>}
                                            <div >
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
                                            </div></div>
                                        {this.state.editData.portal!=='LinkedIn' ?
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 b-right"><br />
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
                                                        </select>
                                                        {/* <input type="text" className="form-control" name="projectType"
                                                        value={this.state.editData.projectType ? this.state.editData.projectType : ""} onChange={this.handleChange} /> */}
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
                                                    <label className="control-label">Job Req Link</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="jobReqLink"
                                                        value={this.state.editData.jobReqLink ? this.state.editData.jobReqLink : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Job Requirement</label>
                                                    <div className="controls">
                                                        {/* <input type="text" className="form-control" name="jobRequirement"
                                                        value={this.state.editData.jobRequirement ? this.state.editData.jobRequirement : ""} onChange={this.handleChange} /> */}
                                                        <textarea rows="4" cols="50" className="form-controlArea" name="jobRequirement" placeholder="Please write here..."
                                                        value={this.state.editData.jobRequirement ? this.state.editData.jobRequirement : ""}
                                                        onChange={this.handleChange}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Pitch Content</label>
                                                    <div className="controls">
                                                        {/* <input type="textfield" className="form-control" name="pitchContent"
                                                        value={this.state.editData.pitchContent ? this.state.editData.pitchContent : ""} onChange={this.handleChange} /> */}
                                                        <textarea rows="4" cols="50" className="form-controlArea" name="pitchContent" placeholder="Please write here..."
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
                                            </div>
                                            </div>:null}
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
                                    <Link to="/user/proposal" className="btn btn-gray btn-sm">Back</Link>
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
    return {
        salesData: state.CtrSales.getDataById.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        proposalDataById: (data) => dispatch(actionCreator.getProposalDataById(data)),
        upProposalData: (data) => dispatch(actionCreator.updateProposalData(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProposal);
