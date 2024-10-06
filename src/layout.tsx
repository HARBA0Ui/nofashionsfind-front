import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/footer/footer";
import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";

import AuthContextProvider from "./context/auth-context";
import { SidebarProvider } from "./context/sidebar-context";
import { ProductsProvider } from "./context/products-context";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId:
    "AazQGWvU4e5CkMNWRHQeq9T_hKTVJtIQ3J8ZwW9dPz5fERhZ9bfo0z4zstPdWsQ0xtnSWkT0XkVAG-dO",
  currency: "TND",
  intent: "capture",
};


const Layout = () => {
  const location = useLocation();

  return (
    <PayPalScriptProvider options={initialOptions}>
      <AuthContextProvider>
        <SidebarProvider>
          <ProductsProvider>
            {location.pathname != "/" &&
              !location.pathname.startsWith("/dashboard") && <Navbar />}
            <Sidebar />
            <Outlet />
            <Footer />
          </ProductsProvider>
        </SidebarProvider>
      </AuthContextProvider>
    </PayPalScriptProvider>
  );
};

export default Layout;
