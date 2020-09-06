import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";

class ShowCalculations extends React.Component {
    constructor () {
        super()
        this.state = {
            form: [],
            userId: ""
        }
    }

    componentDidMount = () => {
        this.props.getCalculationData();
        this.props.getUser()
    };

    handleChange = async e => {
        const valueAttr = e.target.value;
        const dataAttr = e.target.getAttribute("data-traitid")
        const temp = `${dataAttr},${valueAttr}|`;
        const formArr = [...this.state.form];
        formArr.push(temp);
        await this.setState({
            form: formArr
        });
    };

    handleSubmit = () => {
        const data = {
            UserResponseId: this.state.form.join(""),
            userId: this.state.userId,
            isActive: 1
        };
        this.props.saveCalculationData(data);
    };

    render () {
        const evaluations = this.props.calculationData.matrixEvaluation && this.props.calculationData.matrixEvaluation.map(evals => (
            <option key={evals.id} value={evals.id}>{evals.name}</option>
        ))

        const groupingArr = [];
        const  groupsData = this.props.calculationData.grouping;
        if (groupsData) {
            for (var key in groupsData) {
                let first = (
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div className="acc-box">
                            <div className="accordion" id="accordionExample">
                                <div className="card">
                                    <div className="accordion-btn collapsed"  data-toggle="collapse" data-target={`#${key}`} aria-expanded="true" aria-controls={key}>
                                        <span><i className="fa fa-magic"></i></span>
                                        {key} Permissions
                                    </div>
                                    <div id={key} className="collapse" aria-labelledby={key} data-parent="#accordionExample">
                                        <div className="card-body form-vertical">
                                                    {groupsData[key].map(wethics => {
                                                        return (
                                                            <div className="form-group" key={wethics.id}>
                                                                <label className="control-label">{wethics.name}</label>
                                                                <div className="controls">
                                                                    <select type="text" className="form-control"
                                                                    data-trait={wethics.name} data-traitid={wethics.id} onChange={e => this.handleChange(e)}>
                                                                        <option>Please Select</option>{evaluations}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
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
        const hrData = this.props.hrData2 && this.props.hrData2.map((e,index) => {
            return (
                <option key={index} value={e.id}>{e.firstName}</option>
            )
        });

        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>List of All Calculations</strong></div>
                        <ul className="page-top-actions">
                            <li><Link to="/evaluation" className="green">Back</Link></li>
                        </ul>
                    </div>
                    <div className="theme-panel"><div id="searchfields" className="search-fields collapse show">
                            <div className="searchfields-box">
                                <ul className="searchfields-ul">
                                    <li className="single-search-field">
                                        <div className="label">Employee</div>
                                        <select className="form-control" name="userId" onChange={ e => this.setState({userId: e.target.value})}>
                                            <option value="">All</option>
                                            {hrData}
                                        </select>
                                    </li></ul></div></div>
                                    <div className="graph">
                                <div className="row" >
                        {groupingArr.map((el, i) => {
                            return (<>{el}</>
                            )
                        })}</div>
                        </div>
                        <div className="theme-footer">
                            <Link to="/evaluation" className="btn btn-gray btn-sm">Back</Link>
                            <button type="button" onClick={e => this.handleSubmit(e)} className="btn btn-theme btn-sm float-right">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const data = state.CtrCalReducer.calculationData
    return {
        calculationData: data,
        hrData2: state.CtrUser.userData.result
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        getCalculationData: data => dispatch(actionCreator.getAddCalculation(data)),
        saveCalculationData: data => dispatch(actionCreator.saveCalculation(data)),
        getUser: () => dispatch(actionCreator.getUsersDataAction())
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ShowCalculations);
