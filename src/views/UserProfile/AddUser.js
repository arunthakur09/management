import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import "../../assets/css/Theme/Main.css";
import Autocomplete from "react-autocomplete";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class AddUser extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 1,
            firstName: "",
            lastName: "",
            employeeId: "",
            gender: "",
            dob: "",
            maritalStatus: "",
            nationality: "",
            address: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            phoneP: "",
            phoneW: "",
            emailP: "",
            emailW: "",
            jobTitle: "",
            doj: "",
            employmentStatus: "",
            subordinate: "",
            superviser: "",
            userKra: "",
            workExperience: "",
            education: "",
            skills: "",
            password: "",
            departmentId: "",
            password1: "",
        };
    }

    componentDidMount = () => {
        this.props.getDepartmentData();
        this.props.getUsersAutocomplete();
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
        // if ((e.target.name==="password1" || e.target.name==="password") && this.state.password1!==this.state.password){
        //     document.getElementById("password1").innerText = "Password Does Not Match"
        // }else if((e.target.name==="password1" || e.target.name==="password") && this.state.password1===this.state.password)
        // {document.getElementById("password1").innerText = ""}
    };

    handleKra = e => {console.log('>>>>>>>>>',e)
        this.setState({
            userKra: e.blocks[0].text
        });
        console.log(e.blocks[0].text)
    };

    filterEmp = (val) => {
        this.setState ({
        subordinate: val
        },
        // ()=> {
        //     this.props.getUsersData(this.state.timePeriod)

        // }
        )
    }

    filterEmpname = (val) => {
        this.setState ({
        supervisor: val
        },
         // ()=> {this.props.getUsersData(this.state.timePeriod)}
        )
    }
    
    first = function firstTab () {
        return (
            <div className="theme-content">
                <div className="heading-title">
                    Personal Details
                </div>
                <div className="form-vertical">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">First Name</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="firstName" placeholder="First Name"
                                    value={this.state.firstName} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Last Name</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="lastName" placeholder="Last Name"
                                    value={this.state.lastName} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>		
                        {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Employee Id</label>
                                <div className="controls">
                                    <input type="number" className="form-control" name="employeeId" placeholder="employeeId"
                                    value={this.state.employeeId} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div> */}
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Gender</label>
                                <div className="controls">
                                    <select className="form-control" name="gender"
                                    value={this.state.gender} onChange={this.handleChange}>
                                        <option value="">Please Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Date of Birth</label>
                                <div className="controls">
                                    <input type="date" className="form-control" name="dob"
                                    value={this.state.dob} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Marital Status</label>
                                <div className="controls">
                                    <select className="form-control" name="maritalStatus"
                                    value={this.state.maritalStatus} onChange={this.handleChange}>
                                        <option value="">Please Select</option>
                                        <option value="Married">Married</option>
                                        <option value="Unmarried">Unmarried</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Nationality</label>
                                <div className="controls">
                                    <select className="form-control" name="nationality"
                                    value={this.state.nationality} onChange={this.handleChange}>
                                        <option value="">Please Select</option>
                                        <option value="Indian">Indian</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="theme-footer">
                    <Link to="/users" className="btn btn-gray btn-sm">Back</Link>
                    <button type="button" onClick={()=> this.setState({step: this.state.step+1})} className="btn btn-theme btn-sm float-right">Next</button>
                </div>
            </div>
        )
    }

    secondTab =() =>{
        return (
            <div className="theme-content">                                                        
                <div className="heading-title">
                    Contact Details
                </div>
                <div className="form-vertical">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label className="control-label">Street Address</label>
                                    <div className="controls">
                                        {/* <textarea rows="4" cols="50" className="form-controlArea" name="address"
                                        placeholder="Please write here..." value={this.state.address}
                                        onChange={this.handleChange}></textarea> */}
                                        <Editor
                                        toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName" name="address" placeholder="Please write here..."
                                        value={this.state.address} onChange={this.handleKra}
                                        />
                                    
                                    </div>
                                </div>
                            </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">City</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="city" placeholder="city"
                                    value={this.state.city} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">State/Province</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="state" placeholder="State"
                                    value={this.state.state} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Postal Code</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="postalCode" placeholder="postalCode"
                                    value={this.state.postalCode} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Country</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="country" placeholder="country"
                                    value={this.state.country} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Phone(Personal)</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="phoneP" placeholder="Phone(Personal)"
                                    value={this.state.phoneP} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Phone(Work)</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="phoneW" placeholder="Phone(Work)"
                                    value={this.state.phoneW} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Email(Personal)</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="emailP" placeholder="Email(Personal)"
                                    value={this.state.emailP} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Email(Work)</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="emailW" placeholder="Email(Work)"
                                    value={this.state.emailW} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="theme-footer">
                    <button type="button" onClick={()=> this.setState({step: this.state.step-1})} className="btn btn-gray btn-sm">Previous</button>
                    <button type="button" onClick={()=> this.setState({step: this.state.step+1})} className="btn btn-theme btn-sm float-right">Next</button>
                </div>
            </div>
        )
    }

    thirdTab = () => {
        const selectDepartment = this.props.userDept.map(department => (
            <option key={department.id} value={department.id}>
                {department.departmentName}
            </option>
        ));
        return(
            <div className="theme-content">                                                
                <div className="heading-title">
                    Job Details
                </div>
                <div className="form-vertical">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Job Title</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="jobTitle" placeholder="jobTitle"
                                    value={this.state.jobTitle} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Department</label>
                                <div className="controls">
                                    <select className="form-control" name="departmentId"
                                    value={this.state.departmentId} onChange={this.handleChange}>
                                        <option>Please Select</option>{selectDepartment}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Date of Joining</label>
                                <div className="controls">
                                    <input type="date" className="form-control" name="doj"
                                    value={this.state.doj} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Employment Status</label>
                                <div className="controls">
                                    <select className="form-control" name="employmentStatus"
                                    value={this.state.employmentStatus} onChange={this.handleChange}>
                                        <option value="">Please Select</option>
                                        <option value="Working">Working</option>
                6                   <option value="Resigned">Resigned</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">KRA</label>
                                <div className="controls">
                                    <Editor
                                        toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName" name="userKra" placeholder="Please write here..."
                                        value={this.state.userKra} onChange={this.handleKra}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="theme-footer">
                    <button type="button" onClick={()=> this.setState({step: this.state.step-1})} className="btn btn-gray btn-sm">Previous</button>
                    <button type="button" onClick={()=> this.setState({step: this.state.step+1})} className="btn btn-theme btn-sm float-right">Next</button>
                </div>
            </div>
        )
    }

    fourthTab = () =>{
        const hrdata = this.props.getUserscomplete ? this.props.getUserscomplete.map((e) => {
            return (
                {ename: e.firstName+" "+e.lastName,eid: e.id.toString()}
            )
        }): [];
        return(
            <div className="theme-content">                                                
                <div className="heading-title">   
                    Report To
                </div>
                <div className="form-vertical">
                    <div className="row">                    
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Assigned Supervisor</label>
                                <div className="controls"><Autocomplete 
                                        shouldItemRender={(item, value) => 
                                            item.ename.toLowerCase().indexOf((value===null || undefined ? '' : value).toLowerCase()) > -1}
                                        items={hrdata}
                                        getItemValue={(item) => item.ename} name="userid"
                                         renderItem={ (item, highlighted) => (
                                            <div 
                                              style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                                              key={ item.eid } >
                                              { item.ename }
                                            </div>
                                          )} 
                                          value={this.state.supervisor}
                                          onChange={(e) => {
                                              this.setState({ displayName: e.target.value })
                                            //   if (e.target.value==='')
                                                this.filterEmpname(e.target.value)}}
                                          onSelect={ (ename, allData)   => {
                                              this.filterEmpname(allData.ename)
                                              this.setState({
                                                displayName: ename,
                                                   userid: allData.eid 
                                              })}}/>
                                    {/* <input type="text" className="form-control" name="supervisor" placeholder="supervisor"
                                    value={this.state.userData.supervisor} onChange={this.handleChange} /> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Assigned Subordinate</label>
                                <div className="controls">
                                <Autocomplete 
                                        shouldItemRender={(item, value) => item.ename.toLowerCase().indexOf((value===null || undefined ? '' : value).toLowerCase()) > -1}
                                        items={hrdata}
                                        getItemValue={(item) => item.ename} name="userid"
                                         renderItem={ (item, highlighted) => (
                                            <div 
                                              style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                                              key={ item.eid } >
                                              { item.ename }
                                            </div>
                                          )} 
                                          value={this.state.subordinate}
                                          onChange={(e) => {
                                              this.setState({ displayName1: e.target.value })
                                            //   if (e.target.value==='')
                                                this.filterEmp(e.target.value)}}
                                          onSelect={ (ename, allData)   => {
                                              this.filterEmp(allData.ename)
                                              this.setState({
                                                displayName1: ename,
                                                   userid: allData.eid 
                                              })}}/>
                                    {/* <input type="text" className="form-control" name="subordinate" placeholder="subordinate"
                                    value={this.state.userData.subordinate} onChange={this.handleChange} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="theme-footer">
                    <button type="button" onClick={()=> this.setState({step: this.state.step-1})} className="btn btn-gray btn-sm">Previous</button>
                    <button type="button" onClick={()=> this.setState({step: this.state.step+1})} className="btn btn-theme btn-sm float-right btn-nxt">Next</button>
                </div>
            </div>
        )
    }

    fifthTab = () => {
        return(    
            <div className="theme-content">                                                
                <div className="heading-title">   
                    Qualifications
                </div>
                <div className="form-vertical">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Work Experience</label>
                                <div className="controls">
                                    {/* <textarea rows="4" cols="50" className="form-controlArea" name="workExperience"
                                    placeholder="Please write here..." value={this.state.workExperience}
                                    onChange={this.handleChange}></textarea> */}
                                    <Editor
                                      toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName"
                                      editorClassName="editorClassName" name="workExperience" placeholder="Please write here..."
                                      value={this.state.workExperience} onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Education</label>
                                <div className="controls">
                                    {/* <textarea rows="4" cols="50" className="form-controlArea" name="education"
                                    placeholder="Please write here..." value={this.state.education}
                                    onChange={this.handleChange}></textarea> */}
                                    <Editor
                                      toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName"
                                      editorClassName="editorClassName" name="education" placeholder="Please write here..."
                                      value={this.state.education} onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Skills</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="skills" placeholder="Skills"
                                    value={this.state.skills} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="theme-footer">
                    <button type="button" onClick={()=> this.setState({step: this.state.step-1})} className="btn btn-gray btn-sm">Previous</button>
                    <button type="button" onClick={()=> this.setState({step: this.state.step+1})} className="btn btn-theme btn-sm float-right">Next</button>
                </div>
            </div>
        )
    }

    sixthTab = () => {
        return(
            <div className="theme-content">                                                
                <div className="heading-title"> 
                    Login Details
                </div>
                <div className="form-vertical">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Password</label>
                                <div className="controls">
                                    <input type="password" className="form-control" name="password" placeholder="Password"
                                    value={this.state.password} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Confirm Password</label>
                                <div className="controls">
                                    <input type="password" className="form-control" name="password1"
                                    placeholder="Password1" value={this.state.password1} onChange={this.handleChange} />
                                    <p id="password1"></p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="theme-footer">
                    <button type="button" onClick={()=> this.setState({step: this.state.step-1})} className="btn btn-gray btn-sm">Previous</button>
                    <button type="button" onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right btn-nxt1">Add</button>
                </div>
            </div>
        )
    }

    checkTabs = function renderComponents () {
        if(this.state.step ===1) {
            return this.first();
        } 
        if(this.state.step ===2) {
            return this.secondTab();
        }
        if(this.state.step ===3) {
            return this.thirdTab();
        } 
        if(this.state.step ===4) {
            return this.fourthTab();
        }
        if(this.state.step ===5) {
            return this.fifthTab();
        } 
        if(this.state.step ===6) {
            return this.sixthTab();
        } 
    }

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            // employeeId: this.state.employeeId,
            gender: this.state.gender,
            dob: this.state.dob,
            maritalStatus: this.state.maritalStatus,
            nationality: this.state.nationality,
            streetAddress: this.state.address,
            city: this.state.city,
            state: this.state.state,
            postalCode: this.state.postalCode,
            country: this.state.country,
            phoneP: this.state.phoneP,
            phoneW: this.state.phoneW,
            emailP: this.state.emailP,
            email: this.state.emailW,
            jobTitle:  this.state.jobTitle,
            joiningDate: this.state.doj,
            employeeStatus: this.state.employmentStatus,
            subordinate: this.state.subordinate,
            supervisor: this.state.supervisor,
            userKra: this.state.userKra,
            workExperience: this.state.workExperience,
            education: this.state.education,
            skills: this.state.skills,
            password: this.state.password,
            departmentId: parseInt(this.state.departmentId)
        };
        this.props.addUsersData(data);
    };

    render() {
        return (
            <div className="mainPanel">
            <div className="page-content-inner">
                <div className="page-header">
                    <div className="main-title"><strong>Add User</strong></div>
                    <ul className="page-top-actions">
                        <li><Link to="/users" className="green">Back</Link></li>
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
                                            <div className="prosess-tab">
                                                <ul className="nav nav-tabs">
                                                    <li className="nav-item" onClick={()=> this.setState({step:1})}>
                                                        <button className={this.state.step === 1 ? "nav-link active" : "nav-link" }>Personal Details</button>
                                                    </li>
                                                    <li className="nav-item" onClick={()=> this.setState({step:2})}>
                                                        <button className={this.state.step === 2 ? "nav-link active" : "nav-link" }>Contact Details</button>
                                                    </li>
                                                    <li className="nav-item" onClick={()=> this.setState({step:3})}>
                                                        <button className={this.state.step === 3 ? "nav-link active" : "nav-link" }>Job Details</button>
                                                    </li>
                                                    <li className="nav-item" onClick={()=> this.setState({step:4})}>
                                                        <button className={this.state.step === 4 ? "nav-link active" : "nav-link" }>Report To</button>
                                                    </li>
                                                    <li className="nav-item" onClick={()=> this.setState({step:5})}>
                                                        <button className={this.state.step === 5 ? "nav-link active" : "nav-link" }>Qualifications</button>
                                                    </li>
                                                    <li className="nav-item" onClick={()=> this.setState({step:6})}>
                                                        <button className={this.state.step === 6 ? "nav-link active" : "nav-link" }>Login Details</button>
                                                    </li>
                                                </ul>
                                            </div>
                                            {this.checkTabs()}
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
    const userDepartmentData = state.CtrUser.userDepartData
    return {
        getUserscomplete: state.CtrUser.employeeFilters.result,
        userDept: userDepartmentData
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        addUsersData: data => dispatch(actionCreator.addUsersDataAction(data)),
        getUsersAutocomplete: () => dispatch(actionCreator.getUsersAutocompleteAction()),
        getDepartmentData: () => dispatch(actionCreator.getUserDepartment())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
