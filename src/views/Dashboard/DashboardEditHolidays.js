import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import "../../assets/css/Theme/Main.css";

class EditHoliday extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            holiday: {}
        }
    }

    componentDidMount = () => {
        this.props.holidayById({id: this.props.match.params.id});
    }

    componentWillReceiveProps = (nextProps) => {
        const data = nextProps.addHoliday
        this.setState({
            holiday: data.length > 0 ? data[0] : {}
        })
    }

    handleChange = (e) => {
        this.setState ({
            holiday: {
            ...this.state.holiday,
            [e.target.name]: e.target.value}
        })
        console.log(this.state)
    }

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            id: this.state.holiday.id,
            name:this.state.holiday.name,
            fromDate: this.state.holiday.fromDate.slice(0, 10),
            toDate: this.state.holiday.toDate.slice(0, 10),
            isActive: this.state.holiday.isActive === true ? 1 : 0,
        };
        this.props.holidayEdit(data);
    };

    render () {
        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Edit Holiday</strong></div>
                        <ul className="page-top-actions">
                            <li><Link to="/Dashboard" className="green">Back</Link></li>
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
                                        <div className="theme-content">
                                            <div className="heading-title">Holiday Details</div>
                                                <div className="form-vertical">
                                                    <div className="row">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Holiday Name</label>
                                                                   <div className="controls">
                                                                     <input type="text" className="form-control" name="name"
                                                                        value={this.state.holiday.name ? this.state.holiday.name : "" }
                                                                        onChange={this.handleChange} disable/>
                                                                    </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="control-label">From</label>
                                                                   <div className="controls">
                                                                     <input type="date" className="form-control" name="fromDate"
                                                                        value={this.state.holiday.fromDate ? this.state.holiday.fromDate.slice(0, 10) : ""}
                                                                        onChange={this.handleChange} disable/>
                                                                    </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="control-label">To</label>
                                                                   <div className="controls">
                                                                     <input type="date" className="form-control" name="toDate"
                                                                        value={this.state.holiday.toDate ? this.state.holiday.toDate.slice(0, 10) : ""}
                                                                        onChange={this.handleChange} disable/>
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
                                    <Link to="/Dashboard" className="btn btn-gray btn-sm">Back</Link>
                                    <button type="button" onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right">Save</button>
                                    {/* <button type="button" onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right">Save</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        )
    }
}

const mapStateToProps = state => {
    console.log(state,">>>>>>>")
    const data = state.CtrlHrCandidacy.getHolidayDataById

    return {
        addHoliday:data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        holidayById: data => dispatch(actionCreator.getHolidayDataById(data)),
        holidayEdit: data => dispatch(actionCreator.editDashboardHolidayData(data))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(EditHoliday);
