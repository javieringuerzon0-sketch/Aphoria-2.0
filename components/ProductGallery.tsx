import React from 'react';
import { motion } from 'framer-motion';
import { FEATURED_PRODUCTS } from '../constants';

const ProductGallery: React.FC = () => {
    const openProductModal = (handle: string, event: React.MouseEvent) => {
        const modal = document.getElementById('product-modal') as any;
        const context = document.getElementById('product-modal-context') as any;
        if (modal && context) {
            context.update(event);
            modal.showModal();
        }
    };

    return (
        <section id="ritual" className="py-32 bg-aphoria-bg overflow-hidden">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12">
                <div className="mb-24 text-center">
                    <h2 className="text-3xl md:text-[40px] font-light text-aphoria-black tracking-tight mb-4">
                        Professional Treatments
                    </h2>
                    <p className="max-w-xl mx-auto text-aphoria-mid text-lg font-normal">
                        Each product is formulated as a protocol component — designed to function independently and amplify when combined.
                    </p>
                </div>

                <div className="space-y-32 md:space-y-48">
                    {FEATURED_PRODUCTS.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 48 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-32`}
                        >
                            <shopify-context type="product" handle={product.handle}>
                                <template>
                                    {/* Image Side */}
                                    <div className="w-full md:w-1/2">
                                        <div className="aspect-[4/5] bg-white relative group overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-700">
                                            <shopify-media
                                                query="product.selectedOrFirstAvailableVariant.image"
                                                width={800}
                                                height={1000}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    </div>

                                    {/* Copy Side */}
                                    <div className="w-full md:w-1/2">
                                        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-aphoria-gold mb-6 block">
                                            {product.clinicalClassification}
                                        </span>
                                        <h3 className="text-3xl md:text-5xl font-light text-aphoria-black tracking-tight mb-8">
                                            <shopify-data query="product.title" />
                                        </h3>
                                        <p className="text-lg text-aphoria-mid leading-relaxed mb-12 max-w-lg font-normal">
                                            {product.description}
                                        </p>

                                        <div className="flex items-center gap-12 mb-12">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-widest text-aphoria-mid mb-1">Standard Size</span>
                                                <span className="text-sm font-medium text-aphoria-black">50ml / 1.7 fl.oz</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-widest text-aphoria-mid mb-1">Concentration</span>
                                                <span className="text-sm font-medium text-aphoria-black">Clinical Grade</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={(e) => openProductModal(product.handle, e as any)}
                                            className="px-10 py-4 border border-aphoria-gold text-aphoria-gold text-[12px] font-bold uppercase tracking-[0.12em] hover:bg-aphoria-gold/10 transition-all duration-300"
                                        >
                                            Discover the Formulation
                                        </button>
                                    </div>
                                </template>
                                <div shopify-loading-placeholder className="w-full aspect-[4/5] bg-white animate-pulse"></div>
                            </shopify-context>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Shopify Product Modal (Global) */}
            <dialog id="product-modal" className="p-0 border-none bg-transparent backdrop:bg-aphoria-black/40 outline-none">
                <shopify-context id="product-modal-context" type="product" wait-for-update>
                    <template>
                        <div className="bg-aphoria-bg w-screen h-screen md:w-[1000px] md:h-auto md:max-h-[90vh] md:rounded-sm overflow-hidden flex flex-col md:flex-row relative">
                            {/* Close Button */}
                            <button
                                onClick={() => (document.getElementById('product-modal') as any).close()}
                                className="absolute top-6 right-6 z-50 text-aphoria-black hover:opacity-50 transition-opacity"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                            </button>

                            <div className="w-full md:w-1/2 bg-white">
                                <shopify-media query="product.selectedOrFirstAvailableVariant.image" width={800} height={1000} className="w-full h-full object-cover" />
                            </div>

                            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto no-scrollbar">
                                <span className="text-[11px] font-semibold uppercase tracking-widest text-aphoria-gold mb-4 block">
                                    <shopify-data query="product.vendor" />
                                </span>
                                <h2 className="text-3xl md:text-4xl font-light text-aphoria-black mb-4">
                                    <shopify-data query="product.title" />
                                </h2>
                                <div className="text-xl font-medium text-aphoria-black mb-8">
                                    <shopify-money query="product.selectedOrFirstAvailableVariant.price" />
                                </div>

                                <shopify-variant-selector className="mb-8" />

                                <div className="flex flex-col gap-4 mb-12">
                                    <button
                                        className="w-full py-5 bg-aphoria-green text-white text-[13px] font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
                                        onClick={(e) => (document.getElementById('main-cart') as any).addLine(e).showModal()}
                                    >
                                        Add to Protocol
                                    </button>
                                    <button
                                        className="w-full py-5 border border-aphoria-black/10 text-aphoria-black text-[13px] font-bold uppercase tracking-[0.15em] hover:bg-aphoria-black/5 transition-colors"
                                        onClick={(e) => (document.querySelector('shopify-store') as any).buyNow(e)}
                                    >
                                        Instant Checkout
                                    </button>
                                </div>

                                <div className="prose prose-sm text-aphoria-mid leading-relaxed">
                                    <shopify-data query="product.descriptionHtml" />
                                </div>
                            </div>
                        </div>
                    </template>
                </shopify-context>
            </dialog>

            <shopify-cart id="main-cart"></shopify-cart>
        </section>
    );
};

export default ProductGallery;
