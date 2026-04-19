import BreadcrumbsComponent from '../components/breadcrumbs';

function CategoryPage() {
  return (
    <div>
      <BreadcrumbsComponent
        path={[
          { name: 'Categories', path: '/categories' },
          { name: 'Dry & Wet Food', path: '' },
        ]}
      />
      <div></div>
    </div>
  );
}
export default CategoryPage;
