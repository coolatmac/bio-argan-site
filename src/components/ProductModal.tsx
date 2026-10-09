import { useState } from 'react';
import { X, Package, ArrowRight, ShoppingBag, Check, Sparkles } from 'lucide-react';
import type { EnrichedProduct } from '../data/categories';
import { useCart } from '../context/CartContext';
import { useJsonLd } from '../hooks/useJsonLd';

interface ProductModalProps {
  product: EnrichedProduct;
  onClose: () => void;
  onInquire: (productTitle: string) => void;
}

export default function ProductModal({ product, onClose, onInquire }: ProductModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const { addItem, items } = useCart();
  const inCart = items.some((item) => item.product.handle === product.handle);

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
      { '@type': 'PropertyValue', name: 'Product Type', value: product.productType },
      { '@type': 'PropertyValue', name: 'Usage', value: product.usage },
      { '@type': 'PropertyValue', name: 'Minimum Order Quantity', value: product.moq },
    ],
  };

  useJsonLd(productSchema, [product.handle]);

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleInquire = () => {
    onInquire(product.title);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative bg-stone-100 p-6 flex items-center justify-center">
            <img
              src={product.images[activeImage] || product.image}
              alt={product.title}
              className="w-full h-auto max-h-80 object-contain rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.opacity = '0.3';
              }}
            />
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === idx
                        ? 'border-amber-500 scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-stone-900 text-white text-xs font-medium w-fit">
                    {product.productType}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium w-fit inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {product.usage}
                  </span>
                </div>
                {product.isBulk && (
                  <span className="px-2.5 py-1 rounded-md bg-amber-500 text-stone-900 text-xs font-semibold w-fit">
                    Bulk / Wholesale
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug mb-4">
              {product.title}
            </h2>

            {product.description && (
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                {product.description}
              </p>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 text-amber-700 mb-1">
                <Package className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">Minimum Order Quantity</span>
              </div>
              <p className="text-stone-800 text-sm font-medium">{product.moq}</p>
              {product.moqNote && (
                <p className="text-stone-500 text-xs mt-1">{product.moqNote}</p>
              )}
            </div>

            <div className="mt-auto flex flex-col gap-2">
              <button
                onClick={handleAddToCart}
                disabled={inCart}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {inCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={handleInquire}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-stone-900 font-semibold hover:bg-amber-400 transition-colors duration-200"
              >
                Inquire About This Product
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
