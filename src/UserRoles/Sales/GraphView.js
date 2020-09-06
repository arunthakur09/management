import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import Chart from "react-google-charts";


class GraphView extends React.Component {
    constructor () {
        super ()
        this.state = {
            salesData: {},
            timePeriod: {}
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const salesData = nextProps.salesData.data && nextProps.salesData.data.map(val => val)
        if (salesData) {
            this.setState({
                salesData: salesData.length > 0 ? salesData[0] : {}
            })
        }
    }
    
    componentDidMount = () => {
        this.props.salesTargetDataByID({ userId: localStorage.getItem("userRole") });
    };

    filterTimePeriod = (e) => {
        const { timePeriod } = this.state
        timePeriod[e.target.name] = e.target.value ? e.target.value : ""
        this.setState({
            timePeriod
        }, () => {
            this.props.salesTargetDataByID({userId: localStorage.getItem("userRole"), timePeriod})
        })
    }

    render () {
        const targetData = this.props.salesData.data
        var months = [
            'January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September',
            'October', 'November', 'December'
            ];
            var data1 = [['Yearly Graph',  'Achieved Target', 'Pending Target', 'Total Target']]
            this.props.salesData.data && this.props.salesData.data.map(target => (
            data1.push([months[parseInt(target.month)-1], target.Revenue, target.pending, target.employeeTarget])
        ));
        return (
            <div>
                <div className="theme-panel">
                    <div className="performance-box">
                        <div className="page-header">
                            <div className="main-title"><strong>{this.state.salesData.EmployeeName} Performance</strong></div>
                            <ul className="page-top-actions">
                                <li><Link to="/user/proposal" className="green">Back</Link></li>
                            </ul>
                        </div>
                        <div className="title">
                            Performance Chart
                            <span><select className="form-control" name="timePeriod" onChange={this.filterTimePeriod}>
                                <option value="">All</option>
                                <option value="today" style={{display: "none"}}>Today</option>
                                <option value="weekly" style={{display: "none"}}>Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="last3months">Last 3 Months</option>
                                <option value="last6months">Last 6 Months</option>
                                <option value="1year">Yearly</option>
                                <option value="yearlysalesTarget">Yearly Graph</option>
                            </select></span>
                        </div>
                        {targetData && targetData.map((target,index) => {
                            return (
                                <div>
                                {target && target.month ?
                        <div className="performance-details" key={target.userId}>
                            {/* {months[parseInt(target.month)-1]} */}
                            {index<1 ? 
                        <Chart  width={'500px'}
                        height={'300px'}
                        chartType="Bar"  
                         loader={<div>Loading Chart</div>}
                        data={data1} 
                        options={{ title: 'Employee Target Performance' }}
                        rootProps={{ 'data-testid': '2' }}/>:null}
                        </div>
                        :
                                <div className="performance-details" key={target.userId}>
                                    <Chart style={{marginLeft: "20%"}} width={'500px'}
                                        height={'300px'} chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Performance', 'Employee Performance'],
                                            ['Achieve Target', target.Revenue],
                                            ['Pending Target', target.pending],
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
                                }</div>
                            )
                        })}
                    </div>
                </div>
                <div className="theme-panel">
                    <div className="performance-box">
                    {this.props.salesData.length>0 && this.props.salesData.data && this.props.salesData.data[0].month ? null:
                        <div className="title">Sales Targets</div>}
                    <div className="performance-details">
                        {this.props.salesData.length>0 && this.props.salesData.data && this.props.salesData.data[0].month ? null:
                    <div className="employee-progress">
                        <div className="title">Employee Progress</div>
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{width: `${(this.state.salesData.Revenue * 100)/this.state.salesData.employeeTarget}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{((this.state.salesData.Revenue * 100)/this.state.salesData.employeeTarget).toFixed(0)}%</div>
                        </div>
                    </div>
                    }
                    {this.props.salesData.data && this.props.salesData.data[0].employeeTarget ? null :
                            <div className="work-senario">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="work-target-box green">
                                            <img src="themes/images/progress-icon1.png" alt="icon1" />
                                            <div className="title">Completed</div>
                                            <div className="count green">{this.state.salesData.Revenue}</div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="work-target-box darkblue">
                                            <img src="themes/images/progress-icon2.png" alt="icon2" />
                                            <div className="title">Remaining</div>
                                            <div className="count darkblue">{this.state.salesData.pending}</div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                                        <div className="work-target-box purple">
                                            <img src="themes/images/progress-icon3.png" alt="icon3" />
                                            <div className="title">Total Target</div>
                                            <div className="count purple">{this.state.salesData.employeeTarget}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.CtrSales.salesTargetDataById)
    return {
        salesData: state.CtrSales.salesTargetDataById,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        salesTargetDataByID: (data) => dispatch(actionCreator.getSalesTargetByIdAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphView);
