import { AuthContext } from "@/context/auth-context";
import apiRequest from "@/lib/apiRequest";
import { useContext, useEffect, useState } from "react";
import { FaKey, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { admin, updateAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const admin = {
      username,
      password,
    };

    try {
      const res = await apiRequest.post("/auth/login", admin);
      localStorage.setItem("admin", JSON.stringify(res.data));
      updateAdmin(res.data);
      setLoading(false);
      navigate("/dashboard");
    } catch (err:any) {
      setError(err.response.data.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("admin: ",admin)
    if (admin) {
      navigate("/");
      return;
    }
  }, []);
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] gap-5 py-12">
      <div className="bg-zinc-950 rounded-[.3rem] w-[480px] min-h-[450px] py-10 flex flex-col gap-3 justify-center items-center drop-shadow-lg text-white -mt-4">
        <h1 className="font-bold text-5xl text-center uppercase tracking-wide">
          Login
        </h1>
        <form
          action=""
            onSubmit={handleSubmit}
          className=" flex flex-col gap-6 py-6 w-full"
        >
          <div className="relative w-4/5 pl-10 pr-3 mx-auto border-b border-pinky">
            <input
              type="text"
              placeholder="username"
              name="username"
              required
              className="h-14 bg-transparent w-full placeholder:text-white/85"
            />
            <div className="absolute left-3 top-1/2 translate-y-[-50%] ">
              <FaUser className="text-pinky" />
            </div>
          </div>
          <div className="relative w-4/5 pl-10 pr-3 mx-auto border-b border-pinky">
            <input
              type="password"
              placeholder="password"
              name="password"
              required
              className="h-14 bg-transparent w-full placeholder:text-white/85"
            />
            <div className="absolute left-3 top-1/2 translate-y-[-50%] ">
              <FaKey className="text-pinky" />
            </div>
          </div>

          <Link to={"/login/reset"} className="w-4/5 mx-auto text-darkPruple">
            <span className="border-b-2 border-b-darkPruple">
              Forgot password?
            </span>
          </Link>

          <div className="mx-auto w-4/5">
            <button
              //   disabled={isLoading}
              type="submit"
              className={`w-full h-14 bg-white text-zinc-950 hover:bg-white/90 transition-all mt-6 text-xl relative rounded-[.2rem]`}
              //   className={`
              //     ${isLoading && "[border-radius: 5rem]"}
              //     w-full h-14 text-white mt-6  bg-pinky hover:bg-pinky/95 text-xl relative
              //     `}
            >
              Login
              {/* {isLoading && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <CgSpinnerTwo className="w-6 h-6 animate-spin" />
                    </div>
                  )} */}
            </button>
          </div>
          {error != "" && (
                <p className="bg-red-600 text-white text-md py-2 w-4/5 mx-auto text-center mt-4 ">
                  {error}
                </p>
              )}
        </form>
      </div>
    </div>
  );
};

export default Login;
