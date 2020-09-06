import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { Link } from "react-router-dom";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from "moment";
import Stopwatch from "../StopWatch/Stopwatch";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



class Timelog extends React.Component {
    constructor (props) {
        super (props)
        this.stopwatch = {};
        this.state = {
            task:'',
            userId: localStorage.getItem('userRole'),
            timer:false
        }
    }

    handleCheckInSubmit = (e) => {
        e.preventDefault()
        this.props.checkInData({task:this.state.task});
    };

    componentDidMount = () => {
        this.stopwatch = new Stopwatch( document.querySelector('.stopwatch'),
        document.querySelector('.results'));
        this.props.getTimeTableData({userid:localStorage.getItem("userRole")
        ,monthly:"",timePeriod:"",from:"",to:""});
        document.addEventListener('timer', this.updateTimer)
        console.log(this.props,'testing');
        if (JSON.parse(localStorage.getItem("status")))
            this.stopwatch.start(true)
    }

    componentDidUpdate = () => {
        this.setIsactive()
    }

    updateTimer = (dta) => {
        if (document.getElementById("showTimer")){
            document.getElementById("showTimer").innerHTML = dta.detail
        }
    }

    setIsactive = () => {
        if(this.props.timeData.length>0 &&
            moment(moment().toDate()).format("DD MMM  YYYY")===moment(this.props.timeData.length>0 &&
            this.props.timeData[this.props.timeData.length-1].checkInDate).format("DD MMM  YYYY") &&
            this.props.timeData[this.props.timeData.length-1] && this.props.timeData[this.props.timeData.length-1].checkOutDate===null
            )
        {
            document.getElementById("home-tab").style.display="none";
            document.getElementById("profile-tab").style.display="flex";
        }else{
            document.getElementById("home-tab").style.display="flex";
            document.getElementById("profile-tab").style.display="none";
        }
    }
    componentWillMount(){
        document.removeEventListener('timer',this.updateTimer)
    }
    handleCheckOutSubmit = () => {
        let timeR = localStorage.getItem("mytime").split(",");
        let timeRstring = timeR[0]+":"+timeR[1];
        const data = {
            pauseTime: timeRstring,
            userId: this.state.userId
        }
        this.props.checkOutData(data);
        localStorage.setItem("mytime", [0, 0, 0, 0]);
    };

    stopTimer = ()=>{
        this.setState({timer:false})
        localStorage.setItem('status',false)
        this.stopwatch.stop(false)
    }

    startTimer = () =>{
        this.setState({timer:true})
        localStorage.setItem('status',true)
        this.stopwatch.start(true)
    }

    
    reset= () => {
        this.times = [ 0, 0, 0, 0 ];
        localStorage.setItem("mytime", this.times);
    }

    render () { 
        const columns = [
        { Header: "Sr No.", id: "row",
            Cell: (row) => {
                return <div>{row.index+1}</div>
            },
            style: {
                textAlign: "center"
            },
        },
        { Header: "Employee", accessor: "fullName",
        Cell :props =>
                 <span>{props.original.fullName}</span>,   
            style: {
                textAlign: "center"
            },
        },
        { Header: "CheckIn Date", accessor: "checkInDate",
   
            Cell : props=> 
            <span>{moment(props.original.checkInDate).format("DD MMM  YYYY")}</span>,
            style: {
            textAlign: "center"
            },
        },
        { Header: "CheckIn Time", accessor: "checkInTime",
        Cell :props =>
                 <span>{props.original.checkInTime}</span>,   
            style: {
                textAlign: "center"
            },
        },
        { Header: "Delay Time", accessor: "delayedTime",
        Cell :props =>
                 <span>{parseInt(props.original.delayedTime/60)} Hrs {parseInt(props.original.delayedTime%60)} mins</span>,          
            style: {
                textAlign: "center"
            },
        },
        { Header: "CheckOut Date", accessor: "checkOutDate",
        Cell : props=> 
        <span>{props.original.checkOutDate===null ? "N/A" : moment(props.original.checkOutDate).format("DD MMM  YYYY")}</span>,
            style: {
                textAlign: "center"
            },
        },
        { Header: "CheckOut Time", accessor: "checkOutTime",
        Cell :props =>
                 <span>{props.original.checkOutTime==="" ? "Not yet Checked Out" : props.original.checkOutTime}</span>,   
            style: {
                textAlign: "center"
            },
        },
        { Header: "Working Hours", accessor: "working hours",
        Cell :props =>
        <span>{isNaN(parseInt(props.original.checkOutTime)-parseInt(props.original.checkInTime))===true? "N/A":parseInt(props.original.checkOutTime)-parseInt(props.original.checkInTime)+"Hrs"} </span>,           
            style: {
                textAlign: "center"
            },
        },
    ]
        return (
            <div className="mainPanel">
                <ToastContainer autoClose={3000 } />
                <div className="page-content-inner timelog-bg">
                    <div className="breadcrumb-wrapper">
                        <ol className="breadcrumb">
                            <li className="active">Time Log</li>
                        </ol>
                    </div>
                    <div className="page-header"></div>
                    <div className="time-log-box">
                        <ul className="punch-btnss nav nav-tabs" id="myTab" role="tablist">
                            
                                <li className="nav-item" id="check-In">
                                {/* <Link to="#" className={this.state.isactive===1?"punch nav-link active":"punch nav-link"} id="home-tab"  data-toggle="modal" onClick={() => this.setState({isactive:1,isLoading:false})} data-target="#sourceSelection" role="tab" aria-controls="home" aria-selected="true" onLoad={this.setIsactive}>
                                    <img src="themes/images/finger-print-in.png" alt="check-in" />
                                    <span>Check In</span>
                                </Link> */
                                }
                                <Link to="#" className="punch nav-link active" id="home-tab"  data-toggle="modal" onClick={() => this.setState({isactive:1,isLoading:false})} data-target="#sourceSelection" role="tab" aria-controls="home" aria-selected="true" onLoad={this.setIsactive}>
                                    <div className="check-in"><img src="themes/images/finger-print-in.png" alt="check-in" /></div>
                                    <span>Check In</span>
                                </Link>
                                </li>
                                <li className="nav-item" id="check-Out">
                                <Link to="#" className="punch nav-link notactive"  
                                id="profile-tab" aria-controls="profile" aria-selected="false" onClick={() => {
                                    this.setState({isactive:0})
                                    this.reset()
                                    this.handleCheckOutSubmit()
                                    this.setIsactive()}} onLoad={this.setIsactive}>
                                    <img src="themes/images/logout.png" alt="check-out" style={{background: "#F73241"}} />
                                    <span>Check Out</span>
                                </Link>
                            </li>                  
                        </ul>                        
                        <div className="btn-section">
                        {localStorage.getItem('status') !== "true" ? 
                            <div className="btn-wrapper">
                            <div className="start-btn" style={{cursor:"pointer"}} onClick={()=>{
                                document.getElementById("hours").style.display = "block"
                                this.startTimer()}}><img src="themes/images/door.png" alt="check-out" />
                                <span>Start Break</span>
                            </div>
                            </div>
                            :
                            <div className="btn-wrapper">
                            <div className="start-btn" style={{cursor:"pointer"}} onClick={()=>this.stopTimer()}><img src="themes/images/door.png" alt="check-out" />
                                <span>Pause Break</span>
                            </div>    
                            </div>                   
                        }
                        {/* <div className="btn-wrapper"></div> */}
                        <br />
                            <div className="timer">  
                                <span id="showTimer"></span>
                            </div>
                                    {/* < Stopwatch /> */}
                        

                        <div className="hours" id="hours" style={{display:"none"}}>
                                <span>Hours</span>
                                <span>Minutes</span>
                                <span>Seconds</span>
                            </div>
                    </div>
                </div>
                    <div className="theme-panel">
                        <div className="table-overflow">
                        <ReactTable 
                        getTrProps={(state, rowInfo, column, instance) => {
                            if (typeof rowInfo !== "undefined") {
                                return {
                                    onClick: (e, handleOriginal) => {
                                        this.setState({
                                            selected: rowInfo.index
                                        });
                                        if (handleOriginal) {
                                            handleOriginal()
                                        }
                                    },
                                    style: {
                                        background: rowInfo.index === this.state.selected ? '#e8e7e3' : 'white',
                                        color: rowInfo.index === this.state.selected ? 'black' : 'black'
                                    },
                                }
                            }
                            else {
                                return {
                                    onClick: (e, handleOriginal) => {
                                        if (handleOriginal) {
                                            handleOriginal()
                                        }
                                    },
                                    style: {
                                        background: 'white',
                                        color: 'black'
                                    },
                                }
                            }
                        }}
                            columns={columns}
                            data={this.props.timeData}
                            defaultPageSize={10}>
                        </ReactTable>
                        </div>
                    </div>
                            {/* Add Proposal Modal */}
                            <div className="modal fade" id="sourceSelection" role="dialog">
                                <div className="modal-dialog">
                                <div className="modal-content" style={{marginTop:"50%"}}>
                                    <div className="modal-header">
                                    <h3 className="modal-title">Welcome!</h3>
                                    <button type="button" className="close" data-dismiss="modal" onClick={() => this.setState({modal:{modal:0,value:""}})}>&times;</button>
                                    </div>
                                    <div className="modal-body">
                                    <h4 >What's on your mind?</h4><br />
                                        <textarea  rows="4" cols="37" onChange={(e) => this.setState({task:e.target.value})}></textarea>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-info" data-dismiss="modal" onClick={(e) => {this.handleCheckInSubmit(e)
                                        this.setIsactive()}}>Ok</button>
                                        <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={() => this.setState({modal:{modal:0,value:""},cancel:2})}>Cancel</button>
                                    </div>
                                </div>
                                </div>
                            </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({timeData: state.ctrTimeLog.timeData});
  
const mapDispatchToProps = dispatch => {
    return {
      checkInData: data => dispatch(actionCreator.addCheckIn(data)),
      getTimeTableData: (data) => dispatch(actionCreator.getTimeTableDataAction(data)),
      checkOutData: data => dispatch(actionCreator.updateCheckout(data))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Timelog);

	
