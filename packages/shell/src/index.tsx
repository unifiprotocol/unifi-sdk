import React from "react";
import ReactDOM from "react-dom";
import Shell from "./Shell";
import reportWebVitals from "./reportWebVitals";
import { Sample } from "./Sample";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Shell Wrapped={Sample} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
