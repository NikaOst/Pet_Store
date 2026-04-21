// import line from '../../assets/images/Line.png';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

function ThemaDivider({ thema, category, path }) {
  const navigate = useNavigate();
  return (
    <div className={styles.themaDivider}>
      <h2>{thema}</h2>
      <div className={styles.dividerCategory}>
        <div className={styles.dividerLine} />
        <div onClick={() => navigate(path)} className={styles.category}>
          <span>{category}</span>
        </div>
      </div>
    </div>
  );
}
export default ThemaDivider;
