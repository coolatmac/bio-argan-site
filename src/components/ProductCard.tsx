import { Package, ShoppingBag, Sparkles } from 'lucide-react';
import type { EnrichedProduct } from '../data/categories';
import { useCart } from '../context/CartContext';
import { useJsonLd } from '../hooks/useJsonLd';

interface ProductCardProps {
  product: EnrichedProduct;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { addItem } = useCart();

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description || product.title,
    category: product.category,
    image: product.images.length > 0 ? product.images : [product.image],
    brand: { '@type': 'Brand', name: 'BioArgan' },
    manufacturer: { '@type': 'Organization', name: 'BioArgan' },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Product Type',
        value: product.productType,
      },
      {
        '@type': 'PropertyValue',
        name: 'Usage',
        value: product.usage,
      },
      {
        '@type': 'PropertyValue',
        name: 'Minimum Order Quantity',
        value: product.moq,
      },
    ],
  };

  useJsonLd(productSchema, [product.handle]);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div
      onClick={onClick}
      className="group flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:shadow-stone-300/50 hover:border-amber-300 transition-all duration-300 text-left cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).style.opacity = '0.3';
          }}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-sm text-white text-xs font-medium">
            {product.productType}
          </span>
          {product.isBulk && (
            <span className="px-2.5 py-1 rounded-md bg-amber-500 text-stone-900 text-xs font-semibold w-fit">
              Bulk / Wholesale
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm text-stone-700 text-xs font-medium inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            {product.usage}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-stone-900 text-sm leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
          {product.title}
        </h3>
        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 min-w-0">
            <Package className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span className="truncate">{product.moq}</span>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-medium hover:bg-amber-500 hover:text-stone-900 transition-all duration-200 flex-shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
