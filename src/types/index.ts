export interface Product {
  id: number;
  documentId: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  imageUrl: string;
  category: string;
  stock: number;
  isAvailable: boolean;
  nombre: string;
  precio: number;
  descripcion: string;
  descripcion_corta: string;
  codigo_barra: string;
  metodo_pago: string;
  entregado: boolean;
  imagen: {
    id: number;
    url: string;
  };
  categoria: { nombre: string };
  activo: boolean;
  imagen_link: string;
  pedido_items?: { id: number }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  username: string;
  isAdmin: boolean;
  email: string;
  rol: string;
  password: string;
  jwt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
}

export interface Sale {
  id: string;
  date: string;
  total: number;
  paymentMethod: "debito" | "credito" | "efectivo" | "transferencia" | "sodexo" | "pago_tienda";
  voucherCode?: string;
  items: SaleItem[];
  status: "completed" | "pending" | "cancelled";
}

export interface SaleItem {
  documentId: string;
  name: string;
  price: number;
  quantity: number;
}
