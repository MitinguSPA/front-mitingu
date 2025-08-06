import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Banknote as BankNote } from "lucide-react";
import Button from "../../components/UI/Button";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatters";
import BuyerForm from "../Buyer/BuyerForm";
import { BuyerFormData } from "../Buyer/type";

import Logo from "../../images/logo/LogoSinFondo.png";

type PaymentMethod = "transferencia" | "pago_tienda";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartTotal } = useCart();
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("transferencia");
  const [showBuyerForm, setShowBuyerForm] = useState(false);
  const totalWithShipping = cartTotal;

  const paymentMethods = [
    {
      id: "transferencia" as PaymentMethod,
      name: "Transferencia bancaria",
      icon: BankNote,
      description: "Transferencia bancaria directa",
    },
    {
      id: "pago_tienda" as PaymentMethod,
      name: "Pago en tienda",
      icon: Building2,
      description: "Paga en nuestra tienda física",
    },
  ];

  const handleBuyerFormSubmit = (data: BuyerFormData) => {
    console.log("Datos del formulario enviados:", data);
    navigate("/checkout/confirmation");
  };

  return (
    <div className="container-pad mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-secondary-900 mb-8">
          Verificar compra{" "}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4">
                  <img
                    src={
                      item.product.imagen_link
                        ? item.product.imagen_link
                        : item.product.imagen?.url || Logo
                    }
                    alt={item.product.nombre}
                    className="w-16 h-11 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-base">
                      {item.product.nombre}
                    </h3>
                    <p className="text-secondary-600">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                  <p className="text-secondary-900">
                    {formatCurrency(item.product.precio)}
                  </p>
                  {/* <p className="font-medium">
                    {formatCurrency(item.product.precio * item.quantity)}
                  </p> */}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-secondary-300">
              <div className="flex justify-between text-lg font-bold mt-4">
                <span>Total</span>
                <span>{formatCurrency(totalWithShipping)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            {showBuyerForm ? (
              <BuyerForm
                onSubmit={handleBuyerFormSubmit}
                metodo_pago={paymentMethod}
              />
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Método de pago</h2>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === method.id
                          ? "border-[#c1485c] bg-primary-50"
                          : "border-[#F4A9B6] hover:border-[#c1485c] hover:bg-primary-50"
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className="flex items-center gap-4">
                        <method.icon
                          className={`w-6 h-6 ${
                            paymentMethod === method.id
                              ? "text-[#F4A9B6]"
                              : "text-[#F7C3CC]"
                          }`}
                        />
                        <div>
                          <h3 className="font-medium">{method.name}</h3>
                          <p className="text-sm text-secondary-600">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  {paymentMethod === "transferencia" && (
                    <div className="bg-secondary-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">
                        Detalles de transferencia bancaria
                      </h3>
                      <p className="text-secondary-600 text-sm">
                        Banco: Example Bank
                        <br />
                        Número de cuenta: XXXX-XXXX-XXXX-XXXX
                        <br />
                        Nombre de la cuenta: Elysium Store
                        <br />
                        Referencia: Su número de pedido #
                      </p>
                    </div>
                  )}
                  {paymentMethod === "pago_tienda" && (
                    <div className="bg-secondary-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">
                        Ubicación de la tienda
                      </h3>
                      <p className="text-secondary-600 text-sm">
                        Av. Bernando O'Higgins 1065
                        <br />
                        Talagante, Región Metropolitana
                        <br />
                        Horario de apertura: 10:00 a 20:00
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  size="lg"
                  fullWidth
                  className="bg-[#F4A9B6] border-[#DD6E81] text-white hover:bg-[#DD6E81] hover:text-white mt-6 "
                  onClick={() => setShowBuyerForm(true)}
                >
                  {paymentMethod === "transferencia"
                    ? "Completar Transferencia"
                    : "Confirmar pago en tienda"}
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;
