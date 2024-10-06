import { createContext, useEffect, useState } from "react";

// Define the shape of the admin object
interface Admin {
  id: string;
  name: string;
  role: string;
  // Add other properties as needed
}

interface AuthContextType {
  admin: any;
  updateAdmin: (data: any) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<any | null>(() => {
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
