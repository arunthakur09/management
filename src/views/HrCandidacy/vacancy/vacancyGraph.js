import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import Chart from "react-google-charts";


class GraphView extends React.Component {
    constructor () {
        super ()
        this.state = {
            vacancyData: {},
            timePeriod: {
                id: '',
                from: '',
                to: ''
            }
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const vacancyData = nextProps.vacancyData.data && nextProps.vacancyData.data.map(val => val)
        if (vacancyData) {
            this.setState({
                vacancyData: vacancyData.length > 0 ? vacancyData[0] : {}
            })
        }
    }
    
    componentDidMount = () => {
        this.props.vacancyById({id: this.props.match.params.id,from:"",to:""});
    };

    filterTimePeriod = (e) => {
        const { timePeriod } = this.state
        timePeriod[e.target.name] = e.target.value ? e.target.value : "";
        timePeriod['id'] = this.props.vacancyData.data[0].id
        this.setState({
            timePeriod
        }, () => {
            this.props.vacancyById(timePeriod)
        })
    }

    render () {
        const targetData = this.props.vacancyData.data
        return (
            <div>
                <div className="theme-panel">
                    <div className="performance-box">
                        <div className="page-header">
                            <div className="main-title"><strong>{this.state.vacancyData.fullName}'s Performance</strong></div>
                            <ul className="page-top-actions">
                                <li><Link to="/vacancy/target" className="green">Back</Link></li>
                            </ul>
                        </div>
                        
                        <div className="input-form">
                        <ul style={{display:"inline-flex"}}>
                            <li className="single-search-field"style={{marginRight:"13px"}}>
                                    <div className="label">From Date</div>
                                    <input type="date" name='from' onChange={this.filterTimePeriod}/>
                            </li>
                            <li className="single-search-field">
                                <div className="label">To Date</div>
                                <input type="date" name='to' onChange={this.filterTimePeriod}/>
                            </li>
                        </ul>
                        </div>
                        {targetData && targetData.map((target,index) => {
                            return (                                
                                <div className="performance-details" key={index}>
                                    <Chart style={{marginLeft: "20%"}} width={'500px'}
                                        height={'300px'} chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Performance', 'Employee Performance'],
                                            ['Filled Vacancies', parseInt(target.Selected)],
                                            ['Remaining Positions', parseInt(target.positions)-parseInt(target.Selected)],
                                        ]}
                                        options={{ title: 'Employee Target Performance', vAxis: {
                                            viewWindowMode:'explicit',
                                            viewWindow: {
                                              max:4000,
                                              min:500
                                            }
                                        }, }}
                                        rootProps={{ 'data-testid': '2' }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="theme-panel">
                    <div className="performance-box">
                        {/* <div className="title">Sales Targets</div> */}
                    <div className="performance-details">
                    <div className="employee-progress">
                        <div className="title">Employee Progress</div>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{width: `${(this.state.vacancyData.Selected * 100)/this.state.vacancyData.positions}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{((this.state.vacancyData.Selected * 100)/this.state.vacancyData.positions).toFixed(0)}%</div>
                        </div>
                    </div>
                            <div className="work-senario">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="work-target-box green">
                                            <img src="themes/images/progress-icon1.png" alt="icon1" />
                                            <div className="title">Filled Vacancies</div>
                                            <div className="count green">{this.state.vacancyData.Selected}</div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="work-target-box darkblue">
                                            <img src="themes/images/progress-icon2.png" alt="icon2" />
                                            <div className="title">Remaining Vacancies</div>
                                            <div className="count darkblue">{parseInt(this.state.vacancyData.positions)-parseInt(this.state.vacancyData.Selected)}</div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="work-target-box purple">
                                            <img src="themes/images/progress-icon3.png" alt="icon3" />
                                            <div className="title">Total Vacancies</div>
                                            <div className="count purple">{this.state.vacancyData.positions}</div>
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
        vacancyData: state.CtrVacancy.hrTargetDataById,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        vacancyById: data => dispatch(actionCreator.getVacancyTargetAction(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphView);
