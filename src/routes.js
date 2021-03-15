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
import TimelineNew from "views/Timeline/TimelineNew"


  export function resetGlobalRoutes() {
    routes.splice(1, routes.length -1);
  }


var routes = [
  {
    path: "/new",
    pathInBrowser: "/new",
    name: "Add New Timeline",
    queryString: "",
    icon: "ni ni-list-67 text-primary",
    component: TimelineNew,
    layout: "/timeline",
    id: 'NewTimeline-1'
  }/*,
   {
    path: "/index",
    name: "Sample",
    icon: "ni ni-list-67 text-primary",
    component: Index,
    layout: "/timeline"
  },
  {
    path: "/icons",
    name: "Medical History",
    icon: "ni ni-list-67 text-blue",
    component: Icons,
    layout: "/timeline"
  },
  {
    path: "/maps",
    name: "Family Timeline",
    icon: "ni ni-list-67 text-orange",
    component: Maps,
    layout: "/timeline"
  }, 
  {
    path: "/new",
    name: "Blank Timeline",
    icon: "",
    component: TimelineBlank,
    layout: "/timeline"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  }*/
];
export default routes;
