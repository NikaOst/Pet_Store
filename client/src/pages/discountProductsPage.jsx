import BreadcrumbsComponent from '../components/breadcrumbs';
import Products from '../components/products';
import styles from '../styles/discount.module.css';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { useState } from 'react';

function DiscountProductsPage() {
  const [sortValue, setSortValue] = useState('by default');

  const handleChange = (event) => {
    setSortValue(event.target.value);
  };

  return (
    <div className={styles.discountContainer}>
      <BreadcrumbsComponent path={[{ name: 'All sales', path: '' }]} />
      <div className={styles.products}>
        <h2>Discounted items</h2>
        <div className={styles.filter}>
          <div className={styles.filterPrice}>
            <span>Price</span>
            <input type="text" placeholder="from" />
            <input type="text" placeholder="to" />
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
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
      </div>
      <Products autoScroll={false} />
    </div>
  );
}
export default DiscountProductsPage;
