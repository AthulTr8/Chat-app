import React from "react";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const DashboardLayout = () => {


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
