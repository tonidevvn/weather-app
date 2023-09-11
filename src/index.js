import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppContextProvider } from "./store/AppContext";
import MainLayout from "./layouts/MainLayout";
import AddNewProduct from "./views/Product/AddNewProduct";
import Products from "./views/Product/Products";
import ErrorPage from "./views/Error/ErrorPage";
import About from "./views/About";
import Weather from "./views/Weather";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Weather />,
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
