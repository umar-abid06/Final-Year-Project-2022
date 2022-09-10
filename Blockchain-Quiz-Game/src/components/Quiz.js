import "./style.css";

import React, { useEffect, useState } from "react";
// import { createAPIEndpoint, ENDPOINTS, BASE_URL } from "../api";
import useStateContext from "../hooks/useStateContext";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  List,
  ListItemText,
  Typography,
  Box,
  LinearProgress,
  Container,
} from "@material-ui/core";
import { getFormatedTime } from "../helper";
import { useNavigate } from "react-router";

const Question = [
  {
    qnId: 1,
    qnInWords: "What is the biggest race track in usa?",
    imageName: null,
    options: [
      "Circuit de la Sarthe",
      "Adelaide Street Circuit",
      "Indianapolis Motor Speedway",
      "Shanghai International Circuit",
    ],
  },
  {
    qnId: 2,
    qnInWords: "Who was the first Formula One champion?",
    imageName: null,
    options: [
      "Giuseppe Farina",
      "Jim Clark",
      "Micheal Schumacher",
      "John Fangio",
    ],
  },
  {
    qnId: 3,
    qnInWords: "Who was the first automobile racer to exceed 200 miles (320 km) per hour?",
    imageName: null,
    options: ["Sabine Schmitz", "Malcolm Campbell", "Enzo Ferrari", "Henry Segrave"],
  },
  {
    qnId: 4,
    qnInWords: "What 24-hour sportscar race was originally called the Grand Prix de Vitesse et d’Endurance?",
    imageName: null,
    options: [
      "24 Hours of Daytona",
      "Monaco Grand",
      "24 Hours of Le Mans",
      "None",
    ],
  },
  {
    qnId: 5,
    qnInWords: "Which pair of brothers combined to win the Indianapolis 500 race seven times?",
    imageName: null,
    options: [
      "AI and Bobby Unser",
      "A.J and Larry",
      "Kyle and Kurt Busch",
      "None",
    ],
  },
];
export default function Quiz() {
  const [qns, setQns] = useState([]);
  const [qnIndex, setQnIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const { context, setContext } = useStateContext();
  const navigate = useNavigate();

  let timer;

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, [1000]);
  };

  useEffect(() => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    setQns(Question);
    startTimer();
    // createAPIEndpoint(ENDPOINTS.question)
    //     .fetch()
    //     .then(res => {
    //         setQns(res.data)
    //         startTimer()
    //     })
    //     .catch(err => { console.log(err); })

    return () => {
      clearInterval(timer);
    };
  }, []);

  const updateAnswer = (qnId, optionIdx) => {
    const temp = [...context.selectedOptions];
    temp.push({
      qnId,
      selected: optionIdx,
    });
    if (qnIndex < 4) {
      setContext({ selectedOptions: [...temp] });
      setQnIndex(qnIndex + 1);
    } else {
      setContext({ selectedOptions: [...temp], timeTaken });
      navigate("/result");
    }
  };

  return qns.length != 0 ? (
    <div
      className="quiz-start"
      style={{
        ".MuiContainer-root": {
          paddingLeft: 0,
          paddingRight: 0,
        },
      }}
    >
      <CardHeader
        className="time-score"
        title={"Question " + (qnIndex + 1) + " of 5"}
        action={
          <Typography className="timer">
            {getFormatedTime(timeTaken)}
          </Typography>
        }
      />
      <Box>
        <LinearProgress
          variant="determinate"
          value={((qnIndex + 1) * 100) / 5}
        />
      </Box>
      {qns[qnIndex].imageName != null
        ? {
            /* <CardMedia
          component="img"
          image={BASE_URL + "images/" + qns[qnIndex].imageName}
          sx={{ width: "auto", m: "10px auto" }}
        /> */
          }
        : null}
      <CardContent>
        <Typography variant="h6">{qns[qnIndex].qnInWords}</Typography>
        <List>
          {qns[qnIndex].options.map((item, idx) => (
            <ListItemText
              className="single-options"
              disableRipple
              key={idx}
              onClick={() => updateAnswer(qns[qnIndex].qnId, idx)}
            >
              <div>
                <b>{String.fromCharCode(65 + idx) + " . "}</b>
                {item}
              </div>
            </ListItemText>
          ))}
        </List>
      </CardContent>
    </div>
  ) : null;
}
