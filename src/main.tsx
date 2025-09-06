import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import SuccessModal from "./components/SuccessModal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
      <SuccessModal />
    </Provider>
  </StrictMode>
);
