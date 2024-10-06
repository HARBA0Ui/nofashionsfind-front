import Banner from "./components/banner/banner";
import Carousel from "./components/carousel/carousel";

import { useProducts } from "./context/products-context";
import { useState } from "react";
import apiRequest from "./lib/apiRequest";
import { CgSpinnerTwo } from "react-icons/cg";
import { BsFillSendFill } from "react-icons/bs";

function App() {
  const { latestProducts } = useProducts();
  console.log("latest products: ", latestProducts);

  const [messageIsLoading, setMessageIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessageIsLoading(true);
    setMessage("");
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      const desc = formData.get("desc");

      const contactInfo = { email, desc };

      const res = await apiRequest.post("/email/contact-email", contactInfo);
      setMessage(res.data.message);
    } catch (err) {
      console.log(err);
    } finally {
      setMessageIsLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 3500);
    }
  };
  return (
    <>
      <Banner />
      <Carousel />

      <div className="flex flex-col py-12 md:py-16">
        <div className="w-[85%] sm:w-[80%] md:w-[90%] xl:w-[75%] m-auto flex items-center gap-x-12">
          <img
            src="/p3.jpg"
            className="max-w-[400px] border-2 border-zinc-950 hidden md:flex"
          />
          <form action="#" onSubmit={handleSubmit} className="flex flex-col space-y-4 flex-1">
            <h1 className="text-center text-3xl md:text-5xl">Contact</h1>
            <input
              type="text"
              required
              className="border-2 border-zinc-900 h-14 rounded-[.5rem] pl-4 xl:mr-10 placeholder:text-zinc-700 text-zinc-900"
              placeholder="Enter Your Name..."
            />
            <input
              type="email"
              name="email"
              required
              className="border-2 border-zinc-900 h-14 rounded-[.5rem] pl-4 xl:mr-10 placeholder:text-zinc-700 text-zinc-900"
              placeholder="Enter Your Email..."
            />
            <textarea
              required
              name="desc"
              cols={30}
              rows={10}
              minLength={10}
              className="border-2 border-zinc-900 rounded-[.5rem] p-4 xl:mr-10 placeholder:text-zinc-700 text-zinc-900 h-[200px]"
              placeholder="Enter Your Message..."
            ></textarea>
            <button
              type="submit"
              id="btn"
              className="group h-14 rounded-[.5rem] pl-4 xl:mr-10 bg-zinc-950 hover:bg-zinc-900 text-white transition-all flex items-center justify-center gap-x-3"
            >
              Send
              {messageIsLoading ? (
                <CgSpinnerTwo className="w-6 h-6 animate-spin text-white" />
              ) : (
                <BsFillSendFill  className="text-white w-5 h-5 transition-none "/> 
              )}
            </button>
            {message && (
              <p className="min-h-14  xl:mr-10 font-semibold bg-green-700 mt-3 rounded-[.5rem] text-white focus:outline-none shadow-md text-center flex justify-center items-center">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
