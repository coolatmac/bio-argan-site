import type { Product } from './products';

export type ProductType =
  | 'Oil'
  | 'Soap'
  | 'Clay & Mask'
  | 'Shampoo'
  | 'Cream & Lotion'
  | 'Serum'
  | 'Scrub'
  | 'Toner & Cleanser'
  | 'Powder'
  | 'Lip Care'
  | 'Other';

export type ProductUsage =
  | 'Skin Care'
  | 'Hair Care'
  | 'Body & Spa'
  | 'Lip & Nail'
  | 'Sun Care'
  | 'Culinary'
  | 'Other';

interface Classification {
  productType: ProductType;
  usage: ProductUsage;
}

const typeUsageMap: Record<string, Classification> = {
  'black-soap-with-blue-nila': { productType: 'Soap', usage: 'Body & Spa' },
  'tebrima-body-mask': { productType: 'Clay & Mask', usage: 'Body & Spa' },
  'liquid-black-soap-with-nila-private-label': { productType: 'Soap', usage: 'Skin Care' },
  'premium-rose-water-bulk-5l-10l-private-label-manufacturer-bioargan': { productType: 'Toner & Cleanser', usage: 'Skin Care' },
  'liquid-black-soap-with-moroccan-nila-bulk-5l-10l-private-label-manufacturer': { productType: 'Soap', usage: 'Skin Care' },
  'aker-fassi-nail-cuticle': { productType: 'Other', usage: 'Lip & Nail' },
  'mekhmaria-perfume-cream': { productType: 'Cream & Lotion', usage: 'Body & Spa' },
  'premium-liquid-aker-fassi-sabounia': { productType: 'Soap', usage: 'Skin Care' },
  'bulk-aker-fassi-glow-toner': { productType: 'Toner & Cleanser', usage: 'Skin Care' },
  'bulk-aker-fassi-gel-cleanser': { productType: 'Toner & Cleanser', usage: 'Skin Care' },
  'bulk-moroccan-aker-fassi-cleanser-wholesale': { productType: 'Toner & Cleanser', usage: 'Skin Care' },
  'bulk-aker-fassi-infused-serum-wholesale': { productType: 'Serum', usage: 'Skin Care' },
  'bulk-aker-fassi-hyaluronic-acid': { productType: 'Serum', usage: 'Skin Care' },
  'bulk-mekhmaria-aker-fassi-lotion': { productType: 'Cream & Lotion', usage: 'Body & Spa' },
  'bulk-aker-fassi-foot-cream': { productType: 'Cream & Lotion', usage: 'Body & Spa' },
  'bulk-aker-fassi-sugar-scrub-wholesale-supply-bioargan': { productType: 'Scrub', usage: 'Body & Spa' },
  'bulk-aker-fassi-poppy-scrub-wholesale': { productType: 'Scrub', usage: 'Body & Spa' },
  'bulk-aker-fassi-lip-blush-treatment-wholesale': { productType: 'Lip Care', usage: 'Lip & Nail' },
  'bulbulk-moroccan-black-soap-with-aker-fassi-wholesale': { productType: 'Soap', usage: 'Body & Spa' },
  'bulk-aker-fassi-foot-heel-cream': { productType: 'Cream & Lotion', usage: 'Body & Spa' },
  'bulk-aker-fassi-argan-foot-balm': { productType: 'Cream & Lotion', usage: 'Body & Spa' },
  'bulk-aker-fassi-face-mask': { productType: 'Clay & Mask', usage: 'Skin Care' },
  'bulk-aker-fassi-foaming-scrub-wholesale-bioargan': { productType: 'Scrub', usage: 'Body & Spa' },
  'bulk-luxurious-gommage-scrub': { productType: 'Scrub', usage: 'Body & Spa' },
  'bulk-aker-fassi-day-face-cream-wholesale': { productType: 'Cream & Lotion', usage: 'Skin Care' },
  'bulk-aker-fassi-petroleum-jelly-wholesale': { productType: 'Other', usage: 'Skin Care' },
  'bulk-moroccan-radiance-moisturizer-wholesale': { productType: 'Cream & Lotion', usage: 'Skin Care' },
  'bulk-moroccan-tebrima-powder': { productType: 'Powder', usage: 'Body & Spa' },
  'bulk-aker-fassi-sabounia-wholesale': { productType: 'Soap', usage: 'Body & Spa' },
  'bulk-turmeric-oil-wholesale-bioargan': { productType: 'Oil', usage: 'Skin Care' },
  'bulk-turmeric-niacinamide-shower-gel-wholesale': { productType: 'Toner & Cleanser', usage: 'Body & Spa' },
  'bulk-turmeric-cleansing-gel-wholesale': { productType: 'Toner & Cleanser', usage: 'Skin Care' },
  'bulk-turmeric-anti-oxidation-face-serum-wholesale': { productType: 'Serum', usage: 'Skin Care' },
  'bulk-turmeric-liquid-black-soap-wholesale': { productType: 'Soap', usage: 'Body & Spa' },
  'bulk-turmeric-moroccan-black-soap-wholesale': { productType: 'Soap', usage: 'Body & Spa' },
  'bulk-turmeric-conditioner-wholesale': { productType: 'Cream & Lotion', usage: 'Hair Care' },
  'bulk-turmeric-shampoo-wholesale-supply': { productType: 'Shampoo', usage: 'Hair Care' },
  'bulk-turmeric-vitamin-c-sugar-scrub-wholesale': { productType: 'Scrub', usage: 'Body & Spa' },
  'bulk-turmeric-vitamin-c-face-scrub-wholesale': { productType: 'Scrub', usage: 'Skin Care' },
  'bulk-vitamin-c-turmeric-clay-mask-wholesale': { productType: 'Clay & Mask', usage: 'Skin Care' },
  'bulk-enzymatic-turmeric-facial-scrub-wholesale': { productType: 'Scrub', usage: 'Skin Care' },
  'bulk-turmeric-foaming-wash-wholesale': { productType: 'Toner & Cleanser', usage: 'Skin Care' },
  'bulk-turmeric-clay-mask-wholesale': { productType: 'Clay & Mask', usage: 'Skin Care' },
  'bulk-turmeric-face-cream-wholesale': { productType: 'Cream & Lotion', usage: 'Skin Care' },
  'bulk-rose-hydrating-serum-wholesale': { productType: 'Serum', usage: 'Skin Care' },
  'bulk-rose-face-and-body-cream-wholesale': { productType: 'Cream & Lotion', usage: 'Skin Care' },
  'bulk-rose-hip-oil-gelee-mask-wholesale': { productType: 'Clay & Mask', usage: 'Skin Care' },
  'bulk-rose-face-and-body-cream-wholesal': { productType: 'Cream & Lotion', usage: 'Body & Spa' },
  'bulk-rose-water-facial-toner-wholesale': { productType: 'Toner & Cleanser', usage: 'Skin Care' },
  'bulk-rose-therapeutic-shampoo-wholesale': { productType: 'Shampoo', usage: 'Hair Care' },
  'premibulk-rose-water-moisturizing-body-lotion-wholesale': { productType: 'Cream & Lotion', usage: 'Body & Spa' },
  'bulk-rose-water-hair-conditioner-wholesale': { productType: 'Cream & Lotion', usage: 'Hair Care' },
  'bulk-argan-night-cream-wholesale': { productType: 'Cream & Lotion', usage: 'Skin Care' },
  'bulk-tinted-argan-sunscreen-cream-wholesale': { productType: 'Cream & Lotion', usage: 'Sun Care' },
  'bulk-argan-oil-cream-wholesale': { productType: 'Cream & Lotion', usage: 'Skin Care' },
  'bulk-argan-oil-lipstick-wholesale': { productType: 'Lip Care', usage: 'Lip & Nail' },
  'bulk-vanilla-sugar-lip-scrub-wholesale': { productType: 'Lip Care', usage: 'Lip & Nail' },
  'bulk-argan-black-soap-wholesale': { productType: 'Soap', usage: 'Body & Spa' },
  'bulk-argan-liquid-black-soap-wholesale': { productType: 'Soap', usage: 'Body & Spa' },
  'bulk-moroccan-tanning-oil-wholesale': { productType: 'Oil', usage: 'Sun Care' },
  'bulk-argan-oil-hair-serum-wholesale': { productType: 'Serum', usage: 'Hair Care' },
  'bulk-argan-morning-skin-serum-wholesale': { productType: 'Serum', usage: 'Skin Care' },
  'bulk-argan-beard-oil-wholesale': { productType: 'Oil', usage: 'Hair Care' },
  'bulk-natural-tanning-oil-wholesale': { productType: 'Oil', usage: 'Sun Care' },
  'bulk-nail-cuticle-treatment-elixir-wholesale': { productType: 'Oil', usage: 'Lip & Nail' },
  'bulk-hair-oil-treatment-wholesale': { productType: 'Oil', usage: 'Hair Care' },
  'bulk-relaxing-massage-oil-wholesale': { productType: 'Oil', usage: 'Body & Spa' },
  'bulk-culinary-argan-oil-wholesale': { productType: 'Oil', usage: 'Culinary' },
  'bulk-deodorised-cosmetic-argan-oil-wholesale': { productType: 'Oil', usage: 'Skin Care' },
  'bulk-pure-cosmetic-argan-oil-wholesale': { productType: 'Oil', usage: 'Skin Care' },
  'bulk-moroccan-gentle-scrub-wholesale': { productType: 'Scrub', usage: 'Skin Care' },
  'bulk-prickly-pear-face-cream-wholesale': { productType: 'Cream & Lotion', usage: 'Skin Care' },
  'bulk-prickly-pear-therapeutic-shampoo-wholesale': { productType: 'Shampoo', usage: 'Hair Care' },
  'bulk-prickly-pear-body-lotion-wholesale': { productType: 'Cream & Lotion', usage: 'Body & Spa' },
  'bulk-prickly-pear-hair-conditioner-wholesale': { productType: 'Cream & Lotion', usage: 'Hair Care' },
  'bulk-anti-wrinkle-prickly-pear-oil-wholesale': { productType: 'Oil', usage: 'Skin Care' },
  'bulk-nila-cream-wholesale': { productType: 'Cream & Lotion', usage: 'Skin Care' },
  'bulk-nila-sugar-scrub-wholesale': { productType: 'Scrub', usage: 'Body & Spa' },
  'bulk-nila-vitamin-c-clay-mask-wholesale': { productType: 'Clay & Mask', usage: 'Skin Care' },
  'bulk-light-nila-mask-wholesale': { productType: 'Clay & Mask', usage: 'Skin Care' },
  'bulk-nila-cleansing-gel-wholesale': { productType: 'Toner & Cleanser', usage: 'Skin Care' },
  'bulk-ghassoul-blue-nila-wholesale': { productType: 'Clay & Mask', usage: 'Body & Spa' },
  'bulk-nila-blue-powder-wholesale': { productType: 'Powder', usage: 'Skin Care' },
  'bulk-nila-scrub-wholesale': { productType: 'Scrub', usage: 'Body & Spa' },
  'bulk-nila-sabounia-wholesale': { productType: 'Soap', usage: 'Body & Spa' },
  'bulk-tebrima-body-mask-wholesale': { productType: 'Clay & Mask', usage: 'Body & Spa' },
  'bulk-sahara-nila-mask-wholesale': { productType: 'Clay & Mask', usage: 'Skin Care' },
  'bulk-nila-balm-wholesale': { productType: 'Other', usage: 'Skin Care' },
  'organic-moisturizing-lip-balm-private-label': { productType: 'Lip Care', usage: 'Lip & Nail' },
  'organic-natural-curl-styling-cream-private-label': { productType: 'Cream & Lotion', usage: 'Hair Care' },
};

export interface EnrichedProduct extends Product {
  productType: ProductType;
  usage: ProductUsage;
}

export function enrichProducts(base: Product[]): EnrichedProduct[] {
  return base.map((p) => {
    const cls = typeUsageMap[p.handle];
    if (!cls) {
      return { ...p, productType: 'Other' as ProductType, usage: 'Other' as ProductUsage };
    }
    return { ...p, ...cls };
  });
}

export const productTypeOrder: ProductType[] = [
  'Oil',
  'Soap',
  'Clay & Mask',
  'Shampoo',
  'Cream & Lotion',
  'Serum',
  'Scrub',
  'Toner & Cleanser',
  'Powder',
  'Lip Care',
  'Other',
];

export const usageOrder: ProductUsage[] = [
  'Skin Care',
  'Hair Care',
  'Body & Spa',
  'Lip & Nail',
  'Sun Care',
  'Culinary',
  'Other',
];
