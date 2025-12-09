import React from "react";
import Restriction from "../Component/Restriction/Restriction";
import useRole from "../hook/useRole";
// import useRole from "../hook/useRole";
// import Restriction from "../Component/Restriction/Restriction";

const CreatorRoute = ({ children }) => {
  const {role} = useRole(); 
  console.log(role);
  
  if (role !== "creator") {
    return <Restriction />;
  }
  return children;
};


export default CreatorRoute;
