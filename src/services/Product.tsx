import { api } from "./Api";

export const getProducts = async () => {
  try {
    const response = await api.get(
      "/api/productos?pagination[pageSize]=100000&fields=nombre,descripcion,stock,activo,costo,codigo_barra,descripcion_corta,precio,imagen_link&populate[imagen][fields][0]=url&populate[categoria][fields][0]=nombre&populate[pedido_items][fields][0]=id"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const postProduct = async (product: {
  nombre: string;
  precio: number;
  descripcion: string;
  descripcion_corta: string;
  categoria: number;
  stock: number;
  activo: boolean;
  costo?: number;
  imagen: File | null;
  imagenLink?: string;
  codigo_barra?: string;
  useLink?: boolean;
}) => {
  try {
    let imagenId: number | null = null;
    let imagenLink: string | null = null;

    if (!product.useLink && product.imagen instanceof File) {
      const imageFormData = new FormData();
      imageFormData.append("files", product.imagen);

      const uploadResponse = await api.post("/api/upload", imageFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      imagenId = uploadResponse.data[0]?.id;
    }

    if (product.useLink && product.imagenLink?.startsWith("http")) {
      imagenLink = product.imagenLink;
    }

    const data = {
      nombre: product.nombre,
      precio: product.precio,
      descripcion: product.descripcion,
      descripcion_corta: product.descripcion_corta,
      stock: product.stock,
      activo: product.activo,
      categoria: product.categoria,
      codigo_barra: product.codigo_barra || null,
      ...(imagenId && { imagen: imagenId }),
      ...(imagenLink && { imagen_link: imagenLink }),
    };

    const response = await api.post("/api/productos", { data });

    return response.data;
  } catch (error) {
    console.error("Error creando producto:", error);
    throw error;
  }
};

export const putProduct = async (
  id: string,
  product: {
    nombre: string;
    precio: number;
    descripcion: string;
    descripcion_corta: string;
    categoria: number;
    stock: number;
    activo: boolean;
    imagen: File | string | null;
    imagenLink?: string;
    useLink?: boolean;
    codigo_barra?: string;
    pedido_items?: { id: number }[];
  }
) => {
  try {
    let imagenId: number | null = null;
    let imagenLink: string | null = null;

    if (!product.useLink && product.imagen instanceof File) {
      const imageFormData = new FormData();
      imageFormData.append("files", product.imagen);

      const uploadResponse = await api.post("/api/upload", imageFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      imagenId = uploadResponse.data[0]?.id;
    }

    if (product.useLink && product.imagenLink?.startsWith("http")) {
      imagenLink = product.imagenLink;
      imagenId = null;
    }

    const data = {
      nombre: product.nombre,
      precio: product.precio,
      descripcion: product.descripcion,
      descripcion_corta: product.descripcion_corta,
      stock: product.stock,
      activo: product.activo,
      categoria: product.categoria,
      codigo_barra: product.codigo_barra,
      pedido_items: product.pedido_items || [],
      ...(imagenId && { imagen: imagenId }),
      ...(imagenLink && { imagen_link: imagenLink }),
    };
    console.log("Datos a enviar:", data);

    await api.put(`/api/productos/${id}`, { data });

    const response = await api.get(
      `/api/productos/${id}?populate[imagen][fields][0]=url&populate[categoria][fields][0]=nombre`
    );

    return response.data;
  } catch (error) {
    console.error("Error actualizando producto:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await api.delete(`/api/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const deleteImage = async (id: number) => {
  try {
    await api.delete(`/api/upload/files/${id}`);
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
  }
};

export const getProductsPaginated = async (
  page = 1,
  pageSize = 10,
  filters: {
    searchTerm?: string;
    category?: string;
    priceRange?: string;
    sortBy?: string;
  } = {}
) => {
  try {
    let query =
      `/api/productos?fields=nombre,descripcion,stock,codigo_barra,activo,descripcion_corta,precio,imagen_link` +
      `&populate[imagen][fields][0]=url` +
      `&populate[categoria][fields][0]=nombre` +
      `&pagination[page]=${page}` +
      `&pagination[pageSize]=${pageSize}`;

    if (filters.searchTerm && filters.searchTerm.trim() !== "") {
      query += `&filters[$or][0][nombre][$containsi]=${filters.searchTerm}`;
      query += `&filters[$or][1][descripcion][$containsi]=${filters.searchTerm}`;
      query += `&filters[$or][2][categoria][nombre][$containsi]=${filters.searchTerm}`;
      query += `&filters[$or][3][codigo_barra][$containsi]=${filters.searchTerm}`;
    }

    if (filters.category && filters.category !== "all") {
      query += `&filters[categoria][nombre][$eq]=${filters.category}`;
    }

    if (filters.priceRange && filters.priceRange !== "all") {
      if (filters.priceRange === "0-5000") {
        query += `&filters[precio][$lte]=5000`;
      } else if (filters.priceRange === "5000-10000") {
        query += `&filters[precio][$gt]=5000&filters[precio][$lte]=10000`;
      } else if (filters.priceRange === "10000+") {
        query += `&filters[precio][$gt]=10000`;
      }
    }

    if (filters.sortBy) {
      if (filters.sortBy === "price-asc") {
        query += `&sort=precio:asc`;
      } else if (filters.sortBy === "price-desc") {
        query += `&sort=precio:desc`;
      } else {
        query += `&sort=nombre:asc`;
      }
    }

    const response = await api.get(query);
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    throw error;
  }
};
