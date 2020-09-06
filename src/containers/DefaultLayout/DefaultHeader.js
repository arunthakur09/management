import React from 'react';
import { Nav, NavItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import "../../assets/css/containerStyle/defaultLayoutStyle/CompStyle.css";
import logo from '../../assets/img/brand/management_logo.png'
// import sygnet from '../../assets/img/brand/sygnet.svg';
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
const editLogout ={
  textDecoration:'none',
  cursor:'pointer',
  backgroundColor:'rgb(105, 105, 105)',
  color:'white'
}
const editLogOut ={
  textDecoration:'none',


}
class DefaultHeader extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* <ToastContainer autoClose={3000} /> */}
        <AppNavbarBrand className="logo"
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'CoreUI Logo' }} />

        <AppSidebarToggler className="d-md-down-none side-button" display="lg" />
                
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/dashboard" className="nav-link" >Dashboard</Link>
          </NavItem>
          <NavItem>
            <Link to="/logOut"  style={editLogOut}><Button className="btn-logout" style={editLogout} onClick={() => this.props.loginAuthData()}><i class="fa fa-power-off" aria-hidden="true"></i></Button></Link>
            </NavItem>
        </Nav>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
      loginAuthData: () => dispatch(actionCreator.logoutAuthAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader);
