import {
  // Alert
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@material-ui/core";
// import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { createAPIEndpoint, ENDPOINTS } from "../api";
import { getFormatedTime } from "../helper";
import useStateContext from "../hooks/useStateContext";
// import { green } from "@mui/material/colors";
import Answer from "./Answer";
import image from "../images/result.png";
import Web3 from "web3";
import MemoryToken from "../abis/MemoryToken.json";
import * as fs from "fs";

const path = require("path");

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
    answer: 2,
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
    answer: 0,
  },
  {
    qnId: 3,
    qnInWords:
      "Who was the first automobile racer to exceed 200 miles (320 km) per hour?",
    imageName: null,
    options: [
      "Sabine Schmitz",
      "Malcolm Campbell",
      "Enzo Ferrari",
      "Henry Segrave",
    ],
    answer: 3,
  },
  {
    qnId: 4,
    qnInWords:
      "What 24-hour sportscar race was originally called the Grand Prix de Vitesse et d’Endurance?",
    imageName: null,
    options: [
      "24 Hours of Daytona",
      "Monaco Grand",
      "24 Hours of Le Mans",
      "None",
    ],
    answer: 2,
  },
  {
    qnId: 5,
    qnInWords:
      "Which pair of brothers combined to win the Indianapolis 500 race seven times?",
    imageName: null,
    options: [
      "AI and Bobby Unser",
      "A.J and Larry",
      "Kyle and Kurt Busch",
      "None",
    ],
    answer: 0,
  },
];

export default function Result() {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [qnAnswers, setQnAnswers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [token, setToken] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [tokenURIs, setTokenURI] = useState([]);
  const [data, setData] = useState("");
  const [btnState, setBtnState] = useState(0);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    setBtnState(1);
    await fetch("/delete")
      .then((res) => res.json())
      .then((data) => setData(data.msg));
    const web3 = window.web3;
    var accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    //Load smart contract
    const networkId = await web3.eth.net.getId();
    const networkData = MemoryToken.networks[networkId];
    if (networkData) {
      const abi = MemoryToken.abi;
      const address = networkData.address;

      const token1 = new web3.eth.Contract(abi, address);
      setToken(token1);
      setTotalSupply(await token1.methods.totalSupply().call());
      //Load tokens
      let balanceOf = await token1.methods.balanceOf(accounts[0]).call();
      for (let i = 0; i < balanceOf; i++) {
        let id = await token1.methods
          .tokenOfOwnerByIndex(accounts[0], i)
          .call();
        let tokenURI = await token1.methods.tokenURI(id).call();

        // setTokenURI(await token.methods.tokenURI(id).call());
        setTokenURI([...tokenURIs, tokenURI]);
      }
      // await token1.methods.mint(
      //   account,
      //   'carYellow'
      // )
      // .send({ from: account })
      // .on('transactionHash', (hash) => {
      //   setTokenURI({
      //     tokenURIs: [...tokenURIs, 'carYellow']
      //   })
      // })
      if (score == 5 && context.timeTaken < 10) {
        console.log(token1.address);
        await token1.methods
          .mint(accounts[0], "/images/" + data)
          .send({ from: accounts[0] })
          .on("transactionHash", (hash) => {
            setTokenURI({
              tokenURIs: [...tokenURIs, "/images/" + data],
            });
          });
      }
    } else {
      alert("Smart contract not deployed to detected network.");
    }
  };

  //   const deleteFile = async () => {

  //     await fetch("/delete")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.msg));
  // }

  useEffect(() => {
    const ids = context.selectedOptions.map((x) => x.qnId);

    const qna = context.selectedOptions.map((x) => ({
      ...x,
      ...Question.find((y) => y.qnId == x.qnId),
    }));
    setQnAnswers(qna);
    calculateScore(qna);
    fetch("/get")
      .then((res) => res.json())
      .then((data) => setData(data.file));
  }, []);

  const calculateScore = async (qna) => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer == curr.selected ? acc + 1 : acc;
    }, 0);
    setScore(tempScore);
  };

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    navigate("/quiz");
  };

  const getNFT = async () => {};

  return (
    <div>
      <Card
        style={{
          paddingTop: 20,
          display: "flex",
          maxWidth: 640,
          margin: "auto",
          background: "rgb(17, 25, 38)",
          color: "white",
          marginTop: "2rem",
        }}
      >
        <Box style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          {score != 5 && (
            <CardContent style={{ flex: "1 0 auto", textAlign: "center" }}>
              <Typography variant="h6">YOUR SCORE</Typography>
              <Typography variant="h5" style={{ fontWeight: 600 }}>
                <Typography variant="span" style={{ color: "#228B22" }}>
                  {score}
                </Typography>
                /5
              </Typography>
              <Typography variant="h6">
                Took {getFormatedTime(context.timeTaken) + " mins"}
              </Typography>
              <Typography variant="h5">Better Luck Next Time 👍</Typography>

              {/* <Button
                variant="contained"
                style={{ margin: 10 }}
                size="small"
                // onClick={submitScore}
              >
                Submit
              </Button> */}
              <Button
                variant="contained"
                style={{ margin: 10, backgroundColor: "#2596be" }}
                size="small"
                onClick={restart}
                color="secondary"
              >
                Play Again
              </Button>
              {/* <Alert
                severity="success"
                variant="string"
                sx={{
                  width: "60%",
                  m: "auto",
                  visibility: showAlert ? "visible" : "hidden",
                }}
              >
                Score Updated.
              </Alert> */}
            </CardContent>
          )}
          {score == 5 && (
            <CardContent style={{ flex: "1 0 auto", textAlign: "center" }}>
              <Typography variant="h6">YOUR SCORE</Typography>
              <Typography variant="h5" style={{ fontWeight: 600 }}>
                <Typography variant="span" style={{ color: "#228B22" }}>
                  {score}
                </Typography>
                /5
              </Typography>
              <Typography variant="h6">
                Took {getFormatedTime(context.timeTaken) + " mins"}
              </Typography>
              <Typography variant="h4">Congratulations 🎉</Typography>
              <Typography variant="h6">You Win An NFT</Typography>

              {/* <Button
                variant="contained"
                style={{ margin: 10 }}
                size="small"
                // onClick={submitScore}
              >
                Submit
              </Button> */}
              {btnState == 0 && (
                <Button
                  color="primary"
                  variant="contained"
                  style={{ margin: 10 }}
                  size="small"
                  onClick={async () => {
                    await loadWeb3();
                    await loadBlockchainData();
                    // await deleteFile();
                  }}
                >
                  Click to get an NFT
                </Button>
              )}
              {btnState == 1 && (
                <Button
                  color="primary"
                  variant="contained"
                  style={{ margin: 10 }}
                  size="small"
                  onClick={restart}
                >
                  Play Again
                </Button>
              )}
              {/* <Alert
                severity="success"
                variant="string"
                sx={{
                  width: "60%",
                  m: "auto",
                  visibility: showAlert ? "visible" : "hidden",
                }}
              >
                Score Updated.
              </Alert> */}
            </CardContent>
          )}
        </Box>
        <CardMedia component="img" style={{ width: 220 }} image={image} />
      </Card>
      <div>
        <Answer qnAnswers={qnAnswers} />
      </div>
    </div>
  );
}
