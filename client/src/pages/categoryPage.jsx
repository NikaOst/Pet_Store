import BreadcrumbsComponent from '../components/breadcrumbs';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/category.module.css';
import { Box, MenuItem, FormControl, Select } from '@mui/material';
import Products from '../components/products';
import { fetchCategoryById } from '../redux/slices/categoriesSlice';
import { useNavigate } from 'react-router-dom';

function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sortValue, setSortValue] = useState('by default');
  const [discountChecked, setDiscountChecked] = useState(false);
  const { category } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategoryById(id));
  }, [dispatch, id]);

  const handleChange = (event) => {
    setSortValue(event.target.value);
  };

  const discountProducts = () => {
    return category.data.filter((product) => product.discont_price !== null);
  };

  const onProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className={styles.productsContainer}>
      <BreadcrumbsComponent
        path={[
          { name: 'Categories', path: '/categories' },
          { name: category.category?.title, path: '' },
        ]}
      />
      <div className={styles.products}>
        <h2>{category.category?.title}</h2>
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
        products={!discountChecked ? category.data : discountProducts()}
        onProductClick={onProductClick}
      />
    </div>
  );
}
export default CategoryPage;
