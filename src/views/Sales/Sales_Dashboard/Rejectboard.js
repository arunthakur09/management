import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../Redux/Actions/ActionTypes/index";
import Chart from "react-google-charts";
import StarRatings from 'react-star-ratings';

class Board extends React.Component {
    constructor () {
        super ()
        this.state = {
            timePeriodStep: 1,
            filterBy: {
                employee: "",
                source: "",
                limit: "",
                page: "",
                timeSlot: "today",
                status: "reject",
                monthly:"",
                from:'',
                to: (new Date()).toISOString().split('T')[0],
            },
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const salesDatas = nextProps.salesDropDown.result;
        const salesData = nextProps.salesData.data && nextProps.salesData.data.map(val => val)
        if (salesData) {
            this.setState({
                filterUserData: salesDatas,
                salesData: salesData.length > 0 ? salesData[0] : {}
            })
        }
    }
    componentDidUpdate = () => {
        window.jQuery('.selectpicker').selectpicker('refresh');
    }
    componentDidMount = () => {
        this.props.getDropDownData();
        this.props.SalesData({status:"reject",add:true,clientName:""});
    };

    employeeSelect = (e, status) => {
        const { filterBy } = this.state;
        filterBy[e.target.name] = status ? status : e.target.value;
        this.setState({
            filterBy,
            filterState:true
        },
        // () => {
        //     this.props.SalesData({...filterBy});
        // }
        )
    }

    followProposal = () => {
        let path = `/leadsboard`;
        this.props.history.push(path);
    }

    closedProposal = () => {
        let path = `/dealsboard`;
        this.props.history.push(path);
    }
    timePeriod = (e) => {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        })
    }
    reset = () => {
        this.setState({
            displayName:''
        })
        this.setState ({
        filterBy: {
        ...this.state.filterBy,
        employee: "",
        timeSlot: "today",
        source: "",
        status: "reject",
        from: '',
        to: ''}
        },
        ()=> {this.props.SalesData(this.state.filterBy)}
        )
    }
    render() {
        const userFilterData = this.state.filterUserData && this.state.filterUserData.map(employee => {
        return (
            <option value={employee.id} key={employee.id}>{employee.firstName + " " + employee.lastName}</option>
        )
        })
        let freelancer,upwork,transport,logistic,ecommerce,informative,LinkedIn,Hospital,Financial,IT,Retail
        freelancer = upwork = LinkedIn = transport = logistic = ecommerce = informative = Hospital = Financial = IT = Retail = 0

        this.props.salesData.proposalCount && this.props.salesData.proposalCount.map(el => {
            return(
                el.portal.includes("freelancer") ? freelancer+=1 : 
                el.portal.includes("LinkedIn") ? LinkedIn+=1 : upwork+=1
            )
        })
        this.props.salesData.proposalCount && this.props.salesData.proposalCount.map(el => {
            return(
                el.domain.includes("Transport")   ? transport+=1 : 
                el.domain.includes("Logistic")    ? logistic+=1  :
                el.domain.includes("Ecommerce")   ? ecommerce+=1 :
                el.domain.includes("Hospital")    ? Hospital+=1  : 
                el.domain.includes("Financial")   ? Financial+=1 : 
                el.domain.includes("IT")          ? IT+=1        :
                el.domain.includes("Retail")      ? Retail+=1    : informative+=1
            )
        })
        const TotalProposals = this.props.salesData.tableRecords && this.props.salesData.tableRecords.count.reduce((total,el) => total +=el.count,0)
            
        return (
            <div className="mainPanel">
                <div className="theme-panel">
                    
                <div className="prosess-tab">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.followProposal}>Leads</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.closedProposal}>Deals</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link active" onClick={this.rejectedProposal}>Reject</button>
                                </li>
                            </ul>
                        </div>
                    <div id="searchfields" className="search-fields collapse show">
                            <div className="searchfields-box">
                                <ul className="searchfields-ul custom">
                                    {localStorage.getItem('roleId')==='3' && localStorage.getItem('userRole')!=='7' ? null :
                                    <li className="single-search-field">
                                        <form className="filters">
                                        <div className="label">Employe Name</div>
                                        <select className="selectpicker" name="employee" onChange={this.employeeSelect}>
                                            <option value="">All</option>
                                            {userFilterData}
                                        </select>
                                        </form>
                                    </li>}
                                    <li className="single-search-field single" style={{textAlign:"left"}}>
                                        <div className="label">Time Period Filters</div>
                                        {/* <select className="form-control" name="timePeriodStep" onChange={this.timePeriod}
                                        value={this.state.timePeriodStep} style={{width:'101%'}}>
                                            <option value="0">Please Select Time Period</option>
                                            <option value="2">Custom Time Period</option>
                                            <option value="1">Dropdown Time Period</option>
                                        </select> */}
                                        <li className="single-search-field custom-control custom-radio">
                                            <input type="radio" className="custom-control-input" id="customRadio" name="timePeriodStep" 
                                                value={2} 
                                                checked={this.state.timePeriodStep === 2} 
                                                onChange={this.timePeriod} />
                                            <label class="custom-control-label" for="customRadio">
                                                Custom
                                            </label>
                                        </li>
                                         <li className="single-search-field custom-control custom-radio">
                                            <input type="radio" className="custom-control-input" id="customRadio2" name="timePeriodStep"  
                                            value={1} 
                                            checked={this.state.timePeriodStep === 1} 
                                            onChange={this.timePeriod} />
                                            <label class="custom-control-label" for="customRadio2">Standard</label>
                                        </li>
                                    </li>
                                    {this.state.timePeriodStep=== 2  ?
                                    <><li className="single-search-field">
                                        <form className="filters">
                                        <div className="label">From Date</div>
                                        <input type="date" name='from' value={this.state.filterBy.from} onChange={this.employeeSelect}/>
                                        </form>
                                    </li>
                                    <li className="single-search-field">
                                    <form className="filters">
                                        <div className="label">To Date</div>
                                        <input type="date" name='to'  value={this.state.filterBy.to} onChange={this.employeeSelect}/>
                                    </form>                                    
                                    </li></>:null}
                                    {this.state.timePeriodStep=== 1  ? 
                                    <li className="single-search-field">
                                        <form className="filters">
                                        <div className="label">Time Period</div>
                                        <select className="selectpicker" name="timeSlot" onChange={this.employeeSelect}
                                         value={this.state.filterBy.timeSlot}>
                                        <option value="">All</option>
                                        <option value="today">Today</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="last3months">Last 3 Months</option>
                                        <option value="last6months">Last 6 Months</option>
                                        <option value="1year">Yearly</option>
                                        {/* <option value="yearlysalesTarget">Yearly Graph</option> */}
                                    </select>
                                    </form>
                                    </li>:null}
                                    {this.state.filterBy.timeSlot==="monthly" ?
                                    <li className="single-search-field">
                                        <form className="filters">
                                        <div className="label">Month</div>
                                        <select className="selectpicker" name="monthly" onChange={this.employeeSelect}
                                        value={this.state.filterBy.monthly}>
                                            <option value="">Select Month</option>
                                            <option value="1">January</option>
                                            <option value="2">Febuary</option>
                                            <option value="3">March</option>
                                            <option value="4">April</option>
                                            <option value="5">May</option>
                                            <option value="6">June</option>
                                            <option value="7">July</option>
                                            <option value="8">August</option>
                                            <option value="9">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12">December</option>
                                            {/* <option value="yearlysalesTarget">Yearly Graph</option> */}
                                        </select>
                                    </form>
                                    </li>:null
                                    }
                                    {/* <li className="single-search-field">
                                        <div className="label">Month / Year</div>
                                        <select className="form-control" name="timeSlot" onChange={this.employeeSelect}>                                            
                                            <option value="">All</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="last3months">Last 3 Months</option>
                                            <option value="last6months">Last 6 Months</option>
                                            <option value="yearly">Yearly</option>
                                        </select>
                                    </li> */}
                                </ul>
                                <ul className="searchfields-ul">
                                    <li><button className="btn-submit" style={{background:"#4ac103"}} onClick={()=> {this.props.SalesData(this.state.filterBy)}}>Submit</button>
                                    <button className="btn-submit" style={{background:"#6c757d"}} onClick={()=> {this.reset()}}>Reset</button></li>
                                </ul>
                            </div>
                        </div>
                        <div className="graph">
                        <div className="row"><div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 b-right">
                                    <h3 style={{}}><b>Rejects By Portal</b></h3>
                                    <Chart style={{marginLeft: "5%",marginTop: "3%",float:"left"}} width={'500px'}
                                        height={'300px'} chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Performance', 'Employee Performance'],
                                            ['Freelancer', freelancer],
                                            ['Upwork', upwork],
                                            ['LinkedIn', LinkedIn]
                                        ]}
                                        options={{
                                            pieHole: 0.4,
                                            is3D: false
                                        , }}
                                        rootProps={{ 'data-testid': '2' }}
                                    /></div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 b-right">
                                    <h3 style={{}}><b>Rejects By Domain</b></h3>
                                    <Chart style={{marginRight: "5%",marginTop: "3%",float:"right"}} width={'500px'}
                                        height={'300px'} chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Performance', 'Employee Performance'],
                                            ['Transport', transport],
                                            ['Logistic', logistic],
                                            ['Ecommerce',ecommerce],
                                            ['Informative',informative],
                                            ['Hospital',Hospital],
                                            ['IT',IT],
                                            ['Financial',Financial],
                                            ['Retail',Retail],
                                        ]}
                                        options={{
                                            pieHole: 0.4,
                                            is3D: false
                                        , }}
                                        rootProps={{ 'data-testid': '2' }}
                                    /></div></div>
                                    <div className="graph-box">
                                        <div className="row"><br />
                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                            <div className="lead-box">
                                                <span ><strong>Total Proposals: <br /></strong><span style={{fontSize:"39px"}}>{TotalProposals}</span></span>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                            <div className="lead-box">
                                                <span ><strong>Rejects:<br /></strong><span style={{fontSize:"39px"}}>{this.props.salesData.proposalCount && this.props.salesData.proposalCount.length}</span></span>
                                            </div>
                                        </div>
                                        {this.props.salesData.id && this.props.salesData.id ?
                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                            <div className="lead-box">
                                            <strong>
                                                Average Rating <br />
                                                <span style={{fontSize:"25px",color:"green"}}>{this.props.salesData && (this.props.salesData.Rating.average).toFixed(1)}</span>
                                                <span><br /><StarRatings
                                                rating={this.props.salesData && this.props.salesData.Rating.average}
                                                starDimension="13px"
                                                starSpacing="3px"
                                                /></span>
                                            </strong>
                                            </div>
                                        </div>:null}
                                        </div>
                                    </div>
                                    </div>
            </div></div>
        )
    }
}

const mapStateToProps = state => {
    const dropDown = state.CtrSales.getDropDown
    return {
        salesData: state.CtrSales.getData,
        salesDropDown: dropDown,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDropDownData: (data) => dispatch(actionCreator.getSalesDropDownActionData(data)),
        SalesData: (data) => dispatch(actionCreator.getSalesActionData(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
