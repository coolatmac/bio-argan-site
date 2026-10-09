import { Link } from '../router';
import { ArrowRight, BookOpen } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

export default function BlogCTA() {
  const featured = blogPosts.slice(0, 3);

  return (
    <section className="py-16 sm:py-20 bg-stone-50 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wider uppercase mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            BioArgan Journal
          </div>
          <h2 className="text-3xl font-bold text-stone-900 tracking-tight mb-3">
            Learn More About Moroccan Cosmetics
          </h2>
          <p className="text-stone-600 max-w-xl mx-auto">
            Explore the traditions, science, and stories behind our ingredients — from argan cooperatives to hammam rituals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featured.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white border border-stone-100"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={post.heroImage.url}
                  alt={post.heroImage.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-semibold tracking-wide uppercase">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm text-amber-700 font-semibold group-hover:gap-2.5 transition-all">
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-stone-900 text-white font-semibold hover:bg-stone-800 transition-colors"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
