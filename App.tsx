
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import Home from './views/Home';
import Admin from './views/Admin';
import Consultant from './views/Consultant';
import ProductDetail from './views/ProductDetail';
import { Product, ViewMode } from './types';
import { INITIAL_PRODUCTS } from './services/mockData';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.HOME);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('avyna_products');
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  const handleAddProduct = (p: Product) => {
    const updated = [p, ...products];
    setProducts(updated);
    localStorage.setItem('avyna_products', JSON.stringify(updated));
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('avyna_products', JSON.stringify(updated));
  };

  const navigateToDetail = (p: Product) => {
    setSelectedProduct(p);
    setView(ViewMode.DETAIL);
    window.scrollTo(0, 0);
  };

  const handleNavigate = (v: ViewMode) => {
    setView(v);
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Navbar activeView={view} onNavigate={handleNavigate} />

      <main className="flex-grow pb-24">
        {view === ViewMode.HOME && (
          <Home products={products} onSelectProduct={navigateToDetail} />
        )}
        
        {view === ViewMode.ADMIN && (
          <Admin 
            products={products} 
            onAddProduct={handleAddProduct} 
            onDeleteProduct={handleDeleteProduct} 
          />
        )}

        {view === ViewMode.CONSULTANT && (
          <Consultant products={products} />
        )}

        {view === ViewMode.DETAIL && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setView(ViewMode.HOME)} 
          />
        )}
      </main>

      {view !== ViewMode.DETAIL && <Footer />}
      <BottomNav activeView={view} onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
