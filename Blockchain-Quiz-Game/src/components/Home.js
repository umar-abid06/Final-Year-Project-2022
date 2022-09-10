import React from "react";
import CentredGrid from "./CentredGrid";

const Home = () => {
  return <CentredGrid />;
};

export default Home;

// import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Center from "./Center";

// const Home = () => {

//   const navigation = useNavigate();
//   return (
//     <Card sx={{ maxWidth: 640, mx: "auto", mt: 20 }}>
//       <CardContent>
//         <Center>
//           <Box mt={5} xs={{ align: "center" }}>
//             <Typography>Welcome to the Quiz Game!</Typography>
//             <Typography>Play & Win an NFT!</Typography>
//             <Box mt={5}>
//               <Button onClick={() => navigation("/quiz")} variant="contained">
//                 Click here to Play!
//               </Button>
//             </Box>
//           </Box>
//         </Center>
//       </CardContent>
//     </Card>
//   );
// };

// export default Home;
