import { useAtom } from "jotai";
import { userAtom } from "./atoms";
import { login as apiLogin } from "../services/Users";

export const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await apiLogin(email, password);
      const { user: userData, jwt } = data;

      const fullUser = { ...userData, jwt };
      setUser(fullUser);

      localStorage.setItem("Mitangu-user", JSON.stringify(userData));
      localStorage.setItem("Mitangu-token", jwt);

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("Mitangu-user");
    localStorage.removeItem("Mitangu-token");
  };

  // const isAuthenticated = (): boolean => {
  //   console.log(!!localStorage.getItem("Mitangu-token"));
  //   return user !== null || !!localStorage.getItem("Mitangu-token");
  // };
  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("Mitangu-token");
    const localUser =
      user || JSON.parse(localStorage.getItem("Mitangu-user") || "null");
    return !!token && !!localUser;
  };

  const isAdmin = (): boolean => {
    const localUser =
      user || JSON.parse(localStorage.getItem("Mitangu-user") || "null");
    return localUser?.rol === "Admin";
  };

  return {
    user,
    login,
    logout,
    isAuthenticated,
    isAdmin,
  };
};
