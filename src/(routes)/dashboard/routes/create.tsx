import { useProducts } from "@/context/products-context";
import apiRequest from "@/lib/apiRequest";
import { Edit} from "lucide-react";
import {  useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { HiMiniCursorArrowRays } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";

const CreateProduct = () => {
  const { prdCategories } = useProducts();

  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [newCategry, setNewCategory] = useState("");

  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(images);
    console.log("category: ", category);
    if (!title || !desc || !price || !category) {
      return;
    }
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("category", category);
      Array.from(images).forEach((img) => formData.append("images", img));

      const res = await apiRequest.post("/products", formData);
      console.log(res);

      setTitle("");
      setDesc("");
      setPrice("");
      setCategory("all");
      setImages([]);

      setSuccess(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSuccess(false);
      }, 2500);
    }
  };

  return (
    <div className="flex flex-col w-full items-center min-h-[76vh]">
      <h1 className="text-5xl mb-6">Create a new product</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td className="p-2 mb-1">
                <label htmlFor="title">Title</label>
              </td>
              <td className="py-2 mb-1 w-[550px]">
                <input
                  type="text"
                  className="border-2 h-16 w-full px-4 border-zinc-900 rounded-[.5rem] pl-4 mr-10 placeholder:text-zinc-700 text-zinc-900"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="p-2 mb-1">
                <label htmlFor="desc">Description</label>
              </td>
              <td className="py-2 mb-1 w-[550px]">
                <textarea
                  className="border-2 h-36 w-full p-4 border-zinc-900 rounded-[.5rem] pl-4 mr-10 placeholder:text-zinc-700 text-zinc-900 resize-none"
                  id="desc"
                  name="desc"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="p-2 mb-1">
                <label htmlFor="category">Category</label>
              </td>
              <td className="py-2 pb-5 mb-1 w-[550px] flex items-center">
                {!prdCategories ? (
                  <span className="w-full h-full">
                    <CgSpinner className="w-6 h-6 animate-spin " />
                  </span>
                ) : (
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border-2 h-16 w-full px-4 border-zinc-900 rounded-[.5rem] pl-4 placeholder:text-zinc-700 text-zinc-900"
                    required
                  >
                    {prdCategories?.map((cat: any) => (
                      <option
                        className="capitalize"
                        value={cat.title}
                        key={cat.id}
                      >
                        {cat.title}
                      </option>
                    ))}
                  </select>
                )}
                <Link to="/dashboard/categories">
                  <Edit className="w-12 h-12 p-3 bg-black rounded-full text-white ml-2" />
                </Link>
              </td>
            </tr>
            <tr>
              <td className="p-2 mb-1">
                <label htmlFor="price">Price</label>
              </td>
              <td className="py-2 pb-5 mb-1 w-[550px]">
                <input
                  className="border-2 h-16 w-full px-4 border-zinc-900 rounded-[.5rem] pl-4 mr-10 placeholder:text-zinc-700 text-zinc-900"
                  type="number"
                  id="price"
                  name="price"
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  value={price}
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="p-2 mb-1">
                <label htmlFor="images">Images</label>
              </td>
              <td className="mb-1" id="fileTd">
                <input
                  type="file"
                  name="images"
                  id="images"
                  multiple
                  onChange={(e) => setImages(e.target.files)}
                  required
                />
                <div id="fileOverlay" className="hover:bg-zinc-300 w-full">
                  {images.length == 0 ? (
                    <>
                      Upload/Drop new images
                      <HiMiniCursorArrowRays className="w-9 h-9 mt-2" />
                    </>
                  ) : (
                    <div className="flex items-center flex-col gap-2">
                      <span className="flex flex-col items-center">
                        Files uploaded successfully{" "}
                        <p className="text-sm">(click/drop to change them)</p>
                      </span>
                      <AiFillCheckCircle className="w-10 h-10 text-pinky" />
                    </div>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td className="flex-1"></td>
              <td className="flex justify-center my-4 py-3">
                <button
                  type="submit"
                  className="bg-black px-4 py-3 text-white w-full h-16 text-md font-bold uppercase hover:tracking-widest transition-all flex justify-center items-center gap-4 rounded-xl "
                >
                  Create
                  {isLoading && <CgSpinner className="w-5 h-5 animate-spin" />}
                </button>
              </td>
            </tr>
            {success && (
              <tr>
                <td className="flex-1"></td>
                <td className="w-full">
                  <div className="bg-green-700 px-4 py-4 text-white w-full text-md font-bold text-center">
                    The Product has been created successfully!
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default CreateProduct;
