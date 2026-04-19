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
  return (
    <div>
      <div className={styles.firstContainer}>
        <h1>Amazing Discounts on Pets Products!</h1>
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
        <Categories autoScroll={true} />
      </div>
      <div id="discount" className={styles.discontForm}>
        <h1>5% off on the first order</h1>
        <div className={styles.formContainer}>
          <img src={formPic} alt="formPic" />
          <form>
            <input type="text" placeholder="Name" />
            <input type="tel" placeholder="Phone number" />
            <input type="email" placeholder="Email" />
            <button type="submit">Get a discount</button>
          </form>
        </div>
      </div>
      <div className={styles.sale}>
        <ThemaDivider thema="Sale" category="All sales" />
        <Products autoScroll={true} />
      </div>
    </div>
  );
}
export default HomePage;
