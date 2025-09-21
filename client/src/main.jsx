import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DonationProvider } from "./contexts/DonationContext";
import App from "./App";
import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <DonationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DonationProvider>
  </AuthProvider>
);
