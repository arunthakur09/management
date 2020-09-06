import React from 'react';
import { Link } from "react-router-dom";
import "../../assets/css/Theme/Main.css";
import { connect } from 'react-redux';
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";

class monthlyView extends React.Component {

    componentDidMount = () => {
        this.props.getMonthlyData();
        
    }
    render(){ 
        const MonthlyData = this.props.MonthlyData;
        return(
        <div class="page-content-inner">
            <div class="breadcrumb-wrapper">
                {/* <ol class="breadcrumb">
                    <li><a href="home.html">Evaluation</a></li>
                    <li class="active">Show Evaluation</li>
                </ol> */}
            </div>
            <div class="page-header">
                <div class="main-title" style={{marginLeft:"10px"}}><strong>List of All Calculations</strong></div>
                <ul class="page-top-actions" style={{marginRight:"20px"}}>
                    {/* <li><a href="javascript:void(0)" class="green"><i class="fa fa-filter" aria-hidden="true"></i></a></li> */}
                    <li><Link to="/ProjectManagement" className="green">Back</Link></li>
                </ul>
            </div>
            
            <div class="dashbaord-panel">
                {/* <div class="month-btns">
                    <a href="javascript:void(0)" class="btn btn-gray">Prev</a>
                    <span class="month">October 2019</span>
                     <a href="javascript:void(0)" class="btn btn-gray float-right">Next</a>
                </div> */}
                <div class="row" style={{marginLeft:"2px",marginTop:"20px"}}>
                    <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <div class="userview-table green">
                            <div class="date-heading">
                                1-Oct-2019
                            </div>
                            <div class="full-date-task">
                                <div class="project-details">
                                    <div class="project-name">Rexweb</div>
                                    <div class="task-name">Create  Home page </div>
                                     <div class="task-detail">Doing html with slider and some task of responsive.</div>
                                    <div class="spending-hours">
                                        Spending hours <span>4 hrs</span>
                                    </div>

                                </div>
                                <div class="project-details">
                                    <div class="project-name">Wisdom</div>
                                    <div class="task-name">Create login Home page </div>
                                     <div class="task-detail">Doing html with slider and some task of responsive.</div>
                                    <div class="spending-hours">
                                        Spending hours <span>4 hrs</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <div class="userview-table green">
                            <div class="date-heading">
                                2-Oct-2019
                            </div>
                            <div class="full-date-task">
                                <div class="project-details">
                                    <div class="project-name">Rexweb</div>
                                    <div class="task-name">Create  Home page </div>
                                     <div class="task-detail">Doing html with slider and some task of responsive.</div>
                                    <div class="spending-hours">
                                        Spending hours <span>4 hrs</span>
                                    </div>

                                </div>
                                <div class="project-details">
                                    <div class="project-name">Wisdom</div>
                                    <div class="task-name">Create login Home page </div>
                                     <div class="task-detail">Doing html with slider and some task of responsive.</div>
                                    <div class="spending-hours">
                                        Spending hours <span>4 hrs</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <div class="userview-table green">
                            <div class="date-heading">
                                2-Oct-2019
                            </div>
                            <div class="full-date-task">
                                <div class="project-details">
                                    <div class="project-name">Rexweb</div>
                                    <div class="task-name">Create  Home page </div>
                                     <div class="task-detail">Doing html with slider and some task of responsive.</div>
                                    <div class="spending-hours">
                                        Spending hours <span>4 hrs</span>
                                    </div>

                                </div>
                                <div class="project-details">
                                    <div class="project-name">Wisdom</div>
                                    <div class="task-name">Create login Home page </div>
                                     <div class="task-detail">Doing html with slider and some task of responsive.</div>
                                    <div class="spending-hours">
                                        Spending hours <span>4 hrs</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <div class="userview-table green">
                            <div class="date-heading">
                                2-Oct-2019
                            </div>
                            <div class="full-date-task">
                                <div class="project-details">
                                    <div class="project-name">Rexweb</div>
                                    <div class="task-name">Create  Home page </div>
                                     <div class="task-detail">Doing html with slider and some task of responsive.</div>
                                    <div class="spending-hours">
                                        Spending hours <span>4 hrs</span>
                                    </div>

                                </div>
                                <div class="project-details">
                                    <div class="project-name">Wisdom</div>
                                    <div class="task-name">Create login Home page </div>
                                     <div class="task-detail">Doing html with slider and some task of responsive.</div>
                                    <div class="spending-hours">
                                        Spending hours <span>4 hrs</span>
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
        MonthlyData: state.CtrProjectManagement.getMonthlyData,
        //Timelog: state.CtrDashboard.getDashboardTimeLogData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMonthlyData: () => dispatch(actionCreator.getMonthlyDataAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(monthlyView);
