import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import TrivandrumImg from "../assets/routes/kochi.jpg";
import ChennaiImg from "../assets/routes/chennai.jpg";
import HyderabadImg from "../assets/routes/hyd-blr.jpg";
import MumbaiImg from "../assets/routes/bangalore.jpg";

const routes = [
  {
    title: "Trivandrum to Bangalore",
    from: "Trivandrum",
    to: "Bangalore",
    image: TrivandrumImg,
    description:
      "Escape to the Silicon Valley of India from the southern tip.",
  },
  {
    title: "Chennai to Bangalore",
    from: "Chennai",
    to: "Bangalore",
    image: ChennaiImg,
    description:
      "Popular daily route between two buzzing metro cities.",
  },
  {
    title: "Hyderabad to Bangalore",
    from: "Hyderabad",
    to: "Bangalore",
    image: HyderabadImg,
    description:
      "Comfortable overnight journey across South India.",
  },
  {
    title: "Mumbai to Bangalore",
    from: "Mumbai",
    to: "Bangalore",
    image: MumbaiImg,
    description:
      "Long but scenic trip from the financial capital to the IT capital.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const PopularRoutes = () => {
  const navigate = useNavigate();

  const handleCardClick = (from, to) => {
    navigate(
      `/tickets?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
    );
  };

  return (
    <section className="relative bg-white py-32 overflow-hidden">

      {/* Theme Background */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 z-10">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">
            Popular <span className="text-primary italic">Routes</span>
          </h2>
          <div className="w-20 h-2 bg-accent mt-6 rounded-full" />
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 sm:grid-cols-2 gap-8"
        >
          {routes.map((route, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -15 }}
              className="relative h-[520px] rounded-[48px] overflow-hidden cursor-pointer group shadow-2xl shadow-primary/5"
              onClick={() => handleCardClick(route.from, route.to)}
            >
              {/* Image */}
              <motion.img
                src={route.image}
                alt={route.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
              />

              {/* Cinematic Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 p-10 text-white transition-all duration-500 group-hover:-translate-y-4">
                <h5 className="text-2xl font-black uppercase italic tracking-tighter mb-4 leading-none">
                  {route.title}
                </h5>
                <p className="text-white/60 mb-8 text-xs font-bold uppercase tracking-widest leading-relaxed">
                  {route.description}
                </p>

                <button
                  className="px-8 py-4 bg-accent text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] 
                             opacity-0 translate-y-6 group-hover:opacity-100 
                             group-hover:translate-y-0 transition-all duration-400 
                             hover:bg-accent-dark shadow-xl shadow-accent/20 flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(route.from, route.to);
                  }}
                >
                  Book Now <span>→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularRoutes;
