import { useNavigate } from "react-router-dom";
import Logo from "../logo";
import styles from "./navbar.module.css";

import { useSidebar } from "@/context/sidebar-context";
import { useState } from "react";

const Navbar = () => {
  const { toggleSideBar } = useSidebar();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`search/${search}`);
  };
  return (
    <header className="mb-6 ">
      <nav className="container flex items-center justify-between w-full py-5">
        <Logo />
        <img
          src="/menu.png"
          className="w-12 h-12  text-zinc-950 cursor-pointer hover:scale-[115%] transition-all"
          onClick={toggleSideBar}
        />
        <div
          className={`${styles.input} text-zinc-950 w-[270px] text-lg pb-1 hidden md:flex`}
        >
          <form onSubmit={handleSubmit}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search..."
              className="placeholder:text-zinc-950/65  text-zinc-950 w-full px-2"
            />
          </form>
        </div>
      </nav>
      <div className="line w-[80%] md:w-[650px] mt-4 mx-auto"></div>
    </header>
    //   {
    //     toggle && <Sidebar toggleSideBar={toggleSideBar}/>
    //   }
  );
};

export default Navbar;
