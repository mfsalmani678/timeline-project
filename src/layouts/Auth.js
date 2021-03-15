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
import { Route } from "react-router-dom";
// reactstrap components
import { Container, Row } from "reactstrap";
// core components
import LoginMain from "views/Login/LoginMain";


class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <div className="main-content">
          {/* <AuthNavbar /> */}
          {/* Page content */}
          <Container className="mt-4 pb-0">
            <Row className="justify-content-center">
              <LoginMain style={{ boxShadow: "0px 32px 96px rgba(0, 0, 0, 0.3)", background: "#FFFFFF" }} logo={{
                imgSrc: require("assets/img/login/login-logo.png"),
                imgAlt: "...",
                styles: {height: "68.13px", width: "170.98px"}
                }} />
            </Row>
          </Container>
        </div>
        {/* <AuthFooter /> */}
      </>
    );
  }
}

export default Auth;
