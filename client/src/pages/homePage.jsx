import ThemaDivider from '../components/themaDivider';
import styles from '../styles/home.module.css';
import { Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import formPic from '../assets/images/formImg.png';
import Products from '../components/products';
import Categories from '../components/categories';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '../redux/slices/categoriesSlice';
import { fetchProducts } from '../redux/slices/productsSlice';
import { useNavigate } from 'react-router-dom';

import Form from '../components/form';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  height: '350px',
  boxShadow: 'none',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const discountProducts = () => {
    return products.filter((product) => product.discont_price !== null);
  };

  const onCategoryClick = (id) => {
    navigate(`/categories/${id}`);
  };

  const onProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div>
      <div className={styles.firstContainer}>
        <h1>
          Amazing Discounts
          <br /> on Pets Products!
        </h1>
        <Button
          component="a"
          href="#discount"
          variant="contained"
          sx={{
            textTransform: 'none',
            backgroundColor: '#0D50FF',
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: '130%',
            padding: '1rem 3.5rem',
            width: '100%',
            maxWidth: '13.6rem',
            '&:hover': {
              backgroundColor: '#282828',
            },
          }}>
          Check out
        </Button>
      </div>
      <div className={styles.categories}>
        <ThemaDivider thema="Categories" category="All categories" path={'/categories'} />
        <Categories autoScroll={true} categories={categories} onCategoryClick={onCategoryClick} />
      </div>
      <div id="discount" className={styles.discontForm}>
        <h1>5% off on the first order</h1>
        <div className={styles.formContainer}>
          <img src={formPic} alt="formPic" />
          <Form btnText={'Get a discount'} />
        </div>
      </div>
      <div className={styles.sale}>
        <ThemaDivider thema="Sale" category="All sales" path={'/discounts'} />
        <Products autoScroll={true} products={discountProducts()} onProductClick={onProductClick} />
      </div>
    </div>
  );
}
export default HomePage;
