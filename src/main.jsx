import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AOS from "aos";
import "./index.css";
import "animate.css";
import { AuthProvider } from "./context/AuthContext.jsx";

AOS.init();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
