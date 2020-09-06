import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import "../../assets/css/Theme/Main.css";
import { default as InputFile } from '../HrCandidacy/inputfile.js'

class EditCandidate extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            fileReader :new FileReader(),
            candidate: {},
            departments: [],
            file: '',
            filepath:'',
            resume:[]
        }
    }

    componentDidMount = () => {
        this.props.candidateById({id: this.props.match.params.id,emp:''});
        this.props.getDepartmentData();
    }

    componentWillReceiveProps = (nextProps) => {
        const data = nextProps.candidateData
        const departmentdatas = nextProps.deptDatas
        this.setState({
            candidate: data.length > 0 ? data[0] : {},
            departments: departmentdatas
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

    handleSwitchChange = e => {
        this.setState({
            candidate: {
                ...this.state.candidate,
                [e.target.name]: e.target.checked
            }
        });
    };
    loadFile = file => {
        //     // Quick example of short-circuit evaluation
            file !== this.state.currentFile && (this.setState({ currentFile: file }) || this.state.fileReader.readAsArrayBuffer(file));
          }
    uploadFileHandler = e => {
        const { files } = this.state;
        const file = e.target.files[0]

        this.setState({ files });
        this.loadFile(file)
        this.props.resumeData({id:this.props.match.params.id,file:file});
      }
    downloadResumeData = () => {
        const linkSource = (`data:application/pdf;base64,${this.state.candidate.resume}`);
        const downloadLink = document.createElement("a");
        const fileName = "sample.pdf";
    
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        let pdfOpen = window.open("")
        pdfOpen.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " +(this.state.candidate.resume)+"'></iframe>")  
    }
    viewResumeData = () => {
        let pdfOpen = window.open("")
        pdfOpen.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " +(this.state.candidate.resume)+"'></iframe>")
    } 

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            id: this.state.candidate.id,
            candidateName: this.state.candidate.candidateName,
            email: this.state.candidate.email,
            phone: this.state.candidate.phone,
            skills: this.state.candidate.skills,
            rounds: this.state.candidate.rounds,
            experience: this.state.candidate.experience,
            currentSalary: this.state.candidate.currentSalary,
            expectedSalary: this.state.candidate.expectedSalary,
            noticePeriod: this.state.candidate.noticePeriod,
            interviewDate: this.state.candidate.interviewDate.slice(0, 10),
            interviewTime: this.state.candidate.interviewTime,
            interviewMode: this.state.candidate.interviewMode,
            hiringManager: this.state.candidate.hiringManager,
            reasonForChange: this.state.candidate.reasonForChange,
            status: this.state.candidate.status,
            outcome: this.state.candidate.outcome,
            isActive: this.state.candidate.isActive
        };
        this.props.candidateEdit(data);
    };

    render () {
        let {files} = this.state;
        console.log("Files",files)
        console.log("pages",this.state.pages)
        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Edit Candidate</strong></div>
                        <ul className="page-top-actions"> 
                        <li>
                            <InputFile uploadFileHandler ={(e)=>this.uploadFileHandler(e)}>
                                Update Resume
                            </InputFile>
                        </li>
                        <li><Link to="/hrCandidacy" className="green">Back</Link></li>
                        </ul>
                    </div>
                    <div className="theme-panel">
                        <div className="main-page-content">
                            <div className="theme-header">
                                <div className="right-side"></div>
                            </div>
                            <div className="page-main">
                                                <div className="theme-content">
                                                    <div className="form-vertical">
                                                        <div className="row">
                                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 b-right">
                                                            <div className="heading-title">Personal Details</div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Candidate Name</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" name="candidateName"
                                                                        value={this.state.candidate.candidateName ? this.state.candidate.candidateName : "" }
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Phone</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" name="phone"
                                                                        value={this.state.candidate.phone ? this.state.candidate.phone : "" }
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Email</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" name="email" placeholder="Email"
                                                                        value={this.state.candidate.email ? this.state.candidate.email : "" }
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <h2>Resume</h2>
                                                                <button  type="button" className="btn btn-theme btn-sm " onClick={this.downloadResumeData} >Download</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <button type="button"  className="btn btn-theme btn-sm " onClick={this.viewResumeData} >View Resume</button>
                                                            </div>
                                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                            <div className="heading-title">Professional Details</div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Expertise</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" name="skills" placeholder="Skills"
                                                                        value={this.state.candidate.skills ? this.state.candidate.skills : "" }
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Experience</label>
                                                                    <div className="controls">
                                                                        <input type="number" className="form-control" name="experience" placeholder="Skills"
                                                                        value={this.state.candidate.experience ? this.state.candidate.experience : ""}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Current Salary</label>
                                                                    <div className="controls">
                                                                        <input type="number" className="form-control" name="currentSalary"
                                                                        value={this.state.candidate.currentSalary ? this.state.candidate.currentSalary : ""}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Expected Salary</label>
                                                                    <div className="controls">
                                                                        <input type="number" className="form-control" name="expectedSalary"
                                                                        value={this.state.candidate.expectedSalary ? this.state.candidate.expectedSalary : ""}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Salary Hike Percentage</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" value={((parseInt(this.state.candidate.expectedSalary)-parseInt(this.state.candidate.currentSalary))/parseInt(this.state.candidate.currentSalary)*100).toFixed(0)+'%'}/>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Notice Period</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" name="noticePeriod" placeholder="Skills"
                                                                        value={this.state.candidate.noticePeriod ? this.state.candidate.noticePeriod : ""}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Interview Round</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" name="rounds" placeholder="Interview Round"
                                                                        value={this.state.candidate.rounds ? this.state.candidate.rounds : "" }
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">InterView Date</label>
                                                                    <div className="controls">
                                                                        <input type="date" className="form-control" name="interviewDate"
                                                                        value={this.state.candidate.interviewDate ? this.state.candidate.interviewDate.slice(0, 10) : ""}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">InterView time</label>
                                                                    <div className="controls">
                                                                        <input type="time" className="form-control" name="interviewTime"
                                                                        value={this.state.candidate.interviewTime ? this.state.candidate.interviewTime : ""}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">InterView Mode</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" name="interviewMode"
                                                                        value={this.state.candidate.interviewMode ? this.state.candidate.interviewMode : ""}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Outcome</label>
                                                                    <div className="controls">
                                                                        <select className="form-control" name="outcome"
                                                                        value={this.state.candidate.outcome} onChange={this.handleChange}>
                                                                            <option value="pending">Pending</option>
                                                                            <option value="selected">Selected</option>
                                                                            <option value="reject">Reject</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="form-group">
                                                                    <label className="control-label">Hiring Manager</label>
                                                                    <div className="controls">
                                                                    <input type="text" className="form-control" name="hiringManager"
                                                                        value={this.state.candidate.hiringManager ? this.state.candidate.hiringManager : ""}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div> */}
                                                                <div className="form-group">
                                                                    <label className="control-label">Status</label>
                                                                    <div className="controls">
                                                                        <textarea rows="4" cols="50" className="form-controlArea" name="status"
                                                                        value={this.state.candidate.status ? this.state.candidate.status : ""}
                                                                        onChange={this.handleChange}></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Reason For Change</label>
                                                                    <div className="controls">
                                                                        <textarea rows="4" cols="50" className="form-controlArea" name="reasonForChange"
                                                                        value={this.state.candidate.reasonForChange ? this.state.candidate.reasonForChange : ""}
                                                                        onChange={this.handleChange}></textarea>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="form-group">
                                                                    <label className="control-label">isActive</label><br/>
                                                                    <label className="switch">
                                                                        <input type="checkbox" name="isActive"
                                                                        checked={this.state.candidate.isActive ? this.state.candidate.isActive: false} onChange={e => this.handleSwitchChange(e)} />
                                                                        <span className="slider round"></span>
                                                                    </label>
                                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="theme-footer">
                                    <Link to="/hrCandidacy" className="btn btn-gray btn-sm">Back</Link>
                                    <button type="button" onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right">Save</button>
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
    const data = state.CtrlHrCandidacy.getCandidateById
    const deptData = state.CtrUser.userDepartData
    return {
       candidateData: data,
       deptDatas: deptData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        candidateById: data => dispatch(actionCreator.getCandidateById(data)),
        candidateEdit: data => dispatch(actionCreator.editHrCandidacy(data)),
        getDepartmentData: () => dispatch(actionCreator.getUserDepartment()),
        resumeData : data => dispatch(actionCreator.resumeAction(data)),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(EditCandidate);
