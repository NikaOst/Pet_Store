import { Button } from '@mui/material';
import image from '../assets/images/404.png';
import styles from '../styles/404.module.css';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.mainContainer}>
      <div>
        <img src={image} alt="404Img" />
      </div>
      <div className={styles.mainContent}>
        <h1>Page Not Found</h1>
        <span>
          We’re sorry, the page you requested could not be found. Please go back to the homepage.
        </span>
      </div>
      <Button
        onClick={() => navigate('/')}
        variant="contained"
        sx={{
          textTransform: 'none',
          backgroundColor: '#0D50FF',
          fontWeight: 600,
          fontSize: '1.25rem',
          lineHeight: '130%',
          padding: '1rem 3.5rem',
          width: '100%',
          maxWidth: '13.6rem',
        }}>
        Go Home
      </Button>
    </div>
  );
}
export default NotFoundPage;
