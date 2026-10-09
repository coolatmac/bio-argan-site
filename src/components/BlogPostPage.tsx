import { useParams, Link, useRouter } from '../router';
import { useEffect, useMemo } from 'react';
import { Calendar, Clock, ArrowLeft, ArrowRight, ChevronDown, Package } from 'lucide-react';
import { useState as useReactState } from 'react';
import { getPostBySlug, getRelatedPosts, type BlogPost, type BlogInlineLink } from '../data/blogPosts';

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useReactState(false);
  return (
    <div className="border-b border-stone-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left"
      >
        <span className="text-base font-semibold text-stone-900 pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-stone-500 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="pb-5 text-stone-600 leading-relaxed">{answer}</div>
      )}
    </div>
  );
}

function renderParagraphWithLinks(
  paragraph: string,
  inlineLinks: Record<string, BlogInlineLink> | undefined
): React.ReactNode {
  if (!inlineLinks) return paragraph;

  let result: React.ReactNode = paragraph;
  for (const [key, link] of Object.entries(inlineLinks)) {
    if (!paragraph.includes(key)) continue;
    const idx = paragraph.indexOf(link.text);
    if (idx === -1) continue;

    const before = paragraph.substring(0, idx);
    const after = paragraph.substring(idx + link.text.length);

    return (
      <>
        {before}
        <Link
          to={`/blog/${link.targetSlug}`}
          className="text-amber-700 font-medium underline decoration-amber-300 underline-offset-2 hover:decoration-amber-700 transition-colors"
        >
          {link.text}
        </Link>
        {after}
      </>
    );
  }
  return result;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { navigate } = useRouter();
  const post: BlogPost | undefined = slug ? getPostBySlug(slug) : undefined;
  const related = slug ? getRelatedPosts(slug, 3) : [];

  useEffect(() => {
    if (post) {
      document.title = post.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', post.metaDescription);
    }
    window.scrollTo(0, 0);
  }, [post]);

  const productLinks = post?.productLinks || [];

  const handleExploreProducts = () => {
    navigate('/');
    setTimeout(() => {
      document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-stone-900 mb-4">Article Not Found</h1>
          <p className="text-stone-600 mb-6">The article you're looking for doesn't exist or has been moved.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <article className="pt-24 sm:pt-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-amber-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All Articles
          </Link>

          <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide uppercase mb-4">
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-stone-500 mb-8">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readingTime}
            </span>
            <span className="text-stone-400">By {post.author}</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={post.heroImage.url}
              alt={post.heroImage.alt}
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
          </div>
          <p className="text-center text-xs text-stone-500 mt-3 italic">{post.heroImage.caption}</p>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl text-stone-700 leading-relaxed font-medium mb-10 border-l-4 border-amber-400 pl-6">
            {post.excerpt}
          </p>

          {post.sections.map((section, idx) => (
            <div key={idx} className="mb-10">
              <h2 className="text-2xl font-bold text-stone-900 mb-4 tracking-tight">
                {section.heading}
              </h2>
              {section.paragraphs.map((para, pidx) => (
                <p key={pidx} className="text-stone-700 leading-relaxed mb-4">
                  {renderParagraphWithLinks(para, post.inlineLinks)}
                </p>
              ))}
              {section.image && (
                <figure className="my-8">
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={section.image.url}
                      alt={section.image.alt}
                      className="w-full h-56 sm:h-72 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="text-center text-xs text-stone-500 mt-3 italic">
                    {section.image.caption}
                  </figcaption>
                </figure>
              )}
            </div>
          ))}

          {post.faqs.length > 0 && (
            <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200">
              <h2 className="text-2xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h2>
              {post.faqs.map((faq, idx) => (
                <FAQItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          )}
        </div>
      </article>

      {productLinks.length > 0 && (
        <section className="py-12 bg-amber-50/50 border-y border-amber-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide uppercase mb-4">
              <Package className="w-3.5 h-3.5" />
              Related Products
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-3">Explore These Products</h2>
            <p className="text-stone-600 mb-6 max-w-xl mx-auto">
              Discover our {productLinks.map((p) => p.label).join(', ')} — available for private label, bulk supply, and contract manufacturing.
            </p>
            <button
              onClick={handleExploreProducts}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 text-stone-900 font-semibold hover:bg-amber-400 transition-colors"
            >
              View Product Catalog
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-16 bg-stone-50 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-8">Continue Reading</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rpost) => (
                <Link
                  key={rpost.slug}
                  to={`/blog/${rpost.slug}`}
                  className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white border border-stone-100"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={rpost.heroImage.url}
                      alt={rpost.heroImage.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-semibold tracking-wide uppercase text-amber-700">
                      {rpost.category}
                    </span>
                    <h3 className="text-base font-bold text-stone-900 mt-1.5 mb-2 group-hover:text-amber-700 transition-colors line-clamp-2">
                      {rpost.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-sm text-amber-700 font-semibold group-hover:gap-2.5 transition-all">
                      Read
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
