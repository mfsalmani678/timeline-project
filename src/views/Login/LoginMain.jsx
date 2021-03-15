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
  // Button,
  Card,
  // CardHeader,
  CardBody,
  // FormGroup,
  // Form,
  // Input,
  // InputGroupAddon,
  // InputGroupText,
  // InputGroup,
  Row,
  Col
  // Nav
} from "reactstrap";

import LoginForm from 'views/Login/LoginForm';
import SignupForm from 'views/Signup/SignupForm';


class LoginMain extends React.Component {

  //##################### COMPONENT STATE ##############################
 state= {
   loginForm: true,
   signupForm: false
 }
  //####################### COMPONENT SETTERS + STATE UPDATION ########################################################################################################

  //######################### COMPONENT UTILITIES ########################################################################################################

  //############## COMPONENT MAIN HANDLER ########################################################################################################
  toggleLoginForm = (event) => {
    this.setState({loginForm: false, signupForm: true})
  }
  toggleSignupForm = (event) => {
    this.setState({signupForm: false, loginForm: true})
  }
  //######################### COMPONENT LIFECYCLE HOOKS ########################################################################################################

  render() {
    return (
      <>
        <Col lg="10" md="7">
          <Card className="border-0" style={this.props.style}>
            <CardBody style={{padding: 0}}>

              <Row>
                <Col lg="6" style={{padding: "2.5rem", flex: "1 1 auto", paddingBottom: "0rem"}}>
                  {this.state.loginForm === true &&
                    <LoginForm  toggleLoginForm={this.toggleLoginForm} logo={this.props.logo}/>
                  }
                  {this.state.signupForm === true &&
                   <SignupForm toggleSignupForm={this.toggleSignupForm} logo={this.props.logo}/>
                  }
                </Col>
                <Col lg="6" className="bg-login-col">
                  <div >
                    &nbsp;
                  </div>
                </Col>
              </Row>

            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default LoginMain;
