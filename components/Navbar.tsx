
import React from 'react';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { ViewMode } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewMode) => void;
  activeView: ViewMode;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeView }) => {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-white/95 dark:bg-black/95 backdrop-blur-md px-6 py-4 border-b border-black/5 dark:border-white/5">
      <div className="flex size-10 shrink-0 items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer">
        <Menu size={24} strokeWidth={2.5} />
      </div>
      
      <h2 
        className="text-black dark:text-white text-3xl font-black uppercase tracking-[0.4em] flex-1 text-center cursor-pointer hover:text-orange-600 transition-colors ml-10"
        onClick={() => onNavigate(ViewMode.HOME)}
      >
        Avyna
      </h2>

      <div className="flex items-center justify-end gap-4">
        <button className="flex size-10 shrink-0 items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer">
          <Search size={22} strokeWidth={2.5} />
        </button>
        <button className="flex size-10 shrink-0 items-center justify-center relative hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer">
          <ShoppingBag size={22} strokeWidth={2.5} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-orange-600 rounded-full"></span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
