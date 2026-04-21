import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/nav';
import HomePage from './pages/homePage';
import CartPage from './pages/cartPage';
import CategoriesPage from './pages/categoriesPage';
import CategoryPage from './pages/categoryPage';
import NotFoundPage from './pages/notFoundPage';
import DiscountProductsPage from './pages/discountProductsPage';
import ProductPage from './pages/productPage';
import ProductsPage from './pages/productsPage';
import Footer from './components/footer';
import ScrollToTop from './scrollToStart';
import { useSelector } from 'react-redux';
import CartModalWindow from './components/cartModalWindow';

function App() {
  const { status } = useSelector((state) => state.cart);
  return (
    <div className="mainContainer">
      {status === 'succeeded' && <CartModalWindow />}
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:id" element={<CategoryPage />} />
        <Route path="/discounts" element={<DiscountProductsPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
