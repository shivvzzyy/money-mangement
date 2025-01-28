import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const verifyUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/verify",
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error(
        "User verification failed:",
        error.response?.data?.message || error.message
      );
      setUser(null);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
