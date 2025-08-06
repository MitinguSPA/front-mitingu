import { createPedidoConItems } from "../../services/Pedidos";
import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Minus,
  ShoppingCart,
  Check,
  Search,
  ScanBarcode,
} from "lucide-react";
import { Product, Sale, SaleItem } from "../../types";
import { getProductsPaginated } from "../../services/Product";

const AdminSales: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsPaginated();

        setProducts(response.data || []);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProducts();
  }, []);

  const [cart, setCart] = useState<SaleItem[]>([]);

  const [paymentMethod, setPaymentMethod] =
    useState<Sale["paymentMethod"]>("efectivo");

  const [voucherCode, setVoucherCode] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const paymentMethods = [
    { value: "efectivo", label: "Efectivo" },
    { value: "debito", label: "Débito" },
    { value: "credito", label: "Crédito" },
    { value: "transferencia", label: "Transferencia" },
    { value: "sodexo", label: "Sodexo" },
    { value: "pago_tienda", label: "Pago en tienda" },
  ];
  const needsVoucherCode =
    paymentMethod === "debito" || paymentMethod === "credito";

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.codigo_barra?.includes(searchTerm) ||
        product.id.toString() === searchTerm
    );

    setSearchResults(filtered);
    setShowResults(true);

    if (searchTerm.length >= 10) {
      const exactMatch = products.find(
        (product) =>
          product.codigo_barra === searchTerm ||
          product.id.toString() === searchTerm
      );
      if (exactMatch && exactMatch.stock > 0) {
        addToCart(exactMatch);
        setSearchTerm("");
        setShowResults(false);
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    }
  }, [searchTerm, products]);

  const addToCart = (product: Product) => {
    if (product.stock === 0) return;

    const existingItem = cart.find(
      (item) => item.documentId === product.documentId
    );
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(
          cart.map((item) =>
            item.documentId === product.documentId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      }
    } else {
      setCart([
        ...cart,
        {
          documentId: product.documentId,
          name: product.nombre,
          price: product.precio,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (productId: string) => {
    const existingItem = cart.find((item) => item.documentId === productId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.documentId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.documentId !== productId));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalAmount = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const completeSale = async () => {
    if (cart.length === 0) return;
    if (needsVoucherCode && !voucherCode.trim()) {
      alert("Por favor ingrese el código del voucher");
      return;
    }

    const pedidoData = {
      codigo_pedido: `PED-${Date.now()}`,
      nombre_usuario: "Local",
      email_usuario: "cliente@example.com",
      direccion_usuario: "Dirección ejemplo",
      telefono: "123456789",
      estado: "entregado",
      fecha: new Date().toISOString(),
      total: getTotalAmount(),
      donde_se_genero: "local",
      metodo_pago: paymentMethod,
      pedido_items: cart.map((item) => ({
        cantidad: item.quantity,
        precio_unitario: item.price,
        producto: item.documentId,
      })),
    };

    try {
      console.log("Creating order with items: ", pedidoData);

      const respuesta = await createPedidoConItems(pedidoData);
      console.log("Respuesta creación pedido: ", respuesta);

      const pedidosLocales = JSON.parse(
        localStorage.getItem("pedidos_locales") || "[]"
      );
      pedidosLocales.push({
        ...pedidoData,
        id: respuesta.data.id,
      });
      localStorage.setItem("pedidos_locales", JSON.stringify(pedidosLocales));

      setProducts((prevProducts) =>
        prevProducts.map((prod) => {
          const item = cart.find((i) => i.documentId === prod.documentId);
          if (item) {
            return { ...prod, stock: prod.stock - item.quantity };
          }
          return prod;
        })
      );

      setCart([]);
      setVoucherCode("");
      setShowSuccess(true);

      setTimeout(() => {
        searchInputRef.current?.focus();
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error al guardar pedido:", error);
      alert("Hubo un error al guardar la venta.");
    }
  };

  const handleSearchSelect = (product: Product) => {
    addToCart(product);
    setSearchTerm("");
    setShowResults(false);
    searchInputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchResults.length === 1) {
      handleSearchSelect(searchResults[0]);
    }
  };

  const formatCLP = (amount: number): string => {
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Punto de Venta</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center mb-4">
              <ScanBarcode className="w-6 h-6 text-[#DD6E81] mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Buscar Producto
              </h2>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escanear código de barras o buscar por nombre..."
                className="w-full pl-10 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                autoFocus
              />
            </div>

            {showResults && searchResults.length > 0 && (
              <div className="mt-4 bg-gray-50 rounded-lg border border-gray-200 max-h-60 overflow-y-auto">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSearchSelect(product)}
                    className="p-4 hover:bg-white cursor-pointer border-b border-gray-200 last:border-b-0 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {product.nombre}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {product.categoria.nombre}
                        </p>
                        {product.codigo_barra && (
                          <p className="text-xs text-gray-500">
                            Código: {product.codigo_barra}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#DD6E81]">
                          ${formatCLP(product.precio)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Stock: {product.stock}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showResults &&
              searchResults.length === 0 &&
              searchTerm.trim() !== "" && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800">
                    No se encontraron productos que coincidan con "{searchTerm}"
                  </p>
                </div>
              )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Acceso Rápido
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {products.slice(0, 6).map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors disabled:bg-gray-200 disabled:cursor-not-allowed"
                >
                  <h3 className="font-medium text-gray-900 text-sm mb-1">
                    {product.nombre}
                  </h3>
                  <p className="text-[#DD6E81] font-bold text-sm">
                    ${formatCLP(product.precio)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Stock: {product.stock}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Carrito</h2>
            <ShoppingCart className="w-6 h-6 text-[#DD6E81]" />
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              El carrito está vacío
            </p>
          ) : (
            <>
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.documentId}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        ${formatCLP(item.price)} c/u
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeFromCart(item.documentId)}
                        className="bg-gray-200 hover:bg-gray-300 p-1 rounded transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium px-2">{item.quantity}</span>
                      <button
                        onClick={() => {
                          const product = products.find(
                            (p) => p.id.toString() === item.documentId
                          );
                          if (product) addToCart(product);
                        }}
                        disabled={(() => {
                          const product = products.find(
                            (p) => p.id.toString() === item.documentId
                          );
                          return !product || item.quantity >= product.stock;
                        })()}
                        className="bg-[#DD6E81] hover:bg-[#c1485c] text-white p-1 rounded transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-[#DD6E81]">
                    ${formatCLP(getTotalAmount())}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Método de pago
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value as Sale["paymentMethod"])
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  {paymentMethods.map((method) => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </select>
              </div>

              {needsVoucherCode && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Código del voucher
                  </label>
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="Ingrese el código del voucher"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={clearCart}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Limpiar
                </button>
                <button
                  onClick={completeSale}
                  className="flex-1 bg-[#DD6E81] hover:bg-[#c1485c] text-white py-3 px-4 rounded-lg  transition-colors"
                >
                  Completar Venta
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg flex items-center">
          <Check className="w-5 h-5 mr-2" />
          ¡Venta completada exitosamente!
        </div>
      )}
    </div>
  );
};

export default AdminSales;
