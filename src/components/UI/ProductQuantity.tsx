import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface ProductQuantityProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'md';
}

const ProductQuantity: React.FC<ProductQuantityProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  size = 'md'
}) => {
  const buttonSize = size === 'sm' ? 'p-1' : 'p-2';
  const iconSize = size === 'sm' ? 16 : 20;
  const textSize = size === 'sm' ? 'text-sm min-w-[24px]' : 'text-base min-w-[32px]';

  return (
    <div className="flex items-center border border-secondary-200 rounded-md overflow-hidden">
      <button
        onClick={onDecrease}
        className={`${buttonSize} text-secondary-500 hover:bg-secondary-100 focus:outline-none`}
        aria-label="Decrease quantity"
      >
        <Minus size={iconSize} />
      </button>
      <div className={`${textSize} text-center font-medium`}>
        {quantity}
      </div>
      <button
        onClick={onIncrease}
        className={`${buttonSize} text-secondary-500 hover:bg-secondary-100 focus:outline-none`}
        aria-label="Increase quantity"
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
};

export default ProductQuantity;