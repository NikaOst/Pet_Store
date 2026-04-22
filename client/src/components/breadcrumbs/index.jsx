import styles from './styles.module.css';
import { Breadcrumbs, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

function BreadcrumbsComponent({ path }) {
  return (
    <div className={styles.breadcrumbsContainer}>
      <Breadcrumbs
        separator={<div className={styles.dividerLine} />}
        aria-label="breadcrumb"
        sx={{ '& .MuiBreadcrumbs-separator': { margin: 0 } }}>
        <NavLink className={styles.breadcrumbLink} to={'/'}>
          <span>Main page</span>
        </NavLink>
        {path.map((p, indx) => {
          {
            if (path.length !== indx + 1) {
              return (
                <NavLink key={indx} className={styles.breadcrumbLink} to={`${p.path}`}>
                  <span>{p.name}</span>
                </NavLink>
              );
            } else {
              return (
                <Typography key={indx} sx={{ color: 'text.primary' }}>
                  <span style={{ color: 'black' }}>{p.name}</span>
                </Typography>
              );
            }
          }
        })}
      </Breadcrumbs>
    </div>
  );
}
export default BreadcrumbsComponent;
