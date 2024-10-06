import { useProducts } from "@/context/products-context";
import apiRequest from "@/lib/apiRequest";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";

const Categories = () => {
  const { prdCategories, setPrdCategories } = useProducts();
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);

  const addCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    try {
      e.preventDefault();
      if (!newCategory) {
        throw new Error("No Category has been added!!");
      }

      const res = await apiRequest.post("/products/categories", {
        title: newCategory,
      });

      setPrdCategories((prev: any) => {
        const updatedCategories = [...prev, { id: res.data.id, title: newCategory }];
        localStorage.setItem(
          "prdCategories",
          JSON.stringify(updatedCategories)
        );

        return updatedCategories;
      });

      // window.location.reload()
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setNewCategory("");
    }
  };

  const handleDelete = async (id: any) => {
    console.log("id", id)
    try {
      setDelLoading(true);
      const res = await apiRequest.delete(`/products/categories/${id}`);

      setPrdCategories((prev: any) => {
        const updatedCategories = prev.filter((cat: any) => cat.id != id);
        localStorage.setItem(
          "prdCategories",
          JSON.stringify(updatedCategories)
        );

        return updatedCategories;
      });
      // window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setDelLoading(false);
    }
  };
  return (
    <>
      <div className="mb-6">
        <h1 className="text-5xl mb-6">Categories</h1>

        {prdCategories?.map((cat: any) => (
          <div className="flex items-center gap-x-3 max-w-[300px] mb-2">
            <h2 className="text-xl flex-1">{cat.title}</h2>
            <div
              className=" p-2 rounded-full bg-pinky hover:bg-darkPruple transition-all hover:scale-105 cursor-pointer"
              onClick={() => handleDelete(cat.id)}
            >
              <AiFillDelete className="h-6 w-6 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={addCategory}>
        <input
          type="text"
          placeholder="New Category..."
          name="newCategory"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border border-black p-2 px-4 h-16 mr-3 w-[350px] rounded-xl placeholder:text-black/75 bg-transparent"
          required
        />
        <button
          className="bg-black text-white px-4 py-2 rounded-[.5rem] text-sm h-16 w-[350px] block mt-6 flex justify-center items-center gap-x-3"
          type="submit"
        >
          Add {loading && <CgSpinner className="w-5 h-5 animate-spin" />}
        </button>
      </form>
    </>
  );
};

export default Categories;
