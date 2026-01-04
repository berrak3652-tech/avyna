
import React from 'react';
import { Product } from '../types';
import { ChevronLeft, ShoppingBag, Share2, Ruler, Maximize2, Star, ShieldCheck, Truck } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  return (
    <div className="bg-white dark:bg-black min-h-screen pb-32">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-black/5 dark:border-white/5">
        <button 
          onClick={onBack}
          className="size-12 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Ürün Tanımı / {product.name}</span>
        <button className="size-12 flex items-center justify-center border border-black/5 dark:border-white/5 hover:border-orange-600 transition-colors">
          <Share2 size={20} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* 3D Model Section */}
          <div className="flex flex-col gap-8">
            <div className="relative bg-gray-50 dark:bg-surface-dark border border-black/5 dark:border-white/5 group overflow-hidden">
              <model-viewer
                src={product.modelUrl}
                poster={product.imageUrl}
                alt={product.name}
                auto-rotate
                camera-controls
                ar
                ar-modes="webxr scene-viewer quick-look"
                shadow-intensity="2"
                environment-image="neutral"
                exposure="1"
              >
                <button 
                  slot="ar-button" 
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black text-white dark:bg-white dark:text-black px-10 py-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all shadow-2xl"
                >
                  <Maximize2 size={16} /> MEKANDA GÖRÜNTÜLE
                </button>
              </model-viewer>
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <div className="size-2 bg-orange-600 animate-pulse"></div>
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">360° DİJİTAL İKİZ</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-gray-50 dark:bg-surface-dark border border-black/5 dark:border-white/5 cursor-pointer hover:border-orange-600 transition-colors p-1">
                  <img src={`https://picsum.photos/seed/${product.id + i}/400/400`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Description Section */}
          <div className="flex flex-col pt-4">
            <div className="mb-12">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                  <p className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">{product.category}</p>
                  <h1 className="text-5xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tighter italic">{product.name}</h1>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="flex text-orange-600">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">(4.9/5 - 128 ANALİZ)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-black dark:text-white italic">₺{product.price.toLocaleString()}</span>
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <p className="text-[9px] text-green-600 font-black uppercase tracking-widest">STOKTA MEVCUT</p>
                  </div>
                </div>
              </div>
              
              <div className="w-24 h-1.5 bg-orange-600 mb-10"></div>
              
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-[2.2] font-medium uppercase tracking-widest mb-12">
                {product.description}
              </p>

              {/* Specs Table */}
              <div className="p-8 bg-gray-50 dark:bg-surface-dark border border-black/5 dark:border-white/5 space-y-6 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-3">
                  <Ruler size={16} strokeWidth={3} /> TEKNİK SPESİFİKASYONLAR
                </h3>
                <div className="grid grid-cols-3 gap-8">
                  <div className="space-y-1">
                    <span className="text-[9px] text-gray-400 block uppercase font-bold tracking-widest">Genişlik</span>
                    <span className="font-black text-black dark:text-white uppercase tracking-tighter text-lg">{product.dimensions.width} CM</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-gray-400 block uppercase font-bold tracking-widest">Yükseklik</span>
                    <span className="font-black text-black dark:text-white uppercase tracking-tighter text-lg">{product.dimensions.height} CM</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] text-gray-400 block uppercase font-bold tracking-widest">Derinlik</span>
                    <span className="font-black text-black dark:text-white uppercase tracking-tighter text-lg">{product.dimensions.depth} CM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex-1 bg-black dark:bg-white text-white dark:text-black py-6 text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                <ShoppingBag size={20} /> SEPETE EKLE
              </button>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-black/5 dark:border-white/5 pt-8">
               <div className="flex items-center gap-4">
                 <div className="size-12 bg-gray-50 dark:bg-surface-dark flex items-center justify-center border border-black/5">
                   <Truck size={20} className="text-orange-600" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[9px] font-black text-black dark:text-white uppercase tracking-widest">ÜCRETSİZ LOJİSTİK</span>
                   <span className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">7 İŞ GÜNÜNDE TESLİM</span>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="size-12 bg-gray-50 dark:bg-surface-dark flex items-center justify-center border border-black/5">
                   <ShieldCheck size={20} className="text-orange-600" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[9px] font-black text-black dark:text-white uppercase tracking-widest">GARANTİLİ TASARIM</span>
                   <span className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">24 AY KOŞULSUZ DESTEK</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
