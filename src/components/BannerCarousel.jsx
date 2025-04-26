import { Carousel } from 'react-bootstrap';
import casa2 from '../assets/photo_house2.jpg'; // Asegúrate que esté en /src/assets

const BannerCarousel = () => {
  return (
    <Carousel fade className="shadow-lg rounded overflow-hidden">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={casa2}
          alt="Apartamento en Valledupar"
          style={{ height: '420px', objectFit: 'cover' }} // 📐 Ajuste visual
        />
        <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded">
          <h3>Casa en venta Valledupar</h3>
          <p>2 habitaciones, 2 baños, balcón panorámico, cocina y zona social con piscina.</p>
          <p className="text-warning fw-gris">Contacta +57 3133581644</p>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default BannerCarousel;
