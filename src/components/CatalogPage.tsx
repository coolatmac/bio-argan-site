import { useState, useMemo } from 'react';
import Hero from './Hero';
import CatalogHeader from './CatalogHeader';
import type { FilterMode } from './CatalogHeader';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import EmptyState from './EmptyState';
import Process from './Process';
import FAQ from './FAQ';
import InquiryForm from './InquiryForm';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import BlogCTA from './BlogCTA';
import { products } from '../data/products';
import { enrichProducts, productTypeOrder, usageOrder } from '../data/categories';
import type { EnrichedProduct } from '../data/categories';

const enrichedProducts = enrichProducts(products);

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState<FilterMode>('type');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProduct, setSelectedProduct] = useState<EnrichedProduct | null>(null);
  const [prefillProduct, setPrefillProduct] = useState('');

  const typeOptions = useMemo(() => {
    const set = new Set(enrichedProducts.map((p) => p.productType));
    return productTypeOrder.filter((t) => set.has(t));
  }, []);

  const usageOptions = useMemo(() => {
    const set = new Set(enrichedProducts.map((p) => p.usage));
    return usageOrder.filter((u) => set.has(u));
  }, []);

  const categoryOptions = useMemo(
    () => [...new Set(enrichedProducts.map((p) => p.category))].sort(),
    []
  );

  const filteredProducts = useMemo(() => {
    let result = enrichedProducts;

    if (selectedFilter !== 'All') {
      if (filterMode === 'type') {
        result = result.filter((p) => p.productType === selectedFilter);
      } else if (filterMode === 'usage') {
        result = result.filter((p) => p.usage === selectedFilter);
      } else {
        result = result.filter((p) => p.category === selectedFilter);
      }
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.productType.toLowerCase().includes(q) ||
          p.usage.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    const sorted = [...result];
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'category') {
      sorted.sort((a, b) => {
        if (a.category !== b.category) return a.category.localeCompare(b.category);
        return a.title.localeCompare(b.title);
      });
    }
    return sorted;
  }, [search, selectedFilter, filterMode, sortBy]);

  const handleInquire = (productTitle: string) => {
    setPrefillProduct(productTitle);
    setTimeout(() => {
      document.querySelector('#inquiry')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCheckout = () => {
    document.querySelector('#inquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedFilter('All');
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <section id="products" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CatalogHeader
            search={search}
            setSearch={setSearch}
            filterMode={filterMode}
            setFilterMode={setFilterMode}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            typeOptions={typeOptions}
            usageOptions={usageOptions}
            categoryOptions={categoryOptions}
            filteredCount={filteredProducts.length}
          />

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.handle}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          ) : (
            <EmptyState hasSearch={!!search || selectedFilter !== 'All'} onReset={resetFilters} />
          )}
        </div>
      </section>

      <Process />
      <FAQ />
      <BlogCTA />
      <InquiryForm />
      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onInquire={handleInquire}
        />
      )}

      <CartDrawer onCheckout={handleCheckout} />

      {prefillProduct && <div className="hidden">{prefillProduct}</div>}
    </div>
  );
}
