import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>
      <div className="h-6 bg-blue-600 w-full" />
      <div className="max-w-5xl mx-auto pt-10">
        <App />
      </div>
    </div>
  </React.StrictMode>
);
