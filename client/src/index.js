import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/form_styles.css";
import "./styles/home_page.css";
import "./styles/margins.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/auth";
import {CartProvider} from "./context/cart";
import {SearchProvider} from "./context/search";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
        <SearchProvider>
            <CartProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </CartProvider>
        </SearchProvider>
    </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
