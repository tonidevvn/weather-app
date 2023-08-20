import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./views/About";
import ErrorPage from "./views/ErrorPage";
import App from "./views/App";
import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import AddNewProduct from "./views/AddNewProduct";
import { AppContextProvider } from "./store/AppContext";
import Products from "./views/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "addNewProduct",
        element: <AddNewProduct />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppContextProvider>
    <RouterProvider router={router} />
    <ToastContainer />
  </AppContextProvider>
);
