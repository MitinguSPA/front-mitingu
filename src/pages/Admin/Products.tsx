import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Package,
  X,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import Button from "../../components/UI/Button";
import ProductModal from "../../components/Admin/PorductModal";
import DeleteConfirmationModal from "../../components/Admin/DeleteConfirmationModal";
import { formatCurrency } from "../../utils/formatters";
import { Product } from "../../types";
import {
  getProductsPaginated,
  putProduct,
  deleteProduct,
  deleteImage,
  postProduct,
} from "../../services/Product";
import { getCategories, postCategory } from "../../services/Categori";
import Logo from "../../images/logo/LogoSinFondo.png";

interface Category {
  id: number;
  nombre: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  className?: string;
  size?: "sm" | "md";
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  className = "",
  size = "md",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);
  const sizeClasses = size === "sm" ? "px-3 py-2 text-sm" : "px-3 py-2";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-colors ${sizeClasses} ${className}`}
      >
        <span className="block truncate text-gray-900">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
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
              className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors text-sm ${
                    value === option.value
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-900"
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

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);

  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("nombre");
  const [stockFilter, setStockFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const hasFetchedOnce = useRef(false);

  const categoryOptions = [
    { value: "all", label: "Todas" },
    ...categories.map((cat) => ({ value: cat.nombre, label: cat.nombre })),
  ];

  const priceOptions = [
    { value: "all", label: "Todos" },
    { value: "0-5000", label: "$0 - $5,000" },
    { value: "5000-10000", label: "$5,000 - $10,000" },
    { value: "10000+", label: "$10,000+" },
  ];

  const stockOptions = [
    { value: "all", label: "Todos" },
    { value: "low", label: "Limitado (≤10)" },
    { value: "out", label: "Agotado" },
  ];

  const statusOptions = [
    { value: "all", label: "Todos" },
    { value: "active", label: "Disponibles" },
    { value: "inactive", label: "No disponibles" },
  ];

  const sortOptions = [
    { value: "nombre", label: "Nombre" },
    { value: "price-asc", label: "Precio ↑" },
    { value: "price-desc", label: "Precio ↓" },
  ];

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  const fetchData = async (options: { resetPage?: boolean } = {}) => {
    try {
      setLoading(true);
      const filters = {
        searchTerm: debouncedSearchTerm,
        category: selectedCategory,
        priceRange,
        sortBy,
      };

      const response = await getProductsPaginated(
        options.resetPage ? 1 : currentPage,
        pageSize,
        filters
      );

      let filteredProducts = response.data;

      if (stockFilter !== "all") {
        if (stockFilter === "low") {
          filteredProducts = filteredProducts.filter((p: any) => p.stock <= 10);
        } else if (stockFilter === "out") {
          filteredProducts = filteredProducts.filter((p: any) => p.stock === 0);
        }
      }

      if (statusFilter !== "all") {
        filteredProducts = filteredProducts.filter((p: any) =>
          statusFilter === "active" ? p.activo : !p.activo
        );
      }

      setProducts(filteredProducts);
      setTotalProducts(response.meta.pagination.total);

      if (options.resetPage) {
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchData({ resetPage: true }).then(() => {
      hasFetchedOnce.current = true;
    });
  }, [
    debouncedSearchTerm,
    selectedCategory,
    priceRange,
    sortBy,
    stockFilter,
    statusFilter,
  ]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const pageCount = Math.ceil(totalProducts / pageSize);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddProduct = async (productData: {
    nombre: string;
    precio: number;
    descripcion: string;
    descripcion_corta: string;
    categoriaNombre: string;
    imagen: File | null;
    imagenLink?: string;
    useLink?: boolean;
    stock: number;
    activo: boolean;
    codigo_barra: string;
  }) => {
    try {
      const categorias = await getCategories();
      const existente = categorias.data.find(
        (c: Category) =>
          c.nombre.toLowerCase() === productData.categoriaNombre.toLowerCase()
      );

      let categoriaId: number;

      if (existente) {
        categoriaId = existente.id;
      } else {
        const nuevaCategoria = await postCategory({
          data: { nombre: productData.categoriaNombre },
        });
        categoriaId = nuevaCategoria.data.id;
      }

      await postProduct({
        nombre: productData.nombre,
        precio: productData.precio,
        descripcion: productData.descripcion,
        descripcion_corta: productData.descripcion_corta,
        categoria: categoriaId,
        stock: productData.stock,
        activo: productData.activo,
        codigo_barra: productData.codigo_barra,
        imagen: productData.imagen,
        imagenLink: productData.imagenLink,
        useLink: productData.useLink,
      });

      await fetchData();
      setShowAddModal(false);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const handleEditProduct = async (productData: {
    nombre: string;
    precio: number;
    descripcion: string;
    descripcion_corta: string;
    categoriaNombre: string;
    imagen: File | null;
    imagenLink?: string;
    useLink?: boolean;
    stock: number;
    activo: boolean;
    codigo_barra: string;
    pedido_items?: { id: number }[];
  }) => {
    try {
      if (!selectedProduct) return;

      const categorias = await getCategories();
      const categoriaExistente = categorias.data.find(
        (c: Category) =>
          c.nombre.toLowerCase() === productData.categoriaNombre.toLowerCase()
      );

      let categoriaId: number;
      if (categoriaExistente) {
        categoriaId = categoriaExistente.id;
      } else {
        const nuevaCategoria = await postCategory({
          data: { nombre: productData.categoriaNombre },
        });
        categoriaId = nuevaCategoria.data.id;
      }

      let imagenParaEnviar: File | string | null = null;

      if (!productData.useLink && productData.imagen) {
        if (selectedProduct.imagen?.id) {
          await deleteImage(selectedProduct.imagen.id);
        }
        imagenParaEnviar = productData.imagen;
      }

      await putProduct(selectedProduct.documentId, {
        nombre: productData.nombre,
        precio: productData.precio,
        descripcion: productData.descripcion,
        descripcion_corta: productData.descripcion_corta,
        categoria: categoriaId,
        stock: productData.stock,
        activo: productData.activo,
        imagen: imagenParaEnviar,
        imagenLink: productData.useLink ? productData.imagenLink : "",
        useLink: productData.useLink,
        codigo_barra: productData.codigo_barra,
        pedido_items:
          selectedProduct?.pedido_items?.map((item) => ({ id: item.id })) || [],
      });

      await fetchData();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error al editar producto:", error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      if (!selectedProduct) return;
      await deleteProduct(selectedProduct.documentId);
      await fetchData();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setPriceRange("all");
    setSortBy("nombre");
    setStockFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
    setCurrentPage(1);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    priceRange !== "all" ||
    sortBy !== "nombre" ||
    stockFilter !== "all" ||
    statusFilter !== "all" ||
    searchTerm !== "";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-500 mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="px-6 ">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Inventario</h1>
          </div>
          <Button
            variant="primary"
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus size={16} />
            <span>Nuevo producto</span>
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm hover:border-gray-300 transition-colors"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
                showFilters
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>Filtros</span>
              {hasActiveFilters && (
                <span className="bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                  {
                    [
                      selectedCategory !== "all",
                      priceRange !== "all",
                      stockFilter !== "all",
                      statusFilter !== "all",
                    ].filter(Boolean).length
                  }
                </span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-1 px-3 py-2 text-gray-500 hover:text-gray-700 text-sm"
              >
                <X size={14} />
                <span>Limpiar</span>
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <CustomSelect
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    options={categoryOptions}
                    placeholder="Todas"
                    size="sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Precio
                  </label>
                  <CustomSelect
                    value={priceRange}
                    onChange={setPriceRange}
                    options={priceOptions}
                    placeholder="Todos"
                    size="sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <CustomSelect
                    value={stockFilter}
                    onChange={setStockFilter}
                    options={stockOptions}
                    placeholder="Todos"
                    size="sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <CustomSelect
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={statusOptions}
                    placeholder="Todos"
                    size="sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Ordenar
                  </label>
                  <CustomSelect
                    value={sortBy}
                    onChange={setSortBy}
                    options={sortOptions}
                    placeholder="Nombre"
                    size="sm"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 px-6 py-4">
        <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
          <div className="flex-1">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {products.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            className="w-full h-full object-cover"
                            src={
                              product.imagen_link
                                ? product.imagen_link
                                : product.imagen?.url || Logo
                            }
                            alt={product.nombre}
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {product.nombre}
                          </div>
                          <div className="text-xs text-gray-500">
                            #{product.codigo_barra}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                        {product.categoria?.nombre || "Sin categoría"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(product.precio)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                          product.stock === 0
                            ? "bg-red-100 text-red-700"
                            : product.stock <= 10
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.stock ?? "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                          product.activo
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {product.activo ? "Disponible" : "No disponible"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowEditModal(true);
                          }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowDeleteModal(true);
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {products.length === 0 && (
              <div className="text-center py-12">
                <Package className="mx-auto h-8 w-8 text-gray-400 mb-3" />
                <p className="text-gray-500 text-sm">
                  {searchTerm || hasActiveFilters
                    ? "No se encontraron productos"
                    : "No hay productos disponibles"}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-2 text-xs text-gray-600 hover:text-gray-900"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {pageCount > 1 && (
        <div className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              ← Anterior
            </button>
            <span className="text-xs text-gray-500">
              {currentPage} de {pageCount} • {totalProducts} productos
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === pageCount}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      <ProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddProduct}
        mode="add"
      />

      <ProductModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditProduct}
        product={selectedProduct || undefined}
        mode="edit"
      />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteProduct}
        itemName="Producto"
      />
    </div>
  );
};

export default Products;
