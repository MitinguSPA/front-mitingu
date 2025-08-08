import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../services/Product";
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
        className={`w-full h-12 px-4 text-left border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md ${className}`}
      >
        <span className="block truncate text-gray-800 font-medium">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
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
              className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-auto"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full h-12 px-4 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors duration-150 ${
                    value === option.value
                      ? 'bg-blue-100 text-blue-800 font-semibold border-l-4 border-blue-500'
                      : 'text-gray-800 font-medium'
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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      const response = await getProducts();
      const items: Product[] = response?.data ?? response ?? [];
      setAllProducts(items);
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
            .filter((name: string) => typeof name === "string" && name.trim() !== "")
        ),
      ].sort((a, b) => a.localeCompare(b));
      setCategories(names);
    } catch (error) {
      console.error("Error cargando categorías:", error);
    }
  };

  useEffect(() => {
    setSelectedCategory(categoryFromQuery);
  }, [location.search]);

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, [location.search]);

  useEffect(() => {
    socket.on("nuevoProducto", (newProd: Product) => {
      console.log("🔥 nuevoProducto:", newProd);
      setAllProducts((prev) => [newProd, ...prev]);
    });
    socket.on("stockUpdated", ({ productId, stock }: any) => {
      console.log("📦 stockUpdated:", productId, stock);
      setAllProducts((prev) =>
        prev.map((p) =>
          (p as any).documentId === productId || p.id === productId ? { ...p, stock } : p
        )
      );
    });
    socket.on("productoEliminado", (deleted: string) => {
      console.log("❌ productoEliminado:", deleted);
      setAllProducts((prev) =>
        prev.filter((p) => !((p as any).documentId === deleted || p.id === deleted))
      );
    });

    socket.on("orderCreated", (order: any) => {
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

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();

    const filtered = allProducts.filter((p) => {
      const catName =
        (p as any).categoria?.nombre ??
        (p as any).categoria?.data?.attributes?.nombre ??
        (p as any).categoria?.data?.nombre ??
        "";

      if (selectedCategory !== "all" && catName !== selectedCategory) return false;

      if (term) {
        const nombre = (p.nombre ?? "").toString().toLowerCase();
        const descripcion = (p.descripcion ?? "").toString().toLowerCase();
        const codigo = ((p as any).codigo_barra ?? "").toString().toLowerCase();
        const categoriaLower = catName.toString().toLowerCase();

        if (
          !(
            nombre.includes(term) ||
            descripcion.includes(term) ||
            categoriaLower.includes(term) ||
            codigo.includes(term)
          )
        ) {
          return false;
        }
      }

      if (priceRange !== "all") {
        const price = Number((p as any).precio ?? (p as any).price ?? 0);
        if (priceRange === "0-5000" && price > 5000) return false;
        if (priceRange === "5000-10000" && (price <= 5000 || price > 10000)) return false;
        if (priceRange === "10000+" && price <= 10000) return false;
      }

      return true;
    });

    const sorted = [...filtered];
    if (sortBy === "price-asc") {
      sorted.sort(
        (a, b) => Number((a as any).precio ?? (a as any).price ?? 0) - Number((b as any).precio ?? (b as any).price ?? 0)
      );
    } else if (sortBy === "price-desc") {
      sorted.sort(
        (a, b) => Number((b as any).precio ?? (b as any).price ?? 0) - Number((a as any).precio ?? (a as any).price ?? 0)
      );
    } else {
      sorted.sort((a, b) => ((a.nombre ?? "") as string).localeCompare((b.nombre ?? "") as string));
    }

    setFilteredProducts(sorted);

    const total = sorted.length;
    setTotalProducts(total);
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    setPageCount(totalPages);

    if (currentPage > totalPages) {
      setCurrentPage(1);
      return; 
    }

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = sorted.slice(start, start + PAGE_SIZE);

    setDisplayedProducts(pageItems);
    setProducts(pageItems);
  }, [allProducts, searchTerm, selectedCategory, priceRange, sortBy, currentPage]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const hasActiveFilters =
    Boolean(searchTerm) ||
    selectedCategory !== "all" ||
    priceRange !== "all" ||
    sortBy !== "name";

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange("all");
    setSortBy("name");
    setCurrentPage(1);
  };

  return (
    <div className="bg-gradient-to-br -mt-20 from-gray-50 via-white to-gray-100 min-h-screen">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Buscador */}
        <div className="relative object-center m-10 max-w-2xl mx-auto">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={22}
            />
            <input
              type="text"
              placeholder="Buscar productos por nombre, código o categoría..."
              value={searchTerm}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchTerm(e.target.value);
              }}
              className="w-full h-14 pl-12 pr-6 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md bg-white"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filtros */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="pt-20 sticky top-6">
              <div className="flex items-center mb-6">
                <Filter className="text-blue-500 mr-3" size={24} />
                <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
              </div>

              <div className="space-y-8">
                {/* Categoría */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
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
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                    Rango de Precio
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
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
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
                    className="w-full h-12 px-6 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 flex items-center justify-center transition-all duration-200 font-medium border-2 border-red-200 hover:border-red-300"
                  >
                    <X size={18} className="mr-2" />
                    Limpiar Filtros
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="flex-1">
            {/* Header de resultados */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {totalProducts === 0 ? "Sin resultados" : `${totalProducts} productos encontrados`}
                  </p>
                  <p className="text-gray-600">
                    Mostrando {products.length} productos en esta página
                  </p>
                </div>
                {hasActiveFilters && (
                  <div className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-200">
                    <Filter size={16} className="mr-2" />
                    <span className="font-medium">Filtros aplicados</span>
                  </div>
                )}
              </div>
            </div>

            {/* Grid de productos */}
            <div className="relative">
              <div className="min-h-[800px]">
                {isLoading ? (
                  <div className="flex items-center justify-center h-96">
                    <div className="flex flex-col items-center gap-4">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
                      <p className="text-gray-600 font-medium">Cargando productos...</p>
                    </div>
                  </div>
                ) : products.length === 0 ? (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search size={32} className="text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        No se encontraron productos
                      </h3>
                      <p className="text-gray-600">
                        Intenta ajustar tus filtros o términos de búsqueda
                      </p>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
                        <div className="h-full">
                          <ProductCard product={product} />
                        </div>
                      </motion.div>
                    ))}

                    {/* Placeholders para mantener el grid */}
                    {products.length % 3 !== 0 &&
                      !isLoading &&
                      Array.from({ length: 3 - (products.length % 3) }).map(
                        (_, index) => (
                          <div
                            key={`placeholder-${index}`}
                            className="invisible h-96"
                          />
                        )
                      )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Paginación */}
        {!isLoading && products.length > 0 && (
          <div className="mt-16 flex justify-center">
            <div className=" rounded-2xl p-6">
              <div className="flex items-center gap-6">
                <button
                  className="h-12 px-6 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 flex items-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={18} />
                  Anterior
                </button>
                
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 font-medium">Página</span>
                  <span className="text-2xl font-bold text-blue-600">{currentPage}</span>
                  <span className="text-gray-600 font-medium">de {pageCount}</span>
                </div>

                <button
                  className="h-12 px-6 bg-blue-500 text-white rounded-xl hover:bg-blue-600 flex items-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
                  disabled={currentPage === pageCount}
                >
                  Siguiente
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;