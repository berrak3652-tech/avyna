
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import Home from './views/Home';
import Admin from './views/Admin';
import Consultant from './views/Consultant';
import ProductDetail from './views/ProductDetail';
import Cart from './views/Cart';
import Checkout from './views/Checkout';
import TrialRoom from './views/TrialRoom';
import Orders from './views/Orders';
import { Product, ViewMode, CartItem } from './types';
import { INITIAL_PRODUCTS } from './services/mockData';
import { ApiService } from './services/api';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.HOME);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const backendProducts = await ApiService.getProducts();
        setProducts(backendProducts as Product[]);
      } catch (error) {
        console.error("Backend fetch error, falling back to mock:", error);
        setProducts(INITIAL_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const savedCart = localStorage.getItem('avyna_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleAddProduct = async (p: Product) => {
    try {
      const result = await ApiService.addProduct(p);
      if (result.success) {
        setProducts([p, ...products]);
      }
    } catch (e) {
      console.error("Error adding product:", e);
      throw e;
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await ApiService.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (e) {
      console.error("Error deleting product:", e);
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      const result = await ApiService.updateProduct(updatedProduct);
      if (result.success) {
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      }
    } catch (e) {
      console.error("Error updating product:", e);
      throw e;
    }
  };


  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [...prev, { product, quantity: 1 }];
      }
      localStorage.setItem('avyna_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      const updated = prev.map(item => {
        if (item.product.id === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
      localStorage.setItem('avyna_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (productId: string) => {
    setCart(prev => {
      const updated = prev.filter(item => item.product.id !== productId);
      localStorage.setItem('avyna_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('avyna_cart');
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
      <Navbar
        activeView={view}
        onNavigate={handleNavigate}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <main className="flex-grow pb-24">
        {view === ViewMode.HOME && (
          <Home products={products} onSelectProduct={navigateToDetail} />
        )}

        {view === ViewMode.ADMIN && (
          <Admin
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onNavigate={handleNavigate}
          />
        )}

        {view === ViewMode.CONSULTANT && (
          <Consultant products={products} />
        )}

        {view === ViewMode.DETAIL && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setView(ViewMode.HOME)}
            onAddToCart={addToCart}
          />
        )}

        {view === ViewMode.CART && (
          <Cart
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onNavigate={handleNavigate}
            onBack={() => setView(ViewMode.HOME)}
          />
        )}

        {view === ViewMode.CHECKOUT && (
          <Checkout
            cart={cart}
            onNavigate={handleNavigate}
            onClearCart={clearCart}
          />
        )}

        {view === ViewMode.TRIAL_ROOM && (
          <TrialRoom
            products={products}
            onNavigate={handleNavigate}
          />
        )}

        {view === ViewMode.ORDERS && (
          <Orders onNavigate={handleNavigate} />
        )}
      </main>

      {view !== ViewMode.DETAIL && view !== ViewMode.CHECKOUT && view !== ViewMode.TRIAL_ROOM && <Footer />}
      <BottomNav activeView={view} onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
