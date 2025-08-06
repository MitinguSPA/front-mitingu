import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "../UI/Button";
import AlertDialog from "../UI/AlertMens";
import SuccessMessage from "../UI/SuccesMens";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  codigo: string;
  documentId: string;
  customer: string;
  email: string;
  total: number;
  status: string;
  date: string;
  phone: string;
  entregado: boolean;
  items: OrderItem[];
  receiptUrl?: string | null;
}

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdateStatus: (
    orderId: string,
    newStatus: string,
    entregado: boolean
  ) => void;
  fetchOrder: (orderId: string) => Promise<Order>;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
  fetchOrder,
}) => {
  if (!isOpen || !order) return null;

  const [localStatus, setLocalStatus] = useState(order.status);
  const [currentOrder, setCurrentOrder] = useState<Order>(order);
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState(order.receiptUrl || null);

  useEffect(() => {
    if (order) {
      setCurrentOrder(order);
      setLocalStatus(order.status);
      if (order.receiptUrl) setReceiptUrl(order.receiptUrl);
    }
  }, [order]);

  useEffect(() => {
    let isCancelled = false;

    const pollOrder = async () => {
      if (!order) return;

      try {
        setIsLoading(true);
        const updatedOrder = await fetchOrder(order.documentId);

        if (!isCancelled && updatedOrder) {
          setCurrentOrder(updatedOrder);
          setReceiptUrl(updatedOrder.receiptUrl || null);

          if (
            updatedOrder.receiptUrl &&
            updatedOrder.status !== "pagado" &&
            currentOrder.status !== "pagado"
          ) {
            await onUpdateStatus(updatedOrder.documentId, "pagado", false);
            setLocalStatus("pagado");
          }
        }
      } catch (error) {
        console.error("Error polling order:", error);
      } finally {
        setIsLoading(false);
      }
    };

    pollOrder();

    return () => {
      isCancelled = true;
    };
  }, [order?.documentId, isOpen]);

  const statusOptions = ["pendiente", "pagado", "entregado", "cancelado"];

  const formatCLP = (amount: number): string => {
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Pedido #{order.codigo}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Fecha: {formatDate(order.date)}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg p-2 transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)] overflow-hidden">
            {/* Información del pedido - Lado izquierdo */}
            <div className="flex-1 p-6 overflow-y-auto lg:pr-4">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-5 tracking-tight">
                    Información del cliente
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Nombre:</span>{" "}
                      {order.customer}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> {order.email}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Teléfono:</span>{" "}
                      {order.phone}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Estado del pedido
                  </h3>
                  <select
                    value={localStatus}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      if (
                        showCancelAlert === false &&
                        newStatus !== "cancelado"
                      ) {
                        setShowMessage(true);
                      }
                      if (localStatus === "cancelado") return;
                      if (newStatus === "cancelado") {
                        setShowCancelAlert(true);
                      } else {
                        setLocalStatus(newStatus);
                        onUpdateStatus(order.documentId, newStatus, false);
                      }
                    }}
                    disabled={localStatus === "cancelado"}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-sm"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 overflow-hidden">
                  <div className="p-5 border-b border-purple-100">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Artículos del pedido
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                            Producto
                          </th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">
                            Cantidad
                          </th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-500">
                            Precio
                          </th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-500">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-100">
                        {order.items.map((item, index) => (
                          <tr
                            key={index}
                            className="hover:bg-white/50 transition-colors duration-150"
                          >
                            <td className="px-6 py-4 text-gray-700 font-medium">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm font-medium">
                                {item.quantity}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right text-gray-500">
                              ${formatCLP(item.price)}
                            </td>
                            <td className="px-6 py-4 text-right text-gray-700 font-semibold">
                              ${formatCLP(item.quantity * item.price)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-100">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <span className="text-lg font-semibold text-gray-700">
                      Importe total:
                    </span>
                    <span className="text-2xl font-bold text-gray-800">
                      ${formatCLP(order.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botón cerrar para móviles */}
              <div className="mt-8 flex justify-end lg:hidden">
                <Button variant="outline" onClick={onClose}>
                  Cerrar
                </Button>
              </div>
            </div>

            {/* Comprobante - Lado derecho */}
            <div className="lg:w-96 xl:w-[420px] bg-gradient-to-b from-slate-50 to-gray-50 border-l border-gray-100">
              <div className="p-6 h-full flex flex-col">
                <h3 className="text-lg font-semibold text-gray-700 mb-6">
                  Comprobante de transferencia
                  {isLoading && (
                    <span className="ml-2 text-sm text-gray-400 animate-pulse">
                      (Actualizando...)
                    </span>
                  )}
                </h3>

                <div className="flex-1 flex items-center justify-center">
                  {receiptUrl ? (
                    <div className="w-full max-w-sm">
                      <a
                        href={receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <div className="relative overflow-hidden rounded-xl shadow-lg border-2 border-white group-hover:shadow-xl transition-all duration-300">
                          <img
                            src={receiptUrl}
                            alt="Comprobante"
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                              <span className="text-sm font-medium text-gray-700">
                                Ver en tamaño completo
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="bg-gray-100 rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center mb-4">
                        <X className="w-8 h-8 text-gray-300" />
                      </div>
                      <p className="text-gray-400 font-medium">
                        Sin comprobante agregado
                      </p>
                      <p className="text-gray-300 text-sm mt-1">
                        El comprobante aparecerá aquí cuando se suba
                      </p>
                    </div>
                  )}
                </div>

                {/* Botón cerrar para desktop */}
                <div className="hidden lg:flex justify-end pt-6 border-t border-gray-100">
                  <Button variant="outline" onClick={onClose}>
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {showCancelAlert && (
            <AlertDialog
              title="¿Estás seguro de cancelar el pedido?"
              message="Esta acción no se puede deshacer. ¿Deseas continuar?"
              onCancel={() => setShowCancelAlert(false)}
              onConfirm={() => {
                setLocalStatus("cancelado");
                onUpdateStatus(order.documentId, "cancelado", false);
                setShowMessage(true);
                setShowCancelAlert(false);
              }}
            />
          )}
          {showMessage && (
            <SuccessMessage
              message="¡Operación completada con éxito!"
              onClose={() => setShowMessage(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
