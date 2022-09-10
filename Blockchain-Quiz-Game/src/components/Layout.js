import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Outlet, useNavigate } from "react-router";
import useStateContext from "../hooks/useStateContext";

export default function Layout() {
  const { resetContext } = useStateContext();
  const navigate = useNavigate();

  const logout = () => {
    resetContext();
    navigate("/");
  };

  return (
    <>
    <div className="">
      <div position="sticky" style={{ background: "#111926", boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 10px 0px"}}>
        <Toolbar
          style={{
            // width: "100%",
            marginHorizontal: 10,
            justifyContent: "space-around",
          }}
        >
          <Typography variant="h6" align="left" style={{ flexGrow: 1 }}>
            Meta Quiz
          </Typography>
          <Button style={{ color: "white"}} onClick={logout}>
            QUIT
          </Button>
        </Toolbar>
      </div>
      <div>
        <Outlet />
      </div>
      </div>
    </>
  );
}
