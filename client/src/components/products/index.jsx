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
  border: '1px solid #DDDDDD',
  borderRadius: '12px',
  color: (theme.vars ?? theme).palette.text.secondary,
  boxShadow: 'none',
  cursor: 'pointer',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function Products({ autoScroll, products, onProductClick }) {
  return (
    <div className={styles.gridProducts}>
      {autoScroll ? (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={32}
          slidesPerView={4}
          grabCursor
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}>
          {products?.map((product, index) => (
            <SwiperSlide key={index}>
              <Item onClick={() => onProductClick?.(product.id)}>
                <div className={styles.imgContainer}>
                  <img className={styles.imgProduct} src={product.image} alt="product" />
                </div>
                <div className={styles.productDetails}>
                  <p className={styles.productName}>{product.title}</p>
                  <div className={styles.price}>
                    {product.discont_price ? (
                      <div>
                        <p>${product.discont_price}</p>
                        <span>${product.price}</span>
                      </div>
                    ) : (
                      <div>
                        <p>${product.price}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Item>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Grid container spacing={3} rowSpacing={3}>
          {products?.map((product, index) => (
            <Grid key={index} size={3}>
              <Item onClick={() => onProductClick?.(product.id)}>
                <div className={styles.imgContainer}>
                  <img className={styles.imgProduct} src={product.image} alt="product" />
                </div>
                <div className={styles.productDetails}>
                  <p className={styles.productName}>{product.title}</p>
                  <div className={styles.price}>
                    {product.discont_price ? (
                      <div>
                        <p>${product.discont_price}</p>
                        <span>${product.price}</span>
                      </div>
                    ) : (
                      <div>
                        <p>${product.price}</p>
                      </div>
                    )}
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
