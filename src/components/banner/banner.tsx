import Logo from "../logo";
import TypingAnimation from "../magicui/typing-animation";
import styles from "./banner.module.css";
import { CgMenuRightAlt } from "react-icons/cg";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSidebar } from "@/context/sidebar-context";

const Banner = () => {
  const { toggleSideBar } = useSidebar();

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`search/${search}`);
  };

  return (
    <div className="relative max-h-screen overflow-hidden">
      <header className="flex absolute top-0 left-1/2 -translate-x-1/2 py-4 z-10 w-[90%] lg:w-[80%] max-w-[1700px]">
        <nav className="flex items-center justify-between w-full py-2">
          <Logo bg="black" />
          <div className="flex items-center gap-x-5">
            <div
              className={`${styles.input} text-white/95 w-[270px] text-lg pb-1 hidden md:flex`}
            >
              <form onSubmit={handleSubmit}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="search..."
                  className="placeholder:text-white/75 text-white w-full px-2"
                />
              </form>
            </div>
            <CgMenuRightAlt
              className="w-9 h-9 text-white cursor-pointer hover:scale-[115%] transition-all"
              onClick={toggleSideBar}
            />
          </div>
        </nav>
      </header>

      {/* Main content container */}
      <div className="flex flex-col sm:flex-row w-full h-screen">
        <Link
          to={"/products/bags"}
          className={`${styles.imgWrapper} w-full sm:w-1/2 h-1/2 sm:h-full cursor-pointer`}
        >
          <img
            src="/p10.jpg"
            className={`${styles.img} brightness-50`}
          />
          <h1 className="absolute z-[4] left-1/2 top-1/2 text-6xl md:text-7xl text-white -translate-x-1/2 -translate-y-1/2">
            <TypingAnimation text="bags" duration={100} />
          </h1>
        </Link>
        <Link
          to={"products/accessories"}
          className={`${styles.imgWrapper} w-full sm:w-1/2 h-1/2 sm:h-full cursor-pointer`}
        >
          <img
            src="/p12.jpg"
            className={`${styles.img} brightness-50`}
          />
          <h1 className="absolute z-[4] left-1/2 top-1/2 text-6xl md:text-7xl text-white -translate-x-1/2 -translate-y-1/2">
            <TypingAnimation text="Accessories" duration={100} />
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
