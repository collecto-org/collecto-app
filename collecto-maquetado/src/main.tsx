import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// src/main.tsx
import "@material/web/all.js"; // registra todos los componentes
import "./index.css";
import "./styles/styles.css";
import "@material/web/iconbutton/icon-button.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
