import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import "../../assets/css/Theme/Main.css";
//import { toast } from "react-toastify";
//import swal from 'sweetalert';


class AddHolidays extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            name:'',
            fromDate:'',
            toDate:''
        }
    }

    handleChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            name:this.state.name,
            fromDate:this.state.fromDate,
            toDate:this.state.toDate,
        };
        this.props.addHoliday(data);
        console.log(this.state)
    };

    render () {
        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Add Holidays</strong></div>
                    </div>
                    <div className="theme-panel">
                        <div className="main-page-content">
                            <div className="theme-header">
                                <div className="right-side"></div>
                            </div>
                            <div className="page-main">
                                <div className="theme-content">
                                    <div className="form-vertical">
                                        <div className="row">
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 b-right">
                                            <div className="heading-title"> Add Holidays Details</div>
                                                <div className="align">
                                                <div className="form-group">
                                                    <label className="control-label">Holiday Name</label>
                                                    <div className="controls">
                                                        <input type="text" className="form-control" name="name" placeholder="Holiday Name"
                                                        value={this.state.holidayName}
                                                        onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">From</label>
                                                    <div className="controls">
                                                        <input type="date" className="form-control" name="fromDate" value={this.state.fromDate}
                                                        onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">To</label>
                                                    <div className="controls">
                                                        <input type="date" className="form-control" name="toDate" value={this.state.toDate}
                                                        onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="theme-footer">
                                    <Link to="/Dashboard" className="btn btn-gray btn-sm">Back</Link>
                                    <button type="button" onClick={this.handleSubmit} className="btn btn-theme btn-sm float-right">Save</button>
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
    console.log(state,">>>>>>>>>>>>>>>")
    //const deptData = state.CtrUser.userDepartData
    return {
      //  deptDatas: deptData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addHoliday: (data) => dispatch(actionCreator.addHolidayAction(data)),

    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(AddHolidays);
