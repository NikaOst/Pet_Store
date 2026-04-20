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
import { useForm } from 'react-hook-form';
import { fetchSendDiscount } from '../redux/slices/discountSlice';

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
  const { status } = useSelector((state) => state.sendDiscount);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

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

  const formSubmit = (data) => {
    dispatch(fetchSendDiscount(data));
    reset();
  };

  const emailValidation = (email) => {
    if (!email) return 'Поле не должно быть пустым';
    const reg = /^\s*(?!.*[._-]{2})[\w.-]+@([\w-]+\.)+[\w-]{2,24}\s*$/;
    if (!reg.test(email)) return 'Должен быть корректный формат email';
    return true;
  };

  const telValidation = (tel) => {
    if (!tel) return 'Поле не должно быть пустым';
    const mask = /^\+49\d{6}\s\d{2}-\d{2}$/;
    if (!mask.test(tel)) return 'Формат(маска): +49XXXXXX XX-XX';
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
          }}>
          Check out
        </Button>
      </div>
      <div className={styles.categories}>
        <ThemaDivider thema="Categories" category="All categories " />
        <Categories autoScroll={true} categories={categories} onCategoryClick={onCategoryClick} />
      </div>
      <div id="discount" className={styles.discontForm}>
        <h1>5% off on the first order</h1>
        <div className={styles.formContainer}>
          <img src={formPic} alt="formPic" />
          <form onSubmit={handleSubmit(formSubmit)}>
            <input
              {...register('name', { required: 'Все поля обазательны' })}
              type="text"
              placeholder="Name"
            />
            {errors.name && <span>{errors.name.message}</span>}
            <input
              {...register('phone_number', { validate: telValidation })}
              type="tel"
              placeholder="Phone number"
            />
            {errors.phone_number && <span>{errors.phone_number.message}</span>}
            <input
              {...register('email', { validate: emailValidation })}
              type="email"
              placeholder="Email"
            />
            {errors.email && <span>{errors.email.message}</span>}
            <button
              className={status === 'succeeded' ? styles.cuponSubmitted : styles.cuponNotSubmitted}
              type="submit">
              {status === 'succeeded' ? 'Request Submitted' : 'Get a discount'}
            </button>
          </form>
        </div>
      </div>
      <div className={styles.sale}>
        <ThemaDivider thema="Sale" category="All sales" />
        <Products autoScroll={true} products={discountProducts()} onProductClick={onProductClick} />
      </div>
    </div>
  );
}
export default HomePage;
