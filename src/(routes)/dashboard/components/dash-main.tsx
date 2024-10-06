import DashProduct from "./dash-product";
import { Link } from "react-router-dom";
import { CgMathPlus, CgSearch, CgSpinner } from "react-icons/cg";
import { useEffect, useState } from "react";
import apiRequest from "@/lib/apiRequest";

const DashMain = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [more, setMore] = useState(true);
  const limit = 8;
  const [page, setPage] = useState(1);

  const [searchField, setSearchField] = useState("");
  const [error, setError] = useState("");

  // Fetch initial data when the component is mounted
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const res = await apiRequest.get(`/products?page=1&limit=${limit}`);
      const newProducts = res.data;
      setProducts(newProducts);
      setPage(1);
      setMore(newProducts.length === limit); // Check if there is more data to load
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch more data for pagination
  const fetchMoreData = async () => {
    try {
      setLoadingMore(true);
      const res = await apiRequest.get(
        `/products?page=${page + 1}&limit=${limit}`
      );
      const newProducts = res.data;

      // Filter out duplicates before setting state
      const uniqueNewProducts = newProducts.filter(
        (newProduct: any) =>
          !products.some((product) => product.id === newProduct.id)
      );

      setProducts((prevProducts) => [...prevProducts, ...uniqueNewProducts]);
      setPage((prevPage) => prevPage + 1);
      if (newProducts.length < limit) {
        setMore(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Fetch initial data on mount
  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (searchField === "") {
      await fetchInitialData();
    } else {
      try {
        const res = await apiRequest.get(`/products/search/${searchField}`);
        setProducts(res.data.product);
        setMore(false); // Assume no pagination for search results
      } catch (err: any) {
        console.log(err);
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <h1 className="text-center text-6xl mb-10">Products</h1>
      <div className="flex justify-between items-center w-[90vw] lg:w-[700px] mx-auto">
        <Link
          to="/dashboard/create"
          className="bg-zinc-950 text-white hover:bg-zinc-800 flex gap-2 text-md items-center px-4 py-2 rounded-tr-md rounded-bl-md transition-all w-[150px] md:w-[250px]"
        >
          <CgMathPlus className="w-7 h-7 text-white rounded-full p-1" /> Create
          a new product
        </Link>
        <form onSubmit={handleSearch}>
          <div className="flex items-center bg-zinc-950 text-white gap-4 h-fit py-2 text-sm px-2 rounded-tl-md rounded-br-md hover:bg-zinc-800 transition-all duration-300">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent w-full placeholder:text-gray-300"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />
            <button
              type="submit"
              className="cursor-pointer transition-all rounded-full flex justify-center items-center text-darkPurple bg-zinc-900"
            >
              <CgSearch className="w-8 h-7 bg-white text-zinc-950 rounded-full p-1 pr-2" />
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-y-6 py-12">
        {loading ? (
          <CgSpinner className="w-5 h-5 animate-spin mx-auto" />
        ) : (
          products?.map((p) => (
            <DashProduct
              products={products}
              product={p}
              setProducts={setProducts}
              key={p?.id}
            />
          ))
        )}
        {!loading && more && !loadingMore && (
          <button
            onClick={fetchMoreData}
            className="group flex items-center gap-1 m-auto mt-6 py-3 px-6 bg-zinc-950 text-white"
          >
            Load More
          </button>
        )}
        {loadingMore && <CgSpinner className="w-5 h-5 animate-spin mx-auto" />}
      </div>
    </>
  );
};

export default DashMain;
