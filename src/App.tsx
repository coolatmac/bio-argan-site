import { Routes, Route } from './router';
import Header from './components/Header';
import Footer from './components/Footer';
import CatalogPage from './components/CatalogPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import { CartProvider } from './context/CartContext';
import { useJsonLd } from './hooks/useJsonLd';

function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {children}
      <Footer />
    </div>
  );
}

function BlogListRoute() {
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "BioArgan Journal",
    "description": "Stories and articles about Moroccan natural cosmetics, argan oil production, cooperatives, and beauty traditions.",
    "url": "https://bioargan.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "BioArgan",
      "url": "https://bioargan.com"
    }
  }, []);

  return (
    <BlogLayout>
      <BlogPage />
    </BlogLayout>
  );
}

function BlogPostRoute() {
  return (
    <BlogLayout>
      <BlogPostPage />
    </BlogLayout>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/blog" element={<BlogListRoute />} />
        <Route path="/blog/:slug" element={<BlogPostRoute />} />
      </Routes>
    </CartProvider>
  );
}
