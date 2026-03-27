import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-primary overflow-hidden border-t border-white/5">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="pt-20 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand & About */}
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-black tracking-tighter text-white no-underline flex items-center group">
              <span className="bg-accent text-slate-900 w-8 h-8 rounded-lg flex items-center justify-center mr-2 text-xl group-hover:rotate-12 transition-transform italic">E</span>
              Easy<span className="text-accent">Trip</span>
            </Link>
            <p className="text-white/60 leading-relaxed text-sm font-medium">
              Revolutionizing bus travel across India. We provide a seamless, secure, and premium booking experience for your every journey.
            </p>
            <div className="flex gap-4 pt-2">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white hover:bg-accent hover:text-slate-900 transition-all duration-300 border border-white/10"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h6 className="text-white text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2">
              <div className="w-4 h-1 bg-accent rounded-full" />
              Quick Links
            </h6>
            <ul className="space-y-4">
              {['Home', 'Search Buses', 'My Bookings', 'Offers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-accent transition-colors text-sm font-bold no-underline flex items-center group">
                    <div className="w-0 group-hover:w-2 h-px bg-accent mr-0 group-hover:mr-2 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h6 className="text-white text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2">
              <div className="w-4 h-1 bg-accent rounded-full" />
              Resources
            </h6>
            <ul className="space-y-4">
              {['FAQs', 'Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-accent transition-colors text-sm font-bold no-underline flex items-center group">
                    <div className="w-0 group-hover:w-2 h-px bg-accent mr-0 group-hover:mr-2 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="space-y-8">
            <div>
              <h6 className="text-white text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2">
                <div className="w-4 h-1 bg-accent rounded-full" />
                Contact Us
              </h6>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-slate-900 transition-all border border-white/10">
                    <MapPin size={16} />
                  </div>
                  <span className="text-white/60 text-sm font-medium">New Delhi, India</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-slate-900 transition-all border border-white/10">
                    <Phone size={16} />
                  </div>
                  <span className="text-white/60 text-sm font-medium">+91 1800 123 4567</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-tighter text-white/30">
          <p>© 2026 EasyTrip PVT LTD. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Compliance</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;