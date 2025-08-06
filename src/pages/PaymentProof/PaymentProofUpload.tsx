import React, { useState, useRef, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
  Camera,
  CreditCard,
} from "lucide-react";
import Button from "../../components/UI/Button";
import { updatePedido } from "../../services/Pedidos";
import {
  getPagoLinkByToken,
  markPagoLinkAsUsed,
} from "../../services/pago-link";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: "uploading" | "success" | "error";
}

interface PaymentProofUploadProps {
  token: string;
}

const PaymentProofUpload: React.FC<PaymentProofUploadProps> = ({ token }) => {
  const [pedidoId, setPedidoId] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pedidoItems, setPedidoItems] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   const fetchPedido = async () => {
  //     try {
  //       const data = await getPagoLinkByToken(token!);

  //       const pedido = data;
  //       console.log("Pedido data:", pedido);

  //       if (!pedido?.documentId) {
  //         window.location.href = "/";
  //       }
  //       setPedidoId(pedido.documentId);
  //     } catch (err) {
  //       console.error("Error al cargar el token:", err);
  //     }
  //   };
  //   fetchPedido();
  // }, [token]);

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const data = await getPagoLinkByToken(token!);
        if (!data?.documentId) window.location.href = "/";
        setPedidoId(data.documentId);
        setPedidoItems(data.pedido_items || []); // 👈 Guardamos los IDs
      } catch (err) {
        console.error("Error al cargar el token:", err);
      }
    };
    fetchPedido();
  }, [token]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const id = Math.random().toString(36).substr(2, 9);
        const preview = URL.createObjectURL(file);
        const newFile: UploadedFile = {
          id,
          file,
          preview,
          status: "uploading",
        };
        setUploadedFiles((prev) => [...prev, newFile]);
        subirComprobante(id, file);
      }
    });
  };

  const subirComprobante = async (id: string, file: File) => {
    if (!pedidoId) return;
    try {
      await updatePedido(pedidoId, {
        comprobante_tranferencia: file,
        fields: {},
        pedido_items: pedidoItems,
      });
      setUploadedFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: "success" } : f))
      );
    } catch (error) {
      console.error("Error al subir comprobante:", error);
      setUploadedFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: "error" } : f))
      );
    }
    await markPagoLinkAsUsed(token);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.preview) URL.revokeObjectURL(fileToRemove.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="text-center py-8 md:py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
          <CheckCircle className="h-8 w-8 md:h-10 md:w-10 text-green-500" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 px-4">
          ¡Comprobante Enviado Exitosamente!
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 max-w-md mx-auto px-4">
          Hemos recibido tu comprobante de pago. Te notificaremos por email una
          vez que sea verificado.
        </p>
        <div className="bg-[#F4A9B6]/10 rounded-lg p-3 md:p-4 max-w-md mb-4 md:mb-6 mx-auto">
          <p className="text-xs md:text-sm text-[#DD6E81] font-medium text-center">
            📧 Recibirás una confirmación en tu email en las próximas 2-4 horas
            laborables.
          </p>
        </div>
        <Button
          onClick={() => (window.location.href = "/")}
          variant="accent"
          size="lg"
          className="bg-[#DD6E81] hover:bg-[#c1485c]"
        >
          Volver al Inicio
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div
        className={`border-2 border-dashed rounded-lg md:rounded-xl p-4 md:p-8 text-center transition-all duration-300 ${
          isDragOver
            ? "border-[#DD6E81] bg-[#F4A9B6]/10"
            : "border-gray-300 hover:border-[#DD6E81] hover:bg-gray-50"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 bg-[#F4A9B6]/20 rounded-full flex items-center justify-center mb-4 md:mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Upload className="h-8 w-8 md:h-10 md:w-10 text-[#DD6E81]" />
          </motion.div>
          <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 px-4">
            Sube tu Comprobante de Pago
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 max-w-md px-4">
            Arrastra y suelta tu comprobante aquí, o haz clic para seleccionar
            el archivo desde tu dispositivo
          </p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="accent"
            size="lg"
            className="bg-[#DD6E81] hover:bg-[#c1485c] mb-3 md:mb-4"
          >
            <Camera className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Seleccionar Archivo</span>
          </Button>
          <p className="text-xs md:text-sm text-gray-500 px-4">
            Formatos soportados: JPG & PNG • Tamaño máximo: 10MB
          </p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        multiple
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-3 md:space-y-4"
          >
            <h3 className="text-base md:text-lg font-semibold text-gray-900">
              Archivos Subidos
            </h3>
            <div className="space-y-2 md:space-y-3">
              {uploadedFiles.map((uploadedFile) => (
                <motion.div
                  key={uploadedFile.id}
                  className="flex items-center p-3 md:p-4 bg-gray-50 rounded-lg border"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="flex-shrink-0 mr-3 md:mr-4">
                    {uploadedFile.preview ? (
                      <img
                        src={uploadedFile.preview}
                        alt="Preview"
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg border"
                      />
                    ) : (
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-lg flex items-center justify-center border">
                        <FileText className="h-6 w-6 md:h-8 md:w-8 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-medium text-gray-900 truncate">
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <div className="mt-1">
                      {uploadedFile.status === "uploading" && (
                        <div className="flex items-center text-blue-600">
                          <div className="animate-spin rounded-full h-3 w-3 md:h-4 md:w-4 border-b-2 border-blue-600 mr-2"></div>
                          <span className="text-xs">Subiendo...</span>
                        </div>
                      )}
                      {uploadedFile.status === "success" && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                          <span className="text-xs">Subido exitosamente</span>
                        </div>
                      )}
                      {uploadedFile.status === "error" && (
                        <div className="flex items-center text-red-600">
                          <AlertCircle className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                          <span className="text-xs">Error al subir</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(uploadedFile.id)}
                    className="ml-2 md:ml-4 p-1.5 md:p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="h-3 w-3 md:h-4 md:w-4 text-gray-500" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {uploadedFiles.length > 0 && (
        <motion.div
          className="flex justify-center pt-4 md:pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={handleSubmit}
            variant="accent"
            size="lg"
            className="bg-[#DD6E81] hover:bg-[#c1485c] px-6 md:px-8"
            disabled={uploadedFiles.some((f) => f.status === "uploading")}
          >
            <CreditCard className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">
              Confirmar y Enviar Comprobante
            </span>
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentProofUpload;
