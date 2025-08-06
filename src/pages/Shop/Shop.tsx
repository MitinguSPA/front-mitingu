import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProductsPaginated } from "../../services/Product";
import { Product } from "../../types";
import { Search, Filter, X, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { getCategories } from "../../services/Categori";
import { useLocation } from "react-router-dom";
import { socket } from "../../socket";

const PAGE_SIZE = 21;

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 text-left border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white hover:border-secondary-300 transition-all ${className}`}
      >
        <span className="block truncate text-secondary-900">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown
            className={`h-4 w-4 text-secondary-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
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
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-secondary-900'
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const categoryFromQuery = queryParams.get("categoria") || "all";

  const categoryOptions = [
    { value: "all", label: "Todas las categorías" },
    ...categories.map(category => ({ value: category, label: category }))
  ];

  const priceOptions = [
    { value: "all", label: "Todos los precios" },
    { value: "0-5000", label: "Hasta $5.000" },
    { value: "5000-10000", label: "$5.000 - $10.000" },
    { value: "10000+", label: "Más de $10.000" },
  ];

  const sortOptions = [
    { value: "name", label: "Nombre (A-Z)" },
    { value: "price-asc", label: "Precio: menor a mayor" },
    { value: "price-desc", label: "Precio: mayor a menor" },
  ];

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getProductsPaginated(currentPage, PAGE_SIZE, {
        searchTerm,
        category: selectedCategory,
        priceRange,
        sortBy,
      });
      setProducts(response.data);
      setPageCount(response.meta.pagination.pageCount);
      setTotalProducts(response.meta.pagination.total);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      const names = [
        ...new Set(
          response.data
            .map((cat: any) => cat.nombre || "Sin categoría")
            .filter(
              (name: string) => typeof name === "string" && name.trim() !== ""
            )
        ),
      ].sort((a, b) => a.localeCompare(b));
      setCategories(names);
    } catch (error) {
      console.error("Error cargando categorías:", error);
    }
  };

  useEffect(() => {
    setSelectedCategory(categoryFromQuery);
    fetchData();
    fetchCategories();
  }, [
    location.search,
    currentPage,
    searchTerm,
    selectedCategory,
    priceRange,
    sortBy,
  ]);

  useEffect(() => {
    socket.on("nuevoProducto", (newProd: Product) => {
      console.log("🔥 nuevoProducto:", newProd);
      setProducts((prev) => [newProd, ...prev]);
      setTotalProducts((prev) => prev + 1);
    });
    socket.on("stockUpdated", ({ productId, stock }) => {
      console.log("📦 stockUpdated:", productId, stock);
      setProducts((prev) =>
        prev.map((p) =>
          p.documentId === productId ? { ...p, stock } : p
        )
      );
    });
    socket.on("productoEliminado", (deleted: string) => {
      console.log("❌ productoEliminado:", deleted);
      setProducts((prev) => prev.filter((p) => p.documentId !== deleted));
      setTotalProducts((prev) => prev - 1);
    });

    socket.on("orderCreated", (order) => {
      console.log("🆕 orderCreated:", order);
    });

    return () => {
      socket.off("nuevoProducto");
      socket.off("productoActualizado");
      socket.off("productoEliminado");
      socket.off("stockUpdated");
      socket.off("orderCreated");
    };
  }, []);

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== "all" ||
    priceRange !== "all" ||
    sortBy !== "name";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange("all");
    setSortBy("name");
  };

  return (
    <div className=" container-pad mx-auto py-12 w-900 max-w-7xl min-h-screen">
      {/* Buscador */}
      <div className="relative mb-6">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => {
            setCurrentPage(1);
            setSearchTerm(e.target.value);
          }}
          className="w-full pl-10 pr-4 py-3 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 hover:border-secondary-300 transition-all"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros */}
        <div className="md:w-1/4 space-y-4">
          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Categoría
            </label>
            <CustomSelect
              value={selectedCategory}
              onChange={(value) => {
                setCurrentPage(1);
                setSelectedCategory(value);
              }}
              options={categoryOptions}
              placeholder="Todas las categorías"
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Precio
            </label>
            <CustomSelect
              value={priceRange}
              onChange={(value) => {
                setCurrentPage(1);
                setPriceRange(value);
              }}
              options={priceOptions}
              placeholder="Todos los precios"
            />
          </div>

          {/* Ordenar por */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Ordenar por
            </label>
            <CustomSelect
              value={sortBy}
              onChange={(value) => {
                setCurrentPage(1);
                setSortBy(value);
              }}
              options={sortOptions}
              placeholder="Nombre (A-Z)"
            />
          </div>

          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearFilters}
              className="w-full px-4 py-2 bg-secondary-100 text-secondary-700 rounded-md hover:bg-secondary-200 flex items-center justify-center transition-all"
            >
              <X size={16} className="mr-1" />
              Limpiar filtros
            </motion.button>
          )}
        </div>

        {/* Resultados */}
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-secondary-600">
              Mostrando {products.length} productos de un total de{" "}
              {totalProducts}
            </p>
            {hasActiveFilters && (
              <div className="flex items-center text-sm text-secondary-500">
                <Filter size={16} className="mr-1" />
                Filtros aplicados
              </div>
            )}
          </div>

          <div className="relative" style={{ minHeight: "calc(300px * 7)" }}>
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-secondary-500 text-lg">
                  No se encontraron productos.
                </p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={fadeInUp}
                    className="h-full"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}

                {/* Placeholders invisibles para mantener el espacio */}
                {products.length % 3 !== 0 &&
                  !isLoading &&
                  Array.from({ length: 3 - (products.length % 3) }).map(
                    (_, index) => (
                      <div
                        key={`placeholder-${index}`}
                        className="invisible"
                        style={{ height: "100%" }}
                      />
                    )
                  )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Paginado */}
      <div className="flex justify-center items-center mt-8 space-x-4 pb-12">
        <button
          className="btn btn-outline px-3 transition-all"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} />
          Anterior
        </button>
        <span className="text-secondary-700">
          Página {currentPage} de {pageCount}
        </span>
        <button
          className="btn btn-outline px-3 transition-all"
          onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
          disabled={currentPage === pageCount}
        >
          Siguiente
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Shop;