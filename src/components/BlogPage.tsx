import { Link } from '../router';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts, getAllCategories } from '../data/blogPosts';

export default function BlogPage() {
  const categories = getAllCategories();
  const [featured, ...rest] = blogPosts;

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 sm:pt-32 pb-12 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wider uppercase mb-4">
              BioArgan Journal
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight mb-4">
              Stories from the Heart of Moroccan Beauty
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed">
              Discover the traditions, science, and people behind Morocco's natural cosmetics —
              from argan cooperatives to ancient hammam rituals.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={`/blog/${featured.slug}`}
            className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 mb-16"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 sm:h-80 md:h-full overflow-hidden">
                <img
                  src={featured.heroImage.url}
                  alt={featured.heroImage.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-center bg-white">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide uppercase mb-3 w-fit">
                  {featured.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3 group-hover:text-amber-700 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-stone-600 leading-relaxed mb-4">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-stone-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(featured.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readingTime}
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 text-amber-700 font-semibold text-sm group-hover:gap-3 transition-all">
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white border border-stone-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.heroImage.url}
                    alt={post.heroImage.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-semibold tracking-wide uppercase">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed line-clamp-3 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-stone-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
