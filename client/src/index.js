import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { CurrentUserProvider } from "./component/CurrentUserContext";

//require("dotenv").config({ path: "../.env" });
require("dotenv").config();

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
  >
    <CurrentUserProvider>
    <App />
    </CurrentUserProvider>
  </Auth0Provider>,

  document.getElementById("root")
);

//  <React.StrictMode>    </React.StrictMode>,
