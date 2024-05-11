import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { REDIRECT_URL } from "./utils/constants";
import 'react-datepicker/dist/react-datepicker';
const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: REDIRECT_URL }}
  >
    <App />
  </Auth0Provider>
);
