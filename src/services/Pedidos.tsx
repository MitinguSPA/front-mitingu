import { api } from "./Api";

export const getPedidos = async () => {
  try {
    const response = await api.get(
      "/api/pedidos?pagination[pageSize]=10000&fields[0]=total&fields[1]=estado&fields[3]=email_usuario&fields[4]=nombre_usuario&fields[2]=fecha&fields[5]=telefono&fields[6]=codigo_pedido&fields[7]=entrgado&fields[8]=metodo_pago&fields[9]=donde_se_genero&populate[pedido_items][fields][0]=cantidad&populate[pedido_items][fields][1]=precio_unitario&populate[pedido_items][populate][producto][fields][0]=nombre&populate[pedido_items][populate][producto][fields][1]=precio&populate[user][fields][0]=username&populate[user][fields][1]=email&populate[comprobante_tranferencia][fields][0]=url&filters[donde_se_genero][$eq]=web"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const updatePedidoStatus = async (
  pedidoId: string,
  estado: string,
  entregado: boolean
) => {
  try {
    const response = await api.put(`/api/pedidos/${pedidoId}`, {
      data: { estado: estado, entregado: entregado },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

export const createPedidoConItems = async (pedidoData: {
  codigo_pedido: string;
  nombre_usuario: string;
  email_usuario: string;
  direccion_usuario: string;
  telefono: string;
  estado: string;
  fecha: string;
  total: number;
  donde_se_genero: string;
  metodo_pago: string;
  pedido_items: {
    cantidad: number;
    precio_unitario: number;
    producto: string;
  }[];
}) => {
  console.error("Creating order with items:", pedidoData);
  try {
    const response = await api.post("/api/pedidos/crear-con-items", {
      data: pedidoData,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear pedido con items:", error);
    throw error;
  }
};

export const updatePedido = async (
  pedidoId: string,
  data: {
    comprobante_tranferencia?: File;
    fields?: Record<string, any>;
    pedido_items?: number[];
  }
) => {
  try {
    console.log("Actualizando pedido con ID:", pedidoId);
    console.log("Datos a enviar:", data);

    let imagenId: number | null = null;

    if (data.comprobante_tranferencia instanceof File) {
      const formData = new FormData();
      formData.append("files", data.comprobante_tranferencia);

      const uploadResponse = await api.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      imagenId = uploadResponse.data[0]?.id;
      console.log("Imagen subida con ID:", imagenId);
    }

    const payload: any = {
      data: {
        ...(imagenId && { comprobante_tranferencia: imagenId }),
      },
    };

    if (data.pedido_items && data.pedido_items.length > 0) {
      payload.data.pedido_items = data.pedido_items;
    }

    console.log("Payload a enviar:", payload);

    const response = await api.put(`/api/pedidos/${pedidoId}`, payload);

    console.log("Respuesta de la actualización:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error actualizando pedido:", error);
    throw error;
  }
};
