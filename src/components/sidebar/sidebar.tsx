import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

import styles from "./sidebar.module.css";
import { useSidebar } from "@/context/sidebar-context";
import { useProducts } from "@/context/products-context";
import { useState } from "react";

const Sidebar = () => {
  const { toggleSideBar, toggle } = useSidebar();
  const navigate = useNavigate();

  const { prdCategories } = useProducts();
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`search/${search}`);
    toggleSideBar();
  };

  return (
    <div
      className={`${
        styles.div
      } fixed inset-0 z-30 bg-zinc-950/50 transition-all 
       ${!toggle && "hidden"}
      `}
    >
      <ul
        className={`${styles.ul} relative z-40 bg-white h-full  text-xl space-y-7 transition-all flex flex-col justify-center items-center md:pl-[35%] lg:pl-[40%] xl:lg:pl-[45%]`}
      >
        <div onClick={toggleSideBar}>
          <X className="w-12 h-12 absolute top-12 right-12 text-zinc-950 cursor-pointer hover:rotate-90 duration-500 transition-all" />
        </div>
        <div
          className={`${styles.input} text-zinc-950 w-[270px] text-lg pb-1 flex md:hidden border-b-2 border-zinc-900 relative z-[9999999]`}
        >
          <form onSubmit={handleSubmit} className="flex">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search..."
              className="placeholder:text-zinc-950/65  text-zinc-950 w-full px-2"
            />
            <button type="submit">
              <Search className="cursor-pointer" />
            </button>
          </form>
        </div>
        <li className="text-3xl md:text-5xl text-zinc-950 hover:tracking-wider transition-all pt-4">
          <Link
            to={"/products/all"}
            className="kaush capitalize"
            onClick={toggleSideBar}
          >
            All Products
          </Link>
        </li>
        {prdCategories.map((cat: any) => (
          <li
            className="text-3xl md:text-5xl text-zinc-950 hover:tracking-wider transition-all"
            key={cat.id}
          >
            <Link
              to={`/products/${cat.title}`}
              className="kaush capitalize"
              onClick={toggleSideBar}
            >
              {cat.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
