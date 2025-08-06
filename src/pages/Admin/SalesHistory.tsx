import React, { useEffect, useState } from "react";
import {
  Calendar,
  Package,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  ShoppingBag,
} from "lucide-react";

import { getPedidos } from "../../services/Pedidos";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(
    amount
  );

interface Pedido {
  id: number;
  total: number;
  fecha: string;
  donde_se_genero: string;
  estado: string;
  codigo_pedido: string;
  metodo_pago: string;
}

const ITEMS_PER_PAGE = 6;

const HistorialPedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filteredPedidos, setFilteredPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  const [origenFilter, setOrigenFilter] = useState<"todos" | "local" | "web">(
    "todos"
  );
  const [codigoFilter, setCodigoFilter] = useState("");
  const [fechaFilter, setFechaFilter] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const data = await getPedidos();
        const pedidosApi: Pedido[] = data.data || [];

        const pedidosLocales: Pedido[] = JSON.parse(
          localStorage.getItem("pedidos_locales") || "[]"
        );

        const todosPedidos = [...pedidosLocales, ...pedidosApi];

        todosPedidos.sort(
          (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );

        setPedidos(todosPedidos);
        setFilteredPedidos(todosPedidos);
      } catch (error) {
        console.error("Error cargando pedidos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  useEffect(() => {
    let pedidosFiltrados = pedidos;

    if (origenFilter !== "todos") {
      pedidosFiltrados = pedidosFiltrados.filter(
        (pedido) => pedido.donde_se_genero === origenFilter
      );
    }

    pedidosFiltrados = pedidosFiltrados.filter((pedidos) => {
      if (pedidos.donde_se_genero === "web") {
        return pedidos.estado === "entregado";
      }
      return true;
    });

    if (codigoFilter.trim() !== "") {
      pedidosFiltrados = pedidosFiltrados.filter((pedido) =>
        pedido.codigo_pedido.toLowerCase().includes(codigoFilter.toLowerCase())
      );
    }

    if (fechaFilter) {
      pedidosFiltrados = pedidosFiltrados.filter((pedido) => {
        const fechaPedido = new Date(pedido.fecha);
        const fechaLocal = `${fechaPedido.getFullYear()}-${(
          fechaPedido.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${fechaPedido
          .getDate()
          .toString()
          .padStart(2, "0")}`;
        return fechaLocal === fechaFilter;
      });
    }

    pedidosFiltrados.sort(
      (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    );

    setFilteredPedidos(pedidosFiltrados);
    setCurrentPage(1);
  }, [origenFilter, codigoFilter, fechaFilter, pedidos]);

  const totalPages = Math.ceil(filteredPedidos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPedidos = filteredPedidos.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleEliminar = (id: number) => {
    if (!window.confirm("¿Estás seguro de eliminar este pedido?")) return;

    const nuevosPedidos = pedidos.filter((pedido) => pedido.id !== id);
    setPedidos(nuevosPedidos);

    const nuevosFiltrados = filteredPedidos.filter(
      (pedido) => pedido.id !== id
    );
    setFilteredPedidos(nuevosFiltrados);

    const pedidosLocales: Pedido[] = JSON.parse(
      localStorage.getItem("pedidos_locales") || "[]"
    );
    const nuevosLocales = pedidosLocales.filter((pedido) => pedido.id !== id);
    localStorage.setItem("pedidos_locales", JSON.stringify(nuevosLocales));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center space-x-2 text-gray-600">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600"></div>
          <span className="text-sm">Cargando pedidos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-screen">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-1">
          <ShoppingBag className="h-5 w-5 text-gray-700" />
          <h1 className="text-xl font-semibold text-gray-900">
            Historial de Pedidos
          </h1>
        </div>
        <p className="text-sm text-gray-600">
          Gestiona tus pedidos de manera eficiente
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Origen
            </label>
            <select
              value={origenFilter}
              onChange={(e) =>
                setOrigenFilter(e.target.value as "todos" | "local" | "web")
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="todos">Todos</option>
              <option value="local">Local</option>
              <option value="web">Web</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Código
            </label>
            <input
              type="text"
              value={codigoFilter}
              onChange={(e) => setCodigoFilter(e.target.value)}
              placeholder="Buscar código..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <input
              type="date"
              value={fechaFilter}
              onChange={(e) => setFechaFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{filteredPedidos.length}</span>{" "}
              pedidos
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {paginatedPedidos.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No hay pedidos
            </h3>
            <p className="text-gray-500">
              Ajusta los filtros para ver más resultados
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {paginatedPedidos.map((pedido) => (
              <div
                key={pedido.id + pedido.codigo_pedido}
                className="p-4 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-medium text-gray-900">
                        {pedido.codigo_pedido}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          pedido.donde_se_genero === "web"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {pedido.donde_se_genero === "web" ? "Web" : "Local"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(pedido.fecha).toLocaleDateString("es-CL")}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CreditCard className="h-4 w-4" />
                        <span>{pedido.metodo_pago}</span>
                      </div>
                      <div className="font-medium text-gray-900">
                        {formatCurrency(pedido.total)}
                      </div>
                    </div>
                  </div>

                  <div className="ml-4">
                    <button
                      onClick={() => handleEliminar(pedido.id)}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-150"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-700">
            Página <span className="font-medium">{currentPage}</span> de{" "}
            <span className="font-medium">{totalPages}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </button>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              Siguiente
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialPedidos;
