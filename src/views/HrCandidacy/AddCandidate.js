import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import "../../assets/css/Theme/Main.css";
//import { toast } from "react-toastify";
import swal from 'sweetalert';
import { default as InputFile } from '../HrCandidacy/inputfile.js'
import CsvDownloader from 'react-csv-downloader';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EditCandidate extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            fileReader :new FileReader(),
            file: '',
            filepath:'',
            candidateName: "",
            email: "",
            skills: "",
            rounds: "",
            experience: "",
            currentSalary: "",
            expectedSalary: "",
            noticePeriod: "",
            source: "",
            interviewDate: "",
            interviewTime: "",
            interviewMode: "",
            status: "",
            reasonForChange: "",
            isActive: 0,
            hiringManager:"",
            phone: "",
        }
    }

    componentDidMount = () => {
        this.props.getDepartmentData();
    }

    componentWillReceiveProps = (nextProps) => {
        const departmentdatas = nextProps.deptDatas
        this.setState({
            departments: departmentdatas
        })
    }

    handleKra = e => {console.log('>>>>>>>>>',e)
    this.setState({
        userKra: e.blocks[0].text
    });
    console.log(e.blocks[0].text)
    };

    csvUpload = (e) => {
        this.setState({
            csv: e.target.files[0]
        }, () => {
            this.props.csvFileUpload(this.state.csv)
        })
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }
    loadFile = file => {
        //     // Quick example of short-circuit evaluation
            file !== this.state.currentFile && (this.setState({ currentFile: file }) || this.state.fileReader.readAsArrayBuffer(file));
          }
    uploadFileHandler = e => {
        // const { files } = this.state;
        if (this.state.resume && this.state.resume) {
            swal({
                text: "Resume Added Already",
                dangerMode: false,
            })
        }
        else{
        const file = e.target.files[0];
        this.loadFile(file)
        this.setState({resume: file});
    //   toast.error("Something Went Wrong!", {
    //     autoClose: 1000
    //   })
    swal({
        title: "Success",
        text: "Resume Added",
        icon: "success",
        timer: 1000,
        buttons:false,
        dangerMode: false,
    })}

        // this.props.resumeData({id:this.props.match.params.id,file:file});
      }
      
    // downloadResumeData = () => {
    //     const linkSource = (`data:application/pdf;base64,${this.state.candidate.resume}`);
    //     const downloadLink = document.createElement("a");
    //     const fileName = "sample.pdf";
    
    //     downloadLink.href = linkSource;
    //     downloadLink.download = fileName;
    //     downloadLink.click();
    //     let pdfOpen = window.open("")
    //     pdfOpen.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " +(this.state.candidate.resume)+"'></iframe>")  
    // }

    // viewResumeData = () => {
    //     let pdfOpen = window.open("")
    //     pdfOpen.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " +(this.state.candidate.resume)+"'></iframe>")
    // }

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            candidateName: this.state.candidateName,
            email: this.state.email,
            skills: this.state.skills,
            rounds: this.state.rounds,
            experience: this.state.experience,
            currentSalary: this.state.currentSalary,
            expectedSalary: this.state.expectedSalary,
            noticePeriod: this.state.noticePeriod,
            source: this.state.source,
            interviewDate: this.state.interviewDate,
            interviewTime: this.state.interviewTime,
            interviewMode: this.state.interviewMode,
            reasonForChange: this.state.reasonForChange,
            status: this.state.status,
            phone: this.state.phone,
            isActive: this.state.isActive,
            hiringManager : this.state.hiringManager,
            resume: this.state.resume
        };
        debugger
        this.props.addCandidate(data);
        console.log(this.state)
    };

    render () {
										
        const columnss = [{
            id: 'cell1',
            displayName: 'candidateName'
          }, {
            id: 'cell2',
            displayName: 'experience'
          }, {
            id: 'cell3',
            displayName: 'skills'
          }, {
            id: 'cell4',
            displayName: 'currentSalary'
          }, {
            id: 'cell5',
            displayName: 'expectedSalary'
          }, {
            id: 'cell6',
            displayName: 'noticePeriod'
          }, {
            id: 'cell7',
            displayName: 'interviewMode'
          }, {
            id: 'cell8',
            displayName: 'interviewTime'
          }, {
            id: 'cell9',
            displayName: 'phone'
          },{
            id: 'cell10',
            displayName: 'outcome'
          },{
            id: 'cell11',
            displayName: 'email'
          }, {
            id: 'cell12',
            displayName: 'rounds'
          }, {
            id: 'cell13',
            displayName: 'source'
          }];
        let {files} = this.state;
        console.log("Files",files)
        // console.log("pages",this.state.pages)
        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Add Candidate</strong></div>
                        <ul className="page-top-actions"> 
                            <li>
                                <label className="custom-file-upload">
                                    <input type="file" onChange={this.csvUpload}/>Import CSV
                                </label>
                            </li>
                            <li>
                            <CsvDownloader columns={columnss} filename="Sample" separator=";" wrapColumnChar="">
                                <button className="btn green">
                                    <i class="fa fa-download fa-3x" aria-hidden="true" title="Download CSV Sample"></i>
                                </button>
                            </CsvDownloader>
                            </li>
                        <li>
                            <InputFile uploadFileHandler ={(e)=>this.uploadFileHandler(e)}>
                                Add Resume
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
                                                                        <input type="text" className="form-control" name="candidateName" placeholder="Candidate Name"
                                                                        value={this.state.candidateName}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Phone</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" name="phone" placeholder="Phone Number"
                                                                        value={this.state.phone}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Email</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" name="email" placeholder="Email"
                                                                        value={this.state.email}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                {/* <h2>Resume</h2> */}
                                                                {/* <button  type="button" className="btn btn-theme btn-sm " onClick={this.downloadResumeData} >Download</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <button type="button"  className="btn btn-theme btn-sm " onClick={this.viewResumeData} >View Resume</button> */}
                                                            </div>
                                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                            <div className="heading-title">Professional Details</div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Experience</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" name="experience" placeholder="Experience"
                                                                        value={this.state.experience}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Expertise</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" name="skills" placeholder="Skills"
                                                                        value={this.state.skills}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Current Salary</label>
                                                                    <div className="controls">
                                                                        <input type="number" className="form-control" name="currentSalary" placeholder="Current Salary"
                                                                        value={this.state.currentSalary}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Expected Salary</label>
                                                                    <div className="controls">
                                                                        <input type="number" className="form-control" name="expectedSalary" placeholder="Expected Salary"
                                                                        value={this.state.expectedSalary}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                            <div className="form-group">
                                                                <label className="control-label">Source</label>
                                                                <div className="controls">
                                                                    <select type="text" className="form-control" name="source"
                                                                    value={this.state.source} onChange={this.handleChange}>
                                                                        <option value=''>---Select Source---</option>LinkedIn
                                                                        <option value='LinkedIn'>LinkedIn</option>
                                                                        <option value='Naukri.com'>Naukri.com</option>
                                                                        <option value='Indeed.com'>Indeed.com</option>
                                                                        <option value='Monster.com'>Monster.com</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Notice Period</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" name="noticePeriod" placeholder="Notice Period"
                                                                        value={this.state.noticePeriod}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Interview Round</label>
                                                                    <div className="controls">
                                                                        <select type="text" className="form-control" name="rounds"
                                                                        value={this.state.rounds} onChange={this.handleChange}>
                                                                            <option value=''>---Select Interview Round---</option>
                                                                            <option value='HR'>HR Round</option>
                                                                            <option value='Technical'>Technical Round</option>
                                                                            <option value='Final'>Final Round</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">InterView Date</label>
                                                                    <div className="controls">
                                                                        <input type="date" className="form-control" name="interviewDate"
                                                                        value={this.state.interviewDate}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">InterView time</label>
                                                                    <div className="controls">
                                                                        <input type="time" className="form-control" name="interviewTime"
                                                                        value={this.state.interviewTime}
                                                                        onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">InterView Mode</label>
                                                                    <div className="controls">
                                                                        <select type="text" className="form-control" name="interviewMode"
                                                                        value={this.state.interviewMode}
                                                                        onChange={this.handleChange}>
                                                                            <option value=''>---Select Interview Mode---</option>
                                                                            <option value='Phone'>Phone</option>
                                                                            <option value='Skype'>Skype</option>
                                                                            <option value='facetoface'>Face To Face</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Status</label>
                                                                    <div className="controls">
                                                                        {/* <textarea rows="4" cols="50" className="form-controlArea" name="status" placeholder="Status..."
                                                                        value={this.state.status}
                                                                        onChange={this.handleChange}></textarea> */}
                                                                        <Editor
                                                                          toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName"
                                                                          editorClassName="editorClassName" name="status" placeholder="Please write here..."
                                                                          value={this.state.status} onChange={this.handleKra}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="control-label">Reason For Change</label>
                                                                    <div className="controls">
                                                                        {/* <textarea rows="4" cols="50" className="form-controlArea" name="reasonForChange" placeholder="Reasion For Change..."
                                                                        value={this.state.reasonForChange}
                                                                        onChange={this.handleChange}></textarea> */}
                                                                        <Editor
                                                                          toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName"
                                                                          editorClassName="editorClassName" name="reasonForChange" placeholder="Please write here..."
                                                                          value={this.state.reasonForChange} onChange={this.handleKra}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                {/* <div className="form-group">
                                                                    <label className="control-label">Hiring Manager</label>
                                                                    <div className="controls">
                                                                        <input type="text" className="form-control" name="hiringManager" placeholder="Hiring Manager"
                                                                        value={this.state.hiringManager}
                                                                        onChange={this.handleChange} />
                                                                    </div>
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
    console.log(state,">>>>>>>>>>>>>>>")
    const deptData = state.CtrUser.userDepartData
    return {
        deptDatas: deptData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addCandidate: (data) => dispatch(actionCreator.addCandidateAction(data)),
        getDepartmentData: () => dispatch(actionCreator.getUserDepartment()),
        csvFileUpload: (data) => dispatch(actionCreator.importCsvHRFileAction(data))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(EditCandidate);
