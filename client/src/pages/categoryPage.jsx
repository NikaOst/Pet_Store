import BreadcrumbsComponent from '../components/breadcrumbs';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/category.module.css';
import { Box, MenuItem, FormControl, Select } from '@mui/material';
import Products from '../components/products';
import { fetchCategoryById } from '../redux/slices/categoriesSlice';
import { useNavigate } from 'react-router-dom';
import Filter from '../components/filter';
import { sort } from '../middleware/sort';

function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sortValue, setSortValue] = useState('by default');
  const [discountChecked, setDiscountChecked] = useState(false);
  const { category } = useSelector((state) => state.categories);
  const [priceFrom, setPriceFrom] = useState(null);
  const [priceTo, setPriceTo] = useState(null);

  useEffect(() => {
    dispatch(fetchCategoryById(id));
  }, [dispatch, id]);

  const discountProducts = () => {
    return category.data.filter((product) => product.discont_price !== null);
  };

  const onProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  const getProducts = (categoryData) => {
    const data = discountChecked ? discountProducts() : categoryData;
    return sort({ priceFrom, priceTo, flag: sortValue, products: data });
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
      <Products
        autoScroll={false}
        products={getProducts(category.data)}
        onProductClick={onProductClick}
      />
    </div>
  );
}
export default CategoryPage;
