import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import CsvDownloader from 'react-csv-downloader';

class AddProposal extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            userId: "",
            profile: "",
            date: (new Date()).toISOString().split('T')[0],
            portal: this.props.location.search && this.props.location.search ? this.props.location.search.slice(1):"",
            clientName: "",
            countryCityState: "",
            company: "",
            email: "",
            phone: "",
            domain: "",
            submissionTitle: "",
            pitchContent: "",
            jobReqLink: "",
            linkedinProfile: "",
            proposalLink: "",
            clientPostedDateTime: (new Date()).toISOString().split('T')[0],
            projectType: "",
            TargetAchieved: "",
            jobRequirement: "",
            hourlyRate: "",
            proposalSubmissionDateTime: (new Date()).toISOString().split('T')[0],
            contactFound: "",
            mailSent: "",
            callTimings: "",
            minutes: "",
            callSource: "",
            isActive: "1",
            companyPhone:'',
            companylinkedInProfile:''
        }
    }

    componentDidMount = () => {
        this.props.getDropDownData({isActive:'',dept:'sales',jobTitle:'',supervisor:'',userid:'',employeeStatus:'',firstName:'',from:'',to:'',timePeriod:''});
    }

    handleChange = (e) => {
        this.setState ({[e.target.name]: e.target.value});
        console.log(">>>>>>>>>>>",e.target.value)

    }

    csvUpload = (e) => {
        this.setState({
            file: e.target.files[0]
        }, () => {
            this.props.csvFileUpload(this.state.file)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const proposalData = {
            userId: this.state.userId,
            profile: this.state.profile,
            date: this.state.date,
            portal: this.state.portal,
            clientName: this.state.clientName,
            countryCityState: this.state.countryCityState,
            company: this.state.company,
            email: this.state.email,
            emailP: this.state.emailP,
            phone: this.state.phone,
            phoneP: this.state.phoneP,
            domain: this.state.domain,
            submissionTitle: this.state.submissionTitle,
            linkedinProfile: this.state.linkedinProfile,
            pitchContent: this.state.pitchContent,
            jobReqLink: this.state.jobReqLink,
            hourlyRate: this.state.hourlyRate,
            proposalLink: this.state.proposalLink,
            clientPostedDateTime: this.state.clientPostedDateTime,
            projectType: this.state.projectType,
            TargetAchieved: this.state.TargetAchieved,
            jobRequirement : this.state.jobRequirement,
            proposalSubmissionDateTime: this.state.proposalSubmissionDateTime,
            companyEmail: this.state.companyEmail,
            patternEmail: this.state.patternEmail,
            clientDesignation: this.state.clientDesignation,
            leadStatus: this.state.leadStatus,
            // contactFound: this.state.contactFound,
            // mailSent: this.state.mailSent,
            // callTimings: this.state.callTimings,
            // minutes: this.state.minutes,
            // callSource: this.state.callSource,
            companyPhone:this.state.companyPhone,
            companylinkedInProfile:this.state.companylinkedInProfile,
            isActive: 0
        }
        this.props.proposalDataSubmit(proposalData)
    }

    render () {

        const columns = [{
            id: 'cell1',
            displayName: 'company'
          }, {
            id: 'cell2',
            displayName: 'countryCityState'
          }, {
            id: 'cell3',
            displayName: 'domain'
          }, {
            id: 'cell4',
            displayName: 'patternMail'
          }, {
            id: 'cell5',
            displayName: 'companyPhone'
          }, {
            id: 'cell6',
            displayName: 'companylinkedInProfile'
          },]

        const columnss = [{
          id: 'cell1',
          displayName: 'id'
        }, {
          id: 'cell2',
          displayName: 'userId'
        }, {
          id: 'cell3',
          displayName: 'profile'
        }, {
          id: 'cell4',
          displayName: 'date'
        }, {
          id: 'cell5',
          displayName: 'portal'
        }, {
          id: 'cell6',
          displayName: 'clientName'
        }, {
          id: 'cell7',
          displayName: 'country'
        }, {
          id: 'cell8',
          displayName: 'company'
        }, {
          id: 'cell9',
          displayName: 'email'
        }, {
          id: 'cell10',
          displayName: 'phone'
        }, {
          id: 'cell11',
          displayName: 'domain'
        }, {
          id: 'cell12',
          displayName: 'submissionTitle'
        }, {
          id: 'cell13',
          displayName: 'pitchContent'
        }, {
          id: 'cell14',
          displayName: 'jobReqLink'
        }, {
          id: 'cell15',
          displayName: 'proposalLink'
        }, {
          id: 'cell16',
          displayName: 'clientPostedDateTime'
        }, {
          id: 'cell17',
          displayName: 'projectType'
        }, {
          id: 'cell18',
          displayName: 'targetAchieved'
        }, {
          id: 'cell19',
          displayName: 'proposalSubmissionDateTime'
        }, {
          id: 'cell20',
          displayName: 'status'
        }, {
          id: 'cell21',
          displayName: 'isActive'
        }, {
          id: 'cell22',
          displayName: 'createdOn'
        }];
        // const usersData = this.props.salesDropDown.result && this.props.salesDropDown.result.map(users => {
        //     return (
        //         <option value={users.id} key={users.id}>{users.firstName + " " + users.lastName}</option>
        //     )
        // })
        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Add Client Proposal</strong></div>
                        <ul className="page-top-actions">
                            <li><label className="custom-file-upload"><input type="file" onChange={this.csvUpload}/>Import CSV</label></li>
                            {this.state.portal!=="LinkedIn" ?
                    <li><CsvDownloader columns={columnss} filename="Sample" separator=";" wrapColumnChar=""><button className="btn green">
                        <i class="fa fa-download fa-3x" aria-hidden="true" title="Download CSV Sample"></i></button></CsvDownloader></li>
                        :
                    <li><CsvDownloader columns={columns} filename="Sample" separator=";" wrapColumnChar=""><button className="btn green">
                        <i class="fa fa-download fa-3x" aria-hidden="true" title="Download CSV Sample"></i></button></CsvDownloader></li>}
                            <li><Link to="/user/proposal" className="green">Back</Link></li>
                        </ul>
                    </div>
                    <div className="theme-panel">
                        <div className="main-page-content">
                            {/* <div className="theme-header">
                                <div className="left-side"><strong>Client Proposal</strong></div>
                            </div> */}
                            <div className="page-main">
                                <div className="theme-content">
                                    <div className="form-vertical">
                                        <div className="row">
                                        <div className={this.state.portal!=='LinkedIn' ? "col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 b-right":"col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 b-right"} ><br />
                                            <h3>Employee Details</h3><br />
                                            {/* <div >
                                                <div className="form-group">
                                                    <label className="control-label">Sales User's</label>
                                                    <div className="controls">
                                                        <select className="form-control" name="userId" onChange={this.handleChange}>
                                                            <option value="">Select Please</option>{usersData}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div> */}
                                                <div className="form-group">
                                                    <label className="control-label"><b>Source</b></label>
                                                    <div className="controls">
                                                        <select className="form-control" name="portal" onChange={this.handleChange}
                                                        value={this.state.portal}>
                                                            <option value="">-- Please Select Source --</option>
                                                            <option value="freelancer">Freelancer</option>
                                                            <option value="upwork">Upwork</option>
                                                            <option value="LinkedIn">LinkedIn</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Profile</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="profile" placeholder="Profile"
                                                        value={this.state.profile} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>	
                                                {/* <div className="form-group">
                                                    <label className="control-label">Date</label>
                                                    <div className="controls">
                                                        <input type="date" className="form-control" name="date"
                                                        value={this.state.date} onChange={this.handleChange} />
                                                    </div>
                                                </div> */}

                                            </div>
                                        <div className={this.state.portal!=='LinkedIn' ? "col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 b-right":"col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 b-right"} ><br />
                                            <h3>Client Details</h3><br />
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Client Name</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="clientName" placeholder="Client Name"
                                                        value={this.state.clientName} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Email(Personal)</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="emailP" placeholder="Email Personal"
                                                        value={this.state.emailP} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Email(Work)</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="email" placeholder="Email"
                                                        value={this.state.email} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Phone(Personal)</label>
                                                    <div className="controls">
                                                        <input type="tel" pattern="[0-9]" className="form-control" name="phoneP" placeholder="Phone Personal"
                                                        value={this.state.phoneP} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Phone(Work)</label>
                                                    <div className="controls">
                                                        <input type="tel" pattern="[0-9]" className="form-control" name="phone" placeholder="Phone"
                                                        value={this.state.phone} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                                <div className="form-group">
                                                    <label className="control-label">LinkedIn Profile</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="linkedinProfile" placeholder="linkedinProfile"
                                                        value={this.state.linkedinProfile} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                {this.state.portal!=='LinkedIn' ? null:
                                                <>
                                                <div className="form-group">
                                                    <label className="control-label">Client Designation</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="clientDesignation" placeholder="Client Designation"
                                                        value={this.state.clientDesignation} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Lead Status </label>
                                                    <div className="controls">
                                                        <select className="form-control" name="leadStatus" onChange={this.handleChange}
                                                        value={this.state.leadStatus}>
                                                            <option value="">-- Please Select Status --</option>
                                                            <option value="Qualifiedlead">Qualified Lead</option>
                                                            <option value="NonQualifiedlead">Non Qualified Lead</option>
                                                        </select>
                                                    </div>
                                                </div></>}
                                                <div className="form-group">
                                                    <label className="control-label">Country City State</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="countryCityState" placeholder="Country /City /State"
                                                        value={this.state.countryCityState} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Client Posted Date Time</label>
                                                    <div className="controls">
                                                        <input type="date" className="form-control" name="clientPostedDateTime"
                                                        value={this.state.clientPostedDateTime} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            <div className={this.state.portal!=='LinkedIn' ? "col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 b-right":"col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 b-right"} ><br />
                                            <h3>Company Details</h3><br />                                            
                                            <div className="form-group">
                                                    <label className="control-label">Company</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="company" placeholder="Company"
                                                        value={this.state.company} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                {this.state.portal!=='LinkedIn' ? null:
                                                <>
                                                <div className="form-group">
                                                    <label className="control-label">Company URL</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="companyEmail" placeholder="Company Email"
                                                        value={this.state.companyUrl} onChange={this.handleChange} />
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
                                                <div className="form-group">
                                                    <label className="control-label">Company Email</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="companyEmail" placeholder="Company Email"
                                                        value={this.state.companyEmail} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Company Pattern Email</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="patternEmail" placeholder="Company Pattern Email"
                                                        value={this.state.patternEmail} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Company LinkedIn Profile</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="companylinkedInProfile" placeholder="Company LinkedIn Profile"
                                                        value={this.state.companylinkedInProfile} onChange={this.handleChange} />
                                                    </div>
                                                </div></>}
                                        </div>
                                        {this.state.portal!=='LinkedIn' ?
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 b-right" ><br />
                                            <h3>Proposal Details</h3><br />
                                        
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Proposal Link</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="proposalLink" placeholder="Proposal Link"
                                                        value={this.state.proposalLink} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Project Type</label>
                                                    <div className="controls">
                                                        <select className="form-control" name="projectType" onChange={this.handleChange} value={this.state.projectType}>
                                                            <option value="">-- Please Select Source --</option>
                                                            <option value="Fixed">Fixed</option>
                                                            <option value="Hourly">Hourly</option>
                                                        </select>
                                                        {/* <input type="text" className="form-control" name="projectType" placeholder="Project Type"
                                                        value={this.state.projectType} onChange={this.handleChange} /> */}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Submission Title</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="submissionTitle" placeholder="Submission Title"
                                                        value={this.state.submissionTitle} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Proposal Submission Date Time</label>
                                                    <div className="controls">
                                                        <input type="date" className="form-control" name="proposalSubmissionDateTime" placeholder="Proposal Submission Date Time"
                                                        value={this.state.proposalSubmissionDateTime} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                                <div className="form-group">
                                                    <label className="control-label">Upwork ID</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="TargetAchieved" placeholder="Upwork ID"
                                                        value={this.state.TargetAchieved} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">hourlyRate</label>
                                                    <div className="controls">
                                                        <input type="number" className="form-control" name="hourlyRate" placeholder="hourlyRate"
                                                        value={this.state.hourlyRate} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Job Request Link</label>
                                                <div className="controls">
                                                    <input type="text" className="form-control" name="jobReqLink" placeholder="jobReqLink"
                                                    value={this.state.jobReqLink} onChange={this.handleChange} />
                                                    {/* <textarea rows="4" cols="50" className="form-controlArea" name="jobReqLink" placeholder="Please Job Request write here..."
                                                    value={this.state.jobReqLink} */}
                                                    {/* onChange={this.handleChange}></textarea> */}
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Job Requirement</label>
                                                    <div className="controls">
                                                        {/* <input type="text" className="form-control" name="jobRequirement" placeholder="jobRequirement"
                                                        value={this.state.jobRequirement} onChange={this.handleChange} /> */}
                                                        <textarea rows="4" cols="50" className="form-controlArea" name="jobRequirement" placeholder="Please Job Requirement write here..."
                                                        value={this.state.jobRequirement}
                                                        onChange={this.handleChange}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div >
                                                <div className="form-group">
                                                    <label className="control-label">Pitch Content</label>
                                                    <div className="controls">
                                                        {/* <input type="text" className="form-control" name="pitchContent" placeholder="Pitch Content"
                                                        value={this.state.pitchContent} onChange={this.handleChange} /> */}
                                                        <textarea rows="4" cols="50" className="form-controlArea" name="pitchContent" placeholder="Please write here..."
                                                        value={this.state.pitchContent}
                                                        onChange={this.handleChange}></textarea>
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
                                                        value={this.state.contactFound} onChange={this.handleChange} />
                                                    </div>
                                                </div>	
                                                <div className="form-group">
                                                    <label className="control-label">Mail Sent</label>
                                                    <div className="controls">
                                                        <input type="number" className="form-control" name="mailSent" placeholder="mailSent"
                                                        value={this.state.mailSent} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Call Timings</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="callTimings" placeholder="callTimings"
                                                        value={this.state.callTimings} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Call Source</label>
                                                    <div className="controls">
                                                        <select className="form-control" name="callSource" onChange={this.handleChange}>
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
                                                        value={this.state.minutes} onChange={this.handleChange} />
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

const mapStateToProps = (state) => {
    const dropDown = state.CtrSales.getDropDown
    return {
        salesDropDown: dropDown
    };
};

const mapDispatchToProps = dispatch => {
    return {
        proposalDataSubmit: (data) => dispatch(actionCreator.postProposalData(data)),
        getDropDownData: (data) => dispatch(actionCreator.getSalesDropDownActionData(data)),
        csvFileUpload: (data) => dispatch(actionCreator.importCsvFileAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProposal);
