import BreadcrumbsComponent from '../components/breadcrumbs';
import Products from '../components/products';
import styles from '../styles/discount.module.css';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../redux/slices/productsSlice';
import { useNavigate } from 'react-router-dom';
import { sort } from '../middleware/sort';
import Filter from '../components/filter';

function DiscountProductsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortValue, setSortValue] = useState('by default');
  const { products } = useSelector((state) => state.products);
  const [priceFrom, setPriceFrom] = useState(null);
  const [priceTo, setPriceTo] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const discountProducts = () => {
    return products.filter((product) => product.discont_price !== null);
  };

  const onProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  const getProducts = () => {
    const data = discountProducts();
    return sort({ priceFrom, priceTo, flag: sortValue, products: data });
  };

  return (
    <div className={styles.discountContainer}>
      <BreadcrumbsComponent path={[{ name: 'All sales', path: '' }]} />
      <div className={styles.products}>
        <h2>Discounted items</h2>
        <Filter
          setPriceFrom={setPriceFrom}
          setPriceTo={setPriceTo}
          sortValue={sortValue}
          setSortValue={setSortValue}
          needCheckbox={false}
        />
      </div>
      <Products autoScroll={false} products={getProducts()} onProductClick={onProductClick} />
    </div>
  );
}
export default DiscountProductsPage;
