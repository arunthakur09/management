import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import { Editor } from 'react-draft-wysiwyg';
import moment from 'moment';
import Autocomplete from "react-autocomplete";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "../../assets/css/Theme/Main.css";
import connection from "../../Config/APIurl/connection";

class EditUser extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            step: 1,
            userData: {},
            departments: [],
            file:{}
        }
    }

    componentDidMount = () => {
        this.props.userDataById({id: this.props.match.params.id});
        this.props.getDepartmentData();
        this.props.getpermissionData();
        this.props.getUsersAutocomplete();
    }

    componentWillReceiveProps = (nextProps) => {
        const byIdUser = nextProps.userIdData.result && nextProps.userIdData.result.map(data => (data))
        const departmentdatas = nextProps.deptDatas
        this.setState({
            userData: byIdUser && byIdUser.length > 0 ? byIdUser[0] : {},
            departments: departmentdatas
        })
    }

    handleChange = (e) => {
        this.setState ({
            userData: {
            ...this.state.userData,
            [e.target.name]: e.target.value}
        })
    }

    handleKra = e => {
        this.setState ({
            userData: {
                ...this.state.userData,
                userKra: e.blocks[0].text
            }
        })
    };

    filterEmp = (val) => {
        this.setState ({
            userData: {
        ...this.state.userData,
        subordinate: val}
        },
        // ()=> {
        //     this.props.getUsersData(this.state.timePeriod)

        // }
        )
    }

    filterEmpname = (val) => {
        this.setState ({
            userData: {
        ...this.state.userData,
        supervisor: val}
        },
         // ()=> {this.props.getUsersData(this.state.timePeriod)}
        )
    }
    
    handleSwitchChange = e => {
        this.setState({
            userData: {
                ...this.state.userData,
                [e.target.name]: e.target.checked
            }
        });
    };
    
    first = function firstTab () {
        return (
            <div className="theme-content">
                <div className="heading-title">
                    Personal Details
                </div>
                <div className="form-vertical">
                    <div className="Uimage"><img id="Uimage" src={connection.concat(this.state.userData.userImage)}  alt="ProfilePicture"/><div><br />
                    <div className="username">{this.state.userData.firstName}&nbsp;<strong>{this.state.userData.lastName}</strong></div>
                    <div className="user_email">{this.state.userData.email}</div></div>
                    <label className="btn btn-theme btn-sm1"><input type="file" className="custom-file-upload" accept=".jpg,.jpeg,.png" onChange={this.picUpload}/>Change Profile Picture</label></div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">First Name</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="firstName" placeholder="First Name"
                                    value={this.state.userData.firstName} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Last Name</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="lastName" placeholder="Last Name"
                                    value={this.state.userData.lastName} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>		
                        {/* <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Employee Id</label>
                                <div className="controls">
                                    <input type="number" className="form-control" name="employeeId" placeholder="employeeId"
                                    value={this.state.userData.employeeId} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div> */}
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Gender</label>
                                <div className="controls">
                                    <select className="form-control" name="gender"
                                    value={this.state.userData.gender} onChange={this.handleChange}>
                                        <option value="">Please Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Date of Birth</label>
                                <div className="controls">
                                    <input type="date" className="form-control" name="dob"
                                    value={this.state.userData.dob ? this.state.userData.dob.slice(0, 10) : ""} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Marital Status</label>
                                <div className="controls">
                                    <select className="form-control" name="maritalStatus"
                                    value={this.state.userData.maritalStatus} onChange={this.handleChange}>
                                        <option value="">Please Select</option>
                                        <option value="Married">Married</option>
                                        <option value="Unmarried">Unmarried</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Nationality</label>
                                <div className="controls">
                                    <select className="form-control" name="nationality"
                                    value={this.state.userData.nationality} onChange={this.handleChange}>
                                        <option value="">Please Select</option>
                                        <option value="Indian">Indian</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">isActive</label><br />
                                <label className="switch">
                                    <input type="checkbox" name="isActive"
                                    checked={this.state.userData.isActive ? this.state.userData.isActive : ""} onChange={e => this.handleSwitchChange(e)} />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="theme-footer">
                    <Link to="/users" className="btn btn-gray btn-sm">Back</Link>
                    <button type="button" onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right btn-save1">Save</button>
                    <button type="button" onClick={()=> this.setState({step: this.state.step+1})} className="btn btn-theme btn-sm float-right btn-nxt4">Next</button>
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
                        
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">City</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="city" placeholder="city"
                                    value={this.state.userData.city} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">State/Province</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="state" placeholder="State"
                                    value={this.state.userData.state} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Postal Code</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="postalCode" placeholder="postalCode"
                                    value={this.state.userData.postalCode} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Country</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="country" placeholder="country"
                                    value={this.state.userData.country} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Phone(Personal)</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="phoneP" placeholder="Phone(Personal)"
                                    value={this.state.userData.phoneP} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Phone(Work)</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="phoneW" placeholder="Phone(Work)"
                                    value={this.state.userData.phoneW} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Email(Personal)</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="emailP" placeholder="Email(Personal)"
                                    value={this.state.userData.emailP} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Email(Work)</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="email" placeholder="Email(Work)"
                                    value={this.state.userData.email} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                                <div className="form-group">
                                    <label className="control-label">Street Address</label>
                                    <div className="controls">
                                        <textarea rows="4" cols="50" className="form-controlArea" name="streetAddress"
                                        placeholder="Please write here..." value={this.state.userData.streetAddress}
                                        onChange={this.handleChange}></textarea>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <div className="theme-footer">
                    <button type="button" onClick={()=> this.setState({step: this.state.step-1})} className="btn btn-gray btn-sm">Previous</button>
                    <button type="button" onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right btn-save1">Save</button>
                    <button type="button" onClick={()=> this.setState({step: this.state.step+1})} className="btn btn-theme btn-sm float-right btn-nxt4">Next</button>
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
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Job Title</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="jobTitle" placeholder="jobTitle"
                                    value={this.state.userData.jobTitle} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Department</label>
                                <div className="controls">
                                    <select className="form-control" name="departmentId"
                                    value={this.state.userData.departmentId} onChange={this.handleChange}>
                                        <option>Please Select</option>{selectDepartment}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Date of Joining</label>
                                <div className="controls">
                                    <input type="date" className="form-control" name="joiningDate"
                                    value={this.state.userData.joiningDate ? this.state.userData.joiningDate.slice(0, 10) : ''} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Employment Status</label>
                                <div className="controls">
                                    <select className="form-control" name="employeeStatus"
                                    value={this.state.userData.employeeStatus} onChange={this.handleChange}>
                                        <option value="">Please Select</option>
                                        <option value="Working">Working</option>
                                        <option value="Resigned">Resigned</option>
                                        <option value="Terminated">Terminated</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {this.state.userData && this.state.userData.employeeStatus === 'Resigned' ?
                        <div className="col-xl-12 col-lg-12 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label" style={{color:"red"}}>Deadline Date in {moment(this.state.userData.ResignedDate).diff(new Date(), 'days')} days</label>
                                <div className="controls">
                                </div>
                            </div>
                        </div>:null}
                        <div className="col-xl-12 col-lg-12 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">KRA</label>
                                <div className="controls"><Editor
                                toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName" name="userKra" placeholder="Please write here..."
                                value={this.state.userData.userKra} onChange={this.handleKra}/>
                                    {/* <textarea rows="4" cols="50" className="form-controlArea" name="userKra"
                                    placeholder="Please write here..."
                                    value={this.state.userKra} onChange={this.handleChange}></textarea> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="theme-footer">
                    <button type="button" onClick={()=> this.setState({step: this.state.step-1})} className="btn btn-gray btn-sm">Previous</button>
                    <button type="button" onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right btn-save1">Save</button>
                    <button type="button" onClick={()=> this.setState({step: this.state.step+1})} className="btn btn-theme btn-sm float-right btn-nxt4">Next</button>
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
                        <div className="col-xl-4 col-lg-4 col-md-8 col-sm-12 col-12">
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
                                          value={this.state.displayName ? this.state.displayName : this.state.userData.supervisor}
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
                        <div className="col-xl-4 col-lg-4 col-md-8 col-sm-12 col-12">
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
                                          value={this.state.displayName1 ? this.state.displayName1 : this.state.userData.subordinate}
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
                    <button type="button" onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right btn-save2">Save</button>
                    <button type="button" onClick={()=> this.setState({step: this.state.step+1})} className="btn btn-theme btn-sm float-right btn-nxt5">Next</button>
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
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Work Experience</label>
                                <div className="controls">
                                    <textarea rows="4" cols="50" className="form-controlArea" name="workExperience"
                                    placeholder="Please write here..." value={this.state.userData.workExperience}
                                    onChange={this.handleChange}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Education</label>
                                <div className="controls">
                                    <textarea rows="4" cols="50" className="form-controlArea" name="education"
                                    placeholder="Please write here..." value={this.state.userData.education}
                                    onChange={this.handleChange}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Skills</label>
                                <div className="controls">
                                    <input type="text" className="form-control" name="skills" placeholder="Skills"
                                    value={this.state.userData.skills} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="theme-footer">
                    <button type="button" onClick={()=> this.setState({step: this.state.step-1})} className="btn btn-gray btn-sm">Previous</button>
                    <button type="button" onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right btn-save1">Save</button>
                    <button type="button" onClick={()=> this.setState({step: this.state.step+1})} className="btn btn-theme btn-sm float-right btn-nxt4">Next</button>
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
                        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                            <div className="form-group">
                                <label className="control-label">Password</label>
                                <div className="controls">
                                    <input type="password" className="form-control" name="password" placeholder="Password"
                                    value={this.state.userData.password} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="theme-footer">
                    <button type="button" onClick={()=> this.setState({step: this.state.step-1})} className="btn btn-gray btn-sm">Previous</button>
                    <button type="button" onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right btn-nxt3">Save</button>
                    <button type="button" onClick={()=> this.setState({step: this.state.step+1})} className="btn btn-theme btn-sm float-right btn-nxt2">Next</button>
                </div>
            </div>
        )
    }

    seventhTab = () => {
        const permissionDatas = this.state.userData.permissionId && this.state.userData.permissionId.split("|")
        const groupingArr = [];
        const  groupsData = this.props.userPermission;
        if (groupsData) {
            for (var key in groupsData) {
                let first = (
                        <div className="acc-box">
                            <div className="accordion" id="accordionExample">
                                <div className="card">
                                    <div className="accordion-btn collapsed"  data-toggle="collapse" data-target={`#${key}`} aria-expanded="true" aria-controls={key}>
                                        <span><i className="fa fa-magic"></i></span>
                                        {key.charAt(0).toUpperCase() + key.slice(1)} Permissions
                                    </div>
                                    <div id={key} className="collapse" aria-labelledby={key} data-parent="#accordionExample">
                                        <div className="card-body form-vertical">
                                        <div className="graph">
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                    {groupsData[key].map(permission => {
                                                        return (
                                                            <div className="checkbox-theme" key={permission.id}>
                                                                <input id={permission.id} className="styled permissionsCheckboxes" type="checkbox"
                                                                name={permission.id}
                                                                defaultChecked={permissionDatas && permissionDatas.includes(permission.id && permission.id.toString())} />
                                                                <label htmlFor={permission.id} className="arrow-label">
                                                                    <div className="radio-list-product">
                                                                        <div className="product-name">{permission.requestType + " "} - {permission.description} </div>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                )
                groupingArr.push(first);
            }
        }
        return(
            <div className="theme-content">                                                
                <div className="heading-title"> 
                    Permissions
                </div>
                <div className="graph">
                <div class="row">
                    {groupingArr.map((el, i) => {
                        return (
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6" key={i}>{el}</div>
                        )
                    })}
                </div>
                </div>
                <div className="theme-footer">
                    <button type="button" onClick={()=> this.setState({step: this.state.step-1})} className="btn btn-gray btn-sm">Previous</button>
                    <button type="button" onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right">Save</button>
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
        if(this.state.step ===7) {
            return this.seventhTab();
        } 
    }

    handleSubmit = e => {
        e.preventDefault();
        const permissionId = [];
        const allpermissionsCheckboxes = document.getElementsByClassName("permissionsCheckboxes");
        Array.from(allpermissionsCheckboxes).forEach(el => {
            if (el.checked) {
                permissionId.push(el.getAttribute("name"));
            }
        });
        const data = {
            id: this.state.userData.id,
            firstName: this.state.userData.firstName,
            lastName: this.state.userData.lastName,
            // employeeId: this.state.userData.employeeId,
            gender: this.state.userData.gender,
            dob: this.state.userData && this.state.userData.dob.slice(0,10),
            maritalStatus: this.state.userData.maritalStatus,
            nationality: this.state.userData.nationality,
            streetAddress: this.state.userData.streetAddress,
            city: this.state.userData.city,
            state: this.state.userData.state,
            postalCode: this.state.userData.postalCode,
            country: this.state.userData.country,
            phoneP: this.state.userData.phoneP,
            phoneW: this.state.userData.phoneW,
            emailP: this.state.userData.emailP,
            email: this.state.userData.email,
            jobTitle:  this.state.userData.jobTitle,
            joiningDate: this.state.userData.joiningDate && this.state.userData.joiningDate.slice(0, 10),
            employeeStatus: this.state.userData.employeeStatus,
            subordinate: this.state.userData.subordinate,
            supervisor: this.state.userData.supervisor,
            userKra: this.state.userData.userKra,
            workExperience: this.state.userData.workExperience,
            education: this.state.userData.education,
            skills: this.state.userData.skills,
            password: this.state.userData.password,
            departmentId: this.state.userData.departmentId,
            permissionId: permissionId.join("|"),
            isResigned: this.state.userData.isResigned,
            isActive: this.state.userData.employeeStatus === 'Terminated' ? 0 : this.state.userData.isActive
        };
        this.props && this.props.updateUserData(data);
    };

    picUpload = (e) => {
        this.setState({
            file: {file: e.target.files[0],
            id: this.state.userData.id}
        }, () => {
            this.props.imageUpload(this.state.file)
        })
    }

    render () {
        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Edit User</strong></div>
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
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
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
                                                    <li className="nav-item" onClick={()=> this.setState({step:7})}>
                                                        <button className={this.state.step === 7 ? "nav-link active" : "nav-link" }>Permissions</button>
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
                <div className="modal fade modal-theme" id="picture" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body close-on-body">
                                <p>Do you want to Upload a new Profile Picture?</p>
                            </div>
                            <div className="modal-footer">
                                <label type="button" className="btn btn-gray btn-sm" data-dismiss="modal">Cancel</label>
                                <label className="btn btn-theme btn-sm" data-toggle="modal" data-target="#picture"><input type="file" className="custom-file-upload" accept=".jpg,.jpeg,.png" onChange={this.picUpload}/>ok</label>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    const dataById = state.CtrUser.userDataById
    const permissionData = state.CtrUser.permissionData.permisionsData
    return {
        userIdData: dataById,
        userDept: state.CtrUser.userDepartData,
        userPermission: permissionData,
        getUserscomplete: state.CtrUser.employeeFilters.result
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userDataById: data => dispatch(actionCreator.getUsersById(data)),
        getDepartmentData: () => dispatch(actionCreator.getUserDepartment()),
        getpermissionData: () => dispatch(actionCreator.userPermissionDataAction()),
        updateUserData: (data) => dispatch(actionCreator.updateUsers(data)),
        imageUpload: (data) => dispatch(actionCreator.importPicFileAction(data)),
        getUsersAutocomplete: () => dispatch(actionCreator.getUsersAutocompleteAction()),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
