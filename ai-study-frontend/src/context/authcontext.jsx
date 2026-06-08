import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, settoken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedtoken = localStorage.getItem("token");
    if (storedtoken) {
      settoken(storedtoken);
    }
  }, []);

  const loginUser = (newtoken) => {
    localStorage.setItem("token", newtoken);
    settoken(newtoken);
  };
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    settoken(null);

  };
  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn: !!token,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
