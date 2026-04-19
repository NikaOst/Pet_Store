import BreadcrumbsComponent from '../components/breadcrumbs';

function ProductPage() {
  return (
    <div>
      <BreadcrumbsComponent
        path={[
          { name: 'Categories', path: '/categories' },
          { name: 'Dry & Wet Food', path: '/categories/:1' },
          { name: 'Dry Dog Food', path: '' },
        ]}
      />
      <div></div>
    </div>
  );
}
export default ProductPage;
