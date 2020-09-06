import React from 'react';
import { connect } from 'react-redux';
//import moment from "moment";
//import { Link } from "react-router-dom";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import "../../assets/css/Theme/Main.css";
class projectManagement extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount = () => {
        this.props.getProjectData();
    
    };
    EditProject = (e) => {
        e.persist()
        let path = `/ProjectManagement/editProject/${parseInt(e.target.id)}`;
        this.props.history.push(path);
    }
    MonthlyView = (e) => {
        e.persist()
        let path = `/ProjectManagement/MonthlyView`;
        this.props.history.push(path);
    }
    addTask = (e) => {
        e.persist()
        let path = `/ProjectManagement/AddTask/${parseInt(e.target.id)}`;
        this.props.history.push(path);
    }
    render(){
        const  Project= this.props.Project;
        return(
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Project Management</strong></div>
                    </div>

                <div className="theme-panel">
                    <div className="projectManagment">
                        <div className="detailBox">
                            <div className="headerBox">
                                Customer Projects
                            </div>
                            <div className="contentBox">
                            {Project.data && Project.data.map((pro,index)=>{
                             return(                            
                                <div className="projectPanel" >
                                <div className="prjectListBox"  >
                                    <div className="statusBtn">
                                        <div className="btn-group dropright">
                                          <button type="button" class="statusB dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          </button>
                                            <div className="dropdown-menu statusOption">
                                                <ul>
                                                    <li><a href="#"><img alt = "imageFile"src="images/pm/businessman.png"/>  Planing</a></li>
                                                    <li><a href="#"><img alt = "imageFile"src="images/pm/growth.png" /> In Progress</a></li>
                                                    <li><a href="#"><img alt = "imageFile"src="images/pm/approval.png" /> Done</a></li>
                                                    <li><a href="#"><img alt = "imageFile"src="images/pm/warranty.png" /> Under Warranty</a></li>
                                                    <li><a href="#"><img alt = "imageFile"src="images/pm/route.png" /> Cleared</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clientBox collapsed" data-toggle="collapse" href={"#collapseExample1"+index} role="button" aria-expanded="false" aria-controls="collapseExample">
                                    {((pro.title))}
                                    </div>
                                    <div className="taskBox">{pro.description}</div>
                                    </div>
                                    <div className="detailPanelBox collapse" id={"collapseExample1"+index}>
                                        <div className="pmOptionPanal">
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                          <li className="nav-item">
                                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                                                <img alt = "loading"src="images/pm/information.png"></img> General</a>
                                          </li>
                                          <li className="nav-item">
                                            <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">
                                                <img alt = "loading"src="images/pm/push-pin.png"></img>  Assets</a>
                                          </li>

                                          {/* <li className="nav-item">
                                            <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">
                                                <img alt = "loading"src="images/pm/edit.png"></img>  Edit</a>
                                          </li> */}
                                                                          
                                        </ul>
                                        <button type="button"  id={pro.id}className="btn btn-edit btn-sm" style={{float:"right" ,marginTop:"-51px"}} onClick={this.EditProject}>Edit</button>
                                        <button type="button"  id={pro.id}className="btn btn-edit btn-sm" style={{float:"right" ,marginTop:"-51px" ,marginRight:"74px"}} onClick={this.MonthlyView}>Monthly View</button>
                                        <button type="button"  id={pro.id}className="btn btn-edit btn-sm" style={{float:"right" ,marginTop:"-51px" ,marginRight:"209px"}} onClick={this.addTask}>Add Task</button>
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <div className="discussion-box">
                                                    <div className="discussion-header">
                                                        <div className="title">Properties</div>
                                                    </div>
                                                    <div className="discussion-detail">
                                                        <div className="details-title">
                                                            <span className="lable">Status  </span>  {((pro.status))}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable">Start Date  </span>  {((pro.startDate))}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable">End Date  </span>  {((pro.endDate))}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable"> Customer Dead Line  </span>  {((pro.customerDeadline))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="discussion-box">
                                                    <div className="discussion-header">
                                                        <div className="title">Assigned Person</div>
                                                    </div>
                                                    <div className="discussion-detail">
                                                        <div className="discussion-date">21-Oct-2019</div>
                                                        <div className="details-title">
                                                            <span className="lable">Proposal Id   </span> {pro.dealsId}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable">Person Name   </span> {pro.fullName}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="discussion-box">
                                                    <div className="discussion-header">
                                                            <div className="title">Client Discussion Details</div>
                                                    </div>
                                                    <div className="discussion-detail">
                                                        <div className="discussion-date">21-Oct-2019</div>
                                                        <div className="details-title">
                                                            <span className="lable">Contractor Name   </span>   {pro.contractorName}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable">Client  Name    </span>    {pro.clientName}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable">Company Name   </span>      {pro.companyName}                                                    </div>
                                                        <div className="details-title">
                                                            <span className="lable">Source   </span>  {((pro.source))}
                                                        </div>
                                                        <div className="details-title">
                                                            <span className="lable">Title   </span> {((pro.title))}
                                                        </div>
                                                    </div>
                                                    <div className="requirment-details">
                                                        <div className="requirment-title">
                                                            Requirment: 
                                                        </div>
                                                         <div className="requirment-details">
                                                            {((pro.jobRequirement))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                                <div className="discussion-box">
                                                    <div className="discussion-header">
                                                        <div className="title">Assets</div>
                                                    </div>
                                                    <div className="attactedFile">
                                                        <div className="upload-btn-box">
                                                            <i className="fa fa-paperclip" aria-hidden="true"></i>
                                                            <input type="file" class="upload-btn"/>
                                                        </div>
                                                        <div className="uploadedFileName">
                                                            fileName.xml
                                                        </div>
                                                    </div>
                                                </div>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )                                                            
                        })}   
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
    console.log(state)
    return {
        Project: state.CtrProjectManagement.getProjectData,
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
       
        getProjectData: (data) => dispatch(actionCreator.getProjectDataAction(data)),

    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(projectManagement);