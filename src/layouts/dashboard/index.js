import React from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const isAutenticated = true
const DashboardLayout = () => {

  if (!isAutenticated) {
    return <Navigate to={"/auth/login"} />
  }

  return (
    <>
      <Stack direction="row" sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        {/* SideBar */}
        <SideBar />
        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardLayout;
