/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BuyerFormData } from "./type";
import { useCart } from "../../context/CartContext";
import { createPedidoConItems } from "../../services/Pedidos";
import emailjs from "emailjs-com";
import { getPagoLink } from "../../services/pago-link";

import Logo from "../../images/logo/LogoSinFondo.png";

interface BuyerFormProps {
  onSubmit: (data: BuyerFormData) => void;
  metodo_pago: string;
}

const BuyerForm: React.FC<BuyerFormProps> = ({ onSubmit, metodo_pago }) => {
  console.log("BuyerForm props:", { onSubmit, metodo_pago });
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState<BuyerFormData>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<BuyerFormData>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [customError, setCustomError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof BuyerFormData]);
  };

  const validateField = (name: string, value: string) => {
    const fieldErrors: Partial<BuyerFormData> = { ...errors };

    switch (name) {
      case "fullName":
        fieldErrors.fullName = !value.trim() ? "El nombre es requerido" : "";
        break;
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        fieldErrors.email = !value.trim()
          ? "El correo electrónico es requerido"
          : !emailRegex.test(value)
          ? "Ingrese un correo electrónico válido"
          : "";
        break;
      }
      case "phone": {
        const phoneRegex = /^\d{7,15}$/;
        fieldErrors.phone = !value.trim()
          ? "El teléfono es requerido"
          : !phoneRegex.test(value.replace(/\D/g, ""))
          ? "Ingrese un número de teléfono válido"
          : "";
        break;
      }
      default:
        break;
    }

    setErrors(fieldErrors);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BuyerFormData> = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre es requerido";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ingrese un correo electrónico válido";
      isValid = false;
    }

    const phoneRegex = /^\d{7,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Ingrese un número de teléfono válido";
      isValid = false;
    }

    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fechaLocal = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000
    ).toISOString();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const codigo = `PED-${Math.random()
          .toString(36)
          .substring(2, 10)
          .toUpperCase()}`;
        const pedidoData = {
          codigo_pedido: codigo,
          nombre_usuario: formData.fullName,
          email_usuario: formData.email,
          direccion_usuario: "",
          telefono: formData.phone,
          estado: "pendiente",
          metodo_pago: metodo_pago,
          fecha: fechaLocal,
          total: cartTotal,
          pedido_items: cart.items.map((item) => ({
            cantidad: item.quantity,
            precio_unitario: item.product.precio,
            producto: item.product.documentId,
          })),
          donde_se_genero: "web",
        };

        const res = await createPedidoConItems(pedidoData);
        const token = await getPagoLink(res.data.documentId);
        console.log("token creado:", token.data?.[0]?.token);
        const link = `https://e-commerce-mitingu-production.up.railway.app/checkout/payment-proof-upload/token/${token.data?.[0]?.token}`;

        console.log("link de pago:", link);
        const botonComprobanteHTML =
          metodo_pago == "transferencia"
            ? `
              <p style="text-align:center; margin-top:30px;">Puedes subir tu comprobante de transferencia en el siguiente enlace:</p>
              <div align="center">
                <table cellspacing="0" cellpadding="0" style="margin: 20px 0;">
                  <tr>
                    <td align="center" bgcolor="#DD6E81" style="border-radius: 8px;">
                      <a href="${link}" target="_blank"
                        style="display:inline-block; padding:14px 28px; font-size:16px; color:#fff; background:#DD6E81; text-decoration:none; border-radius:8px; font-weight:bold; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
                        📎 Subir Comprobante de Pago
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            `
            : "";
        const productosHTML = cart.items
          .map((item) => {
            return `
              <tr style="background:#fffafb; border-radius:12px;">
                <td style="padding:12px; border-radius:12px 0 0 12px;">${
                  item.quantity
                }</td>
                <td style="padding:12px;">
                  <span style="display:flex; align-items:center; gap:8px;">
                    <img src="${
                      item.product.imagen?.url ||
                      item.product.imagen_link ||
                      Logo
                    }" alt="${
              item.product.nombre
            }" style="width:32px; height:32px; border-radius:50%; box-shadow:0 0 3px rgba(0,0,0,0.1); margin-right:8px;">
                    <span>${item.product.nombre}</span>
                  </span>
                </td>
                <td style="padding:12px; text-align:right; border-radius:0 12px 12px 0;">$${item.product.precio.toLocaleString(
                  "es-CL"
                )} CLP</td>
              </tr>`;
          })
          .join("");

        console.log("Productos formateados:", productosHTML);

        const emailParams = {
          nombre_usuario: pedidoData.nombre_usuario,
          email_usuario: pedidoData.email_usuario,
          telefono_usuario: pedidoData.telefono,
          direccion_usuario: pedidoData.direccion_usuario,
          codigo_pedido: pedidoData.codigo_pedido,
          total: pedidoData.total,
          productos: productosHTML,
          boton_comprobante: botonComprobanteHTML,
          enlace_comprobante: link,
        };

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const storeTemplate = import.meta.env.VITE_EMAILJS_TEMPLATE_STORE;
        const buyerTemplate = import.meta.env.VITE_EMAILJS_TEMPLATE_BUYER;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        const tiendaEmail = "contacto.mitingu@gmail.com";

        try {
          await emailjs.send(
            serviceId,
            storeTemplate,
            { ...emailParams, to_email: tiendaEmail },
            publicKey
          );

          await emailjs.send(
            serviceId,
            buyerTemplate,
            { ...emailParams, to_email: pedidoData.email_usuario },
            publicKey
          );
        } catch (emailError) {
          console.error("Error enviando correos:", emailError);
        }

        onSubmit(formData);
        clearCart();
        navigate("/checkout/confirmation");
      } catch (error: unknown) {
        let mensaje = "Error desconocido";

        if (typeof error === "object" && error !== null) {
          const err = error as { response?: any; message?: string };

          if (err.response?.data?.error) {
            mensaje = err.response.data.error;
          } else if (err.message) {
            mensaje = err.message;
          }
        }

        if (mensaje.includes("Stock insuficiente")) {
          setCustomError(mensaje);
        } else {
          console.error("Error al crear pedido:", mensaje);
          setCustomError(
            "Ocurrió un error al generar el pedido. Intenta nuevamente."
          );
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log("Formulario no válido");
    }

    setTouched({
      fullName: true,
      email: true,
      phone: true,
    });
    setErrors({
      fullName: "",
      email: "",
      phone: "",
    });
    setFormData({
      fullName: "",
      email: "",
      phone: "",
    });

    console.log("Formulario enviado:", formData);
  };

  return (
    <div className="items-center justify-center bg-white flex">
      <div className="w-full max-w-md mx-auto bg-transparent rounded-xl shadow-sm pb-8 px-6 pt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Datos del comprador
        </h2>
        {customError && (
          <div className="mb-4 p-4 rounded-lg border border-red-300 bg-red-100 text-red-800 shadow-md animate-pulse">
            <p className="text-sm font-medium">{customError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre completo
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-lg border ${
                touched.fullName && errors.fullName
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              } focus:outline-none focus:ring-2 transition-colors`}
              placeholder="Ingresa tu nombre completo"
            />
            {touched.fullName && errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-lg border ${
                touched.email && errors.email
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              } focus:outline-none focus:ring-2 transition-colors`}
              placeholder="Ingresa tu correo electrónico"
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 rounded-lg border ${
                touched.phone && errors.phone
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              } focus:outline-none focus:ring-2 transition-colors`}
              placeholder="Ingresa tu número de teléfono"
            />
            {touched.phone && errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="relative overflow-hidden w-full py-3 px-4 bg-[#DD6E81] hover:bg-[#c1485c] text-white font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <span
              className={`absolute inset-0 bg-green-500 transition-[width] duration-[3000ms] ease-in-out ${
                isSubmitting ? "w-full" : "w-0"
              }`}
            />
            <span className="relative z-10">
              {isSubmitting ? "Generando tu compra..." : "Finalizar compra"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyerForm;
