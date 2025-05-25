import { useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import EntryPage from "./pages/EntryPage";
import Mainlayout from "./layout/Mainlayout";
import LedgerAccounts from "./pages/LedgerAccounts";
import LedgerEntry from "./pages/LedgerEntry";

const appRouter = createBrowserRouter([
  {
    path : "/",
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
          <Login />
        ),
      },

      {
        path: "ledger",
        element: (
          <LedgerAccounts />
        ),
      },

      {
        path: "ledger/:aid",
        element: (
          <LedgerEntry />
        ),
      }
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
