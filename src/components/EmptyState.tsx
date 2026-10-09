import { Search, SearchX } from 'lucide-react';

interface EmptyStateProps {
  hasSearch: boolean;
  onReset: () => void;
}

export default function EmptyState({ hasSearch, onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
        {hasSearch ? <Search className="w-8 h-8 text-stone-400" /> : <SearchX className="w-8 h-8 text-stone-400" />}
      </div>
      <h3 className="text-lg font-semibold text-stone-900 mb-1">No products found</h3>
      <p className="text-stone-500 text-sm mb-4">
        {hasSearch
          ? 'Try a different search term or category filter.'
          : 'There are no products in this category.'}
      </p>
      <button
        onClick={onReset}
        className="px-4 py-2 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors"
      >
        Clear filters
      </button>
    </div>
  );
}
