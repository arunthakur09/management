import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from "react-redux";
import * as actionCreator from "../../Redux/Actions/ActionTypes/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const editHeader ={
  marginTop:'100px'
}
const styleContainer ={
  marginTop:'30px'
}
class LogOut extends Component {
    constructor (props) {
        super (props)
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("userRole")
        let loggedIn = true
        if (token == null && userId == null) {
          loggedIn = false
        }
        // For remove log-out Token
        localStorage.removeItem("token")
        localStorage.removeItem("userRole")
        localStorage.removeItem("roleId");
        
        this.state ={
          loggedIn,
          username: "",
          usernameMinMessage: null,
          usernameMaxMessage: null,
          usernameMessage: null,
          password: "",
          passMessage : null,
          passGood : null,
          passHidden: true
        }
    }
    handleUsername = (key, value) => {
      this.setState({ [key]: value });
      // if (!Regex.emailRegex.test(this.state.username)) {
      //     this.setState ({
      //         usernameMessage: "Enter Correct Email Address",
      //         usernameMinMessage: null,
      //         usernameMaxMessage: null
      //     })
      // }
      // else {
      //     if(this.state.username.length < 2) {
      //         this.setState ({
      //             usernameMessage: null,
      //             usernameMinMessage: "Username Should be min 3 character",
      //             usernameMaxMessage: null
      //         })
      //     }
      //     else {
      //         if (this.state.username.length > 14) {
      //             this.setState({
      //                 usernameMessage: null,
      //                 usernameMaxMessage: "Username Should not be max 15 character",
      //                 usernameMinMessage: null
      //             })
      //         }
      //         else {
      //             this.setState({
      //                 usernameMessage: null,
      //                 usernameMinMessage: null,
      //                 usernameMaxMessage: null
      //             })
      //         }
      //     }
      // }
  }

  handlePassword = (key, value) => {
      this.setState({ [key]: value });
      // if(this.state.password.length < 5) {
      //     this.setState({
      //         passMessage : "Password must be greater than 6 characters",
      //         passGood: null
      //     })
      // }
      // else {
      //     this.setState({
      //         passMessage : null
      //     });
      //     if(!Regex.passwordRegex.test(this.state.password)) {
      //         this.setState({
      //             passMessage : "Password Contain Only Number",
      //             passGood: null
      //         });
      //     }
      //     else {
      //         if (this.state.password.length >= 5) {
      //             this.setState({
      //                 passGood : "Password Strength: Good"
      //             })
      //         }
      //         else {
      //             this.setState({
      //                 passGood : null
      //             });
      //         }
      //     }
      // }
  }

  submitForm = (e) => {
      e.preventDefault()
      const data = {
          email: this.state.username,
          password: this.state.password
      }
      this.props.loginAuthData(data)
  }
  render() {    
    return (
      <div className="animated fadeIn" style={{textAlign: "center"}}>
        <div style={editHeader}><h1>You are succesfully logged out!</h1></div>
            <div className="app flex-row align-items-center" style={{minHeight: "0"}}>
              <ToastContainer autoClose={3000} />
                <Container style={styleContainer}>
                  <Row className="justify-content-center">
                    <Col md="8">
                      <CardGroup>
                        <Card className="p-4">
                          <CardBody>
                            <Form onSubmit={this.submitForm}>
                              <h1>Login</h1>
                                <p className="text-muted">Sign In to your account</p>
                                <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="icon-user"></i>
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" placeholder="Username" autoComplete="username"
                                  onChange={event => this.handleUsername("username", event.target.value)} value={this.state.username} />
                                    <span className="validation-error" style={{color:"red"}}>{this.state.usernameMessage}</span>
                                    <span className="validation-error" style={{color:"red"}}>{this.state.usernameMinMessage}</span>
                                    <span className="validation-error" style={{color:"red"}}>{this.state.usernameMaxMessage}</span>
                                </InputGroup>
                                <InputGroup className="mb-4" style={{marginTop: "35px"}}>
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="icon-lock"></i>
                                    </InputGroupText>
                                 </InputGroupAddon>
                                 <Input type={ this.state.passHidden ? 'password' : 'text' } placeholder="Password" autoComplete="current-password"
                                  value={this.state.password} onChange={event => this.handlePassword("password", event.target.value)} />
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                          <div className="icon-parts" onClick={() => this.setState({ passHidden: !this.state.passHidden }) } >
                                            <i className={ this.state.passHidden ? 'fa fa-eye-slash' : 'fa fa-eye' }
                                              style={{ fontSize: 16, color: '#C4C4C4', cursor: 'pointer' }} />
                                          </div>
                                       </InputGroupText>
                                    </InputGroupAddon>
                                    <span className="validation-error" style={{color:"red"}}>{this.state.passMessage}</span>
                                    <span className="validation-error" style={{color:"SteelBlue"}}>{this.state.passGood}</span>
                                </InputGroup>
                                <Row style={{marginTop: "35px"}}>
                                  <Col xs="6">
                                    <Button value="Submit" color="primary" className="px-4 login-Custombtn">Login</Button>
                                  </Col>
                                  <Col xs="6" className="text-right">
                                    <Button color="link" className="px-0">Forgot password?</Button>
                                  </Col>
                                </Row>
                              </Form>
                            </CardBody>
                          </Card>
                          <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                            <CardBody className="text-center">
                              <div>
                                <img src="themes/images/logo.png" alt="logo" />
                              </div>
                            </CardBody>
                          </Card>
                        </CardGroup>
                      </Col>
                    </Row>
                 </Container>
              </div>
            </div>
    );
  }
}
const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
      loginAuthData: (data) => dispatch(actionCreator.loginAuthAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);

