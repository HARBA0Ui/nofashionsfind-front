import { Admin } from "@/types/admin";
import { createContext, useEffect, useState } from "react";

interface AuthContextType{
  admin:  Admin | null;
  updateAdmin: (data: any) => void;
}

export const AuthContext = createContext<AuthContextType | undefined | any>(
  undefined
);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(() => {
    const storedAdmin = localStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  function updateAdmin(data: any) {
    setAdmin(data);
  }

  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(admin));
  }, [admin]);

  return (
    <AuthContext.Provider value={{ admin, updateAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
