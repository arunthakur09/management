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
        let data={month:"",projectType:"Hourly",from:'',to:'',timePeriod:''}
        this.props.getRevData(data);
    };

    filterTimePeriod = (e) => {
        const { timePeriod } = this.state
        timePeriod[e.target.name] = e.target.value ? e.target.value : ""
        this.setState({
            timePeriod
        }, () => {
            this.props.salesTargetDataByID({userId: this.props.match.params.id, timePeriod})
        })
    }

    render () {
        const targetData = this.props.salesData
        var months = [
            'January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September',
            'October', 'November', 'December'
            ];
            var data1 = [['Yearly Graph',  'Achieved Target', 'Pending Target', 'Total Target'],['',0,0,0]]
            this.props.salesData && this.props.salesData.map(target => (
            data1.push([months[parseInt(target.month)-1], target.Revenue, target.pending, target.employeeTarget])
        ));
        return (
            <div>
                <div className="theme-panel">
                    <div className="performance-box">
                        <div className="page-header">
                            <div className="main-title"><strong>{this.state.salesData.EmployeeName} Performance</strong></div>
                            <ul className="page-top-actions">
                                <li><Link to="/proposal/target" className="green">Back</Link></li>
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
                        <div className="performance-details" key={target.userId}>
                            {/* {months[parseInt(target.month)-1]} */}
                            {index<1 ? 
                        <Chart  width={'500px'}
                        height={'300px'}
                        chartType="LineChart"  
                         loader={<div>Loading Chart</div>}
                        data={data1} 
                        options={{
                          hAxis: {
                            title: 'Month',
                          },
                          vAxis: {
                            title: 'Revenue',
                          },
                          series: {
                            1: { curveType: 'function' },
                          },
                        }}
                        rootProps={{ 'data-testid': '2' }}/>:null}
                        </div>
                        </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.CtrRevenue.revData && state.CtrRevenue.revData.yearlyRevenues)
    return {
        salesData: state.CtrRevenue.revData && state.CtrRevenue.revData.yearlyRevenues,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRevData: (data) => dispatch(actionCreator.getRevenueDataAction(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphView);
