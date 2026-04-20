import BreadcrumbsComponent from '../components/breadcrumbs';
import styles from '../styles/categories.module.css';
import Categories from '../components/categories';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '../redux/slices/categoriesSlice';
import { useNavigate } from 'react-router-dom';

function CategoriesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);

  const onCategoryClick = (id) => {
    navigate(`/categories/${id}`);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className={styles.categoriesContainer}>
      <BreadcrumbsComponent path={[{ name: 'Categories', path: '' }]} />
      <div className={styles.categories}>
        <h2>Categories</h2>
      </div>
      <Categories categories={categories} autoScroll={false} onCategoryClick={onCategoryClick} />
    </div>
  );
}
export default CategoriesPage;
