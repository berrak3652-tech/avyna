
import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Trash2, Sparkles, Upload, Save, Loader2, Package } from 'lucide-react';
import { generateProductDescription } from '../services/geminiService';

interface AdminProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const Admin: React.FC<AdminProps> = ({ products, onAddProduct, onDeleteProduct }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Oturma Grubu',
    description: '',
    stock: '5'
  });

  const handleGenerateDescription = async () => {
    if (!formData.name) return alert('Lütfen önce bir ürün ismi girin.');
    setIsGenerating(true);
    const desc = await generateProductDescription(formData.name, formData.category);
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      description: formData.description,
      stock: Number(formData.stock),
      imageUrl: 'https://picsum.photos/seed/' + formData.name + '/800/600',
      modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
      dimensions: { width: 100, height: 100, depth: 100 }
    };
    onAddProduct(newProduct);
    setFormData({ name: '', price: '', category: 'Oturma Grubu', description: '', stock: '5' });
    setIsAdding(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Yönetim Paneli</h1>
          <p className="text-gray-500 font-light text-sm uppercase tracking-[0.2em]">Koleksiyon & Envanter Kontrolü</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 flex items-center gap-3 hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all uppercase text-[10px] tracking-[0.3em] font-black"
        >
          {isAdding ? 'İptal Et' : 'Yeni Ürün Ekle'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white dark:bg-surface-dark p-8 mb-12 border-l-8 border-orange-600 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-black mb-8 uppercase tracking-widest border-b border-black/5 dark:border-white/5 pb-4">Ürün Kaydı</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] uppercase font-black text-gray-400 tracking-widest">Ürün İsmi</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border-b-2 border-black/10 dark:border-white/10 bg-transparent py-3 focus:border-orange-600 outline-none transition-colors font-bold uppercase tracking-tight text-lg"
                  placeholder="örn: LUNA LOUNGE"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] uppercase font-black text-gray-400 tracking-widest">Fiyat (₺)</label>
                <input 
                  type="number" 
                  required
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="w-full border-b-2 border-black/10 dark:border-white/10 bg-transparent py-3 focus:border-orange-600 outline-none transition-colors font-bold text-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] uppercase font-black text-gray-400 tracking-widest">Kategori</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full border-b-2 border-black/10 dark:border-white/10 py-3 focus:border-orange-600 outline-none transition-colors bg-white dark:bg-black font-bold uppercase text-sm"
                >
                  <option>Oturma Grubu</option>
                  <option>Yemek Odası</option>
                  <option>Yatak Odası</option>
                  <option>Aksesuar</option>
                  <option>Aydınlatma</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] uppercase font-black text-gray-400 tracking-widest">Dosya & Medya</label>
                <div className="border-2 border-dashed border-black/10 dark:border-white/10 p-6 flex flex-col items-center justify-center text-gray-400 hover:border-orange-600 transition-all cursor-pointer group">
                  <Upload size={24} className="group-hover:text-orange-600 transition-colors" />
                  <span className="text-[10px] font-black uppercase mt-3 tracking-widest">3D MODEL / GÖRSEL YÜKLE</span>
                </div>
              </div>
            </div>

            <div className="relative space-y-2">
              <label className="block text-[10px] uppercase font-black text-gray-400 tracking-widest">Hikaye & Detay</label>
              <textarea 
                required
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full border border-black/10 dark:border-white/10 p-6 h-40 outline-none focus:border-orange-600 bg-transparent transition-colors font-light text-sm leading-relaxed"
                placeholder="Ürünün ruhunu anlatın..."
              />
              <button 
                type="button"
                onClick={handleGenerateDescription}
                disabled={isGenerating}
                className="absolute right-4 bottom-4 flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] transition-all"
              >
                {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                {isGenerating ? 'AI YAZIYOR...' : 'AI İLE METİN OLUŞTUR'}
              </button>
            </div>

            <div className="flex justify-end gap-6 pt-4">
              <button 
                type="submit"
                className="bg-orange-600 text-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-black hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all shadow-xl shadow-orange-600/20"
              >
                Katalog'a Kaydet
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-black border border-black/5 dark:border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-surface-dark border-b border-black/5 dark:border-white/5">
              <tr>
                <th className="px-8 py-6 text-[10px] uppercase font-black tracking-widest text-gray-400">Ürün Tanımı</th>
                <th className="px-8 py-6 text-[10px] uppercase font-black tracking-widest text-gray-400">Kategori</th>
                <th className="px-8 py-6 text-[10px] uppercase font-black tracking-widest text-gray-400">Fiyat</th>
                <th className="px-8 py-6 text-[10px] uppercase font-black tracking-widest text-gray-400">Durum</th>
                <th className="px-8 py-6 text-[10px] uppercase font-black tracking-widest text-gray-400 text-right">Eylem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {products.map(p => (
                <tr key={p.id} className="group hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 overflow-hidden border border-black/5">
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <span className="font-black uppercase tracking-tight text-sm">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{p.category}</td>
                  <td className="px-8 py-6 text-sm font-black text-orange-600">₺{p.price.toLocaleString()}</td>
                  <td className="px-8 py-6">
                    <span className={`text-[9px] font-black px-3 py-1 uppercase tracking-widest ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {p.stock > 0 ? 'Mevcut' : 'Tükendi'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => onDeleteProduct(p.id)}
                      className="text-gray-400 hover:text-orange-600 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
