import { Outlet, useNavigate } from "react-router-dom";
import DashSidebar from "./components/dash-sidebar";

import { AuthContext } from "@/context/auth-context";
import { useContext, useEffect } from "react";

const Dashboard = () => {

  const {admin}= useContext(AuthContext);
  const navigate= useNavigate()

  useEffect(() => {
    if (!admin){
      navigate("/")
    }
  }, [])
  return (
    <div className="flex bg-gray-100/50">
      <DashSidebar />
      <div className="flex-1 p-12 min-h-[85vh]">
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
