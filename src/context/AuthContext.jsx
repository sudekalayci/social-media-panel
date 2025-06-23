import React, { useState } from "react";
import { AuthContext } from "./AuthContextInstance"; // sadece context tanımı

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
