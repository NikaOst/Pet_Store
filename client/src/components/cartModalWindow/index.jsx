import styles from './styles.module.css';
import white_x from '../../assets/icons/white_x.svg';
import { useDispatch } from 'react-redux';
import { closeModalWindow } from '../../redux/slices/cartSlice';
import { useEffect } from 'react';

function CartModalWindow() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={styles.blurConatiner}>
      <div className={styles.messegeContainer}>
        <div className={styles.titleImage}>
          <h3>Congratulations!</h3>
          <img src={white_x} onClick={() => dispatch(closeModalWindow())} alt="closeIcon" />
        </div>
        <div className={styles.message}>
          <p>Your order has been successfully placed on the website.</p>
          <p>A manager will contact you shortly to confirm your order</p>
        </div>
      </div>
    </div>
  );
}
export default CartModalWindow;
