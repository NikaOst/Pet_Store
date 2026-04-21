import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import { fetchSendDiscount } from '../../redux/slices/discountSlice';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCreateOrder } from '../../redux/slices/cartSlice';

function Form({ btnText, cartData = [] }) {
  const { status } = useSelector((state) => state.sendDiscount);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const formSubmit = (data) => {
    if (btnText === 'Get a discount') {
      dispatch(fetchSendDiscount(data));
    } else {
      dispatch(fetchCreateOrder({ data, cartData }));
    }
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
    <div className={styles.formContainer}>
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
        {btnText === 'Get a discount' ? (
          <button
            className={status === 'succeeded' ? styles.cuponSubmitted : styles.cuponNotSubmitted}
            type="submit"
            disabled={status === 'succeeded'}>
            {status === 'succeeded' ? 'Request Submitted' : btnText}
          </button>
        ) : (
          <button className={styles.orderBtn} type="submit">
            {btnText}
          </button>
        )}
      </form>
    </div>
  );
}
export default Form;
