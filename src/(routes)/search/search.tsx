import apiRequest from "@/lib/apiRequest";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CgSpinnerTwo } from "react-icons/cg";
import Card from "@/components/card/card";
import { Product } from "@/types/product";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { title } = useParams();

  const fetchSearch = async () => {
    setLoading(true);
    try {
      const res = await apiRequest.get(`/products/search/${title}`);
      setProducts(res.data.product);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearch();
  }, [title]);

  return (
    <div className="flex flex-col justify-center items-center gap-4 px-4 py-16 min-h-[63vh]">
      <h1 className="text-zinc-950 text-2xl font-bold uppercase text-center">
        You've searched for: {title}
      </h1>
      {loading ? (
        <div className="h-full w-full flex justify-center items-center flex-1">
          <CgSpinnerTwo className="w-6 h-6 animate-spin mx-auto" />
        </div>
      ) : !loading && products.length === 0 ? (
        <p className="text-3xl my-8 font-bold">No Products found!!!</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 px-8 pt-12 justify-items-center justify-center">
          {products.map((product: Product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;