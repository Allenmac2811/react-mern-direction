import React from "react";
import ReactDOM from "react-dom";
import { Helmet } from "react-helmet";

import "./index.css";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
<Helmet>
  <link rel="manifest" href="../public/manifest.json" />
  <link rel="icon" href="../public/direction.png" />
</Helmet>;
