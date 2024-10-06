import Card from "@/components/card/card";
import apiRequest from "@/lib/apiRequest";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { useProducts } from "@/context/products-context";
import { useInView } from "react-intersection-observer";

const Products = () => {
  const { category } = useParams();
  const { latestProducts } = useProducts();

  console.log("category: ", category);

  const latestFourProducts = latestProducts?.slice(0, 4);

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [ref, inView] = useInView();

  useEffect(() => {
    // Reset the products and page number when the category changes
    setAllProducts([]);
    setPage(1);
    setHasMoreData(true);
  }, [category]);

  useEffect(() => {
    const fetchData = async () => {
      if (!inView || loading || !hasMoreData) return; // Avoid multiple fetches
      const limit = 10;
      
      try {
        setLoading(true);
        let res: any;
        if (category === "all") {
          res = await apiRequest.get(`/products?page=${page}&limit=${limit}`);
        } else {
          res = await apiRequest.get(
            `/products/category/${category}?page=${page}&limit=${limit}`
          );
        }

        if (res.data.length === 0) {
          setHasMoreData(false); // No more data to load
          return;
        }
        
        if (category === "all") {
          setAllProducts((prevProducts) => [...prevProducts, ...res.data]);
        } else {
            setAllProducts((prevProducts) => [...prevProducts, ...res.data.products]);
        }
        setPage((prevPage) => prevPage + 1);
      } catch (err: any) {
        console.log("Error fetching products or categories:", err);
        setError(err)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, inView, hasMoreData, page]);

  return (
    <section className="flex flex-col items-center">
      <h1 className="capitalize text-center text-5xl mt-7">{category}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 px-8 pt-12 justify-items-center justify-center">
          {loading && !allProducts.length ? (
            <CgSpinner className="w-6 h-6 animate-spin mx-auto" />
          ) : (
            allProducts?.map((p: any) => <Card product={p} key={p.id} />)
          )}
        </div>
      {loading && allProducts?.length > 0 && <CgSpinner className="w-6 h-6 animate-spin mx-auto" />}
      <div ref={ref} style={{ height: "60px" }}></div>
      {
        (!loading && allProducts.length == 0 && error  ) && <h2 className="text-3xl font-bold -mt-16 mb-20">No Products Found!</h2>
      }
      {/* Latest Products Section */}
      <div className="line w-[80%] md:w-[650px]"></div>
      <h1 className="text-center text-4xl md:text-5xl my-6 md:my-10">Our Latest Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-8 md:px-24 pb-12 justify-items-center justify-center">
        {latestFourProducts?.map((p: any) => (
          <Card product={p} key={p.id} />
        ))}
      </div>
    </section>
  );
};

export default Products;
