import { motion } from 'framer-motion';

const ProductGallery: React.FC = () => {
  const ShopifyCart = 'shopify-cart' as any;

  const products = [
    {
      id: '24-gold-mask',
      handle: '24-gold-mask',
      name: '24 Gold Mask',
      tagline: 'Radiance & Luminosity Treatment',
      description: 'Gold-infused luxury mask that brightens, firms, and restores youthful radiance. Visible glow in minutes.',
      benefits: ['Instant radiance', 'Firms & lifts', 'Reduces fine lines'],
      image: new URL('../productos/colection-gold2.png', import.meta.url).toString(),
      price: '$29,99',
      size: '50ml',
      usage: 'Apply 2-3 times weekly for 15-20 minutes',
      recommended: 'Best for dull, aging skin'
    },
    {
      id: 'avocado-mask',
      handle: 'avocado-mask',
      name: 'Avocado Mask',
      tagline: 'Deep Hydration & Nourishment',
      description: 'Rich in vitamins and essential fatty acids, this mask deeply nourishes, hydrates, and calms sensitive skin.',
      benefits: ['Deep hydration', 'Soothes irritation', 'Strengthens barrier'],
      image: new URL('../productos/seccion-avocado.png', import.meta.url).toString(),
      price: '$33,99',
      size: '60 patch',
      usage: 'Apply 2-3 times weekly for 15-20 minutes',
      recommended: 'Best for dry, sensitive skin'
    }
  ];

  return (
    <section id="ritual" className="relative py-20 md:py-28 bg-aphoria-bg px-6" style={{ willChange: 'transform' }}>
      {/* Decorative accents */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_top_left,_rgba(198,161,91,0.15),_transparent_60%)]"></div>
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_bottom_right,_rgba(15,59,46,0.1),_transparent_60%)]"></div>

      <div className="max-w-[1360px] mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-aphoria-gold">The Collection</span>
          <h2 className="mt-4 text-[28px] md:text-[36px] font-brand font-light text-aphoria-black tracking-tight mb-4">
            Transform Your Skin in 28 Days
          </h2>
          <p className="text-[15px] text-aphoria-mid leading-relaxed">
            Bioactive formulations designed to deliver visible results. Each mask targets specific skin concerns with clinical-grade ingredients.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.15 }}
              className="group"
            >
                  {/* Product Card */}
                  <div className="relative rounded-2xl border border-aphoria-black/10 bg-white/80 backdrop-blur overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-500">
                    {/* Image */}
                    <div className="relative h-[450px] overflow-hidden bg-gradient-to-br from-aphoria-bg/50 to-white/80">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>

                      {/* Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-aphoria-green/30 px-3 py-1.5 text-[9px] uppercase tracking-[0.24em] text-aphoria-green shadow-lg">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Bestseller
                        </div>
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-aphoria-gold/30 px-3 py-1.5 text-[9px] uppercase tracking-[0.24em] text-aphoria-gold shadow-lg">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          8 Left
                        </div>
                      </div>

                      {/* Recommended badge */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="inline-flex items-center gap-2 rounded-full bg-aphoria-black/80 backdrop-blur-sm px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white/90 shadow-xl">
                          ✦ {product.recommended}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="mb-4">
                        <h3 className="text-[24px] font-brand font-light text-aphoria-black tracking-tight mb-2">
                          {product.name}
                        </h3>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-aphoria-mid">
                          {product.tagline}
                        </p>
                      </div>

                      <p className="text-[14px] text-aphoria-mid leading-relaxed mb-6">
                        {product.description}
                      </p>

                      {/* Benefits */}
                      <div className="mb-6 space-y-2">
                        {product.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-[13px] text-aphoria-black">
                            <svg className="w-4 h-4 text-aphoria-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {benefit}
                          </div>
                        ))}
                      </div>

                      {/* Price & CTA */}
                      <div className="pt-6 border-t border-aphoria-black/10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-[18px] font-medium text-aphoria-black/70">$</span>
                            <span className="text-[36px] font-semibold text-aphoria-black tabular-nums">
                              {product.price.replace('$', '').split(',')[0]}
                            </span>
                            <span className="text-[20px] font-medium text-aphoria-black/70">
                              ,{product.price.split(',')[1]}
                            </span>
                          </div>
                          <span className="text-[11px] uppercase tracking-[0.24em] text-aphoria-mid">
                            {product.size}
                          </span>
                        </div>

                        {/* Guarantee & Shipping */}
                        <div className="mb-4 p-3 rounded-lg bg-aphoria-gold/5 border border-aphoria-gold/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-aphoria-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <div>
                                <div className="text-[11px] font-medium text-aphoria-gold uppercase tracking-[0.22em]">
                                  60-Day Guarantee
                                </div>
                                <div className="text-[10px] text-aphoria-mid mt-0.5">
                                  Free worldwide shipping included
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          {/* Primary CTA */}
                          <button
                            onClick={(e) => (document.getElementById('main-cart') as any).addLine(e).showModal()}
                            className="group/btn relative overflow-hidden w-full rounded-full bg-gradient-to-r from-aphoria-green to-aphoria-green/90 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-white shadow-[0_12px_28px_rgba(15,59,46,0.25)] transition-all duration-500 hover:-translate-y-[2px] hover:shadow-[0_20px_40px_rgba(15,59,46,0.4)]"
                          >
                            <span className="relative z-10">Add to Cart</span>
                            {/* Shine effect */}
                            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                              <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </div>
                          </button>

                          {/* Secondary CTA */}
                          <button
                            onClick={(e) => (document.querySelector('shopify-store') as any)?.buyNow(e)}
                            className="w-full rounded-full border-2 border-aphoria-black/15 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-aphoria-black/80 transition-all duration-500 hover:border-aphoria-gold hover:text-aphoria-gold hover:bg-aphoria-gold/5"
                          >
                            Buy Now — Fast Checkout
                          </button>

                          {/* Additional CTA */}
                          <a
                            href="#science"
                            className="text-center text-[10px] uppercase tracking-[0.24em] text-aphoria-mid hover:text-aphoria-gold transition-colors flex items-center justify-center gap-2 py-2"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            See Clinical Results
                          </a>
                        </div>

                        <p className="mt-4 text-[10px] text-aphoria-mid text-center">
                          {product.usage}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
          ))}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-aphoria-mid">
            <svg className="w-5 h-5 text-aphoria-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            60-Day Money-Back Guarantee • Free Shipping Worldwide
          </div>
        </motion.div>
      </div>

      {/* Shopify Cart */}
      <ShopifyCart id="main-cart"></ShopifyCart>
    </section>
  );
};

export default ProductGallery;
