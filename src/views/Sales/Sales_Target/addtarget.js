import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import "../../../assets/css/Theme/Main.css";

class AddDepartment extends React.Component {
    constructor() {
        super();
        this.state = {
            employee: "",
            employeeTarget: ""
        };
    }

    componentDidMount = () => {
        this.props.getDropDownData();
    }

    handleChange = (e) => {
        this.setState ({[e.target.name]: e.target.value});
    }

    handleTargetSubmit = (e) => {
        e.preventDefault();
        const targetAdd = {
            userId: this.state.employee,
            employeeTarget: this.state.employeeTarget,
        }
        this.props.targetAdd(targetAdd);
    };

    render() {
        const userFilterData = this.props.filterUserData.result && this.props.filterUserData.result.map(employee => {
            return (
                <option value={employee.id} key={employee.id}>{employee.firstName + " " + employee.lastName}</option>
            )
        })
        return (
            <div className="mainPanel">
            <div className="page-content-inner">
                <div className="page-header">
                    <div className="main-title"><strong>Add Target</strong></div>
                    <ul className="page-top-actions">
                        <li><Link to="/sales" className="green">Back</Link></li>
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
                                                    Target Details
                                                </div>
                                                <div className="form-vertical">
                                                    <div className="row">
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Employee Name</label>
                                                                <div className="controls">
                                                                    <select className="form-control" name="employee" onChange={(e) => this.handleChange(e)}>
                                                                    <option value="">---Select Employee---</option>   
                                                                    {userFilterData}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Employee Target</label>
                                                                <div className="controls">
                                                                    <input type="number" className="form-control" name="employeeTarget" placeholder="Employee Target"
                                                                    value={this.state.employeeTarget} onChange={(e) => this.handleChange(e)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="theme-footer">
                                                <Link to="/sales" className="btn btn-gray btn-sm">Back</Link>
                                                <button type="button" onClick={this.handleTargetSubmit} className="btn btn-theme btn-sm float-right">Add</button>
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
    console.log(state.CtrSales.getDropDown)
    return {
        filterUserData: state.CtrSales.getDropDown
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        getDropDownData: (data) => dispatch(actionCreator.getSalesDropDownActionData(data)),
        targetAdd: (data) => dispatch(actionCreator.addTargetDataAction(data))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(AddDepartment);
