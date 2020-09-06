import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import Autocomplete from "react-autocomplete";

class AddTask extends React.Component {
    constructor() {
        super ()
        this.state = {
            userId:"",
            projectid:"",
            assignedUser:"",
           // assignedProject:"",
            title:"",
            taskdetails:"", 
            deadlineDate:"",
            deadlineTime:"", 
            spendingHours:"",
            workedOn:"",
            editData: {},
        }
    }
    componentDidMount = () => {
        this.props.getProjectDataByID({ id: this.props.match.params.id });
        this.props.getUser();
    };
    componentWillReceiveProps = (nextProps) => {
        const editedData = nextProps.salesData.data.map(data => data)
        if (editedData) {
            this.setState({
                editData: editedData.length > 0 ? editedData[0] : {}
            })
        }
    }
    handleChange = (e,val) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
        if(e.target.name==="ptitle"){
        this.setState ({
            projectId:val,
            editData: {
            ...this.state.editData,
            [e.target.name]: e.target.value},
            
        })}
    }
    filterEmp = (val) => {
        this.setState ({
        userId: val,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            userId:                     this.state.userid,
            projectId:                  this.state.editData.id,
            assignedUser:               this.state.assignedUser,
            //assignedProject:          this.state.editData.id,
            taskName:                   this.state.title,
            taskDetails:                this.state.taskdetails, 
            deadlineDate:               this.state.deadlineDate,
            deadlineTime:               this.state.deadlineTime,
            spendingHours:              this.state.spendingHours,
            workedOn:                   this.state.workedOn,
            isActive:                   this.state.isActive
        }
        this.props.addTask(data)
        console.log("task add",this.state)
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
                        <div className="main-title"><strong>Assign Tasks</strong></div>
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
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Assign User</label>
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
                                                          value={this.state.assignedUser}
                                                          onChange={(e) => {
                                                              this.setState({ assignedUser: e.target.value })
                                                              if (e.target.value==='')
                                                                this.filterEmp(e.target.value)}}
                                                          onSelect={ (ename, allData)   => {
                                                              this.filterEmp(allData.eid)
                                                              this.setState({
                                                                assignedUser: ename,
                                                                   userid: allData.eid 
                                                              })}}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Assign Project</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="ptitle"
                                                        value={this.state.editData.title ? this.state.editData.title : ""} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Task Name</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="title"  placeholder="Task Name"
                                                        value={this.state.title} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Task Details</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="taskdetails"  placeholder="Task Details"
                                                        value={this.state.taskdetails} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Deadline Date</label>
                                                    <div className="controls">
                                                        <input type="date" className="form-control" name="deadlineDate"
                                                        value={this.state.deadlineDate} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Deadline Time</label>
                                                    <div className="controls">
                                                        <input type="time" className="form-control" name="deadlineTime" placeholder="customer Deadline"
                                                        value={this.state.deadlineTime} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Worked On</label>
                                                    <div className="controls">
                                                        <input type="date" className="form-control" name="workedOn"
                                                        value={this.state.workedOn} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div className="form-group">
                                                    <label className="control-label">Spending Hours</label>
                                                    <div className="controls">
                                                        <input type="time" className="form-control" name="spendingHours"
                                                        value={this.state.spendingHours} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
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
        hrData2: state.CtrUser.userData.result,
        salesData: state.CtrProjectManagement.getProjectDataById && state.CtrProjectManagement.getProjectDataById.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
         getProjectDataByID: (data) => dispatch(actionCreator.getProjectActionDataById(data)),
        // getDropDownData: (data) => dispatch(actionCreator.getUsersDataAction(data)),
        // upProposalData: (data) => dispatch(actionCreator.updateProposalData(data))
        getUser: () => dispatch(actionCreator.getUsersDataAction()),
        addTask: (data) => dispatch(actionCreator.addTaskAction(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
