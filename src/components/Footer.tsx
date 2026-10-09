import { Leaf } from 'lucide-react';
import { Link } from '../router';

export default function Footer() {
  return (
    <footer className="bg-stone-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-stone-900" />
              </div>
              <span className="text-lg font-bold text-white">BioArgan</span>
            </div>
            <p className="text-stone-400 text-sm max-w-xs">
              Certified organic Moroccan natural cosmetics manufacturer. Private label,
              bulk supply, and contract manufacturing for global beauty brands.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-stone-400 text-sm hover:text-amber-400 transition-colors">Catalog</Link></li>
              <li><Link to="/blog" className="text-stone-400 text-sm hover:text-amber-400 transition-colors">Blog</Link></li>
              <li><a href="https://wa.me/212674510688" target="_blank" rel="noopener noreferrer" className="text-stone-400 text-sm hover:text-amber-400 transition-colors">WhatsApp Inquiries</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Learn More</h3>
            <ul className="space-y-2">
              <li><Link to="/blog/argan-oil-production-process" className="text-stone-400 text-sm hover:text-amber-400 transition-colors">Argan Oil Production</Link></li>
              <li><Link to="/blog/moroccan-women-argan-cooperatives" className="text-stone-400 text-sm hover:text-amber-400 transition-colors">Argan Cooperatives</Link></li>
              <li><Link to="/blog/private-label-cosmetics-morocco-guide" className="text-stone-400 text-sm hover:text-amber-400 transition-colors">Private Label Guide</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 text-center">
          <p className="text-stone-600 text-xs">
            &copy; {new Date().getFullYear()} BioArgan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
