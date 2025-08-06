import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Save,
  Package,
  DollarSign,
  Settings,
  Pencil,
  Trash2,
} from "lucide-react";
import Button from "../../components/UI/Button";
import DeleteConfirmationModal from "../../components/Admin/DeleteConfirmationModal";

interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  standardRate: number;
  expressRate: number;
  freeShippingThreshold: number;
  estimatedDays: string;
}

interface ShippingSettings {
  enableFreeShipping: boolean;
  freeShippingThreshold: number;
  defaultShippingRate: number;
  expressShippingRate: number;
  zones: ShippingZone[];
}

const ShippingSettings: React.FC = () => {
  const [settings, setSettings] = useState<ShippingSettings>({
    enableFreeShipping: true,
    freeShippingThreshold: 50,
    defaultShippingRate: 9.99,
    expressShippingRate: 19.99,
    zones: [
      {
        id: "1",
        name: "Domestic",
        countries: ["United States"],
        standardRate: 9.99,
        expressRate: 19.99,
        freeShippingThreshold: 50,
        estimatedDays: "3-5 business days",
      },
      {
        id: "2",
        name: "International",
        countries: ["Canada", "Mexico"],
        standardRate: 24.99,
        expressRate: 49.99,
        freeShippingThreshold: 100,
        estimatedDays: "7-14 business days",
      },
    ],
  });

  const [editingZone, setEditingZone] = useState<ShippingZone | null>(null);
  const [showAddZone, setShowAddZone] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [zoneToDelete, setZoneToDelete] = useState<ShippingZone | null>(null);

  const handleSaveSettings = () => {
    console.log("Saving shipping settings:", settings);
    alert("Shipping settings saved successfully!");
  };

  const handleUpdateZone = (zoneId: string, updates: Partial<ShippingZone>) => {
    setSettings((prev) => ({
      ...prev,
      zones: prev.zones.map((zone) =>
        zone.id === zoneId ? { ...zone, ...updates } : zone
      ),
    }));
  };

  const handleDeleteZone = (zone: ShippingZone) => {
    setZoneToDelete(zone);
    setShowDeleteModal(true);
  };

  const confirmDeleteZone = () => {
    if (zoneToDelete) {
      setSettings((prev) => ({
        ...prev,
        zones: prev.zones.filter((zone) => zone.id !== zoneToDelete.id),
      }));
      setShowDeleteModal(false);
      setZoneToDelete(null);
    }
  };

  const handleAddZone = (newZone: Omit<ShippingZone, "id">) => {
    const zone: ShippingZone = {
      ...newZone,
      id: Date.now().toString(),
    };
    setSettings((prev) => ({
      ...prev,
      zones: [...prev.zones, zone],
    }));
    setShowAddZone(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-secondary-900">
          Configuración de Envío
        </h1>
        <Button
          variant="primary"
          onClick={handleSaveSettings}
          className="flex items-center"
        >
          <Save size={20} className="mr-2" />
          Guardar Configuración
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6 mb-8"
      >
        <div className="flex items-center mb-6">
          <Settings className="w-6 h-6 text-primary-600 mr-3" />
          <h2 className="text-xl font-semibold text-secondary-900">
            Configuración General
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.enableFreeShipping}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    enableFreeShipping: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-primary-600 bg-secondary-100 border-secondary-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm font-medium text-secondary-900">
                Activar Envío Gratis
              </span>
            </label>
            <p className="text-xs text-secondary-500 mt-1">
              Permite que los clientes obtengan envío gratuito si cumplen
              ciertas condiciones
            </p>
          </div>

          {settings.enableFreeShipping && (
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Umbral de Envío Gratis
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
                  size={16}
                />
                <input
                  type="text"
                  value={settings.freeShippingThreshold.toLocaleString("es-CL")}
                  onChange={(e) => {
                    const raw = e.target.value
                      .replace(/\./g, "")
                      .replace(/\$/g, "");
                    setSettings((prev) => ({
                      ...prev,
                      freeShippingThreshold: Number(raw) || 0,
                    }));
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="50.000"
                  min="0"
                  step="1"
                />
              </div>
              <p className="text-xs text-secondary-500 mt-1">
                Monto mínimo del pedido para obtener envío gratis
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Tarifa de Envío Estándar
            </label>
            <div className="relative">
              <DollarSign
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
                size={16}
              />
              <input
                type="text"
                value={settings.defaultShippingRate.toLocaleString("es-CL")}
                onChange={(e) => {
                  const raw = e.target.value
                    .replace(/\./g, "")
                    .replace(/\$/g, "");
                  setSettings((prev) => ({
                    ...prev,
                    defaultShippingRate: Number(raw) || 0,
                  }));
                }}
                className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="50.000"
                min="0"
                step="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Tarifa de Envío Exprés
            </label>
            <div className="relative">
              <DollarSign
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
                size={16}
              />
              <input
                type="text"
                value={settings.expressShippingRate.toLocaleString("es-CL")}
                onChange={(e) => {
                  const raw = e.target.value
                    .replace(/\./g, "")
                    .replace(/\$/g, "");
                  setSettings((prev) => ({
                    ...prev,
                    expressShippingRate: Number(raw) || 0,
                  }));
                }}
                className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="50.000"
                min="0"
                step="1"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm"
      >
        <div className="p-6 border-b border-secondary-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Truck className="w-6 h-6 text-primary-600 mr-3" />
              <h2 className="text-xl font-semibold text-secondary-900">
                Zonas de Envío
              </h2>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowAddZone(true)}
              className="flex items-center"
            >
              <Package size={16} className="mr-2" />
              Agregar Zona
            </Button>
          </div>
          <p className="text-secondary-600 mt-2">
            Configura tarifas de envío para diferentes regiones y países
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {settings.zones.map((zone) => (
              <div
                key={zone.id}
                className="border border-secondary-200 rounded-lg p-4 hover:border-secondary-300 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-secondary-900">
                      {zone.name}
                    </h3>
                    <p className="text-sm text-secondary-600">
                      {zone.countries.join(", ")} • {zone.estimatedDays}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingZone(zone)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      <Pencil size={18} className="inline mr-1" />
                    </button>
                    <button
                      onClick={() => handleDeleteZone(zone)}
                      className="text-error-600 hover:text-error-700 text-sm font-medium"
                    >
                      <Trash2 size={18} className="inline mr-1" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-secondary-500">Tarifa Estándar:</span>
                    <span className="ml-2 font-medium">
                      ${zone.standardRate}
                    </span>
                  </div>
                  <div>
                    <span className="text-secondary-500">Tarifa Exprés:</span>
                    <span className="ml-2 font-medium">
                      ${zone.expressRate}
                    </span>
                  </div>
                  <div>
                    <span className="text-secondary-500">Envío Gratis:</span>
                    <span className="ml-2 font-medium">
                      {zone.freeShippingThreshold > 0
                        ? `$${zone.freeShippingThreshold}+`
                        : "Desactivado"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {editingZone && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-black opacity-30"
              onClick={() => setEditingZone(null)}
            ></div>

            <div className="relative bg-white rounded-lg w-full max-w-md p-6">
              <h3 className="text-lg font-medium text-secondary-900 mb-4">
                Editar Zona de Envío: {editingZone.name}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Tarifa Estándar ($)
                  </label>
                  <input
                    type="number"
                    value={editingZone.standardRate}
                    onChange={(e) =>
                      setEditingZone({
                        ...editingZone,
                        standardRate: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Tarifa Exprés ($)
                  </label>
                  <input
                    type="number"
                    value={editingZone.expressRate}
                    onChange={(e) =>
                      setEditingZone({
                        ...editingZone,
                        expressRate: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Umbral para Envío Gratis ($)
                  </label>
                  <input
                    type="number"
                    value={editingZone.freeShippingThreshold}
                    onChange={(e) =>
                      setEditingZone({
                        ...editingZone,
                        freeShippingThreshold: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    min="0"
                    step="0.01"
                    placeholder="0 para desactivar envío gratis"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setEditingZone(null)}>
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleUpdateZone(editingZone.id, editingZone);
                    setEditingZone(null);
                  }}
                >
                  Guardar Cambios
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddZone && (
        <AddZoneModal
          onClose={() => setShowAddZone(false)}
          onAdd={handleAddZone}
        />
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setZoneToDelete(null);
        }}
        onConfirm={confirmDeleteZone}
        itemName={`Zona de Envío "${zoneToDelete?.name}"`}
      />
    </div>
  );
};

interface AddZoneModalProps {
  onClose: () => void;
  onAdd: (zone: Omit<ShippingZone, "id">) => void;
}

const AddZoneModal: React.FC<AddZoneModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    countries: "",
    standardRate: 0,
    expressRate: 0,
    freeShippingThreshold: 0,
    estimatedDays: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name: formData.name,
      countries: formData.countries.split(",").map((c) => c.trim()),
      standardRate: formData.standardRate,
      expressRate: formData.expressRate,
      freeShippingThreshold: formData.freeShippingThreshold,
      estimatedDays: formData.estimatedDays,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={onClose}
        ></div>

        <div className="relative bg-white rounded-lg w-full max-w-md p-6">
          <h3 className="text-lg font-medium text-secondary-900 mb-4">
            Agregar Nueva Zona de Envío
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Nombre del país o región
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Chile"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Región (separados por coma)
              </label>
              <input
                type="text"
                value={formData.countries}
                onChange={(e) =>
                  setFormData({ ...formData, countries: e.target.value })
                }
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Ej: Santiago, Valparaíso, Concepción"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Tarifa Estándar ($)
                </label>
                <input
                  type="number"
                  value={formData.standardRate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      standardRate: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Tarifa Exprés ($)
                </label>
                <input
                  type="number"
                  value={formData.expressRate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expressRate: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Umbral para Envío Gratuito ($)
              </label>
              <input
                type="number"
                value={formData.freeShippingThreshold}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    freeShippingThreshold: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                min="0"
                step="0.01"
                placeholder="0 para desactivar envío gratuito"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Tiempo Estimado de Entrega
              </label>
              <input
                type="text"
                value={formData.estimatedDays}
                onChange={(e) =>
                  setFormData({ ...formData, estimatedDays: e.target.value })
                }
                className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Ej: 7-14 días hábiles"
                required
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="outline" onClick={onClose} type="button">
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Agregar Zona
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingSettings;
