import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Send, Loader2, MessageSquare, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function InquiryForm() {
  const { items, totalItems, clearCart, updateQuantity, removeItem } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (items.length > 0) {
      document.querySelector('#inquiry')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [items.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const cartSummary = items
      .map((item) => `- ${item.product.title} (Qty: ${item.quantity}) [${item.product.category}]`)
      .join('\n');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `New Inquiry from BioArgan Website (${totalItems} items)`,
          from_name: 'BioArgan Website',
          name: formData.name,
          email: formData.email,
          company: formData.company || 'Not provided',
          phone: formData.phone || 'Not provided',
          cart: cartSummary || 'No items in cart',
          message: formData.message,
        }),
      });

      if (!response.ok) throw new Error('Request failed');

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', phone: '', message: '' });
        clearCart();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all';

  if (status === 'success') {
    return (
      <section id="inquiry" className="py-20 sm:py-28 bg-stone-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Inquiry Sent!</h2>
          <p className="text-stone-600 mb-6">
            We've received your message and will respond within 24 hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="px-5 py-3 rounded-xl bg-amber-500 text-stone-900 font-semibold hover:bg-amber-400 transition-colors"
          >
            Send Another Inquiry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="inquiry" className="py-20 sm:py-28 bg-stone-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-amber-600 text-sm font-medium mb-2">
            <MessageSquare className="w-4 h-4" />
            Get in touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
            Send an Inquiry
          </h2>
          <p className="text-stone-500">
            Tell us about your needs and we'll get back to you within 24 hours.
          </p>
        </div>

        {items.length > 0 && (
          <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-stone-900">
                Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </h3>
            </div>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.handle}
                  className="flex items-center gap-3 bg-stone-50 rounded-xl p-3 border border-stone-100"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-200 flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.opacity = '0.3';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-stone-900 line-clamp-1">
                      {item.product.title}
                    </h4>
                    <p className="text-xs text-stone-500">{item.product.category}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => updateQuantity(item.product.handle, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-stone-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.handle, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.handle)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass}
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={inputClass}
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Phone / WhatsApp</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputClass}
                placeholder="+1 234 567 890"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`${inputClass} resize-none`}
              placeholder="Tell us about your project, quantities, timeline, or any questions you have..."
            />
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>Something went wrong. Please try again or contact us via WhatsApp.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-amber-500 text-stone-900 font-semibold hover:bg-amber-400 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Inquiry{items.length > 0 && ` with ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
