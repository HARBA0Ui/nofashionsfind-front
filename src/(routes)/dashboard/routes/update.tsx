import apiRequest from "@/lib/apiRequest";
import { useEffect, useState } from "react";
import { HiMiniCursorArrowRays } from "react-icons/hi2";
import { AiFillCheckCircle } from "react-icons/ai";

import { Link, useParams } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { useProducts } from "@/context/products-context";
import { Edit } from "lucide-react";

const UpdateProduct = () => {
  const { id } = useParams();
  const { prdCategories } = useProducts();

  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState();
  const [category, setCategory] = useState("");

  const [success, setSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [mainLoading, setMainLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !desc || !price) {
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("category", category);
      //addimages
      if (images.length > 0) {
        Array.from(images).forEach((img) => formData.append("images", img));
      }
      const res = await apiRequest.put(`/products/${id}`, formData);
      console.log(res);
      // window.location.reload();

      setSuccess(true);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSuccess(false);
      }, 2500);
    }
  };

  useEffect(() => {
    const getProductById = async () => {
      try {
        setMainLoading(true);
        const res = await apiRequest.get("/products/" + id);
        setProduct(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setPrice(res.data.price);
        setCategory(res.data.category);
      } catch (err) {
        console.log(err);
      } finally {
        setMainLoading(false);
      }
    };

    getProductById();
  }, []);

  return (
    <div className="flex flex-col w-full items-center min-h-[76vh]">
      <h1 className="text-5xl mb-6">Update a product</h1>
      {mainLoading ? (
        <CgSpinner className="w-5 h-5 animate-spin" />
      ) : (
        <div className="flex flex-row-reverse items-center gap-x-16">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-xl mb-1">Current Image:</h2>
            <img src={product?.imgs[0]} className="w-[350px]" />
          </div>
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
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
                      value={price}
                      onChange={(e) => setPrice(parseFloat(e.target.value))}
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
                            <p className="text-sm">
                              (click/drop to change them)
                            </p>
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
                      Update
                      {isLoading && (
                        <CgSpinner className="w-5 h-5 animate-spin" />
                      )}
                    </button>
                  </td>
                </tr>
                {success && (
                  <tr>
                    <td className="flex-1"></td>
                    <td className="w-full">
                      <div className="bg-green-700 px-4 py-4 text-white w-full text-md font-bold text-center">
                        The Product has been updated successfully!
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
