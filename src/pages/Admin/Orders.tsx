import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Calendar, ChevronDown } from "lucide-react";
import OrderDetailsModal from "../../components/Admin/OrderDetailsModal";
import { getPedidos, updatePedidoStatus } from "../../services/Pedidos";
import { socket } from "../../socket";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  icon?: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 z-10">
          {icon}
        </div>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full ${
          icon ? "pl-10" : "pl-3"
        } pr-10 py-2 text-left border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white hover:border-secondary-300 transition-colors`}
      >
        <span className="block truncate text-secondary-900">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown
            className={`h-4 w-4 text-secondary-400 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute z-20 w-full mt-1 bg-white border border-secondary-200 rounded-lg shadow-lg max-h-60 overflow-auto"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left hover:bg-secondary-50 focus:bg-secondary-50 focus:outline-none transition-colors ${
                    value === option.value
                      ? "bg-primary-50 text-primary-700 font-medium"
                      : "text-secondary-900"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const statusOptions = [
    { value: "all", label: "Todos los estados" },
    { value: "pendiente", label: "Pendientes y Pagados no entregados" },
    { value: "entregado", label: "Pedidos Finalizados" },
    { value: "cancelado", label: "Pedidos Cancelados" },
  ];

  const dateOptions = [
    { value: "", label: "Todos los tiempos" },
    { value: "today", label: "Hoy" },
    { value: "week", label: "Esta semana" },
    { value: "month", label: "Este mes" },
    { value: "year", label: "Este año" },
    { value: "custom", label: "Rango personalizado" },
  ];

  const fetchAndFormatOrders = async () => {
    try {
      const data = await getPedidos();
      const formatted = data.data.map((pedido: any) => ({
        id: pedido.id,
        documentId: pedido.documentId,
        total: pedido.total,
        status: pedido.estado,
        date: pedido.fecha,
        codigo: pedido.codigo_pedido,
        donde_se_genero: pedido.donde_se_genero,
        metodo_pago: pedido.metodo_pago,
        entrgado: pedido.entregado,
        items:
          pedido.pedido_items?.map((item: any) => ({
            name: item.producto?.nombre,
            quantity: item.cantidad,
            price: item.precio_unitario,
          })) || [],
        customer: pedido.nombre_usuario,
        email: pedido.email_usuario,
        phone: pedido.telefono,
        receiptUrl: pedido.comprobante_tranferencia?.url || null,
      }));

      const sorted = formatted.sort((a: any, b: any) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      setOrders(sorted);
      return sorted;
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAndFormatOrders();
    };

    setCurrentPage(1);
    fetchData();

    socket.on("orderCreated", (pedido) => {
      console.log(" ✅ Nuevo pedido recibido:");
      const formattedOrder = {
        id: pedido.id,
        documentId: pedido.documentId,
        total: pedido.total,
        status: pedido.estado,
        date: pedido.fecha,
        codigo: pedido.codigo_pedido,
        donde_se_genero: pedido.donde_se_genero,
        metodo_pago: pedido.metodo_pago,
        entrgado: pedido.entregado,
        items:
          pedido.pedido_items?.map((item: any) => ({
            name: item.producto?.nombre,
            quantity: item.cantidad,
            price: item.precio_unitario,
          })) || [],
        customer: pedido.nombre_usuario,
        email: pedido.email_usuario,
        phone: pedido.telefono,
        receiptUrl: pedido.comprobante_tranferencia?.url || null,
      };

      setOrders((prev) =>
        [formattedOrder, ...prev].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    });

    return () => {
      socket.off("orderCreated");
    };
  }, [showOrderDetails]);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "all" ||
        order.status.toLowerCase() === selectedStatus.toLowerCase();

      let matchesCategory = true;
      if (selectedStatus === "pendientes") {
        matchesCategory =
          order.status === "pendiente" ||
          (order.status === "pagado" && order.entrgado === false);
      } else if (selectedStatus === "finalizados") {
        matchesCategory = order.status === "pagado" && order.entrgado === true;
      } else if (selectedStatus === "cancelados") {
        matchesCategory = order.status === "cancelado";
      }

      const orderDate = new Date(order.date);
      let matchesDate = true;

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        matchesDate = orderDate >= start && orderDate <= end;
      } else if (dateFilter) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        switch (dateFilter) {
          case "today":
            const todayStr = today.toISOString().split("T")[0];
            matchesDate = order.date.includes(todayStr);
            break;
          case "week":
            const oneWeekAgo = new Date(today);
            oneWeekAgo.setDate(today.getDate() - 7);
            matchesDate = orderDate >= oneWeekAgo;
            break;
          case "month":
            const oneMonthAgo = new Date(today);
            oneMonthAgo.setMonth(today.getMonth() - 1);
            matchesDate = orderDate >= oneMonthAgo;
            break;
          case "year":
            const oneYearAgo = new Date(today);
            oneYearAgo.setFullYear(today.getFullYear() - 1);
            matchesDate = orderDate >= oneYearAgo;
            break;
          default:
            matchesDate = true;
        }
      }

      return matchesSearch && matchesStatus && matchesCategory && matchesDate;
    });

    setFilteredOrders(filtered);
    const calculatedTotal = filtered.reduce(
      (sum, order) => sum + order.total,
      0
    );
    setTotalAmount(calculatedTotal);
  }, [orders, searchTerm, selectedStatus, dateFilter, startDate, endDate]);

  const handleUpdateOrderStatus = async (
    orderId: string,
    newStatus: string,
    entregado: boolean
  ) => {
    try {
      console.log(
        "Actualizando estado del pedido:",
        orderId,
        newStatus,
        entregado
      );
      await updatePedidoStatus(orderId, newStatus, entregado);
      const updatedOrders = await fetchAndFormatOrders();
      setOrders(updatedOrders);
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      console.error("Error al actualizar estado del pedido:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pagado":
        return "bg-success-50 text-success-700";
      case "entregado":
        return "bg-primary-50 text-primary-700";
      case "pendiente":
        return "bg-warning-50 text-warning-700";
      case "cancelado":
        return "bg-danger-50 text-danger-700";
      default:
        return "bg-secondary-50 text-secondary-700";
    }
  };

  const formatCLP = (amount: number): string => {
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const formatMethodPago = (method: string): string => {
    switch (method) {
      case "transferencia":
        return "Transferencia";
      case "efectivo":
        return "Efectivo";
      case "credito":
        return "Tarjeta de Crédito";
      case "debito":
        return "Tarjeta de Débito";
      case "sodexo":
        return "Sodexo";
      case "pago_tienda":
        return "Pago en Tienda";
      default:
        return "";
    }
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary-900 mb-8">Pedidos</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar pedido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-secondary-300 transition-colors"
          />
        </div>

        <CustomSelect
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={statusOptions}
          placeholder="Todos los estados"
          icon={<Filter size={20} />}
        />

        <CustomSelect
          value={dateFilter}
          onChange={(value) => {
            setDateFilter(value);
            setStartDate("");
            setEndDate("");
          }}
          options={dateOptions}
          placeholder="Todos los tiempos"
          icon={<Calendar size={20} />}
        />

        {dateFilter === "custom" && (
          <>
            <div className="relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-secondary-300 transition-colors"
                placeholder="Fecha inicio"
              />
            </div>
            <div className="relative">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-secondary-300 transition-colors"
                placeholder="Fecha fin"
              />
            </div>
          </>
        )}
      </div>

      <div className="mb-4 p-4 bg-secondary-50 rounded-lg">
        <p className="text-lg font-semibold text-primary-800">
          Total acumulado:{" "}
          <span className="font-bold">${formatCLP(totalAmount)}</span>
        </p>
        <p className="text-sm text-secondary-500">
          {filteredOrders.length} pedidos encontrados
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Método de Pago
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-secondary-50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowOrderDetails(true);
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      #{order.codigo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-secondary-900">
                        {order.customer}
                      </div>
                      <div className="text-sm text-secondary-500">
                        {order.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      {formatMethodPago(order.metodo_pago)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                      ${formatCLP(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                      {order.date}
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {itemsPerPage >= 8 && (
        <div className="mt-6 flex justify-center items-center space-x-1 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-400"
          >
            «
          </button>

          {currentPage > 2 && (
            <>
              <button
                onClick={() => setCurrentPage(1)}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? "bg-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-400"
                }`}
              >
                1
              </button>
              {currentPage > 3 && <span className="px-2">...</span>}
            </>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === currentPage ||
                page === currentPage - 1 ||
                page === currentPage + 1
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}

          {currentPage < totalPages - 1 && (
            <>
              {currentPage < totalPages - 2 && (
                <span className="px-2">...</span>
              )}
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-400"
          >
            »
          </button>
        </div>
      )}

      <OrderDetailsModal
        isOpen={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
        order={selectedOrder}
        onUpdateStatus={handleUpdateOrderStatus}
        fetchOrder={fetchAndFormatOrders}
      />
    </div>
  );
};

export default Orders;
