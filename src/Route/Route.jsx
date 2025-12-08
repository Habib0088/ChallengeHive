import { createBrowserRouter } from "react-router";

import AuthLayout from "../Component/Authentication/AuthLayout/AuthLayout";
import Registration from "../Component/Authentication/Registration/Registration";
// import LogIn from "../Component/Authentication/LogIn/Login.jsx";
import Home from "../Pages/HomeLayout/HomeLayout";
import LogIn from "../Component/Authentication/LogIn/LogIn";
import Layout from "../Component/Layout/Layout";
import BeContestCreator from "../Component/BeContestCreator/BeContestCreator";
import DashboardLayout from "../Component/Dashboard/DashboardLayout/DashboardLayout";
import ApproveCreators from "../Component/Dashboard/ApproveCreators/ApproveCreators";
import DashboardHome from "../Component/Dashboard/DashboardHome/DashboardHome";
// import LogIn from "../Component/Authentication/LogIn/Login.jsx";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    Component:Layout,
    children:[
        {
            index:true,
            Component:Home
         
        },{
          path:'/beContestCreator',
         element:<PrivateRoute><BeContestCreator></BeContestCreator></PrivateRoute>
        }
    ]
  },
  {
    path: "/",
    Component:AuthLayout,
    children:[
      {
        path:'/registration',
        Component:Registration
      },{
        path:'/login',
        // Component:LogIn
        Component:LogIn

      }
    ]
  },{
    path:'/dashboard',
    Component:DashboardLayout,
    children:[
      {
        index:true,
        Component:DashboardHome
      },
      {
        path:'/dashboard/approveCreators',
        // Component:ApproveCreators
        element:<PrivateRoute><AdminRoute><ApproveCreators></ApproveCreators></AdminRoute></PrivateRoute>
      }
    ]
  }
 
]);