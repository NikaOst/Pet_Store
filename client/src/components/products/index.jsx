import styles from './styles.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { styled } from '@mui/material/styles';
import { Paper, Grid } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  //   padding: theme.spacing(2),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  height: '350px',
  boxShadow: 'none',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function Products({ autoScroll }) {
  return (
    <div className={styles.gridProducts}>
      {autoScroll ? (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={4}
          grabCursor
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}>
          {Array.from(Array(8)).map((_, index) => (
            <SwiperSlide key={index}>
              <Item>
                <div className={styles.imgContainer}>
                  <img className={styles.imgProduct} src="" alt="product" />
                </div>
                <div className={styles.productDetails}>
                  <p className={styles.productName}>Dry Dog Food for Adult...</p>
                  <div className={styles.price}>
                    <p>$80</p>
                    <span>$100</span>
                  </div>
                </div>
              </Item>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Grid container spacing={2}>
          {Array.from(Array(8)).map((_, index) => (
            <Grid key={index} size={3}>
              <Item>
                <div className={styles.imgContainer}>
                  <img className={styles.imgProduct} src="" alt="product" />
                </div>
                <div className={styles.productDetails}>
                  <p className={styles.productName}>Dry Dog Food for Adult...</p>
                  <div className={styles.price}>
                    <p>$80</p>
                    <span>$100</span>
                  </div>
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
export default Products;
