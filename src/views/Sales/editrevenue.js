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
            revData: {},
            week: "week1",
            hours: "",
            hourlyRate: "",
            fromTo: "",
            milestone:""
        };
    }

    componentDidMount = () => {
        this.props.revDataById({id: this.props.match.params.id});
        this.props.getUsersData();
    };

    componentWillReceiveProps = (nextProps) => {
        const byIdUser = nextProps.revIdData.data && nextProps.revIdData.data.map(data => (data))
        this.setState({
            revData: byIdUser && byIdUser.length > 0 ? byIdUser[0] : {},
        })
    }

    handleChange = (e) => {
        this.setState ({
            revData: {
            ...this.state.revData,
            [e.target.name]: e.target.value}
        })
    }

    handleChange1 = (e) =>{
        this.setState ({
                [e.target.name]:e.target.value
            
        })
    }

    handleCal = range => {
        this.setState({
            fromTo: moment(range.startDate._d).format("YYYY-MM-DD") +"|"+ moment(range.endDate._d).format("YYYY-MM-DD")
        });
    };

    handleChange1 = (e, name) => {
        console.log(this.state);
        // if(name === 'week'){
        //     this.setState({
        //         [e.target.name]: e.target.value,
        //     });
        // } else{
        //     const { revData } = this.state;
        //     revData[name] = e.target.value;
        //     this.setState({
        //         revData
        //     });
        // }
        this.setState({
                    [e.target.name]: e.target.value,
                });
                console.log(this.state);
    };

    handleSubmit = e => {
        e.preventDefault();
        var hourlyRate = this.state.hourlyRate ? this.state.hourlyRate : this.state.revData.hourlyRate;
        var hours = this.state.hours ? this.state.hours : this.state.revData.hours;
        var val = hourlyRate+"|"+hours+"|"+hours*hourlyRate ;
        const data = {
            id: this.state.revData.id,
            resource: this.state.revData.resourceId,
            clientName: this.state.revData.clientName,
            upworkId: this.state.revData.upworkId,
            hourlyRate: this.state.hourlyRate ? this.state.hourlyRate : this.state.revData.hourlyRate,
            hours: this.state.hours ? this.state.hours : this.state.revData.hours,
            weeklyRevenue: this.state.revData.weeklyRevenue,
            month: this.state.revData.month,
            week1: this.state.revData.week1 ? this.state.revData.week1 : "",
            week2: this.state.revData.week2 ? this.state.revData.week2 : "",
            week3: this.state.revData.week3 ? this.state.revData.week3 : "",
            week4: this.state.revData.week4 ? this.state.revData.week4 : "",
            week5: this.state.revData.week5 ? this.state.revData.week5 : "",
            week: this.state.week,
            actualRevenue: this.state.revData.actualRevenue,
            projectType: this.state.revData.projectType,
            val: val,
            fromTo: this.state.fromTo==='' ? this.state.revData.fromTo : this.state.revData.fromTo+","+this.state.fromTo,
            milestone: this.state.milestone==="" ? this.state.revData.milestone : this.state.revData.milestone+"|"+this.state.milestone,
        };
        this.props.editRevData(data);
        console.log(data)
    };

    render() {
        const selectUser = this.props.usersData && this.props.usersData.map(users => (
            <option key={users.id} value={users.userId}>
                {users.firstName}
            </option>
        ));
        const week = this.state.revData[this.state.week] ? this.state.revData[this.state.week].split("|") : [];
        const week1 = this.state.revData.week1 && this.state.revData.week1.split("|") 
        const week2 = this.state.revData.week2 && this.state.revData.week2.split("|")
        const week3 = this.state.revData.week3 && this.state.revData.week3.split("|")
        const week4 = this.state.revData.week4 && this.state.revData.week4.split("|")
        const week5 = this.state.revData.week5 && this.state.revData.week5.split("|")
        return (
            <div className="mainPanel">
            <div className="page-content-inner">
                <div className="page-header">
                    <div className="main-title"><strong>Edit Revenue Report</strong></div>
                    <ul className="page-top-actions">
                        <li><Link to="/revenue" className="green">Back</Link></li>
                    </ul>
                </div>
                <div className="theme-panel">
                    <div className="main-page-content">
                        <div className="page-main">
                            <div className="row">
                                <div >
                                    <div className="tab-content b_l" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <div className="theme-content">
                                                <div className="heading-title">
                                                Revenue Details
                                                </div>
                                                <div className="form-vertical">
                                                    <div className="row">
                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 b-right">
                                                        <div className="row">  
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                                            <div className="form-group">
                                                                <label className="control-label">Resource</label>
                                                                <div className="controls">
                                                                    {/* <input type="text" className="form-control" name="resource" placeholder="resource Name"
                                                                    value={this.state.resource} onChange={this.handleChange} /> */}
                                                                    <select className="form-control" name="resource" disabled = "enabled"
                                                                    value={this.state.revData.firstName} onChange={this.handleChange} >
                                                                        <option value="">---Select Resource---</option>
                                                                        {selectUser}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12
                                                           2 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Client Name</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="clientName" disabled = "enabled" placeholder="client Name"
                                                                    value={this.state.revData.clientName} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>	
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12
                                                           2 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Upwork ID</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" disabled = "enabled" name="upworkid" placeholder="upworkid"
                                                                    value={this.state.revData.upworkId} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {this.state.revData.projectType && (this.state.revData.projectType).toUpperCase()==="HOURLY" ?
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12
                                                          2 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Weekly Revenue</label>
                                                                <div className="controls">
                                                                    <input type="number" className="form-control" name="weeklyRevenue" disabled = "enabled" placeholder="weeklyRevenue"
                                                                    value={this.state.revData.weeklyRevenue} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>:null}
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12
                                                            2 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Month</label>
                                                                <div className="controls">
                                                                    <select className="form-control" name="month"
                                                                    value={this.state.revData.month} onChange={this.handleChange} disabled = "enabled">
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
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Project Type</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="projectType" placeholder="projectType"
                                                                    value={this.state.revData.projectType} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div></div></div>   
                                                        {this.state.revData.projectType && (this.state.revData.projectType).toUpperCase()==="HOURLY" ? <>                                                   
                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                            <div className="row b_padding">
                                                        <br/><div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Week</label>
                                                                <div className="controls">
                                                                    <select className="form-control" name="week"
                                                                    onChange={(e) =>this.handleChange1(e, 'week')}>
                                                                        {/* <option value="">Please Select Week</option> */}
                                                                        <option value="week1">Week1</option>
                                                                        <option value="week2">Week2</option>
                                                                        <option value="week3">Week3</option>
                                                                        <option value="week4">Week4</option>
                                                                        <option value="week5">Week5</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Hourly Rate</label>
                                                                <div className="controls">
                                                                    <input type="number" className="form-control" name="hourlyRate" placeholder="hourlyRate"
                                                                    value={this.state.hourlyRate==="" ? week[0] : this.state.hourlyRate} onChange={this.handleChange1} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Weekly Hours</label>
                                                                <div className="controls">
                                                                    <input type="number" className="form-control" name="hours" placeholder="hours-billed"
                                                                    value={this.state.hours==="" ? week[1] : this.state.hours} onChange={this.handleChange1} />
                                                                </div>
                                                            </div>
                                                        </div><br/>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Project Type</label>
                                                                <div className="controls">
                                                                    <input type="text" className="form-control" name="projectType" placeholder="projectType"
                                                                    value={this.state.revData.projectType} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div><br />
                                                        </div>
                                                        </div>
                                                        <div class="table-overflow">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">< br/>
                                                        <table className="table table-bordered table-nowhite-space table-shadows">
                                                        <tr style={{textAlign:"center"}}>
                                                            <th></th>
                                                            <th>Week1</th>
                                                            <th>Week2</th>
                                                            <th>Week3</th>
                                                            <th>Week4</th>
                                                            <th>Week5</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Hourly Rate</th>
                                                                <td>${week1 && week1[0]}</td>
                                                                <td>${week2 && week2[0]}</td>
                                                                <td>${week3 && week3[0]}</td>
                                                                <td>${week4 && week4[0]}</td>
                                                                <td>${week5 && week5[0]}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Hours Billed</th>
                                                                <td>{week1 && week1[1]} Hrs</td>
                                                                <td>{week2 && week2[1]} Hrs</td>
                                                                <td>{week3 && week3[1]} Hrs</td>
                                                                <td>{week4 && week4[1]} Hrs</td>
                                                                <td>{week5 && week5[1]} Hrs</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Revenue Per Week</th>
                                                                <td>${week1 && week1[2]}</td>
                                                                <td>${week2 && week2[2]}</td>
                                                                <td>${week3 && week3[2]}</td>
                                                                <td>${week4 && week4[2]}</td>
                                                                <td>${week5 && week5[2]}</td>
                                                        </tr>
                                                        </table></div></div></>:
                                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className="form-group">
                                                            <label className="control-label">Milestone Date Range</label>
                                                            <div className="controls">
                                                                <DateRange value={this.state.fromTo} onChange={this.handleCal}/>
                                                            </div>
                                                        </div></div>
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <div className="form-group">
                                                                <label className="control-label">Milestone Amount Paid</label>
                                                                <div className="controls">
                                                                    <input type="number" className="form-control" name="milestone" placeholder="Milestone Amount Paid"
                                                                    value={this.state.milestone} onChange={this.handleChange1} />
                                                                </div>
                                                            </div>
                                                        </div></div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="theme-footer">
                                                <Link to="/revenue" className="btn btn-gray btn-sm">Back</Link>
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
    const revdataById = state.CtrRevenue.getRevDataById
    const data = state.CtrUser.userData.result
    return {
        revIdData: revdataById,
        usersData: data
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        getUsersData: () => dispatch(actionCreator.getUsersDataAction()),
        revDataById: (data) => dispatch(actionCreator.getRevenueDataIdAction(data)),
        editRevData: (data) => dispatch(actionCreator.editRevenueDataAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Revreport);
