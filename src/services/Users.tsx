/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "./Api";

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/api/auth/local", {
      identifier: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const register = async (userData: any) => {
  try {
    const response = await api.post("/api/auth/local/register", {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error response:", error.response?.data);

    if (error.response?.data?.user) {
      return error.response.data;
    }
    throw error;
  }
};
