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

function Categories({ autoScroll }) {
  return (
    <div className={styles.grid}>
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
                <img className={styles.imgCategory} src="" alt="category" />
                <p className={styles.categoryName}>Dry & Wet Food</p>
              </Item>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Grid container spacing={2}>
          {Array.from(Array(8)).map((_, index) => (
            <Grid key={index} size={3}>
              <Item>
                <img className={styles.imgCategory} src="" alt="category" />
                <p className={styles.categoryName}>Dry & Wet Food</p>
              </Item>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
export default Categories;
