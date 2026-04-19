import BreadcrumbsComponent from '../components/breadcrumbs';
import styles from '../styles/categories.module.css';
import Categories from '../components/categories';

function CategoriesPage() {
  return (
    <div className={styles.categoriesContainer}>
      <BreadcrumbsComponent path={[{ name: 'Categories', path: '' }]} />
      <div className={styles.categories}>
        <h2>Contact</h2>
      </div>
      <Categories autoScroll={false} />
    </div>
  );
}
export default CategoriesPage;
