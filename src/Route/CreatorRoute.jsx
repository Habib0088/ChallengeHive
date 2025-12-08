import React from "react";
import Restriction from "../Component/Restriction/Restriction";
import useRole from "../hook/useRole";
// import useRole from "../hook/useRole";
// import Restriction from "../Component/Restriction/Restriction";

const CreatorRoute = ({ children }) => {
  const { role } = useRole();
  if (role !== "creator") {
    return <Restriction></Restriction>
  }
  return children;
};

export default CreatorRoute;
