import React from "react";
import useRole from "../hook/useRole";
import Restriction from "../Component/Restriction/Restriction";

const UserRoute = ({ children }) => {
  const { role } = useRole();
  if (role !== "user") {
    return <Restriction></Restriction>;
  }
  return children;
};

export default UserRoute;
