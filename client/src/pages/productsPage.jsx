import BreadcrumbsComponent from '../components/breadcrumbs';
import Products from '../components/products';
import styles from '../styles/products.module.css';
import { Box, MenuItem, FormControl, Select } from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../redux/slices/productsSlice';
import { useNavigate } from 'react-router-dom';

function ProductsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortValue, setSortValue] = useState('by default');
  const [discountChecked, setDiscountChecked] = useState(false);
  const { products } = useSelector((state) => state.products);

  const handleChange = (event) => {
    setSortValue(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  const discountProducts = () => {
    return products.filter((product) => product.discont_price !== null);
  };

  return (
    <div className={styles.productsContainer}>
      <BreadcrumbsComponent path={[{ name: 'All products', path: '' }]} />
      <div className={styles.products}>
        <h2>All products</h2>
        <div className={styles.filter}>
          <div className={styles.filterPrice}>
            <span>Price</span>
            <input type="text" placeholder="from" />
            <input type="text" placeholder="to" />
          </div>
          <div className={styles.filterDiscount}>
            <span>Discounted items</span>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={discountChecked}
              onChange={() => setDiscountChecked((prev) => !prev)}
            />
          </div>
          <div className={styles.filterSorted}>
            <span>Sorted</span>
            <Box sx={{ width: 200 }}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortValue}
                  onChange={handleChange}
                  sx={{
                    width: 200,
                    fontWeight: 500,
                    fontSize: '1rem',
                    lineHeight: '126%',
                    borderRadius: '6px',
                    border: '1px solid #dddddd',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& .MuiSelect-select': { padding: '0.5rem 1rem' },
                  }}>
                  <MenuItem value={'by default'}>by default</MenuItem>
                  <MenuItem value={'price: high-low'}>price: high-low</MenuItem>
                  <MenuItem value={'price: low-high'}>price: low-high</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
      </div>
      <Products
        autoScroll={false}
        products={!discountChecked ? products : discountProducts()}
        onProductClick={onProductClick}
      />
    </div>
  );
}
export default ProductsPage;
