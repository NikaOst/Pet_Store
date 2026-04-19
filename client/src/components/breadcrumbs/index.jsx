import styles from './styles.module.css';
import { Breadcrumbs, Link, Typography } from '@mui/material';

function BreadcrumbsComponent({ path }) {
  return (
    <div className={styles.breadcrumbsContainer}>
      <Breadcrumbs
        separator={<div className={styles.dividerLine} />}
        aria-label="breadcrumb"
        sx={{ '& .MuiBreadcrumbs-separator': { margin: 0 } }}>
        <Link underline="hover" color="inherit" href="/">
          <span>Main page</span>
        </Link>
        {path.map((p, indx) => {
          {
            if (path.length !== indx + 1) {
              return (
                <Link underline="hover" color="inherit" href={p.path}>
                  <span>{p.name}</span>
                </Link>
              );
            } else {
              return (
                <Typography sx={{ color: 'text.primary' }}>
                  <span>{p.name}</span>
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
