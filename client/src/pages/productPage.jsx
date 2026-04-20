import BreadcrumbsComponent from '../components/breadcrumbs';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/product.module.css';
import { fetchProductById } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { Button } from '@mui/material';
import minus from '../assets/icons/minus.svg';
import plus from '../assets/icons/plus.svg';

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const [shortText, setShortText] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descRef = useRef(null);
  const [availableProduct, setAvailableProduct] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (descRef.current) {
      setIsOverflowing(descRef.current.scrollHeight > descRef.current.clientHeight);
    }
    const curProduct = cart.find((prod) => prod.id === product?.id);
    setAvailableProduct(curProduct ? true : false);
  }, [product, cart]);

  const addProductToCart = (product) => {
    dispatch(addToCart({ product, count }));
  };

  return (
    <div>
      <BreadcrumbsComponent
        path={[
          { name: 'Categories', path: '/categories' },
          { name: product?.category?.title, path: `/categories/${product?.categoryId}` },
          { name: product?.title, path: '' },
        ]}
      />
      <div className={styles.productContainer}>
        <div className={styles.productImage}>
          <img src={product?.image} alt="prodImage" />
        </div>
        <div className={styles.productData}>
          <h1>{product?.title}</h1>
          <div className={styles.price}>
            {product?.discont_price ? (
              <div>
                <p>${product?.discont_price}</p>
                <span>${product?.price}</span>
              </div>
            ) : (
              <div>
                <p>${product?.price}</p>
              </div>
            )}
          </div>
          <div className={styles.productAmount}>
            <div className={styles.counter}>
              <button
                disabled={availableProduct}
                onClick={() => {
                  if (count > 1) setCount((c) => c - 1);
                }}>
                <img src={minus} alt="minus" />
              </button>
              <input
                type="text"
                value={count}
                disabled={availableProduct}
                onChange={(e) => {
                  if (e.target.value > 1) setCount(+e.target.value);
                }}
              />
              <button disabled={availableProduct} onClick={() => setCount((c) => c + 1)}>
                <img src={plus} alt="plus" />
              </button>
            </div>
            <Button
              variant="contained"
              sx={{
                textTransform: 'none',
                backgroundColor: '#0D50FF',
                fontWeight: 600,
                fontSize: '1.25rem',
                lineHeight: '130%',
                padding: '1rem 2rem',
                width: '19.75rem',
              }}
              onClick={() => addProductToCart(product)}
              disabled={availableProduct}>
              {availableProduct ? 'Added' : 'Add to cart'}
            </Button>
          </div>
          <div className={styles.productDesc}>
            <h3>Description</h3>
            <p ref={descRef} className={shortText ? '' : styles.productDescClamped}>
              {product?.description}
            </p>
            {isOverflowing && (
              <button type="button" onClick={() => setShortText((prev) => !prev)}>
                {!shortText ? 'Read more' : 'Read less'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductPage;
