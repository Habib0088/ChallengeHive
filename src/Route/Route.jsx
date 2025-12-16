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
import ManageUsers from "../Component/Dashboard/ManageUsers/ManageUsers";
import CreatorRoute from "./CreatorRoute";
import AddContest from "../Component/Dashboard/AddContest/AddContest";
import MyContestPage from "../Component/Dashboard/MyContestPage/MyContestPage";
import EditContest from "../Component/Dashboard/EditContest/EditContest";
import ManageContest from "../Component/Dashboard/ManageContest/ManageContest";
import ContestDetails from "../Component/ContestDetails/ContestDetails";
import AllContests from "../Component/Contest/AllContests/AllContests";
import PaymentSuccess from "../Component/Payment/PaymentSuccess/PaymentSuccess";
import Submission from "../Component/Dashboard/Submission/Submission";
import UserRoute from "../Route/UserRoute"
import MyParticipatedContests from "../Component/Dashboard/MyParticipatedContests/MyParticipatedContests";
import MyWinningContests from "../Component/Dashboard/MyWinningContests/MyWinningContests";
import Profile from "../Component/Dashboard/Profile/Profile";
import UpdateProfile from "../Component/Dashboard/Profile/UpdateProfile";
import Error from "../Component/Error/Error";
import HomeLayout from "../Pages/HomeLayout/HomeLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    Component:Layout,
    children:[
        {
            index:true,
            Component:HomeLayout
         
        },{
          path:'/allContests',
          Component:AllContests
        },
        {
        path:'/contestDetails/:id',
        // Component:ContestDetails
        element:<PrivateRoute><ContestDetails></ContestDetails></PrivateRoute>
      },{
        path:'/paymentSuccess',
        element:<PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute>
      },{
        path:'/*',
        Component:Error
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

      },
    ]
  },{
    path:'/dashboard',
    Component:DashboardLayout,
    children:[
      {
        index:true,
        Component:DashboardHome
      },{
          path:'/dashboard/beContestCreator',
         element:<PrivateRoute><BeContestCreator></BeContestCreator></PrivateRoute>
        },
      {
        path:'/dashboard/approveCreators',
        // Component:ApproveCreators
        element:<PrivateRoute><AdminRoute><ApproveCreators></ApproveCreators></AdminRoute></PrivateRoute>
      },{
        path:'/dashboard/manageUsers',
        element:<PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>
      },{
        path:'/dashboard/addContest',
        element:<PrivateRoute><CreatorRoute><AddContest></AddContest></CreatorRoute></PrivateRoute>
      },{
        path:'/dashboard/myContestPage',
        element:<PrivateRoute><CreatorRoute><MyContestPage></MyContestPage></CreatorRoute></PrivateRoute>

      },{
        path:'/dashboard/editContest/:id',
        element:<PrivateRoute><CreatorRoute><EditContest></EditContest></CreatorRoute></PrivateRoute>
      },{
        path:'/dashboard/manageContest',
        element:<PrivateRoute><AdminRoute><ManageContest></ManageContest></AdminRoute></PrivateRoute>
      },{
        path:'/dashboard/submission/:id',
        element:<PrivateRoute><CreatorRoute><Submission></Submission></CreatorRoute></PrivateRoute>
      },{
        path:'/dashboard/myContest',
        element:<PrivateRoute><UserRoute><MyParticipatedContests></MyParticipatedContests></UserRoute></PrivateRoute>
      },{
        path:'/dashboard/myWinningContests',
        element:<PrivateRoute><UserRoute><MyWinningContests></MyWinningContests></UserRoute></PrivateRoute>
      },{
        path:"/dashboard/Profile",
        element:<PrivateRoute><UserRoute><Profile></Profile></UserRoute></PrivateRoute>
      },{
        path:'/dashboard/updateProfile',
        element:<PrivateRoute><UserRoute><UpdateProfile></UpdateProfile></UserRoute></PrivateRoute>
      }
    ]
  }
 
]);