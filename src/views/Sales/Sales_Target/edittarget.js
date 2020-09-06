import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import "../../../assets/css/Theme/Main.css";

class EditDepartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tarGetData: {},
        };
    }

    componentDidMount = () => {
        this.props.targetById({id: this.props.match.params.id});
        this.props.getDropDownData();
    };

    componentWillReceiveProps = (nextProps) => {
        const data = nextProps.targetData.data.map(data => data)
        this.setState({
            tarGetData: data.length > 0 ? data[0] : {}
        })
    }

    handleChange = e => {
        this.setState({
            tarGetData: {
                ...this.state.tarGetData,
                [e.target.name]: e.target.value
            }
        });
    };
    
    handleDepartmentSubmit = e => {
        e.preventDefault();
        const targetEdit = {
            id: this.state.tarGetData.id,
            userId: this.state.tarGetData.userId,
            employeeTarget: this.state.tarGetData.employeeTarget,
        };
        this.props.targetEdit(targetEdit);
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
                        <div className="main-title"><strong>Edit Target</strong></div>
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
                                                                    <select className="form-control" name="employee" value={this.state.tarGetData.userId} onChange={(e) => this.handleChange(e)} disabled="enabled">
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
                                                                        <input type="text" className="form-control" name="employeeTarget"
                                                                        value={this.state.tarGetData.employeeTarget ? this.state.tarGetData.employeeTarget : ""} onChange={e => this.handleChange(e)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="theme-footer">
                                                    <Link to="/sales" className="btn btn-gray btn-sm">Back</Link>
                                                    <button type="button" onClick={this.handleDepartmentSubmit} className="btn btn-theme btn-sm float-right">Save</button>
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
    const data = state.CtrSalesTarget.getTargetDataById
    return {
        targetData: data,
        filterUserData: state.CtrSales.getDropDown
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        getDropDownData: (data) => dispatch(actionCreator.getSalesDropDownActionData(data)),
        targetById: (data) => dispatch(actionCreator.getTargetDataIdAction(data)),
        targetEdit: data => dispatch(actionCreator.editTargetDataAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDepartment);
