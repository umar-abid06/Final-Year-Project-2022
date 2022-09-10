import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Image from "../images/racing_image.png";
import ButtonBase from "@material-ui/core/ButtonBase";
import "./style.css";
import "./result.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflowY: "hidden",
  },
  paper: {
    backgroundColor: "#162238",
    padding: theme.spacing(1),
    margin: "auto",
    maxWidth: "100%",
    height: "auto",
    color: "#FFFFFF",
  },
  image: {
    top: 0,
    marginRight: 50,
    width: 628,
    height: "100%",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));
export default function CenteredGrid() {
  const navigation = useNavigate();
  const classes = useStyles();
  return (
    <div className="container">
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sm
              container
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                item
                xs
                container
                direction="column"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs>
                  <Typography variant="h2">
                    MetaQuiz
                  </Typography>
                  <Typography variant="h4">
                    Play and Win NFTs
                  </Typography>
                  <Button
                    style={{ backgroundColor: "#26ddf2", color: "#111926" }}
                    variant="contained"
                    onClick={() => navigation("/quiz")}
                    color="primary"
                  >
                    Play Now
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <ButtonBase
                className={classes.image}
                justifyContent="flex-start"
                alignItems="center"
              >
                <img className={classes.img} alt="complex" src={Image} />
              </ButtonBase>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}
