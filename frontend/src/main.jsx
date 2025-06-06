
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store , persistor} from "./redux/store.js";
import "./index.css";
import { Toaster } from "./components/ui/sonner";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
 
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster theme="light" />
      </PersistGate>
    </Provider>
 
);
