import React, { useEffect } from 'react';
import '../styles/PopularRoutes.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import KochiImg from '../assets/routes/kochi.jpg';
import BangaloreImg from '../assets/routes/bangalore.jpg';
import ChennaiImg from '../assets/routes/chennai.jpg';

const routes = [
  {
    title: 'Kochi to Trivandrum',
    image: KochiImg,
    description: 'Fast and scenic coastal ride from Kochi to the capital city.',
  },
  {
    title: 'Calicut to Bangalore',
    image: BangaloreImg,
    description: 'Comfortable overnight journeys to the tech hub of India.',
  },
  {
    title: 'Alappuzha to Chennai',
    image: ChennaiImg,
    description: 'Travel in comfort from the backwaters to the metro.',
  },
];

const PopularRoutes = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="popular-routes py-5">
      <div className="container">
        <h2>Popular Bus Routes</h2>
        <div className="row">
          {routes.map((route, index) => (
            <div
              className="col-md-4 mb-4"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <div className="card route-card h-100">
                <img src={route.image} className="card-img-top" alt={route.title} />
                <div className="card-body">
                  <h5 className="card-title">{route.title}</h5>
                  <p className="card-text">{route.description}</p>
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
