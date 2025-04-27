import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import "@material/web/all.js"; // registra todos los componentes
import "./styles/index.css";
import "./styles/styles.css";

import "@material/web/iconbutton/icon-button.js";

function main() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <App />,
    },
  ]);
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
}

main();
