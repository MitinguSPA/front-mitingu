import React from "react";
import { Check } from "lucide-react";
import { ProductVariant } from "../../types";
import { formatCurrency } from "../../utils/formatters";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant?: ProductVariant;
  onSelect: (variant: ProductVariant) => void;
  type: "color" | "size" | "material";
  label: string;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelect,
  type,
  label,
}) => {
  if (type === "color") {
    return (
      <div>
        <h3 className="text-sm font-medium text-secondary-900 mb-3">
          {label}: {selectedVariant?.name}
        </h3>
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => onSelect(variant)}
              className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                selectedVariant?.id === variant.id
                  ? "border-primary-600 ring-2 ring-primary-200"
                  : "border-secondary-200 hover:border-secondary-300"
              }`}
              style={{ backgroundColor: variant.value }}
              title={variant.name}
            >
              {selectedVariant?.id === variant.id && (
                <Check
                  size={16}
                  className="absolute inset-0 m-auto text-white drop-shadow-lg"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-sm font-medium text-secondary-900 mb-3">
        {label}: {selectedVariant?.name}
        {selectedVariant?.price && (
          <span className="text-primary-600 ml-1">
            ({selectedVariant.price > 0 ? "+" : ""}
            {formatCurrency(selectedVariant.price)})
          </span>
        )}
      </h3>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onSelect(variant)}
            className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
              selectedVariant?.id === variant.id
                ? "border-primary-600 bg-primary-50 text-primary-700"
                : "border-secondary-200 text-secondary-700 hover:border-secondary-300"
            }`}
          >
            {variant.name}
            {variant.price && (
              <span className="ml-1 text-xs">
                ({variant.price > 0 ? "+" : ""}
                {formatCurrency(variant.price)})
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;
