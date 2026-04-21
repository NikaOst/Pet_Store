import BreadcrumbsComponent from '../components/breadcrumbs';
import Products from '../components/products';
import styles from '../styles/products.module.css';
import { Box, MenuItem, FormControl, Select } from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../redux/slices/productsSlice';
import { useNavigate } from 'react-router-dom';
import { sort } from '../middleware/sort';
import Filter from '../components/filter';

function ProductsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortValue, setSortValue] = useState('by default');
  const [discountChecked, setDiscountChecked] = useState(false);
  const { products } = useSelector((state) => state.products);
  const [priceFrom, setPriceFrom] = useState(null);
  const [priceTo, setPriceTo] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  const discountProducts = () => {
    return (products || []).filter((product) => product.discont_price !== null);
  };

  const getProducts = () => {
    if (!products) return [];
    const data = discountChecked ? discountProducts() : products;
    return sort({ priceFrom, priceTo, flag: sortValue, products: data });
  };

  return (
    <div className={styles.productsContainer}>
      <BreadcrumbsComponent path={[{ name: 'All products', path: '' }]} />
      <div className={styles.products}>
        <h2>All products</h2>
        <Filter
          setPriceFrom={setPriceFrom}
          setPriceTo={setPriceTo}
          discountChecked={discountChecked}
          setDiscountChecked={setDiscountChecked}
          sortValue={sortValue}
          setSortValue={setSortValue}
          needCheckbox={true}
        />
      </div>
      <Products autoScroll={false} products={getProducts()} onProductClick={onProductClick} />
    </div>
  );
}
export default ProductsPage;
