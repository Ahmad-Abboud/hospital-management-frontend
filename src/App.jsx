import React from "react";
import AppRoutes from "./AppRoutes";
import { Provider } from "react-redux";
import store from "./redux/store"; // Path to your store configuration

function App() {
  return (
    <>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </>
  );
}

export default App;
