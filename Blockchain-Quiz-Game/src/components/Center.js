import { Grid } from "@material-ui/core";
import React from "react";

const Center = ({ children }) => {
  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      xs={{ minHeight: "100vh" }}
    >
      <Grid item xs={1}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Center;
