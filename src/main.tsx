import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import Layout from "./layout";
import Products from "./(routes)/products/products";
import ProductPage from "./(routes)/product-page/product-page";
import Dashboard from "./(routes)/dashboard/dashboard";
import CreateProduct from "./(routes)/dashboard/routes/create";
import DashMain from "./(routes)/dashboard/components/dash-main";
import Login from "./(routes)/login/login";
import Reset from "./(routes)/reset/reset";
import UpdateProduct from "./(routes)/dashboard/routes/update";
import ResetPass from "./(routes)/reset/reset-pass";
import Categories from "./(routes)/dashboard/routes/categories";
import Search from "./(routes)/search/search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "/products/:category",
        element: <Products />,
      },
      {
        path: "/search/:title",
        element: <Search />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/login",
        children: [
          {
            path: "",
            element: <Login />
          },
          {
            path: "reset",
            element: <Reset />,
          },
          {
            path: "new-pass/:id/:token",
            element: <ResetPass />,
          },
        ],
      },

      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <DashMain />,
          },
          {
            path: "create",
            element: <CreateProduct />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "update/:id",
            element: <UpdateProduct />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
