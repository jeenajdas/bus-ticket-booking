import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/PopularRoutes.css';

import TrivandrumImg from '../assets/routes/kochi.jpg';
import ChennaiImg from '../assets/routes/chennai.jpg';
import HyderabadImg from '../assets/routes/hyd-blr.jpg';
import MumbaiImg from '../assets/routes/bangalore.jpg';

const routes = [
  {
    title: 'Trivandrum to Bangalore',
    from: 'Trivandrum',
    to: 'Bangalore',
    image: TrivandrumImg,
    description: 'Escape to the Silicon Valley of India from the southern tip.',
  },
  {
    title: 'Chennai to Bangalore',
    from: 'Chennai',
    to: 'Bangalore',
    image: ChennaiImg,
    description: 'Popular daily route between two buzzing metro cities.',
  },
  {
    title: 'Hyderabad to Bangalore',
    from: 'Hyderabad',
    to: 'Bangalore',
    image: HyderabadImg,
    description: 'Comfortable overnight journey across South India.',
  },
  {
    title: 'Mumbai to Bangalore',
    from: 'Mumbai',
    to: 'Bangalore',
    image: MumbaiImg,
    description: 'Long but scenic trip from the financial capital to the IT capital.',
  },
];

const PopularRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleCardClick = (from, to) => {
    navigate(`/tickets?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
  };

  return (
    <section className="popular-routes modern-popular py-5">
      <div className="container">
        <h2 className="section-title">Popular Routes</h2>
        <div className="row g-4">
          {routes.map((route, index) => (
            <div
              className="col-md-3 col-sm-6"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="modern-card" onClick={() => handleCardClick(route.from, route.to)}>
                <div className="modern-card-img-container">
                  <img src={route.image} alt={route.title} />
                </div>
                <div className="modern-card-body">
                  <h5>{route.title}</h5>
                  <p>{route.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
