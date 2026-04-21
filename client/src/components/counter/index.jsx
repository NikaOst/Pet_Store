import styles from './styles.module.css';
import minus from '../../assets/icons/minus.svg';
import plus from '../../assets/icons/plus.svg';

function Counter({ count, setCount, availableProduct }) {
  return (
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
  );
}
export default Counter;
