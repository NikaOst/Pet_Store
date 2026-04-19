import styles from './styles.module.css';
import { styled } from '@mui/material/styles';
import { Paper, Box, Grid } from '@mui/material';
import insta from '../../assets/icons/ic-instagram.svg';
import whatsapp from '../../assets/icons/ic-whatsapp.svg';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#F1F3F4',
  ...theme.typography.body2,
  padding: '32px',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1rem',
  color: (theme.vars ?? theme).palette.text.secondary,
  height: '100%',
  boxSizing: 'border-box',
  borderRadius: '12px',
  boxShadow: 'none',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function Footer() {
  return (
    <div className={styles.footer}>
      <h2>Contact</h2>
      <div className={styles.gridContacts}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Item>
                <span>Phone</span>
                <p>+49 30 915-88492</p>
              </Item>
            </Grid>
            <Grid size={4}>
              <Item>
                <span>Socials</span>
                <div className={styles.imagesLinks}>
                  <img src={insta} alt="instaImg" />
                  <img src={whatsapp} alt="whatsappImg" />
                </div>
              </Item>
            </Grid>
            <Grid size={8}>
              <Item>
                <span>Address</span>
                <p>Wallstraẞe 9-13, 10179 Berlin, Deutschland</p>
              </Item>
            </Grid>
            <Grid size={4}>
              <Item>
                <span>Working Hours</span>
                <p>24 hours a day</p>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div className={styles.map}>
        <MapContainer center={[52.5131, 13.4161]} zoom={15} style={{ height: '100%', width: '100%', borderRadius: '12px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[52.5131, 13.4161]}>
            <Popup>Wallstraẞe 9-13, 10179 Berlin</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
export default Footer;
