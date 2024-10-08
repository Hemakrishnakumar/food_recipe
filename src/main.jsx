import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { RecipeContext } from "./context/RecipeContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <RecipeContext>
        <App />
      </RecipeContext>
    </StrictMode>
  </BrowserRouter>
);
