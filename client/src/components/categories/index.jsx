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
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  boxShadow: 'none',
  width: '100%',
  cursor: 'pointer',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function Categories({ categories, autoScroll, onCategoryClick }) {
  return (
    <div className={styles.grid}>
      {autoScroll ? (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={32}
          slidesPerView={4}
          grabCursor
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}>
          {categories?.map((category, index) => (
            <SwiperSlide key={index}>
              <Item onClick={() => onCategoryClick?.(category.id)}>
                <img className={styles.imgCategory} src={category.image} alt="category" />
                <p className={styles.categoryName}>{category.title}</p>
              </Item>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Grid container spacing={4} rowSpacing={4}>
          {categories?.map((category, index) => (
            <Grid key={index} size={3}>
              <Item onClick={() => onCategoryClick?.(category.id)}>
                <img className={styles.imgCategory} src={category.image} alt="category" />
                <p className={styles.categoryName}>{category.title}</p>
              </Item>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
export default Categories;
