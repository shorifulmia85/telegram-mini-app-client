import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage";
import Earn from "../pages/Earn";
import Wheel from "../components/modules/task/Wheel";
import AuthGuard from "../utils/AuthGuard";
import { Role } from "../constants";
import type { TUser } from "../types";
import Leaderboard from "../pages/Leaderboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard allowRole={Role.USER as TUser}>
        <App />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        Component: HomePage,
      },

      {
        path: "earn",
        Component: Earn,
      },
      {
        path: "leaderboard",
        Component: Leaderboard,
      },
      {
        path: "spin",
        Component: Wheel,
      },
    ],
  },
]);
