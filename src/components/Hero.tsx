import { PackageCheck, Globe, Sparkles, ArrowDown } from 'lucide-react';
import { products } from '../data/products';

const categories = [...new Set(products.map((p) => p.category))];

export default function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-900">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/40" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium tracking-wide mb-8 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          Certified Organic Moroccan Cosmetics
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Premium Natural Cosmetics
          <br />
          <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            from Morocco
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-stone-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Explore our catalog of {products.length}+ professional-grade cosmetic products across{' '}
          {categories.length} categories. Private label, bulk supply, and contract manufacturing
          for global beauty brands.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => scrollTo('#products')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-stone-900 font-semibold hover:bg-amber-400 transition-colors duration-200 shadow-lg shadow-amber-900/30"
          >
            Browse Catalog
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo('#process')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-700 text-stone-200 font-semibold hover:bg-stone-800 transition-colors duration-200"
          >
            Our Process
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            <PackageCheck className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mb-2" />
            <span className="text-2xl sm:text-3xl font-bold text-white">{products.length}+</span>
            <span className="text-xs sm:text-sm text-stone-500">Products</span>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mb-2" />
            <span className="text-2xl sm:text-3xl font-bold text-white">500+</span>
            <span className="text-xs sm:text-sm text-stone-500">Brands Launched</span>
          </div>
          <div className="flex flex-col items-center">
            <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mb-2" />
            <span className="text-2xl sm:text-3xl font-bold text-white">30+</span>
            <span className="text-xs sm:text-sm text-stone-500">Countries Exported</span>
          </div>
        </div>
      </div>
    </section>
  );
}
