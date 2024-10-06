import apiRequest from "@/lib/apiRequest";
import { createContext, useContext, useEffect, useState } from "react";

interface ProductsContextType {
  latestProducts: any,
  prdCategories: any,
  setPrdCategories: any
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a Products Provider");
  }
  return context;
};

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [latestProducts, setLatestProducts] = useState<any>(null);
  const [prdCategories, setPrdCategories] = useState<any>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const cachedProducts = localStorage.getItem("latestProducts");
      const cachedCategories = localStorage.getItem("prdCategories");

      if (cachedProducts && cachedCategories) {
        setLatestProducts(JSON.parse(cachedProducts));
        setPrdCategories(JSON.parse(cachedCategories));
      } else {
        try {
          const productRes = await apiRequest.get(`/products?page=1&limit=8`);
          const newProducts = productRes.data;
          setLatestProducts(newProducts);
          localStorage.setItem("latestProducts", JSON.stringify(newProducts));

          const categoryRes = await apiRequest.get("/products/categories/get");
          const newCategories = categoryRes.data;
          setPrdCategories(newCategories);
          localStorage.setItem("prdCategories", JSON.stringify(newCategories));
        } catch (err: any) {
          console.log("Error fetching products or categories:", err);
        }
      }
    };

    fetchInitialData();
  }, []);

  return (
    <ProductsContext.Provider value={{ latestProducts, prdCategories, setPrdCategories }}>
      {children}
    </ProductsContext.Provider>
  );
};
