/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useState } from "react";

export const userContext = createContext();

const userProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState("");

  return (
    <>
      <userContext.Provider value={{ loginUser, setLoginUser }}>
        {children}
      </userContext.Provider>
    </>
  );
};

export default userProvider;
