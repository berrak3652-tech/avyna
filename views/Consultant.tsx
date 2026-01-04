
import React, { useState, useRef } from 'react';
import { Camera, Sparkles, Loader2, Send, Wand2, Info } from 'lucide-react';
import { getDecorationAdvice } from '../services/geminiService';
import { Product } from '../types';

interface ConsultantProps {
  products: Product[];
}

const Consultant: React.FC<ConsultantProps> = ({ products }) => {
  const [image, setImage] = useState<string | null>(null);
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAdvice(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetAdvice = async () => {
    if (!image) return;
    setLoading(true);
    const productNames = products.map(p => p.name);
    const result = await getDecorationAdvice(image, productNames);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-orange-600 text-white mb-8 shadow-2xl shadow-orange-600/30">
          <Wand2 size={32} strokeWidth={2.5} />
        </div>
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 italic">Stil Danışmanı</h1>
        <p className="text-gray-500 font-light max-w-xl mx-auto uppercase tracking-[0.2em] text-[10px]">
          Yapay zeka desteği ile yaşam alanınızı yeniden kurgulayın.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        {/* Upload Side */}
        <div className="flex flex-col gap-6">
          <div 
            className={`group relative aspect-square w-full transition-all flex flex-col items-center justify-center overflow-hidden cursor-pointer bg-gray-50 dark:bg-surface-dark border-4 border-dashed border-black/5 dark:border-white/5 hover:border-orange-600 ${image ? 'border-orange-600' : ''}`}
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <img src={image} alt="Room Preview" className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0" />
            ) : (
              <div className="text-center p-12">
                <Camera size={64} className="text-gray-200 mb-4 mx-auto group-hover:text-orange-600 transition-colors" />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">Oda Fotoğrafı Yükle</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>
          
          <button
            onClick={handleGetAdvice}
            disabled={!image || loading}
            className={`w-full py-6 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black transition-all shadow-xl ${
              !image || loading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-orange-600 text-white hover:bg-black dark:hover:bg-white dark:hover:text-black shadow-orange-600/20'
            }`}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
            {loading ? 'ANALİZ EDİLİYOR...' : 'ANALİZİ BAŞLAT'}
          </button>
        </div>

        {/* Advice Side */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6 border-b border-black/5 dark:border-white/5 pb-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <Send size={18} className="text-orange-600" /> GEMİNİ ANALİZİ
            </h3>
            <Info size={16} className="text-gray-300" />
          </div>
          
          <div className="flex-grow p-8 bg-gray-50 dark:bg-surface-dark border border-black/5 dark:border-white/5 relative overflow-y-auto max-h-[600px] shadow-inner">
            {advice ? (
              <div className="prose prose-invert prose-sm font-light text-black dark:text-gray-300 leading-[2] whitespace-pre-wrap">
                {advice}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] opacity-50 space-y-4">
                <div className="w-12 h-1 bg-gray-200"></div>
                <p>Henüz bir analiz talebi<br/>bulunmuyor.</p>
                <div className="w-12 h-1 bg-gray-200"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {advice && (
        <div className="mt-24 animate-in fade-in slide-in-from-bottom-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-black/10 dark:bg-white/10 flex-grow"></div>
            <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-center">Önerilen Seçkiler</h2>
            <div className="h-px bg-black/10 dark:bg-white/10 flex-grow"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {products.slice(0, 4).map(p => (
              <div key={p.id} className="group flex flex-col gap-4">
                <div className="aspect-square bg-white dark:bg-black border border-black/5 p-1 transition-all group-hover:border-orange-600">
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest truncate">{p.name}</h4>
                  <p className="text-orange-600 font-black text-xs mt-1">₺{p.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultant;
