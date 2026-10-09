import { Eye, FlaskConical, Package, Truck } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Vision Discovery',
    description: 'We start by understanding your brand vision, target market, and product goals. Every great cosmetic line begins with a clear concept.',
    icon: Eye,
  },
  {
    num: '02',
    title: 'Formula Selection',
    description: 'Choose from our extensive catalog of proven Moroccan cosmetic formulas, or work with our team to develop a custom formulation.',
    icon: FlaskConical,
  },
  {
    num: '03',
    title: 'Branding & Packaging',
    description: 'We help you design packaging that reflects your brand identity, from labels to containers, ensuring shelf-ready presentation.',
    icon: Package,
  },
  {
    num: '04',
    title: 'Production & Export',
    description: 'Our manufacturing facility produces your order to spec, with quality control and worldwide export logistics handled end-to-end.',
    icon: Truck,
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 sm:py-28 bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Our Process
          </h2>
          <p className="text-stone-400 max-w-2xl mx-auto">
            A simple, transparent, and professional process from vision to export.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-stone-800/50 rounded-2xl p-6 border border-stone-700/50 hover:border-amber-500/30 transition-colors duration-300 group"
              >
                <div className="text-5xl font-extrabold text-stone-700 group-hover:text-amber-500/30 transition-colors mb-3">
                  {step.num}
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-stone-400 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
