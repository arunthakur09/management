import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import { DateRange } from 'react-date-range';
import moment from 'moment-timezone';

class Revreport extends React.Component {
    constructor() {
        super();
        this.state = {
            resource: "",
            clientName: "",
            upworkid: "",
            hourlyRate: "",
            startDateTime: "",
            deadlineDateTime: "",
            endDateTime: "",
            hours: "",
            weeklyRevenue: "",
            month: "",
            week: "",
            projectTitle: "",
            ProjectType: "",
            budget:"",
            fromTo: "",
            milestone: ""
        };
    }

    componentDidMount = () => {
        let data={status:"approved",add:true,clientName:""}
        this.props.getSalesDataByID(data)
        this.props.getUsersData();
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        const d = new Date();
        this.setState({
            month: monthNames[d.getMonth()]
        });
        
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
        if (e.target.name==="clientName"){
            let data={status:"approved",add:true,clientName:e.target.value}
            this.props.getSalesDataByID(data)            
        }
    };

    handleCal = range => {
        this.setState({
            fromTo: moment(range.startDate._d).format("YYYY-MM-DD") +"|"+ moment(range.endDate._d).format("YYYY-MM-DD")
        });
    };

    handleChange1 = (e, name) => {
        console.log(this.state);
        this.setState({
                    [e.target.name]: e.target.value,
                });
                console.log(this.state);
    };

    handleSubmit = e => {
        e.preventDefault();
        var resources ="";
        if (parseInt(localStorage.getItem("roleId"))===3){
            resources = parseInt(localStorage.getItem("userRole"))
        }else(
            resources = this.state.resource
        )
        var val = this.state.hourlyRate==="" ?
        this.props.clientData && this.props.clientData[0] && this.props.clientData[0].hourlyRate :
        this.state.hourlyRate+"|"+this.state.hours+"|"+this.state.hours*this.state.hourlyRate==="" ?
        this.props.clientData && this.props.clientData[0] && this.props.clientData[0].hourlyRate : 
        this.state.hourlyRate+"|"+this.state.hours+"|"+this.state.hours*this.state.hourlyRate ;
        const data = {
            resourceId: resources,
            clientName: this.state.clientName==="" ? this.props.clientData && this.props.clientData[0] &&  this.props.clientData[0].upworkId : this.state.clientName,
            upworkId: this.state.upworkid==="" ? this.props.clientData && this.props.clientData[0] && this.props.clientData[0].upworkId : this.state.upworkid,
            hourlyRate: this.state.hourlyRate==="" ? this.props.clientData && this.props.clientData[0] && this.props.clientData[0].hourlyRate : this.state.hourlyRate,    
            startDate: this.state.startDateTime,
            deadlineDate: this.state.deadlineDateTime,
            endDate: this.state.endDateTime,
            hours: this.state.hours,
            weeklyRevenue: this.state.weeklyRevenue,
            month: this.state.month,
            week: this.state.week,
            fromTo: this.state.fromTo,
            projectTitle: this.state.projectTitle==="" ? this.props.clientData && this.props.clientData[0] && this.props.clientData[0].upworkId : this.state.projectTitle,
            val: val,
            actualRevenue: this.state.hours*this.state.hourlyRate,
            projectType: this.state.ProjectType==="" ? this.props.clientData && this.props.clientData[0] && this.props.clientData[0].projectType : this.state.ProjectType,
            milestone: this.state.milestone,
            budget: this.state.budget==="" ? this.props.clientData && this.props.clientData[0] && this.props.clientData[0].budget : this.state.budget
        };
        this.props.addRevData(data);
        console.log(data)
    };

    render() {
        const selectUser = this.props.usersData && this.props.usersData.map(users => (
            <option key={users.id} value={users.id}>
                {users.firstName}
            </option>
        ));
        const selectClient = this.props.clientData && this.props.clientData.map(users => (
            <option key={users.id} value={users.clientName}>
                {users.clientName}
            </option>
        ));
        const selectProposal = this.props.clientData && this.props.clientData.map(users => (
            <option key={users.id} value={users.clientName}>
                {users.submissionTitle}
            </option>
        ));
        var hourly, stateHourly;
        if ((this.state.ProjectType).toUpperCase()==="FIXED"){
            hourly = "fixed"
            stateHourly = this.state.ProjectType && (this.state.ProjectType).toUpperCase()
        }
            else{
                hourly = this.props.clientData && this.props.clientData[0] && (this.props.clientData[0].projectType).toUpperCase()
                stateHourly = this.state.ProjectType && (this.state.ProjectType).toUpperCase()                
            }
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        const d = new Date();

        return (
            <div className="mainPanel">
            <div className="page-content-inner">
                <div className="page-header">
                    <div className="main-title"><strong>Add Revenue Report</strong></div>
                    <ul className="page-top-actions">
                        <li><Link to="/revenue" className="green">Back</Link></li>
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
                                                <div className="heading-title">
                                                Revenue Details
                                                </div>
                                                <div className="form-vertical">
                                                    <div className="row">
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                {parseInt(localStorage.getItem("roleId"))===2 || localStorage.getItem("userRole")==="7"?
                                                                <>
                                                                <label className="control-label">Resource</label>
                                                                <div className="controls">
                                                                    {/* <input type="text" className="form-control" name="resource" placeholder="resource Name"
                                                                    value={this.state.resource} onChange={this.handleChange} /> */}
                                                                    <select className="form-control" name="resource"
                                                                    value={this.state.resource} onChange={this.handleChange} required>
                                                                        <option value="">---Select Resource---</option>
                                                                        {selectUser}
                                                                    </select>
                                                                </div></>:null}
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Client Name</label>
                                                                <div className="controls">
                                                                <select className="form-control" name="clientName"
                                                                    value={this.state.clientName} onChange={this.handleChange}>
                                                                        <option value="">---Select Client---</option>
                                                                        {selectClient}
                                                                    </select>
                                                                    {/* <input type="text" className="form-control" name="clientName" placeholder="client Name"
                                                                    value={this.state.clientName} onChange={this.handleChange} /> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {selectProposal && selectProposal.length===1 ? 
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Project Title</label>
                                                                <div className="controls">
                                                                <select className="form-control" name="projectTitle"
                                                                    value={this.state.projectTitle} onChange={this.handleChange}>
                                                                        {selectProposal && selectProposal.length===1 ?
                                                                        null:<option value="">---Select Project---</option>}
                                                                        {selectProposal}
                                                                    </select>
                                                                    {/* <input type="text" className="form-control" name="clientName" placeholder="client Name"
                                                                    value={this.state.clientName} onChange={this.handleChange} /> */}
                                                                </div>
                                                            </div>
                                                        </div>:null}
                                                        {selectProposal && selectProposal.length===1 ?
                                                        <><div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Upwork ID</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="upworkid" placeholder="upworkid"
                                                                    value={this.state.upworkid==="" ? this.props.clientData[0].upworkId : this.state.upworkid } onChange={this.handleChange} required="enabled"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="control-label">Project Type</label>
                                                            <div className="controls">
                                                                <input type="text" className="form-control" name="ProjectType" placeholder="ProjectType"
                                                                value={this.state.ProjectType==="" ? this.props.clientData[0].projectType : this.state.ProjectType} onChange={this.handleChange} required="enabled"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="control-label">Budget</label>
                                                            <div className="controls">
                                                                <input type="text" className="form-control" name="budget" placeholder="Budget"
                                                                value={this.state.budget==="" ? this.props.clientData[0].budget : this.state.budget} onChange={this.handleChange} required="enabled"/>
                                                            </div>
                                                        </div>
                                                    </div></>:<>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="control-label">Upwork ID</label>
                                                            <div className="controls">
                                                                <input type="text" className="form-control" name="upworkid" placeholder="upworkid"
                                                                value={this.state.upworkid} onChange={this.handleChange} required="enabled"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="control-label">ProjectType</label>
                                                            <div className="controls">
                                                                <input type="text" className="form-control" name="ProjectType" placeholder="ProjectType"
                                                                value={this.state.ProjectType} onChange={this.handleChange} required="enabled"/>
                                                            </div>
                                                        </div>
                                                    </div></>}
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Start Date</label>
                                                    <div className="controls">
                                                        <input type="date" className="form-control" name="startDateTime" placeholder="Project Start Date "
                                                        value={this.state.startDateTime} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Deadline Date</label>
                                                    <div className="controls">
                                                        <input type="date" className="form-control" name="deadlineDateTime" placeholder="Project Deadline Date"
                                                        value={this.state.deadlineDateTime} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">End Date</label>
                                                    <div className="controls">
                                                        <input type="date" className="form-control" name="endDateTime" placeholder="Project End Date"
                                                        value={this.state.endDateTime} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Month</label>
                                                                <div className="controls">
                                                                    <select className="form-control" name="month"
                                                                    value={monthNames[d.getMonth()]} onChange={this.handleChange}>
                                                                        <option value="">Please Select Month</option>
                                                                        <option value="January">January</option>
                                                                        <option value="February">February</option>
                                                                        <option value="March">March</option>
                                                                        <option value="April">April</option>
                                                                        <option value="May">May</option>
                                                                        <option value="June">June</option>
                                                                        <option value="July">July</option>
                                                                        <option value="August">August</option>
                                                                        <option value="September">September</option>
                                                                        <option value="October">October</option>
                                                                        <option value="November">November</option>
                                                                        <option value="December">December</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {hourly==='HOURLY' || stateHourly==="HOURLY"?
                                                        <>
                                                        {selectProposal && selectProposal.length===1 ?
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="control-label">Hourly Rate</label>
                                                            <div className="controls">
                                                                <input type="text" className="form-control" name="hourlyRate" placeholder="hourlyRate"
                                                                value={this.state.hourlyRate==="" ? this.props.clientData[0].hourlyRate : this.state.hourlyRate} onChange={this.handleChange} required="enabled"/>
                                                            </div>
                                                        </div>
                                                    </div>:
                                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        <label className="control-label">Hourly Rate</label>
                                                        <div className="controls">
                                                            <input type="text" className="form-control" name="hourlyRate" placeholder="hourlyRate"
                                                            value={this.state.hourlyRate} onChange={this.handleChange} required="enabled"/>
                                                        </div>
                                                    </div>
                                                </div>}
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Weekly Hours</label>
                                                                <div className="controls">
                                                                    <input type="number" className="form-control" name="hours" placeholder="hours-billed"
                                                                    value={this.state.hours} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Weekly Revenue</label>
                                                                <div className="controls">
                                                                    <input type="number" className="form-control" name="weeklyRevenue" placeholder="weeklyRevenue"
                                                                    value={this.state.weeklyRevenue} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Week</label>
                                                                <div className="controls">
                                                                    <select className="form-control" name="week"
                                                                    onChange={this.handleChange}>
                                                                        <option value="">Please Select Week</option>
                                                                        <option value="week1">Week1</option>
                                                                        <option value="week2">Week2</option>
                                                                        <option value="week3">Week3</option>
                                                                        <option value="week4">Week4</option>
                                                                        <option value="week5">Week5</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div></>:
                                                        <>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="control-label">Milestone Amount Paid</label>
                                                                    <div className="controls">
                                                                        <input type="number" className="form-control" name="milestone" placeholder="Milestone Amount Paid"
                                                                        value={this.state.milestone} onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="control-label">Milestone Date Range</label>
                                                            <div className="controls">
                                                                <DateRange value={this.state.fromTo} onChange={this.handleCal}/>
                                                            </div>
                                                        </div>
                                                    </div></>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="theme-footer">
                                                <Link to="/revenue" className="btn btn-gray btn-sm">Back</Link>
                                                <button type="button" onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right">Add</button>
                                            </div>
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
    console.log(">>>>",state.CtrSales.getData.data)
    const data = state.CtrUser.userData.result
    return {
        usersData: data,
        clientData: state.CtrSales.getData && state.CtrSales.getData.data && state.CtrSales.getData.data
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        getSalesDataByID: (data) => dispatch(actionCreator.getSalesActionData(data)),
        getUsersData: () => dispatch(actionCreator.getUsersDataAction()),
        addRevData: (data) => dispatch(actionCreator.addRevenueDataAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Revreport);
