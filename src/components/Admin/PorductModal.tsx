/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "../UI/Button";
import { Product } from "../../types";
import { getCategories } from "../../services/Categori";

import Logo from "../../images/logo/LogoSinFondo.png";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: {
    nombre: string;
    precio: number;
    descripcion: string;
    descripcion_corta: string;
    categoriaNombre: string;
    imagen: File | null;
    imagenLink: string;
    stock: number;
    activo: boolean;
    codigo_barra: string;
  }) => void;
  product?: Product;
  mode: "add" | "edit";
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  product,
  mode,
}) => {
  const [formState, setFormState] = useState({
    nombre: "",
    precio: 0,
    descripcion: "",
    descripcion_corta: "",
    categoriaNombre: "",
    imagen: null as File | null,
    imagenLink: "",
    stock: 0,
    activo: true,
    useLink: false,
    codigo_barra: "",
  });

  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  useEffect(() => {
    if (product && mode === "edit") {
      const hasImageUrl = !!product.imagen?.url;
      const imagenUrlCompleta = hasImageUrl
        ? import.meta.env.VITE_API_URL + product.imagen.url
        : product.imagen_link || null;

      setFormState({
        nombre: product.nombre,
        precio: product.precio,
        descripcion: product.descripcion,
        descripcion_corta: product.descripcion_corta,
        categoriaNombre: product.categoria?.nombre || "",
        imagen: null,
        imagenLink: product.imagen_link || "",
        stock: product.stock ?? 0,
        activo: product.activo ?? true,
        useLink: !hasImageUrl && !!product.imagen_link,
        codigo_barra: product.codigo_barra,
      });

      if (imagenUrlCompleta) {
        setImagenPreview(imagenUrlCompleta);
      } else {
        setImagenPreview(null);
      }
    }
  }, [product, mode]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        const categoryNames = res.data.map((cat: any) => cat.nombre);
        setAllCategories(categoryNames);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryInput = (value: string) => {
    setFormState({ ...formState, categoriaNombre: value });
    if (value.trim() === "") {
      setFilteredCategories([]);
      return;
    }
    const filtered = allCategories.filter((cat) =>
      cat.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let dataToSubmit = { ...formState };

    if (!formState.imagen && !formState.imagenLink) {
      dataToSubmit.imagenLink = Logo;
    }

    onSubmit(dataToSubmit);

    if (mode === "add") {
      setFormState({
        nombre: "",
        precio: 0,
        descripcion: "",
        descripcion_corta: "",
        categoriaNombre: "",
        imagen: null,
        imagenLink: "",
        stock: 0,
        activo: true,
        useLink: false,
        codigo_barra: "",
      });
      setImagenPreview(null);
      setFilteredCategories([]);
    }
  };

  const handleClose = () => {
    setFormState({
      nombre: "",
      precio: 0,
      descripcion: "",
      descripcion_corta: "",
      categoriaNombre: "",
      imagen: null,
      imagenLink: "",
      stock: 0,
      activo: true,
      useLink: false,
      codigo_barra: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          onClick={handleClose}
        />

        <div className="relative bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold">
                  {mode === "add" ? "Añadir producto" : "Editar producto"}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg p-2 transition-all duration-200"
                aria-label="Cerrar modal"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)] overflow-hidden">
            {/* Formulario - Lado izquierdo */}
            <div className="flex-1 p-6 overflow-y-auto lg:pr-4">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-5 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Información básica
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Código de barra
                      </label>
                      <input
                        type="text"
                        value={formState.codigo_barra}
                        onChange={(e) => {
                          let value = e.target.value.toUpperCase();

                          // Solo permitir caracteres alfanuméricos
                          if (!/^[A-Z0-9]*$/.test(value)) return;

                          setFormState({
                            ...formState,
                            codigo_barra: value,
                          });
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          const paste = e.clipboardData
                            .getData("text")
                            .toUpperCase();
                          const sanitized = paste.replace(/[^A-Z0-9]/g, "");
                          setFormState((prev) => ({
                            ...prev,
                            codigo_barra: sanitized,
                          }));
                        }}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-200 bg-white"
                        placeholder="Ingresa el código de barras"
                        maxLength={20}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Nombre del producto
                      </label>
                      <input
                        type="text"
                        value={formState.nombre}
                        onChange={(e) =>
                          setFormState({ ...formState, nombre: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl ..."
                        required
                        placeholder="Ej. BEBIDA DIGIMON"
                        minLength={3}
                        maxLength={100}
                        autoComplete="off"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Precio
                        </label>
                        <input
                          type="text"
                          value={
                            formState.precio === 0
                              ? ""
                              : formState.precio.toString()
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || /^\d*\.?\d*$/.test(value)) {
                              const dotCount = (value.match(/\./g) || [])
                                .length;
                              if (dotCount <= 1) {
                                setFormState({
                                  ...formState,
                                  precio:
                                    value === "" ? 0 : parseFloat(value) || 0,
                                });
                              }
                            }
                          }}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-200 bg-white"
                          placeholder="Ingresa el precio"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Stock
                        </label>
                        <input
                          type="text"
                          value={
                            formState.stock === 0
                              ? ""
                              : formState.stock.toString()
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || /^\d+$/.test(value)) {
                              setFormState({
                                ...formState,
                                stock: value === "" ? 0 : parseInt(value, 10),
                              });
                            }
                          }}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-200 bg-white"
                          placeholder="Cantidad disponible"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-secondary-700">
                        Activo
                      </label>
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formState.activo}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              activo: e.target.checked,
                            })
                          }
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-300 rounded-full peer peer-checked:bg-green-500 transition-all duration-300 relative">
                          <div className="absolute top-0.5 left-0.5 bg-white w-6 h-6 rounded-full transition-transform duration-300 peer-checked:translate-x-7 shadow-md flex items-center justify-center">
                            <div
                              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                formState.activo
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                              }`}
                            ></div>
                          </div>
                        </div>
                        <span
                          className={`ml-3 text-sm font-medium transition-colors duration-300 ${
                            formState.activo
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {formState.activo ? "Activo" : "Inactivo"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Categoría
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Categoría
                    </label>
                    <input
                      type="text"
                      value={formState.categoriaNombre}
                      onChange={(e) => handleCategoryInput(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-200 bg-white"
                    />
                    {formState.categoriaNombre &&
                      !allCategories.includes(formState.categoriaNombre) && (
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          Esta categoría no existe, se creará automáticamente.
                        </p>
                      )}
                    {formState.categoriaNombre &&
                      filteredCategories.length > 0 && (
                        <div className="mt-1 bg-white border border-gray-200 rounded-xl shadow-md max-h-32 overflow-y-auto text-sm">
                          {filteredCategories.map((cat) => (
                            <div
                              key={cat}
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                setFormState({
                                  ...formState,
                                  categoriaNombre: cat,
                                });
                                setFilteredCategories([]);
                              }}
                            >
                              {cat}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Imagen del producto
                  </h3>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-secondary-700">
                        Tipo de imagen
                      </label>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formState.useLink}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              useLink: e.target.checked,
                              imagen: null,
                            })
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-300 rounded-full peer dark:bg-gray-300 peer-checked:bg-gray-600 transition-all"></div>
                        <span className="ml-2 text-sm text-secondary-700">
                          {formState.useLink ? "Enlace" : "Subir"}
                        </span>
                      </label>
                    </div>

                    {formState.useLink ? (
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Enlace de la imagen
                        </label>
                        <input
                          type="text"
                          value={formState.imagenLink || ""}
                          onChange={(e) => {
                            setFormState({
                              ...formState,
                              imagenLink: e.target.value,
                            });
                            setImagenPreview(e.target.value);
                          }}
                          placeholder="https://example.com/imagen.jpg"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-200 bg-white"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="flex flex-col gap-2 items-center justify-center w-full px-2 py-6 sm:py-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition-colors duration-200">
                          <span className="text-sm text-gray-500">
                            Haz clic para subir imagen
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              setFormState({ ...formState, imagen: file });
                              if (file) {
                                setImagenPreview(URL.createObjectURL(file));
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    type="button"
                    className="w-full sm:w-auto"
                  >
                    Cancelar
                  </Button>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-full sm:w-auto"
                  >
                    {mode === "add" ? "Añadir" : "Actualizar"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Imagen y descripción - Lado derecho */}
            <div className="lg:w-96 xl:w-[420px] bg-gradient-to-b from-slate-50 to-gray-50 border-l border-gray-100">
              <div className="p-6 h-full flex flex-col">
                <h3 className="text-lg font-semibold text-gray-700 mb-6">
                  Vista previa
                </h3>

                <div className="flex-1 space-y-6">
                  {/* Imagen */}
                  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <h4 className="text-sm font-medium text-gray-600 mb-3">
                      Imagen del producto
                    </h4>
                    <div className="flex justify-center">
                      <img
                        src={imagenPreview || Logo}
                        alt="Vista previa"
                        className="w-48 h-48 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  </div>

                  {/* Descripción larga */}
                  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <h4 className="text-sm font-medium text-gray-600 mb-3">
                      Descripción completa
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Descripción breve
                        </label>
                        <input
                          type="text"
                          value={formState.descripcion_corta}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              descripcion_corta: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-200 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Descripción completa
                        </label>
                        <textarea
                          value={formState.descripcion}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              descripcion: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-200 bg-white resize-none"
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
