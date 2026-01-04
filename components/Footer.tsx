
import React from 'react';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-black border-t border-black/5 dark:border-white/5 py-24 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2">
          <div className="text-4xl font-black text-black dark:text-white mb-8 tracking-[0.4em] uppercase">Avyna</div>
          <p className="text-gray-400 text-xs max-w-md font-medium uppercase tracking-widest leading-[2.2]">
            Yaşam alanlarınıza değer katan, teknoloji ve zarafeti birleştiren premium mobilya deneyimi. 
            Gemini AI desteği ve 3D görselleştirme ile geleceğin dekorasyon anlayışını bugünden yaşayın.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] uppercase font-black tracking-[0.3em] mb-10 text-orange-600">Servisler</h4>
          <ul className="text-gray-400 text-[10px] space-y-6 font-bold uppercase tracking-[0.2em]">
            <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Teslimat & İade</a></li>
            <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Garanti Şartları</a></li>
            <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Sıkça Sorulan Sorular</a></li>
            <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">İletişim</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase font-black tracking-[0.3em] mb-10 text-orange-600">Sosyal</h4>
          <div className="flex space-x-6 text-gray-400">
            <Instagram className="cursor-pointer hover:text-black dark:hover:text-white" size={20} />
            <Facebook className="cursor-pointer hover:text-black dark:hover:text-white" size={20} />
            <Twitter className="cursor-pointer hover:text-black dark:hover:text-white" size={20} />
            <Mail className="cursor-pointer hover:text-black dark:hover:text-white" size={20} />
          </div>
          <div className="mt-12">
            <h5 className="text-[9px] uppercase font-black mb-4 tracking-[0.3em] text-gray-400">Koleksiyona Katıl</h5>
            <div className="flex border-b border-black/10 dark:border-white/10 pb-2">
              <input 
                type="email" 
                placeholder="E-POSTA ADRESİNİZ" 
                className="bg-transparent py-2 text-[9px] outline-none flex-grow uppercase font-black tracking-widest"
              />
              <button className="text-[9px] uppercase font-black tracking-widest hover:text-orange-600 transition-colors">Kaydol</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] text-gray-400 uppercase tracking-[0.3em] font-black">
        <p>© 2024 Avyna Furniture. Tüm Hakları Saklıdır.</p>
        <div className="flex space-x-8 mt-6 md:mt-0">
          <a href="#" className="hover:text-black dark:hover:text-white">Gizlilik</a>
          <a href="#" className="hover:text-black dark:hover:text-white">Şartlar</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
