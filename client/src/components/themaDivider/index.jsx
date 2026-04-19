// import line from '../../assets/images/Line.png';
import styles from './styles.module.css';

function ThemaDivider({ thema, category }) {
  return (
    <div className={styles.themaDivider}>
      <h2>{thema}</h2>
      <div className={styles.dividerCategory}>
        <div className={styles.dividerLine} />
        <div className={styles.category}>
          <span>{category}</span>
        </div>
      </div>
    </div>
  );
}
export default ThemaDivider;
