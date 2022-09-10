import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@material-ui/core";
import { ContextProvider } from "./hooks/useStateContext";
import * as serviceWorker from './serviceWorker';

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

ReactDOM.render(
  <ContextProvider>
    <BrowserRouter>
      {/* <ThemeProvider theme={darkTheme}> */}
        {/* <CssBaseline /> */}
        <App />
      {/* </ThemeProvider> */}
    </BrowserRouter>
  </ContextProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();


// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.css'
// import App from './components/App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
