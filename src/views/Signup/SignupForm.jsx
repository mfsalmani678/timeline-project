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

import SimpleReactValidator from 'simple-react-validator';
import LoginService from 'service/LoginService.js';

class SignupForm extends React.Component {

  //##################### COMPONENT STATE ##############################
  state= {
    signedup: false,
    signUpInProgress: false,
    emailId: '',
    password: '',
    firstName: '',
    lastName:'',
    message: '',
    signUpError: ''
  }
 
  //####################### COMPONENT EVENTS ########################################################################################################


  //######################### COMPONENT UTILITIES ########################################################################################################

  signupComponentCallback = (response) => {
    if(response.success === true) {
       this.setState({
         signedUp: true,
         signUpInProgress: false,
         emailId: '',
         password: '',
         firstName: '',
         lastName:'',
         message: 'Signup Successfull. Login and start sharing your story',
         signUpError: ''
       });
       setTimeout(() => {this.props.toggleSignupForm()}, 2000);
    } else {
      this.setState({
        ...this.state,
        signedUp: false,
        signUpInProgress: false,
        message: '',
        signUpError: 'Something gone wrong, please try again later'
      });
    }
  }

  showProgressIndication () {
    if(this.state.signUpInProgress === true) {
      return <i className="fas fa-sync fa-spin"></i>;
    }
  }

  //############## COMPONENT MAIN HANDLER ########################################################################################################

  signUpHandler = () => {
    if(this.validator.allValid()) {
        this.setSignupInProgress(true);
        LoginService.getInstance().doSignUp({...this.state}, this.signupComponentCallback);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  //########################### STATE SETTER METHODS ##############################################################################################################

  setSignupInProgress(newSignUpProgress) {
    const updatedState = {...this.state, signUpInProgress : newSignUpProgress};
    this.setState(updatedState);
  }

  setFirstName = (event) => {
    this.setState({...this.state,firstName:event.target.value});
  }

  setLastName = (event) => {
    this.setState({...this.state,lastName:event.target.value});
  }


  setEmailAddress = (event) => {
    this.setState({...this.state,emailId:event.target.value});
  }


  setPassword = (event) => {
    this.setState({...this.state,password:event.target.value});
  }

  //######################### COMPONENT LIFECYCLE HOOKS ########################################################################################################
  
  constructor() {
    super();
    this.validator = new SimpleReactValidator();
  }

  render() {
    return (
      <>
        
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
                    <span style={{fontFamily: "Inter", fontStyle: "normal", fontWeight: 800, fontSize: "44px", lineHeight: "50px", letterSpacing: "-0.03em", color: "#78909C", mixBlendMode: "normal", opacity: 0.9}}>
                      SignUp
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
                  {this.state.signUpError.length > 1 && <div class="text-danger"> <i className="fas fa-exclamation-triangle"></i> {this.state.signUpError} </div>}
                  {this.state.message.length > 1 && <div class="text-danger"> <i className="fas fa-check-circle"></i> {this.state.message} </div>}
                  <FormGroup>
                  <InputGroup className="input-group-alternative" style={{border: "1px solid #78909C", boxSizing: "border-box", boxRadius: "4px"}}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i className="fas fa-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="First Name" type="text" value={this.state.firstName} onChange={this.setFirstName}  autoComplete="first-name" />
                  </InputGroup>
                  {this.validator.message('first name', this.state.firstName, 'required', { className: 'text-danger' })}
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative" style={{border: "1px solid #78909C", boxSizing: "border-box", boxRadius: "4px"}}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i className="fas fa-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Last Name" type="text" value={this.state.lastName} onChange={this.setLastName}  autoComplete="last-name" />
                  </InputGroup>
                  {this.validator.message('last name', this.state.lastName, 'required', { className: 'text-danger' })}
                </FormGroup>
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
                    <Input placeholder="Set Password" type="password"  value={this.state.password} onChange={this.setPassword} autoComplete="new-password"/>
                  </InputGroup>
                  {this.validator.message('password', this.state.password, 'required', { className: 'text-danger' })}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                  
                  <Button  onClick={this.signUpHandler} className="my-4" type="button" disabled={this.state.signUpInProgress} style={{width: "100%", background: "#78909C", borderRadius: "4px", color: "#FFFFFF"}}>
                      {this.showProgressIndication()} &nbsp; Sign Up
                  </Button >
              </Col>
            </Row>
            <Row>
              <Col>
                  &nbsp;
              </Col>
            </Row>
            <Row>
              <Col>
                  <span style={{fontFamily: "Inter", fontStyle: "normal", fontWeight: "bold", fontSize: "14px", lineHeight: "20px", display: "flex", alignItems: "center", color: "#859BA6"}}>
                      Already have an account? <a href="javascript:void(0)" onClick={this.props.toggleSignupForm} className="text-muted"><u>Click here.</u></a>
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
                  <span className="mt-0" style={{fontFamily: "Inter", fontStyle: "normal", fontWeight: "normal", fontSize: "14px", lineHeight: "20px", display: "flex", alignItems: "center", color: "#859BA6"}}>
                      Copyright 2021 Jared Stanley All rights reserved.
                  </span>
              </Col>
            </Row>
      </>
    );
  }
}

export default SignupForm;
