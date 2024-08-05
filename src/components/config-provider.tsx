import { createContext, useContext } from "react";

import { standardConfig, type Config } from "@/form-configs/standard";

const ConfigContext = createContext(standardConfig);

export const ConfigProvider = ({
  config,
  children,
}: {
  config: Config;
  children: React.ReactNode;
}) => {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
