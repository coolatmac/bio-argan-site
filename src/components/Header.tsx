import { useState, useEffect } from 'react';
import { Leaf, Menu, X, MessageCircle, ShoppingBag } from 'lucide-react';
import { Link, useLocation, useRouter } from '../router';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const location = useLocation();
  const { navigate } = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'Process', href: '#process' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Inquiry', href: '#inquiry' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-900/95 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-stone-900/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/30">
              <Leaf className="w-6 h-6 text-stone-900" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">BioArgan</span>
              <p className="text-[10px] text-amber-400/80 tracking-wider uppercase">Moroccan Natural Cosmetics</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/blog"
              className="text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors duration-200"
            >
              Blog
            </Link>
            <a
              href="https://wa.me/212674510688"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-stone-900 text-sm font-semibold hover:bg-amber-400 transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <button
              onClick={openCart}
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-stone-700 text-white hover:bg-stone-800 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-stone-900 text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={openCart}
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-stone-700 text-white"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-stone-900 text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left px-4 py-2 text-stone-300 hover:text-amber-400 hover:bg-stone-800/50 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/blog"
              className="text-left px-4 py-2 text-stone-300 hover:text-amber-400 hover:bg-stone-800/50 rounded-lg transition-colors"
            >
              Blog
            </Link>
            <a
              href="https://wa.me/212674510688"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-stone-900 text-sm font-semibold hover:bg-amber-400 transition-colors w-fit"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
