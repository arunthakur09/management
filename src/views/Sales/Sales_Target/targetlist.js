import React from "react";
import { connect } from 'react-redux';
import * as actionCreator from "../../../Redux/Actions/ActionTypes/index";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from "react-router-dom";

class DepartmentTable extends React.Component {
    constructor() {
        super()
        this.state = {
            viewData: {}
        }
    }

    componentDidMount = () => {
        this.props.getTargetData()
    }

    viewDetail = (viewData) => {
        this.setState({ viewData })
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
                width: 100,
                maxWidth: 100,
                minWidth: 100,
            },
            { Header: "Employee Name",
            Cell : props =>
                <div className="client"  data-toggle="modal" data-target="#viewprofile" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}>
                    <span className='departmentName'>{props.original.firstName+" "}{props.original.lastName}</span>
                </div>,
                style: {
                    textAlign: "center"
                },
            },
            { Header: "Employee Target", accessor: "employeeTarget",
            Cell : props =>
                <div title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}>
                    <span className='departmentName'>${props.original.employeeTarget}</span>
                </div>,
                style: {
                    textAlign: "center",
                },
            },
            { Header: "Actions",
                Cell: props => {
                    return (
                        <ul className="table-actions">
                            <span><Link to="#" className="fa fa-eye" data-toggle="modal" data-target="#viewprofile" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}></Link></span>
                            <span><Link to={{ pathname: `/sales/edit/${props.original.id}`}} className="fa fa-edit" title="" data-original-title="Copy"></Link></span>
                            <span><Link to="#" className="fa fa-trash-o text-danger" data-toggle="modal" data-target="#delete" title="delete" data-original-title="delete"></Link></span>
                        </ul>                        
                    )
                },
                style:{
                    justifyContent: "center",
                    display: "flex",
                    marginLeft:"0px"
                }
            },
        ]

        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Target List</strong></div>
                        <ul className="page-top-actions">
                            <li><Link to="/sales/add" className="green">Add Target</Link></li>
                            <li><Link to="/proposal/target">Sales Target Report</Link></li>
                        </ul>
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
                            data={this.props.targetData.data}
                            defaultPageSize={10}>
                        </ReactTable>
                        </div>
                    </div>
                </div>
                <div className="modal modal-right fade" id="viewprofile" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog view-pop " role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="title">View Details</div>
                                <button className="close" data-dismiss="modal"><i className="fa fa-times" aria-hidden="true" ></i></button>
                            </div>
                            <div className="modal-body">
                                <div className="user-view-box">
                                    <div className="user-bio">
                    <div className="user-name">{this.state.viewData.firstName+" "}{this.state.viewData.lastName}</div>
                    <div className="user-name" data-toggle="modal" data-target="#viewprofile" ><Link to={{ pathname: `/sales/target/${this.state.viewData.userId}`}}className="btn btn-theme">Target Record</Link></div>
                                    </div>
                                    <div className="user-details using-details">
                                        <div className="heading">
                                            Details :
                                        </div>
                                        <div className="user-details-list">
                                            Email
                                            <span>{this.state.viewData.email}</span>
                                        </div>
                                        <div className="user-details-list">
                                            Skills
                                            <span>{this.state.viewData.skills}</span>
                                        </div>
                                        <div className="user-details-list">
                                            D.O.B
                                            <span>{this.state.viewData.dob && this.state.viewData.dob.slice(0,10)}</span>
                                        </div>
                                        <div className="user-details-list">
                                            Employee Target
                                            <span>{this.state.viewData.employeeTarget}</span>
                                        </div>
                                        <div className="user-details-list">
                                            IsActive
                                            <span>{this.state.viewData.isActive === 1 ? "true" : "false"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-gray btn-sm" data-dismiss="modal">Back</button>
                                
                                    <Link to={{ pathname: `/sales/edit/${this.state.viewData.id}`}} title="" data-original-title="Copy">
                                    <button type="button" className="btn btn-edit btn-sm" data-toggle="modal" data-target="#viewprofile">Edit</button>
                                        </Link>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade modal-theme" id="delete" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body close-on-body">
                                <p>Department Status Deactivated</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-theme btn-sm" data-dismiss="modal">ok</button>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        )
    }
}

const mapStateToProps = state => {
    const data = state.CtrSalesTarget.TargetData
    return {
        targetData: data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTargetData: () => dispatch(actionCreator.getTargetDataAction())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentTable);
