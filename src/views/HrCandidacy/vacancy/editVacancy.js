import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import "../../../assets/css/Theme/Main.css";

class EditVacancy extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            candidate: {},
        }
    }

    componentDidMount = () => {
        this.props.vacancyById({id: this.props.match.params.id});
    }

    componentWillReceiveProps = (nextProps) => {
        const data = nextProps.vacancyData
        this.setState({
            candidate: data.length > 0 ? data[0] : {},
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

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            id: this.state.candidate.id,
            assignedPositions: this.state.candidate.assignedPositions,
            jobTitle: this.state.candidate.jobTitle,
            positions: this.state.candidate.positions,
            description: this.state.candidate.description,
            hiringManager: this.state.candidate.hiringManager,
            targetMet: this.state.candidate.targetMet,
            isActive: this.state.candidate.isActive  === true ? 1 : 0
        };
        this.props.vacancyEdit(data);
    };

    render () {
        return (
            <div className="mainPanel">
                <div className="page-content-inner ">
                    <div className="page-header">
                        <div className="main-title"><strong>Edit Job Vacancy</strong></div>
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
                                                <div className="theme-content">
                                                    <div className="form-vertical">
                                                        <div className="row">
                                                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 b-right">
                                                            <div className="heading-title">Personal Details</div>
                                                                <div className="row">
                                                                    <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                                                                        <div className="form-group">
                                                                            <label className="control-label">Job Title</label>
                                                                            <div className="controls">
                                                                                <input type="text" className="form-control" name="jobTitle"
                                                                                value={this.state.candidate.jobTitle ? this.state.candidate.jobTitle : "" }
                                                                                onChange={this.handleChange} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                                                                        <div className="form-group">
                                                                            <label className="control-label">Target Met</label>
                                                                            <div className="controls">
                                                                                <input type="text" className="form-control" name="targetMet"
                                                                                value={this.state.candidate.targetMet ? this.state.candidate.targetMet : "" }
                                                                                onChange={this.handleChange} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                                                                        <div className="form-group">
                                                                            <label className="control-label">Hiring Manager</label>
                                                                            <div className="controls">
                                                                                <input type="number" className="form-control" name="hiringManager"
                                                                                value={this.state.candidate.hiringManager ? this.state.candidate.hiringManager : ""}
                                                                                onChange={this.handleChange} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                                                                        <div className="form-group">
                                                                            <label className="control-label">No. of Vacancies</label>
                                                                            <div className="controls">
                                                                                <input type="text" className="form-control" name="positions"
                                                                                value={this.state.candidate.positions ? this.state.candidate.positions : "" }
                                                                                onChange={this.handleChange} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">   
                                                                        <div className="form-group">
                                                                            <label className="control-label">Description</label>
                                                                            <div className="controls">
                                                                                <textarea rows="4" cols="50" className="form-controlArea" name="description"
                                                                                value={this.state.candidate.description ? this.state.candidate.description : ""}
                                                                                onChange={this.handleChange}></textarea>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                                                                        <div className="form-group">
                                                                            <label className="control-label">Assigned Positions</label>
                                                                            <div className="controls">
                                                                                <input type="text" className="form-control" name="assignedPositions"
                                                                                value={this.state.candidate.assignedPositions ? this.state.candidate.assignedPositions : "" }
                                                                                onChange={this.handleChange} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="theme-footer">
                                    <Link to="/vacancy" className="btn btn-gray btn-sm">Back</Link>
                                    <button type="button" onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right btn-save2">Save</button>
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
       vacancyData: state.CtrVacancy.getvacancyDatabyId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        vacancyById: data => dispatch(actionCreator.getVacancyDataById(data)),
        vacancyEdit: data => dispatch(actionCreator.editVacancydata(data))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(EditVacancy);
