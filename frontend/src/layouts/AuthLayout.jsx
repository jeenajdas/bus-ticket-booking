import React from "react";
import { motion } from "framer-motion";
import { FaBus } from "react-icons/fa";

const AuthLayout = ({
  title,
  highlight,
  subtitle,
  image,
  overlayColor = "bg-primary/80",
  height = "620px",
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -mr-96 -mt-96" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl -ml-64 -mb-64" />

      <div
        className="w-full max-w-6xl bg-white rounded-[48px] shadow-2xl overflow-hidden grid md:grid-cols-2 relative z-10"
        style={{ minHeight: height }}
      >
        {/* LEFT SIDE - BRANDING */}
        <div
          className="relative hidden md:flex items-center justify-center text-white p-16 overflow-hidden"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className={`absolute inset-0 ${overlayColor} backdrop-blur-[2px]`} />

          <div className="relative z-10 max-w-md space-y-10">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary rotate-12 shadow-xl">
                <FaBus size={18} />
              </div>
              <span className="text-2xl font-black italic uppercase tracking-tighter">EasyTrip <span className="text-accent underline underline-offset-4">Premium</span></span>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-black leading-none uppercase italic tracking-tighter">
                {title}{" "}
                {highlight && (
                  <span className="text-accent block mt-2 underline underline-offset-8">{highlight}</span>
                )}
              </h2>
              <p className="mt-8 text-white/70 text-sm font-bold uppercase tracking-widest leading-relaxed">
                {subtitle}
              </p>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE - CONTENT */}
        <div className="flex items-center justify-center p-12 lg:p-20 bg-white relative">
          <div className="w-full max-w-sm relative z-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
