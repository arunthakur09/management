import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../Redux/Actions/ActionTypes/index";
import Chart from "react-google-charts";

class Board extends React.Component {
    constructor () {
        super ()
        this.state = {
            timePeriodStep: 1,
            timePeriod: {
                timePeriod: '',
                hiringManager: '',
                from: '',
                to: (new Date()).toISOString().split('T')[0],
                isActive: '',
                monthly:'',
                outcome:"",
                skills:"",
                candidateName:""

            },
        }
    }

    componentDidMount = () => {
        // const { timePeriod } = this.state
        this.props.getHr({dept:"HR",isActive:'',jobTitle:'',supervisor:'',userid:'',employeeStatus:'',firstName:'',from:'',to:'',timePeriod:'',monthly:''});
        var data = {dept:"HR",jobTitle:'',supervisor:"",hiringManager:'',employeeStatus:'',isActive:'',firstName:'',from:'',to:'',timePeriod:'',monthly:'',candidateName:'',outcome:'',userId:'',skills:''};
        this.props.getCandidateData(data)
        this.props.hrTargets()
    };
    componentDidUpdate = () => {
        window.jQuery('.selectpicker').selectpicker('refresh');
    }
    // employeeSelect = (e, status) => {
    //     const { filterBy } = this.state;
    //     filterBy[e.target.name] = status ? status : e.target.value;
    //     this.setState({
    //         filterBy,
    //         filterState:true
    //     },() => {
    //         this.props.SalesData({...filterBy});
    //     })
    // }
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
        timePeriod: {
        ...this.state.timePeriod,
        timePeriod: '',
        hiringManager: "",
        from: '',
        to: (new Date()).toISOString().split('T')[0],
        isActive: '',
        monthly:'',
        outcome:"",
        skills:"",
        candidateName:""
    }
        },
        ()=> {this.props.getCandidateData(this.state.timePeriod)}
        )
    }
    filterTimePeriod = (e) => {
        const { timePeriod } = this.state
        timePeriod[e.target.name] = e.target.value ? e.target.value : ""
        this.setState({
            timePeriod
        },
        //  () => {
        //     this.props.getCandidateData(timePeriod)
        // }
        )
    } 

    closedProposal = () => {
        let path = `/hrdashboard`;
        this.props.history.push(path);
    }

    rejectedProposal = () => {
        let path = `/rejectedboard`;
        this.props.history.push(path);
    }

    render() {
        let LinkedIn,Naukri,Monster,Indeed,Reactjs,Nodejs,MeanStack,MernStack,FullStack,Selected,Pending,Reject
        LinkedIn = Naukri = Monster = Indeed = Reactjs = Nodejs = MeanStack = MernStack = FullStack = Selected  = Pending = Reject = 0
        this.props.hrData && this.props.hrData.map(el => {
            return(
                el.source.includes("linkedIn") ? LinkedIn+=1 :
                el.source.includes("Naukri.com") ? Naukri+=1 :
                el.source.includes("Monster.com") ? Monster+=1 : Indeed+=1
            )
        })
        this.props.hrData && this.props.hrData.map(el => {
            return(
                el.skills.includes("Reactjs")   ? Reactjs+=1 : 
                el.skills.includes("Nodejs")    ? Nodejs+=1  :
                el.skills.includes("MeanStack")   ? MeanStack+=1 :
                el.skills.includes("FullStack")   ? FullStack+=1 : MernStack+=1
            )
        })
        this.props.hrData && this.props.hrData.map(el => {
            return(
                el.outcome.includes("selected") ? Selected+=1 :
                el.outcome.includes("pending")  ? Pending+=1 : Reject+=1
            )
        })
        
        const hrData = this.props.hrData2 && this.props.hrData2.map((e,index) => {
            return (
                <option key={index} value={e.id}>{e.firstName}</option>
            )
        });
        return (
                <div className="theme-panel">
                {/* <div className="prosess-tab">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.closedProposal}>Pending</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link active">Selected</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.rejectedProposal}>Rejected</button>
                                </li>
                            </ul>
                        </div> */}
                    <div id="searchfields" className="search-fields collapse show">
                            <div className="searchfields-box">
                            <ul className="searchfields-ul custom">
                                    {localStorage.getItem('roleId')==='3' && localStorage.getItem('userRole')!=='3' ? null :
                                    <li className="single-search-field">
                                        <form className="filters">
                                        <div className="label">Hiring Manager</div>
                                        <select className="selectpicker" name="hiringManager" onChange={this.filterTimePeriod} value={this.state.timePeriod.hiringManager}>
                                            <option value="">All</option>
                                            {hrData}
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
                                        onChange={this.timePeriod} /><label class="custom-control-label" for="customRadio">Custom</label></li>
                                         <li className="single-search-field custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="customRadio2" name="timePeriodStep" 
                                        value={1} 
                                        checked={this.state.timePeriodStep === 1} 
                                        onChange={this.timePeriod} /><label class="custom-control-label" for="customRadio2">Standard</label>
                                        </li>
                                    </li>
                                    {this.state.timePeriodStep=== 2  ?
                                    <><li className="single-search-field">
                                        <form className="filters">
                                        <div className="label">From Date</div>
                                        <input type="date" name='from' value={this.state.timePeriod.from} onChange={this.filterTimePeriod}/>
                                    </form>
                                    </li>
                                    <li className="single-search-field">
                                    <form className="filters">
                                        <div className="label">To Date</div>
                                        <input type="date" name='to'  value={this.state.timePeriod.to} onChange={this.filterTimePeriod}/>
                                    </form>
                                    </li></>:null}
                                    {this.state.timePeriodStep=== 1  ? 
                                    <li className="single-search-field">
                                        <form className="filters">
                                        <div className="label">Time Period</div>
                                            <select className="selectpicker" name="timePeriod" onChange={this.filterTimePeriod} value={this.state.timePeriod.timePeriod}>
                                                <option value="">All</option>
                                                <option value="today" >Today</option>
                                                <option value="weekly" >Weekly</option>
                                                <option value="monthly">Monthly</option>
                                                <option value="last3months">Last 3 Months</option>
                                                <option value="last6months">Last 6 Months</option>
                                                <option value="1year">Yearly</option>
                                                {/* <option value="yearlysalesTarget">Yearly Graph</option> */}
                                            </select>
                                    </form>
                                    </li>:null}
                                    {this.state.timePeriod.timePeriod==="monthly" ?
                                    <li className="single-search-field">
                                        <form className="filters">
                                        <div className="label">Month</div>
                                        <select className="selectpicker" name="monthly" onChange={this.filterTimePeriod}
                                        value={this.state.timePeriod.monthly}>
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
                                </ul>
                                <ul className="searchfields-ul">
                                    <li><button className="btn-submit" style={{background:"#4ac103"}} onClick={()=> {this.props.getCandidateData(this.state.timePeriod)}}>Submit</button>
                                    <button className="btn-submit" style={{background:"#6c757d"}} onClick={()=> {this.reset()}}>Reset</button></li>
                                </ul>
                            </div>
                        </div>
                        <div className="graph">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 b-right">
                                    <h3 style={{}}><b>Graph By Outcome</b></h3>
                                    <Chart width={'auto'}
                                        height={'400px'} chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Performance', 'Employee Performance'],
                                            ['Pending', Pending],
                                            ['Selected', Selected],
                                            ['Reject', Reject],
                                        ]}
                                        options={{
                                            pieHole: 0.4,
                                            is3D: false
                                        , }}
                                        rootProps={{ 'data-testid': '2' }}
                                    /></div>
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 b-right">
                                    <h3 style={{}}><b>Graph By Source</b></h3>
                                    <Chart width={'auto'}
                                        height={'400px'} chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Performance', 'Employee Performance'],
                                            ['LinkedIn', LinkedIn],
                                            ['Indeed.com', Indeed],
                                            ['Monster.com', Monster],
                                            ['Naukri.com', Naukri],
                                        ]}
                                        options={{
                                            pieHole: 0.4,
                                            is3D: false
                                        , }}
                                        rootProps={{ 'data-testid': '2' }}
                                    /></div>
                                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 b-right">
                                    <h3 style={{}}><b>Graph By Skills</b></h3>
                                    <Chart width={'auto'}
                                        height={'400px'} chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Performance', 'Employee Performance'],
                                            ['Reactjs', Reactjs],
                                            ['Nodejs', Nodejs],
                                            ['MeanStack',MeanStack],
                                            ['MernStack',MernStack],
                                            ['FullStack',FullStack]
                                        ]}
                                        options={{
                                            pieHole: 0.4,
                                            is3D: false
                                        , }}
                                        rootProps={{ 'data-testid': '2' }}
                                    /></div></div>
                                    {/* <div className="graph-box">
                                        <div className="row"><br />
                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                            <div className="lead-box">
                                                <span ><strong>Total Proposals: <br /></strong><span style={{fontSize:"39px"}}>{this.props.salesData.tableRecords && this.props.salesData.tableRecords.freelancer+this.props.salesData.tableRecords.upwork}</span></span>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                            <div className="lead-box">
                                                <span ><strong>Leads:<br /></strong><span style={{fontSize:"39px"}}>{this.props.hrData.data && this.props.hrData.data.length}</span></span>
                                            </div>
                                        </div>
                                        </div>
                                    </div>  */}
                    </div></div>
        )
    }
}

const mapStateToProps = state => {
    console.log(">>>",state)
    return {
        hrData:state.CtrlHrCandidacy.getCandidate,
        hrData2: state.CtrUser.userData.result,
        hrTarget:state.CtrVacancy.hrTargetDataById
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCandidateData: (data) => dispatch(actionCreator.getHrCandidacyAction(data)),
        getHr: data =>dispatch(actionCreator.getUsersDataAction(data)),
        hrTargets: data =>dispatch(actionCreator.getVacancyTargetAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
