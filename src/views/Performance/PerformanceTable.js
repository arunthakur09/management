import React from "react";
import { connect } from 'react-redux';
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from "react-router-dom";
import "../../assets/css/Theme/Main.css";

class PerformanceTable extends React.Component {
    constructor() {
        super()
        this.state = {
            viewData: {}
        }
    }

    componentDidMount = () => {
        this.props.getPerformanceData()
    }

    viewDetail = (viewData) => {
        this.setState({ viewData })
    }

    handleSwitchChange = (data,isActive) => {
        
        const dataisActive = {
            id:data.id,
            name: data.name,
            percentage: data.percentage,
            isActive:isActive
        };
        this.props && this.props.updatePerformisActiveData(dataisActive);
    };
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
            { Header: "Name", accessor: "name",
            Cell : props =>
                <div className="client"  data-toggle="modal" data-target="#viewprofile" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)} >
                    <span className='name'>{props.original.name}</span>
                </div>,
                style: {
                    textAlign: "center",
                    marginLeft: "0px"
                },
            },
            { Header: "Percentage", accessor: "percentage",
                style: {
                    textAlign: "center",
                    marginLeft: "0px"
                },
            },
            { Header: "IsActive", accessor:"isActive",
            Cell : props =>
            <div className="form-group">
                <label className="switch"
                onClick={() => this.handleSwitchChange(props.original,props.original.isActive ===1 ? 0 : 1)}>
                <input type="checkbox" name="isActive"
                checked={props.original.isActive }/>
                <span className="slider round"></span>
                </label>
            </div>,
                style: {
                    textAlign: "center",
                    marginLeft: "0px"
                },
            },
            { Header: "Actions",
                Cell: props => {
                    return (
                        <ul className="table-actions">
                            <span><Link to="#" className="fa fa-eye" data-toggle="modal" data-target="#viewprofile" title="" data-original-title="View" onClick={() => this.viewDetail(props.original)}></Link></span>
                            <span><Link to={{ pathname: `/performance/edit/${props.original.id}`}} className="fa fa-edit" title="" data-original-title="Copy"></Link></span>
                            <span><Link to="#" className="fa fa-trash-o text-danger" data-toggle="modal" data-target="#delete" title="delete" data-original-title="delete"></Link></span>
                        </ul>
                    )
                },
                style: {
                    textAlign: "center",
                    marginLeft: "0px",
                    justifyContent: "center",
                    display: "flex"
                },
            },
        ]

        return (
            <div className="mainPanel">
                <div className="page-content-inner">
                    <div className="page-header">
                        <div className="main-title"><strong>Performance List</strong></div>
                        <ul className="page-top-actions">
                            <li><Link to="/performance/add" className="green">Add Performance</Link></li>
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
                                data={this.props.performanceData.data}
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
                                        <div className="user-name">{this.state.viewData.name}</div>
                                    </div>
                                    <div className="heading">
                                        <strong>Details :</strong>
                                    </div>
                                    <div className="user-details using-details">
                                        <div className="user-details-list">
                                        <div className="name">Percentage</div>
                                            <span>{this.state.viewData.percentage}</span>
                                        </div>
                                        <div className="user-details-list">
                                        <div className="name">Status</div>
                                            <span>{this.state.viewData.isActive === 1 ? "True" : "False" }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-gray btn-sm" data-dismiss="modal">Back</button>
                                
                                    <Link to={{ pathname: `/performance/edit/${this.state.viewData.id}`}} title="" data-original-title="Copy">
                                    <button type="button" className="btn btn-edit btn-sm" data-toggle="modal" data-target="#viewprofile">Edit</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade modal-theme" id="delete" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body close-on-body">
                                <p>Are you really want to archive this entry?</p>
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
    const data = state.CtrPerformance.getPerforData
    return {
        performanceData: data
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        getPerformanceData: () => dispatch(actionCreator.getPerformance()),
        updatePerformisActiveData: (data) => dispatch(actionCreator.updatePerformisActiveData(data)),
        
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceTable);
