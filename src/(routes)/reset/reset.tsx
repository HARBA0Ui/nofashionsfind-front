import apiRequest from "@/lib/apiRequest";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { CgSpinnerTwo } from 'react-icons/cg';

const Reset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      console.log("email: ", email);

      const res = await apiRequest.post("/settings/forgot-password", { email });
      console.log(res.data.Status);

      setIsLoading(false);
      if (res.data.Status == "success") {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] gap-5 ">
      <div className="bg-zinc-950 rounded-[.3rem] w-[480px] min-h-[350px] flex flex-col gap-3 justify-center items-center drop-shadow-lg text-white -mt-4">
        <h1 className="font-bold text-3xl text-center uppercase tracking-wide mb-2">
          Forgot Password?
        </h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className=" flex flex-col gap-4 py-2 w-full"
        >
          <div className="relative w-4/5 pl-10 pr-3 mx-auto border-b border-pinky">
            <input
              type="email"
              placeholder="Enter the admin email..."
              name="email"
              required
              className="h-14 bg-transparent w-full placeholder:text-white/85"
            />
            <div className="absolute left-3 top-1/2 translate-y-[-50%] ">
              <FaUser className="text-pinky" />
            </div>
          </div>

          <div className="mx-auto w-4/5">
            <button
              disabled={isLoading}
              type="submit"
              id="loginbtn"
              className={`w-full h-14 bg-white text-zinc-950 hover:bg-white/90 transition-all mt-6 relative rounded-[.2rem] flex items-center gap-x-3 justify-center`}
              >
                Submit
                {isLoading && <CgSpinnerTwo className="w-6 h-6 animate-spin" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset;
