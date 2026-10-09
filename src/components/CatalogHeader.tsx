import { Search, Package, Layers, Sparkles, Tag } from 'lucide-react';

export type FilterMode = 'type' | 'usage' | 'category';

interface CatalogHeaderProps {
  search: string;
  setSearch: (v: string) => void;
  filterMode: FilterMode;
  setFilterMode: (v: FilterMode) => void;
  selectedFilter: string;
  setSelectedFilter: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  typeOptions: string[];
  usageOptions: string[];
  categoryOptions: string[];
  filteredCount: number;
}

const modeLabels: Record<FilterMode, { label: string; icon: typeof Tag }> = {
  type: { label: 'By Product Type', icon: Package },
  usage: { label: 'By Usage', icon: Sparkles },
  category: { label: 'By Category', icon: Layers },
};

export default function CatalogHeader({
  search,
  setSearch,
  filterMode,
  setFilterMode,
  selectedFilter,
  setSelectedFilter,
  sortBy,
  setSortBy,
  typeOptions,
  usageOptions,
  categoryOptions,
  filteredCount,
}: CatalogHeaderProps) {
  const handleModeChange = (mode: FilterMode) => {
    setFilterMode(mode);
    setSelectedFilter('All');
  };

  const currentOptions =
    filterMode === 'type' ? typeOptions : filterMode === 'usage' ? usageOptions : categoryOptions;
  const ActiveIcon = modeLabels[filterMode].icon;

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-600 text-sm font-medium mb-2">
            <Layers className="w-4 h-4" />
            <span>{selectedFilter === 'All' ? modeLabels[filterMode].label : selectedFilter}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Product Catalog
          </h2>
          <p className="text-stone-500 mt-1">
            Showing {filteredCount} {filteredCount === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search by name, category, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <ActiveIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="appearance-none pl-10 pr-8 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all cursor-pointer min-w-[180px]"
            >
              <option value="All">All {filterMode === 'type' ? 'Types' : filterMode === 'usage' ? 'Usages' : 'Categories'}</option>
              {currentOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all cursor-pointer"
          >
            <option value="name">Sort by Name</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium text-stone-500 mr-1">Browse by:</span>
        {(Object.keys(modeLabels) as FilterMode[]).map((mode) => {
          const Icon = modeLabels[mode].icon;
          const active = filterMode === mode;
          return (
            <button
              key={mode}
              onClick={() => handleModeChange(mode)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                active
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {modeLabels[mode].label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
