import apiRequest from "@/lib/apiRequest";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";



const DashProduct = ({ products, product, setProducts }: any) => {

  const deleteProduct= async () => {
    setProducts(products.filter((p: any) => p.id !== product.id));
    await apiRequest.delete(`/products/${product.id}`)
  }


  return (
    <div className="mx-auto !rounded-[.5rem] bg-white shadow-md py-4 text-center text-lg flex justify-between items-center w-[750px] border border-zinc-700">
      <div id="image" className=" w-1/4 overflow-hidden flex justify-center">
        <img src={product.imgs[0]} className="w-20 h-24 object-cover" />
      </div>
      <div className="w-1/4">{product.title}</div>
      <div className="w-1/4">
        {product.price} <span className="font-semibold">T.N.D</span>
      </div>
      <div className="flex gap-4 w-1/4 justify-center">
        <Link
          to={`/dashboard/update/${product.id}`}
          className=" p-2 rounded-full bg-pinky hover:bg-darkPruple transition-all hover:scale-105"
        >
          <AiFillEdit className="h-6 w-6 pointer-events-none" />
        </Link>
        <div 
          className=" p-2 rounded-full bg-pinky hover:bg-darkPruple transition-all hover:scale-105 cursor-pointer" onClick={deleteProduct}
        >
          <AiFillDelete className="h-6 w-6 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default DashProduct;
