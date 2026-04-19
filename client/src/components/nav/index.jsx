import styles from './styles.module.css';
import logo from '../../assets/icons/logo.svg';
import cartImg from '../../assets/icons/basket=empty.svg';
import { NavLink } from 'react-router-dom';
import { Badge } from '@mui/material';

function Navbar() {
  return (
    <nav className={styles.nav}>
      <img src={logo} alt="logo" />
      <ul>
        <li>
          <NavLink
            to={'/'}
            className={({ isActive }) => (isActive ? styles.activeLink : styles.inactiveLink)}>
            <span>Main Page</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/categories'}
            className={({ isActive }) => (isActive ? styles.activeLink : styles.inactiveLink)}>
            <span>Categories</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/products'}
            className={({ isActive }) => (isActive ? styles.activeLink : styles.inactiveLink)}>
            <span>All products</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/discounts'}
            className={({ isActive }) => (isActive ? styles.activeLink : styles.inactiveLink)}>
            <span>All sales</span>
          </NavLink>
        </li>
      </ul>
      <Badge
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        badgeContent={5}
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: '#0D50FF',
            color: 'white',
            transform: 'translate(0, 30%)',
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            fontSize: '12px',
          },
        }}>
        <img src={cartImg} alt="cart" />
      </Badge>
    </nav>
  );
}
export default Navbar;
