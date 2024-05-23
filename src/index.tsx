import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./app/App";
import "./index.scss";

// Get the root element
const rootElement = document.getElementById('root');

// Check if the root element exists
if (rootElement) {
  // Create a root
  const root = ReactDOM.createRoot(rootElement);
  
  // Render the app
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
