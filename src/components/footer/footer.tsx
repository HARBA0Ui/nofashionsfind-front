import Logo from "../logo";
import { FiInstagram, FiMail, FiPhone } from "react-icons/fi";
import { PiTiktokLogo } from "react-icons/pi";

const Footer = () => {
  return (
    <div className="bg-zinc-950 py-6">
      <footer className="container text-white flex items-center gap-x-2 justify-between">
        <Logo bg="black" />
        <div className="list-none text-center">
          <h1 className="text-2xl">Contact</h1>
          <ul>
            <li>
              <a href="#" className="flex items-center gap-x-1">
                <FiMail className="w-5 h-5" />
                email@gmail.com
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-x-1">
                <FiPhone className="w-5 h-5" />
                (+216)54-856-958
              </a>
            </li>
          </ul>
        </div>
        <div className="hidden sm:block list-none text-center">
          <h1 className="text-2xl">Socials</h1>
          <ul>
            <li>
              <a href="#" className="flex items-center gap-x-1">
                <FiInstagram className="w-5 h-5" /> @nofashionfinds
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-x-1">
                <PiTiktokLogo className="w-5 h-5 text-white" /> @nofashionfinds
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
