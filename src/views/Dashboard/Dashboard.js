import React from 'react';
import { connect } from 'react-redux';
import connection from "../../Config/APIurl/connection";
import moment from "moment";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import male from '../../assets/img/male.png';
import female from '../../assets/img/female.png'

class Dashboard extends React.Component {

    componentDidMount = () => {
        this.props.getDashboardData();
        this.props.getDashboardTimelogData();
    }

    EditLeave = (e) => {
        e.persist()
        let path = `/dashboard/edit/${parseInt(e.target.id)}`;
        this.props.history.push(path);
    }
    EditHoliday = (e) => {
        e.persist()
        let path = `/dashboard/editHoliday/${parseInt(e.target.id)}`;
        this.props.history.push(path);
    }
    DeleteHoliday = (free) => {
        
        this.props.deleteHoliday({id:free})

    }

    UserLink = (e) => {
        e.persist()
        let path = `/dashboard/editUser/${parseInt(e.target.id)}`;
        this.props.history.push(path);
    }
    ProposalLink = (e,id) => {
        e.persist()
        let path = `/dashboard/editProposal/${parseInt(id)}`;
        this.props.history.push(path);
    }
  render() {
    const Dashboard = this.props.Dashboard;
    const Timelog = this.props.Timelog;

    
    return (
      <div className="mainPanel">
        <div className="page-header">
            <div className="main-title"><h2>Welcome to Dashboard</h2></div>
            <ul className="page-top-actions">
                {/* <li><a href="add-user-list.html" classNameName="green">+</a></li> */}
            </ul>
        </div><div className="dashbaord-panel">
            <div className="row">
                 <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="dashbaord-box purple">
                        <div className="header-content" style={{color:"#801280"}}>
                           Total Employees
                            <span className="badgee" style={{border:"1px solid #801280",lineHeight:"2",color: "#801280",backgroundColor:"white"}}>{Dashboard.count && Dashboard.count[0] && Dashboard.count[0].Total}</span>
                        </div>
                        <div className="block-list scroll-none">
                        {Dashboard.count && Dashboard.count.map((cnt,index) =>{
                        return(
                            <>                                    
                            <div className="user-list-panels panel" key={index}>
                                <div className="user-image"> <img alt= " " src={female} /></div>
                                <div className="progress progress-bar-vertical">
                                <div className="progress-bar" role="progressbar" style={{width:"108px",height: `${(parseInt(((cnt.womenPercentage).toFixed(0))))}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        {((cnt.womenPercentage))}% </div>
                                </div>
                                {/* <div className="user-name">Women: {cnt.womenPercentage}%</div> */}
                                <div className="doj"></div>
                            </div>

                            <div className="user-list-panels" key={index}>
                                <div className="user-image">
                                    <span style={{backgroundImage: 'url(/home/rexweb/ip_orignal_frontend/ip_frontend/public/themes/images/users/female.png)'}}>
                                        <img alt= " " src={male} />  
                                    </span>
                                </div>
                                <div className="progress progress-bar-vertical">
                                <div className="progress-bar" role="progressbar" style={{width:"108px",height: `${(parseInt(((cnt.menPercentage).toFixed(0))))}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        {((cnt.menPercentage).toFixed(0))}% </div>
                                </div>
                                {/* <div className="user-name">Men: {cnt.menPercentage}%</div> */}
                                <div className="doj"></div>
                            </div>
                            </>
                            )
                        })}                           
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="dashbaord-box light-green">
                        <div className="header-content" style={{color:"#42ac02"}}>
                            Department Member
                            <span className="badgee" style={{border:"1px solid #42ac02",lineHeight:"2",color: "#42ac02",backgroundColor:"white"}}>{Dashboard.Department && Dashboard.Department.length}</span>
                        </div>
                        <div className="block-list">
                            {Dashboard.Department && Dashboard.Department.map((dept,index) => {
                                return(
                                    
                                    <div className="user-list-panel"  key={index}>
                                    <div className="user-image" style={{backgroundImage: `url(${`${connection.concat(dept.userImage)}`})`}}>
                                    </div>
                                <div className="user-name">{dept.Name}</div>
                                    {/* <div className="user-post">HR HEAD</div> */}
                                <div className="department orange">{dept.departmentName}</div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="dashbaord-box darkpink">
                        <div className="header-content" style={{color:"#ec1d4e"}}>
                            Birthdays(Current Month)
                            <span className="badgee" style={{border:"1px solid #ec1d4e",lineHeight:"2",color: "#ec1d4e",backgroundColor:"white"}}>{Dashboard.data && Dashboard.data.length}</span>
                        </div>
                        <div className="block-list">
                            {Dashboard.data && Dashboard.data.map((dob,index) => {
                                return(
                                <div className="user-list-panel" key={index}>
                                    <div className="user-image" style={{backgroundImage: `url(${`${connection.concat(dob.userImage)}`})`}}></div>
                                    <div className="user-name">{dob.firstName}</div>
                                    {/* <div className="user-post">Founder & CEO</div> */}
                                    <div className="dop">{moment(dob.dob).format("DD MMM")}</div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="dashbaord-box light-green">
                        <div className="header-content" style={{width:"100%",float:"left",marginTop:"10px",color:"#42ac02"}}>                            
                           <div> Attendance</div>
                            {/* <span className="badgee">Total {Timelog && Timelog.data && Timelog.data.length}</span> */}
                            
                            {Timelog && Timelog.presentCount && Timelog.presentCount.map((present,index) =>{
                                return(
                                    <>
                           <div><span className="badgee present" style={{backgroundColor:"white",border:"1px solid #42ac02",lineHeight:"2",color: "#42ac02"}}>Present {present.count}</span>
                           <span className="badgee present" style={{backgroundColor:"white",border:"1px solid #ec1d4e",lineHeight:"2",color: "#ec1d4e"}}>Absent {parseInt(Timelog.data.length)-(present.count)}</span>
                           </div> </>  )})}
                            
                        </div>

                        <div className="block-list">
                          {Timelog && Timelog.data && Timelog.data.map((time,index) =>{
                              return(
                                <div className="user-list-panel" key={index}>
                                    <div className="user-image" id={time.id} onClick={this.UserLink} style={{backgroundImage: `url(${`${connection.concat(time.userImage)}`})`}}>
                                    </div>
                                    <div className="user-name">{time.firstName}</div>
                                    <div className="user-post">React JS Developer</div>
                                    <div className={time.present_count===0 ? "status disactive" :"status active"}></div>
                                </div>)
                          })}
                                                    </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="dashbaord-box purple">
                        <div className="header-content" style={{color:"#801280"}}>
                            Announcement
                        </div>
                        <div className="block-list">
                          
                            <div className="user-list-panel">
                                <div className="user-image" style={{backgroundImage: 'url(images/users/user10.jpg)'}}>
                                </div>
                                <div className="announce-date latest">20 Oct 5:30pm</div>
                                <div className="anounce-post">Tommorow is Holiday</div>
                            </div>
                            <div className="user-list-panel">
                                <div className="user-image" style={{backgroundImage: 'url(images/users/user10.jpg)'}}>
                                </div>
                                <div className="announce-date ">16 Oct 5:30pm</div>
                                <div className="anounce-post">“the act of announcing something or of being 
                                announced. 2 : a public notification or 
                                declaration.”</div>
                            </div>
                          <div className="user-list-panel">
                                <div className="user-image" style={{backgroundImage: 'url(images/users/user9.jpg)'}}>
                                </div>
                                <div className="announce-date ">15 Oct 5:30pm</div>
                                <div className="anounce-post">“the act of announcing something or of being 
                                    announced. 2 : a public notification or 
                                    declaration.”</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="dashbaord-box cyan">
                        <div className="header-content" style={{color:"#3ed3db"}}>
                           Request for Approval
                        </div>
                        <div className="block-list">
                            {Dashboard.leave && Dashboard.leave.map((lev,index) =>{
                                return (
                            <div className="user-list-panel" key={index}>
                                <div className="user-image" style={{backgroundImage: `url(${`${connection.concat(lev.userImage)}`})`}}>
                                </div>
                                <div className="leave-task" style={{color:"green",cursor: "pointer"}}  id={lev.id} onClick={this.EditLeave}>{lev.Name}</div>
                                <div className="leave-task">{lev.reason}</div>
                                <div className="leave-date">{moment(lev.dateFrom).format("DD MMM YYYY")}</div>
                                <div className="aproval-status approved" style={{color:"green",cursor: "pointer"}} id={lev.id} onClick={this.EditLeave}>{lev.status}<link/></div>
                            </div>
                                )})}
                        </div>
                    </div>
                </div>
               
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="dashbaord-box red">
                        <div className="header-content" style={{color:"#db1f07"}}>
                           Upcoming Holidays
                        </div>
                        <div className="block-list">
                        {Dashboard.holiday && Dashboard.holiday.map((free,index) =>{
                                return (
                            <div className="user-list-panel events" key={index}>
                                <div className="event-name" id={free.id} style={{color:"green",cursor: "pointer"}} 
                                 onClick={(e)=>(parseInt(localStorage.getItem('userRole')) === 3) || parseInt(localStorage.getItem('roleId')) === 2 ? this.EditHoliday(e) :null}>{free.name}</div>
                                 {/* <span><Link to="#" className="fa fa-trash-o text-danger" data-toggle="modal" data-target="#delete" title="delete" data-original-title="delete" onClick={() => this.isActive(props.original)}></Link></span>  */}
                                <div className="weekend1" >
                                <span style={{cursor:"pointer"}} data-target="#source-view" className="fa fa-trash-o text-danger" id={free.id} title="delete" data-original-title="delete" data-toggle="modal" onClick={()=>this.setState({holidayid:free.id})}/>

                                </div>
                                <div className="weekend">
                                <div className="event-day">{free.day}</div>
                                <div className="event-date">{moment(free.fromDate).format("DD MMM YYYY")}</div>
                                </div>
                            </div>
                                )})}
                           
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="dashbaord-box darkpink">
                        <div className="header-content" style={{color:"#ec1d4e"}}>
                           Monthly Hired 
                            <span className="badgee" style={{border:"1px solid #ec1d4e",lineHeight:"2",color: "#ec1d4e",backgroundColor:"white"}}>{Dashboard.newHire && Dashboard.newHire.length}</span>
                        </div>
                        <div className="block-list">
                            {Dashboard.newHire && Dashboard.newHire.map((doj,index) =>{
                            return(
                                <div className="user-list-panel" key={index}>
                                    <div className="user-image" id={doj.id} onClick={this.UserLink}style={{cursor: "pointer",backgroundImage: `url(${`${connection.concat(doj.userImage)}`})`}}>
                                    </div>
                                    <div className="user-name" style={{color:"green",cursor: "pointer"}} id={doj.id} onClick={this.UserLink}>{doj.firstName}</div>

                                     <div className="doj">{moment(doj.joiningDate).format("DD MMM")}</div>
                                </div>
                            )})}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                    <div className="dashbaord-box purple">
                        <div className="header-content" style={{color:"#801280"}}>
                            Follow Up Reminders!
                        </div>
                        <div className="block-list removePadding scroll-none">
                        {Dashboard.followUpDate && Dashboard.followUpDate.map((free,index) =>{
                                return (
                            <div className="user-list-panel events" key={index}>
                                <div className="event-name"  style={{cursor: "pointer",color:"red"}} onClick={(e) => this.ProposalLink(e,free.id)}>{moment(free.followUpDate).format("DD MMM YYYY")}</div>
                                {free && free.followUpTime ?
                                <div className="user-post" style={{cursor: "pointer"}} onClick={(e) => this.ProposalLink(e,free.id)}><b>At :-  {free.followUpTime}  Hrs</b> (24 Hour Format)</div>
                                :null}
                                <div className="weekend-follow">
                                <div className="event-day"></div>
                                <div className="anounce-post">{free.comment}</div>
                                </div>
                            </div>
                                )})}
                            {/* <div className="user-list-panel">
                                <div className="user-image" style={{backgroundImage: 'url(images/users/user10.jpg)'}}>
                                </div>
                                <div className="announce-date latest">20 Oct 5:30pm</div>
                                <div className="anounce-post">Tommorow is Holiday</div>
                            </div> */}
                        </div>
                    </div>
                </div>
                
                    
                    <div className="modal fade modal-theme" id="source-view" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h3 className="modal-title" style={{marginLeft: "auto"}}>Confirm Delete</h3>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>                
                        <div className="modal-body">
                            <p>Are You Sure.</p>
                            <p>Do you want to proceed?</p>
                        </div>
                        <div className="modal-footer">
                            <div>
                                <button type="button" className="btn btn-gray btn-sm" style={{float:"left"}} data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-theme btn-sm" style={{float:"right"}} data-dismiss="modal" onClick={()=>this.DeleteHoliday(this.state.holidayid)}>Delete</button>
                            </div>
                        </div>
                        </div>
                    
                    </div>
                
            </div>
            


            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        Dashboard: state.CtrDashboard.getDashboardData,
        Timelog: state.CtrDashboard.getDashboardTimeLogData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDashboardData: () => dispatch(actionCreator.getDashboard()),
        getDashboardTimelogData: () => dispatch(actionCreator.getDashboardTimelog()),
        deleteHoliday: (free) => dispatch(actionCreator.deleteHolidayData(free)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
