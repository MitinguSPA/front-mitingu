import { api } from "./Api";

export const getPagoLink = async (pedidoId: string) => {
  try {
    const response = await api.get(
      `/api/pago-links?filters[pedido][documentId][$eq]=${pedidoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching payment link:", error);
    throw error;
  }
};

export const getPagoLinkByToken = async (token: string) => {
  try {
    const response = await api.get(`/api/pago-links/verify/${token}`);
    return response.data;
  } catch (error) {
    console.error("Error verificando token de pago-link:", error);
    throw error;
  }
};

export const markPagoLinkAsUsed = async (token: string) => {
  try {
    const response = await api.post(`/api/pago-links/use-token/${token}`);
    return response.data;
  } catch (error) {
    console.error("Error al marcar token como usado:", error);
    throw error;
  }
};
