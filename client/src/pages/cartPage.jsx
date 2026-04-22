import ThemaDivider from '../components/themaDivider';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/counter';
import x from '../assets/icons/ic_x.svg';
import styles from '../styles/cart.module.css';
import Form from '../components/form';
import { removeFromCart, updateCart, clearCart } from '../redux/slices/cartSlice';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, status } = useSelector((state) => state.cart);

  const counts = cart.map((prod) => prod.count || 1);

  const totalPrice = counts.reduce((acc, count, indx) => {
    const prod = cart[indx];
    const price = prod.discont_price ?? prod.price;
    return acc + price * count;
  }, 0);

  const handleSetCount = (indx, updater) => {
    const currentCount = counts[indx];
    const newCount = typeof updater === 'function' ? updater(currentCount) : updater;

    const updatedCart = cart.map((prod, i) => ({
      ...prod,
      count: i === indx ? newCount : prod.count,
    }));
    dispatch(updateCart(updatedCart));
  };

  const handelOnDelete = (indx) => {
    dispatch(removeFromCart(cart[indx].id));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(clearCart());
    }
  }, [status, dispatch]);

  return (
    <div className={styles.cartMainContainer}>
      <div>
        <ThemaDivider thema="Shopping cart" category="Back to the store" path={'/products'} />
      </div>
      {cart.length > 0 ? (
        <div className={styles.mainContent}>
          <div className={styles.carts}>
            {cart.map((product, indx) => {
              return (
                <div className={styles.prodCart} key={product.id}>
                  <div className={styles.imageConteiner}>
                    <img className={styles.prodImage} src={product.image} alt="prodImage" />
                  </div>
                  <div className={styles.prodContent}>
                    <div className={styles.prodContentTitle}>
                      <span>{product.title}</span>
                      <img onClick={() => handelOnDelete(indx)} src={x} alt="xImg" />
                    </div>
                    <div>
                      <Counter
                        count={counts[indx]}
                        setCount={(updater) => handleSetCount(indx, updater)}
                        availableProduct={false}
                      />
                      <span>
                        $
                        {product.discont_price
                          ? product.discont_price * counts[indx]
                          : product.price * counts[indx]}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.orderContainer}>
            <div className={styles.titleItemContainer}>
              <h3>Order details</h3>
              <div>
                <div className={styles.items}>
                  <span>{cart.length} items</span>
                  <span>Total</span>
                </div>
                <div className={styles.price}>
                  <span>${Number.isInteger(totalPrice) ? `${totalPrice},00` : totalPrice}</span>
                </div>
              </div>
            </div>
            <div className={styles.formContainer}>
              <Form btnText={'Order'} cartData={{ titalSum: totalPrice, cart: cart }} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.emptyCart}>
          <span>Looks like you have no items in your basket currently.</span>
          <Button
            onClick={() => navigate('/products')}
            variant="contained"
            sx={{
              textTransform: 'none',
              backgroundColor: '#0D50FF',
              fontWeight: 600,
              fontSize: '1.25rem',
              lineHeight: '130%',
              padding: '1rem 3.5rem',
              width: '100%',
              maxWidth: '19.5rem',
              '&:hover': {
                backgroundColor: '#282828',
              },
            }}>
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
}
export default CartPage;
