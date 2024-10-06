import { createContext, useContext, useState } from "react";

interface SidebarContextType {
  toggle: boolean;
  toggleSideBar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [toggle, setToggle] = useState(false);

  const toggleSideBar = () => {
    setToggle(!toggle);
  };

  return (
    <SidebarContext.Provider value={{ toggle, toggleSideBar }}>
      {children}
    </SidebarContext.Provider>
  );
};
