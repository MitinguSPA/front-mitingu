import { atom } from "jotai";
import { CartItem } from "../types";

// Carrito
export const cartAtom = atom<CartItem[]>([]);
export const cartOpenAtom = atom<boolean>(false);

// Auth
const storedUser = localStorage.getItem("silvery-user");
const storedToken = localStorage.getItem("silvery-token");

const initialUser =
  storedUser && storedToken
    ? { ...JSON.parse(storedUser), jwt: storedToken }
    : null;

export const userAtom = atom(initialUser);

// Nuevo: estado de carga para el sistema de autenticación
export const loadingAtom = atom(true);
