import React, { useState, createContext } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role,setRole]= useState("")

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser,role,setRole }}>
      {children}
    </CurrentUserContext.Provider>
  );
};