import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import Chart from "react-google-charts";


class SalesTarget extends React.Component {
    constructor () {
        super()
        this.state = {
            timePeriod: {status:'',from:'',to:'',userid:''}
        }
    }

    componentDidMount = () => {
        this.props.getUser()
        this.props.getSalesDataByID({
            timePeriod: '',
            outcome: '',
            userid: this.props.match.params.id,
            status: '',
            from: '',
            to: ''})
    }

    filterEmp = (val) => {
        this.setState ({
        timePeriod: {
        ...this.state.timePeriod,
        userid: val}
        }, ()=> {
            this.props.getSalesDataByID(this.state.timePeriod)

        })
    }

    filterTimePeriod = (e) => {
        this.setState ({
        timePeriod: {
        ...this.state.timePeriod,
        userid: this.props.match.params.id,
        [e.target.name] : e.target.value ? e.target.value : ""  
        },
        }, () => {
            this.props.getSalesDataByID(this.state.timePeriod)
        })
    }

    render () {
        var months = [
            'January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September',
            'October', 'November', 'December'
            ];
            var data1 = [['Yearly Graph',  'Leaves']]
            this.props.salesData && this.props.salesData.map(target => (
            data1.push([months[parseInt(target.month)-1], target.count])
        ));
        // const hrdata = this.props.hrData2 ? this.props.hrData2.map((e) => {
        //     return (
        //         {ename: e.firstName+" "+e.lastName,eid: e.id.toString()}
        //     )
        // }): [];
        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Leave record of all employees</strong></div>
                        <ul className="page-top-actions">
                            <li><Link to="/Leavemanagement/dashboard" className="green">Back</Link></li>
                        </ul>
                    </div>
                    <div className="theme-panel">
                        <div className="performance-box">
                            <div className="title">
                                <div className="action-btn">
                        <div className="title ">
                            <span><select className="form-control" name="timePeriod" onChange={this.filterTimePeriod}>
                                <option value="">All</option>
                                <option value="today" style={{display: "none"}}>Today</option>
                                <option value="weekly" style={{display: "none"}}>Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="last3months">Last 3 Months</option>
                                <option value="last6months">Last 6 Months</option>
                                <option value="1year">Yearly</option>
                                {/* <option value="yearlysalesTarget">Yearly Graph</option> */}
                            </select></span>
                        </div>
                                    {/* <div className="input-form">
                                        <select className="form-control" name="timePeriod" onChange={this.filterTimePeriod}>
                                            <option value="">All</option>
                                            <option value="today" style={{display: "none"}}>Today</option>
                                            <option value="weekly" style={{display: "none"}}>Weekly</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="last3months">Last 3 Months</option>
                                            <option value="last6months">Last 6 Months</option>
                                            <option value="1year">Yearly</option>
                                        </select>
                                        <div className="label">Employee</div>
                                        <Autocomplete 
                                        shouldItemRender={(item, value) => item.ename.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                        items={hrdata}
                                        getItemValue={(item) => item.ename} name="userid"
                                         renderItem={ (item, highlighted) => (
                                            <div 
                                              style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                                              key={ item.ename } >
                                              { item.ename }
                                            </div>
                                          )} 
                                          value={this.state.displayName}
                                          onChange={(e) => {
                                              this.setState({ displayName: e.target.value })}}
                                          onSelect={ (ename, allData)   => {
                                              this.filterEmp(allData.eid)
                                              this.setState({
                                                displayName: ename,
                                                   userid: allData.eid 
                                              })}}/>
                                    </div> */}
                                </div>
                            </div>
                            <Chart  width={'500px'}
                        height={'300px'}
                        chartType="Bar"  
                         loader={<div>Loading Chart</div>}
                        data={data1} 
                        options={{ title: 'Employee Target Performance' }}
                        rootProps={{ 'data-testid': '2' }}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    const data = state.CtrlLeave.getleaveData.yearlyleave
    return {
        salesData: data,
        hrData2: state.CtrUser.userData.result
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSalesDataByID: (data) => dispatch(actionCreator.getLeaveDataAction(data)),
        salesTargetData: (data) => dispatch(actionCreator.getSalesTargetAction(data)),
        getUser: () => dispatch(actionCreator.getUsersDataAction())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesTarget);
