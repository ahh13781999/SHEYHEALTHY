import React from "react"
import { Provider } from "react-redux"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import store from "./redux/store.jsx"
import { CookiesProvider } from "react-cookie"
import 'remixicon/fonts/remixicon.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>
)
