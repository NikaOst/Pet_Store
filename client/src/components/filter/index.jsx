import styles from './styles.module.css';
import { Box, MenuItem, FormControl, Select } from '@mui/material';

function Filter({
  setPriceFrom,
  setPriceTo,
  discountChecked,
  setDiscountChecked,
  sortValue,
  setSortValue,
  needCheckbox,
}) {
  const handleChange = (event) => {
    setSortValue(event.target.value);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterPrice}>
        <span>Price</span>
        <input
          onChange={(e) => {
            setPriceFrom(e.target.value);
          }}
          type="text"
          placeholder="from"
        />
        <input
          onChange={(e) => {
            setPriceTo(e.target.value);
          }}
          type="text"
          placeholder="to"
        />
      </div>
      {needCheckbox && (
        <div className={styles.filterDiscount}>
          <span>Discounted items</span>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={discountChecked}
            onChange={() => setDiscountChecked((prev) => !prev)}
          />
        </div>
      )}
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
  );
}
export default Filter;
