import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CardMedia,
  Chip,
  List,
  ListItem,
  Typography,
  Box,
} from "@material-ui/core";
import { palette } from "@material-ui/system";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { Box } from "@mui/system";
// import { BASE_URL } from "../api";
// import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
// import { red, green, grey } from "@mui/material/colors";

export default function Answer({ qnAnswers }) {
  const [expanded, setExpanded] = useState(false);
  const [seeAns, setSeeAns] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const markCorrectOrNot = (qna, idx) => {
    if ([qna.answer, qna.selected].includes(idx)) {
      return { style: { color: qna.answer == idx ? "#228B22" : "#E62900" } };
    }
  };
  const seeAnswers = () => {
    setSeeAns(!seeAns);
  };
  return (
    <>
      <Box
        style={{ marginTop: 35, width: "100%", maxWidth: 640, margin: "auto" }}
      >
        {seeAns ? (
          <>
            <Box style={{ margin: 10 }}>
              <Button
                variant="contained"
                style={{ margin: 1, backgroundColor: "#2596be" }}
                size="large"
                onClick={seeAnswers}
                color="primary"
              >
                Hide Answers
              </Button>
            </Box>
            {qnAnswers.map((item, j) => (
              <Accordion
                disableGutters
                key={j}
                expanded={expanded === j}
                onChange={handleChange(j)}
                // style={{ backgroundColor: "#5f97ff" }}
              >
                <AccordionSummary
                // expandIcon={
                //   <ExpandMoreIcon
                //     style={{
                //       color:
                //         item.answer == item.selected ? "#228B22" : "#E62900",
                //     }}
                //   />
                // }
                >
                  <Typography style={{ width: "90%", flexShrink: 0 }}>
                    {item.qnInWords}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {item.imageName
                    ? {
                        /* <CardMedia
                      component="img"
                      image={BASE_URL + "images/" + item.imageName}
                      sx={{ m: "10px auto", width: "auto" }}
                    /> */
                      }
                    : null}
                  <List>
                    {item.options.map((x, i) => (
                      <ListItem key={i}>
                        <Typography {...markCorrectOrNot(item, i)}>
                          <b>{String.fromCharCode(65 + i) + ". "}</b>
                          {x}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        ) : (
          <>
            <Box style={{ margin: 10 }}>
              <Button
                variant="contained"
                style={{ margin: 1, backgroundColor: "#2596be" }}
                size="large"
                onClick={seeAnswers}
                color="secondary"
              >
                See Answers
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
