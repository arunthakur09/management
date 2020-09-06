import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class AddVacancy extends React.Component {
    constructor() {
        super();
        this.state = {
            jobTitle: "",
            assignedPositions: "",
            hiringManager: "",
            positions: "",
            description: "",
        };
    }

    componentDidMount = () => {
        var data = {isActive:'',dept:'HR',jobTitle:'',supervisor:'',userid:'',employeeStatus:'',firstName:'',from:'',to:'',timePeriod:'',monthly:''};
        this.props.getHr(data)
    };
    handleKra = e => {console.log('>>>>>>>>>',e)
        this.setState({
            userKra: e.blocks[0].text
        });
        console.log(e.blocks[0].text)
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            jobTitle: this.state.jobTitle,
            assignedPositions: this.state.assignedPositions,
            hiringManager: this.state.hiringManager,
            positions: this.state.positions,
            description: this.state.description,
        };
        this.props.addVacancyData(data);
    };

    render() {
        const hrData = this.props.hrData2 && this.props.hrData2.map((e,index) => {
            return (
                <option key={index} value={e.id}>{e.firstName}</option>
            )
        })
        return (
            <div className="page-content-inner mainPanel">
                <div className="page-header">
                    <div className="main-title"><strong>Add Job Vacancy</strong></div>
                    <ul className="page-top-actions">
                        <li><Link to="/vacancy" className="green">Back</Link></li>
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
                                                    Job Details
                                                </div>
                                                <div className="form-vertical">
                                                    <div className="row">
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Job Title</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="jobTitle" placeholder="Job Title"
                                                                    value={this.state.jobTitle} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Hiring Manager</label>
                                                                <div className="controls">                                                                    
                                                                <select className="form-control" name="hiringManager" value={this.state.hiringManager}
                                                                onChange={this.handleChange}>
                                                                    <option value="">---Select Hiring Manager---</option>
                                                                    {hrData}
                                                                </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">No. Of Positions</label>
                                                                <div className="controls">
                                                                    <input type="number" className="form-control" name="positions" placeholder="No. Of Positions"
                                                                    value={this.state.positions} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Assigned Positions</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="assignedPositions" placeholder="Assigned Positions"
                                                                    value={this.state.assignedPositions} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Description</label>
                                                                <div className="controls">
                                                                    {/* <Editor
                                                                toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName"
                                                                editorClassName="editorClassName" name="userKra" placeholder="Please write here..."
                                                                value={this.state.userKra} onChange={this.handleKra}/> */}
                                                                    {/* <textarea rows="4" cols="50" className="form-controlArea" name="description" placeholder="Please write here..."
                                                                    value={this.state.description} onChange={this.handleChange}></textarea> */}
                                                                    <Editor
                                                                      toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName"
                                                                      editorClassName="editorClassName" name="description" placeholder="Please write here..."
                                                                      value={this.state.description} onChange={this.handleKra}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="theme-footer">
                                                <Link to="/vacancy" className="btn btn-gray btn-sm">Back</Link>
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
        )
    }
}

const mapStateToProps = state => {
    return {
        hrData2: state.CtrUser.userData.result
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        addVacancyData: data => dispatch(actionCreator.addVacancyRequestAction(data)),
        getHr: data =>dispatch(actionCreator.getUsersDataAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVacancy);
