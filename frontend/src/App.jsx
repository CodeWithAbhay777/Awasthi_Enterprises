import react from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import EntryPage from "./pages/EntryPage";
import Mainlayout from "./layout/Mainlayout";
import LedgerAccounts from "./pages/LedgerAccounts";
import LedgerEntry from "./pages/LedgerEntry";
import { ProtectedRoutes, AuthenticatedUser } from "./layout/ProtectedRoutes";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: (
          
            <EntryPage />
          
        ),
      },

      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },

      {
        path: "ledger",
        element: (
          <ProtectedRoutes>
            <LedgerAccounts />
          </ProtectedRoutes>
        ),
      },

      {
        path: "ledger/:aid",
        element: (
          <ProtectedRoutes>
            <LedgerEntry />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
