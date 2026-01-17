
import React from 'react';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { ViewMode } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewMode) => void;
  activeView: ViewMode;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeView, cartCount }) => {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-white/95 dark:bg-black/95 backdrop-blur-md px-4 md:px-6 py-3 md:py-4 border-b border-black/5 dark:border-white/5">
      <div
        onClick={() => onNavigate(ViewMode.HOME)}
        className="flex size-9 md:size-10 shrink-0 items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
      >
        <Menu size={20} className="md:w-6 md:h-6" strokeWidth={2.5} />
      </div>

      <h2
        className="text-black dark:text-white text-xl md:text-3xl font-black uppercase tracking-[0.3em] md:tracking-[0.4em] flex-1 text-center cursor-pointer hover:text-orange-600 transition-colors ml-8 md:ml-10"
        onClick={() => onNavigate(ViewMode.HOME)}
      >
        Avyna
      </h2>

      <div className="flex items-center justify-end gap-2 md:gap-4">
        <button
          onClick={() => alert('Arama özelliği yakında aktif edilecektir.')}
          className="flex size-9 md:size-10 shrink-0 items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
        >
          <Search size={18} className="md:w-[22px] md:h-[22px]" strokeWidth={2.5} />
        </button>
        <button
          onClick={() => onNavigate(ViewMode.CART)}
          className={`flex size-9 md:size-10 shrink-0 items-center justify-center relative hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer ${activeView === ViewMode.CART ? 'bg-orange-600 text-white' : ''}`}
        >
          <ShoppingBag size={18} className="md:w-[22px] md:h-[22px]" strokeWidth={2.5} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 bg-orange-600 text-white text-[8px] md:text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-black">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
