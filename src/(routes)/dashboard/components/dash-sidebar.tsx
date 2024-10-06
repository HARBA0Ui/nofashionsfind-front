import apiRequest from "@/lib/apiRequest";
import { Library } from "lucide-react";
import { AiFillSetting, AiFillSwitcher, AiOutlineLogout } from "react-icons/ai";
import { CgMathPlus } from "react-icons/cg";

import { Link, useNavigate } from "react-router-dom";

const DashSidebar = () => {
  const navigate = useNavigate();
  const signout = async () => {
    try {
      const res = await apiRequest.post("/auth/logout");
      localStorage.removeItem("admin");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <aside className="w-40 bg-zinc-950 text-zinc-950 flex flex-col  gap-4 pt-12 text-pinky text-sm  border-r border-r-zinc-500">
      <ul className="flex flex-col gap-4 flex-1">
        <Link
          to={"/dashboard"}
          className="flex gap-2 bg-white w-full items-center px-2 py-3 hover:bg-zinc-800 hover:text-white transition-all"
        >
          <AiFillSwitcher className="w-6 h-6" /> <span>Dashboard</span>
        </Link>
        <Link
          to="/dashboard/create"
          className="flex gap-2 bg-white w-full items-center px-2 py-3 hover:bg-zinc-800 hover:text-white transition-all"
        >
          <CgMathPlus className="w-6 h-6" /> <span>Create</span>
        </Link>
        <Link
          to="/dashboard/categories"
          className="flex gap-2 bg-white w-full items-center px-2 py-3 hover:bg-zinc-800 hover:text-white transition-all"
        >
          <Library className="w-6 h-6" /> <span>Categories</span>
        </Link>
      </ul>
      <button className="flex gap-2 bg-white  items-center px-2 py-3 hover:bg-zinc-800 hover:text-white transition-all sticky bottom-0 w-full" onClick={signout}>
        <AiOutlineLogout className="w-6 h-6 pointer-events-none" /> <span>Logout</span>
      </button>
    </aside>
  );
};

export default DashSidebar;
