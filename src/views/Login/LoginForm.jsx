/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  // Card,
  // CardHeader,
  // CardBody,
  FormGroup,
  // Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Nav
} from "reactstrap";

import { Redirect } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import LoginService from 'service/LoginService.js';

class LoginForm extends React.Component {

  //##################### COMPONENT STATE ##############################
  state= {
    loggedIn: false,
    loginInProgress: false,
    tokenid: '',
    emailId: '',
    password: '',
    loginError: ''
  }
 
  //####################### COMPONENT EVENTS ########################################################################################################

  setEmailAddress = (event) => {
    this.setStateEmailId(event.target.value);
  }

  setPassword = (event) => {
    this.setStatePassword(event.target.value);
  }

  //######################### COMPONENT UTILITIES ########################################################################################################

  loginSuccessful() {
    if(this.state.loggedIn === true) {
      return <Redirect from="/" to="/timeline/main" />
    }
  }

  showProgressIndication () {
    if(this.state.loginInProgress === true) {
      return <i className="fas fa-sync fa-spin"></i>;
    }
  }

  //############## COMPONENT MAIN HANDLER ########################################################################################################

  loginHandler = () => {
    if(this.validator.allValid()) {
      
        this.setLoginInProgress(true);
        let loginService = LoginService.getInstance();
        loginService.doLogin({
              "email": this.state.emailId, //"abc@test.com"
              "password": this.state.password//"test123"
          }, this.loginComponentCallback);
       

    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  loginComponentCallback = (loginResponseFromService) => {
    if(loginResponseFromService.success === true) {
      this.setState({...this.state, loggedIn: true, tokenid: loginResponseFromService.data.tokenid, loginInProgress: false});
    } else {
      this.setState({...this.state, loggedIn: false, loginInProgress: false, loginError: "Invalid Email-ID/Password"});
    }
  }

  //########################### STATE SETTER METHODS ##############################################################################################################

  setLoginInProgress(newLoginInProgress) {
    const updatedState = {...this.state, loginInProgress : newLoginInProgress};
    this.setState(updatedState);
  }

  setStateEmailId(newEmailId) {
    const updatedState = {...this.state, emailId: newEmailId};
    this.setState(updatedState);
  }

  setStatePassword(newPassword) {
    const updatedState = {...this.state, password: newPassword};
    this.setState(updatedState);
  }

  //######################### COMPONENT LIFECYCLE HOOKS ########################################################################################################
  
  constructor() {
    super();
    this.validator = new SimpleReactValidator();
  }

  render() {
    return (
      <>
        {this.loginSuccessful()}
        <Row>
              <Col>
                  <Nav>
                    <img alt="..." className="navbar-brand-img" src={this.props.logo.imgSrc} style={this.props.logo.styles}/>
                  </Nav>
              </Col>
            </Row>
            <Row>
              <Col>
                  &nbsp;
              </Col>
            </Row>
            <Row>
              <Col>
                  &nbsp;
              </Col>
            </Row>
            <Row>
              <Col>
                  <span style={{fontFamily: "Inter", fontStyle: "normal", fontWeight: 800, fontSize: "30px", lineHeight: "38px", letterSpacing: "-0.03em", color: "#78909C", mixBlendMode: "normal", opacity: 0.9}}>
                      Welcome to CNTXT
                  </span>
                  <br/>
                  <span style={{fontFamily: "Inter", fontStyle: "normal", fontWeight: "normal", fontSize: "14px", lineHeight: "20px", color: "#78909C", opacity: 0.7}}>
                    Tell your story
                  </span>
              </Col>
            </Row>
            <Row>
              <Col>
                  &nbsp;
              </Col>
            </Row>
            <Row>
              <Col>
                  &nbsp;
              </Col>
            </Row>
            <Row>
              <Col>
                    <span style={{fontFamily: "Inter", fontStyle: "normal", fontWeight: 800, fontSize: "44px", lineHeight: "50px", letterSpacing: "-0.03em", color: "#78909C", mixBlendMode: "normal", opacity: 0.9}}>
                      Login
                  </span>
              </Col>
            </Row>
            <Row>
              <Col>
                  {this.state.loginError.length > 1 && <div class="text-danger"> <i class="fas fa-exclamation-triangle"></i> {this.state.loginError} </div>}

                  <FormGroup className="mb-3 mt-2">
                    <InputGroup className="input-group-alternative" style={{border: "1px solid #78909C", boxSizing: "border-box", boxRadius: "4px"}}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email" type="email" value={this.state.emailId} onChange={this.setEmailAddress}  autoComplete="new-email"/>
                    </InputGroup>
                    {this.validator.message('email', this.state.emailId, 'required|email', { className: 'text-danger' })}
                  </FormGroup>
                  <FormGroup>
                  <InputGroup className="input-group-alternative" style={{border: "1px solid #78909C", boxSizing: "border-box", boxRadius: "4px"}}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" value={this.state.password} onChange={this.setPassword} autoComplete="new-password"/>
                  </InputGroup>
                  {this.validator.message('password', this.state.password, 'required', { className: 'text-danger' })}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="6" sm="6" xs="6" md="6">
                  <input id="customCheckLogin" type="checkbox" />
                  <label htmlFor=" customCheckLogin" style={{fontFamily: "Inter", fontStyle: "normal", fontWeight: "normal", fontSize: "14px", lineHeight: "20px", display: "inline", alignItems: "center", color: "#859BA6"}}>
                    <span>&nbsp;Remember me</span>
                  </label>
                  
              </Col>
              <Col lg="6" sm="6" xs="6" md="6">
                  <label style={{fontFamily: "Inter", fontStyle: "normal", fontWeight: "normal", fontSize: "14px", lineHeight: "20px", display: "inline", alignItems: "center", color: "#859BA6"}}>
                    <span>&nbsp;Forget Password?</span>
                  </label>
              </Col>
              
            </Row>
            <Row>
              <Col>
                  
                  <Button  onClick={this.loginHandler} className="my-4" type="button" disabled={this.state.loginInProgress} style={{width: "100%", background: "#78909C", borderRadius: "4px", color: "#FFFFFF"}}>
                      {this.showProgressIndication()} &nbsp; Login
                  </Button >
              </Col>
            </Row>
            <Row>
              <Col>
                  <span style={{fontFamily: "Inter", fontStyle: "normal", fontWeight: "bold", fontSize: "14px", lineHeight: "20px", display: "flex", alignItems: "center", color: "#859BA6"}}>
                      Don't have an account? <a href="javascript:void(0)" onClick={this.props.toggleLoginForm} className="text-muted"><u>Create One.</u></a>
                  </span>
              </Col>
            </Row>
            <Row>
              <Col>
                  &nbsp;
              </Col>
            </Row>
            <Row>
              <Col>
                  &nbsp;
              </Col>
            </Row>
            <Row>
              <Col>
                  &nbsp;
              </Col>
            </Row>
            <Row>
              <Col>
                  <span className="mt-0" style={{fontFamily: "Inter", fontStyle: "normal", fontWeight: "normal", fontSize: "14px", lineHeight: "20px", display: "flex", alignItems: "center", color: "#859BA6"}}>
                      Copyright 2021 Jared Stanley All rights reserved.
                  </span>
              </Col>
            </Row>
      </>
    );
  }
}

export default LoginForm;
