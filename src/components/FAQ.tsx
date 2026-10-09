import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useJsonLd } from '../hooks/useJsonLd';

const faqs = [
  {
    question: 'What products does BioArgan manufacture?',
    answer:
      'BioArgan manufactures over 90 professional-grade Moroccan cosmetic products including pure argan oil, black soap, rose water, nila-based skincare, turmeric cosmetics, prickly pear oil, Aker Fassi products, hair care, body care, and lip care. All products are available for wholesale, private label, and contract manufacturing.',
  },
  {
    question: 'Do you offer private label and contract manufacturing?',
    answer:
      'Yes. BioArgan specializes in private label cosmetic manufacturing and contract manufacturing for global beauty brands. We handle everything from formula selection and branding to packaging design, production, quality control, and worldwide export logistics.',
  },
  {
    question: 'What is the minimum order quantity (MOQ)?',
    answer:
      'Minimum order quantities vary by product. Many products have flexible MOQs -- simply contact us for details. Bulk and wholesale products typically have B2B minimum order requirements for commercial brand sourcing and contract manufacturing orders.',
  },
  {
    question: 'Are your products organic and certified?',
    answer:
      'Yes. BioArgan products are made with certified organic Moroccan ingredients. We source premium botanical raw materials including argan oil, rose water, and traditional Moroccan ingredients like nila, Aker Fassi, and ghassoul clay, all manufactured to professional cosmetic standards.',
  },
  {
    question: 'Which countries do you export to?',
    answer:
      'BioArgan exports to over 30 countries worldwide. We have experience working with beauty brands, distributors, wholesalers, and cosmetic laboratories across Europe, North America, the Middle East, Asia, and Africa. We handle export logistics end-to-end.',
  },
  {
    question: 'How do I place an order or request a quote?',
    answer:
      'You can browse our catalog, add products to your cart, and submit an inquiry directly through our website. Alternatively, contact us via WhatsApp at +212 674 510 688. Our team will respond within 24 hours with pricing, MOQ details, and next steps.',
  },
  {
    question: 'What product formats are available for bulk orders?',
    answer:
      'Bulk products are available in various formats including 5L and 10L containers for liquids, 25kg drums for creams and pastes, and powder formats for dry products. Custom packaging options are available for private label clients.',
  },
  {
    question: 'Can you develop custom formulations?',
    answer:
      'Yes. In addition to our extensive catalog of proven Moroccan cosmetic formulas, our team can work with you to develop custom formulations tailored to your brand requirements, target market, and product goals.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  useJsonLd(faqStructuredData, []);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-stone-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-amber-600 text-sm font-medium mb-2">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-500">
            Everything you need to know about BioArgan products, private label, and wholesale orders.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <h3 className="font-semibold text-stone-900 text-sm sm:text-base">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-stone-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
