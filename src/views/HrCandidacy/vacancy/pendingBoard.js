import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../../Redux/Actions/ActionTypes/index";
import Chart from "react-google-charts";

class Board extends React.Component {
    constructor () {
        super ()
        this.state = {
            timePeriod: {
                timePeriod: '',
                outcome: 'pending',
                hiringManager: '',
                skills: '',
                from: '',
                to: ''
            },
        }
    }

    componentDidMount = () => {
        const { timePeriod } = this.state
        this.props.getHr({dept:"HR",isActive:'',jobTitle:'',supervisor:'',userid:'',employeeStatus:'',firstName:'',from:'',to:'',timePeriod:''});
        this.props.getCandidateData(timePeriod)
    };

    employeeSelect = (e, status) => {
        const { filterBy } = this.state;
        filterBy[e.target.name] = status ? status : e.target.value;
        this.setState({
            filterBy,
            filterState:true
        },() => {
            this.props.SalesData({...filterBy});
        })
    }

    filterTimePeriod = (e) => {
        const { timePeriod } = this.state
        timePeriod[e.target.name] = e.target.value ? e.target.value : ""
        this.setState({
            timePeriod
        }, () => {
            this.props.getCandidateData(timePeriod)
        })
    } 

    closedProposal = () => {
        let path = `/selectedboard`;
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
                <div className="prosess-tab">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button className="nav-link active">Pending</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.closedProposal}>Selected</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={this.rejectedProposal}>Rejected</button>
                                </li>
                            </ul>
                        </div>
                    <div id="searchfields" className="search-fields collapse show">
                            <div className="searchfields-box">
                                <ul className="searchfields-ul">
                                    <li className="single-search-field">
                                        <div className="label">Hiring Manager</div>
                                        <select className="form-control" name="hiringManager" onChange={this.filterTimePeriod}>
                                            <option value="">All</option>
                                            {hrData}
                                        </select>
                                    </li>
                                    <li className="single-search-field">
                                        <div className="label">From Date</div>
                                        <input type="date" name='from' onChange={this.filterTimePeriod}/>
                                    </li>
                                    <li className="single-search-field">
                                        <div className="label">To Date</div>
                                        <input type="date" name='to' onChange={this.filterTimePeriod}/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="graph">
                        <div className="row"><div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 b-right">
                                    <h3 style={{}}><b>Graph By Pending</b></h3>
                                    <Chart width={'auto'}
                                        height={'400px'} chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Performance', 'Employee Performance'],
                                            ['Selected', Selected],
                                            ['Pending', Pending],
                                            ['Reject', Reject],
                                        ]}
                                        options={{
                                            pieHole: 0.4,
                                            is3D: false
                                        , }}
                                        rootProps={{ 'data-testid': '2' }}
                                    /></div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 b-right">
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
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 b-right">
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
                                    <div className="graph-box">
                                        <div className="row"><br />
                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                            <div className="lead-box">
                                                {/* <span ><strong>Total Proposals: <br /></strong><span style={{fontSize:"39px"}}>{this.props.salesData.tableRecords && this.props.salesData.tableRecords.freelancer+this.props.salesData.tableRecords.upwork}</span></span> */}
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 ">
                                            <div className="lead-box">
                                                {/* <span ><strong>Leads:<br /></strong><span style={{fontSize:"39px"}}>{this.props.hrData.data && this.props.hrData.data.length}</span></span> */}
                                            </div>
                                        </div>
                                        </div>
                                    </div> 
                    </div></div>
        )
    }
}

const mapStateToProps = state => {
    console.log(">>>",state)
    return {
        hrData:state.CtrlHrCandidacy.getCandidate,
        hrData2: state.CtrUser.userData.result,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCandidateData: (data) => dispatch(actionCreator.getHrCandidacyAction(data)),
        getHr: data =>dispatch(actionCreator.getUsersDataAction(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
