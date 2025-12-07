import { createBrowserRouter } from "react-router";

import AuthLayout from "../Component/Authentication/AuthLayout/AuthLayout";
import Registration from "../Component/Authentication/Registration/Registration";
// import LogIn from "../Component/Authentication/LogIn/Login.jsx";
import Home from "../Pages/HomeLayout/HomeLayout";
import LogIn from "../Component/Authentication/LogIn/LogIn";
import Layout from "../Component/Layout/Layout";
// import LogIn from "../Component/Authentication/LogIn/Login.jsx";



export const router = createBrowserRouter([
  {
    path: "/",
    Component:Layout,
    children:[
        {
            index:true,
            Component:Home
         
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
  }
 
]);