import { api } from "./Api";

export const getCategories = async () => {
  try {
    const response = await api.get("/api/categorias");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const postCategory = async (category: any) => {
  try {
    const response = await api.post("/api/categorias", category);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};
