import { Link } from "react-router";
import {
  Facebook,
  X,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Clock,
  Car,
  ChevronUp,
  Send,
  Shield,
  Award,
  Users
} from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const quickLinks = [
    { to: "/all-vehicles", label: "All Vehicles" },
    { to: "/add-vehicles", label: "Add Vehicles" },
  ];

  const services = [
    "Luxury Car Rental",
    "Airport Transfers",
    "Corporate Travel",
    "Wedding Fleets",
  ];

  const trustBadges = [
    { icon: Shield, text: "Verified Hosts" },
    { icon: Award, text: "Top Rated" },
    { icon: Users, text: "50K+ Users" },
  ];

  return (
    <>

      <footer className="relative mt-20 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white w-full">

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-10"></div>

        <div className="relative w-full px-6 py-12">


          <div className="flex flex-wrap justify-center gap-4 mb-10 pb-8 border-b border-white/10 max-w-7xl mx-auto">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
                <badge.icon className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-medium">{badge.text}</span>
              </div>
            ))}
          </div>

          <div className="max-w-[1344px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

              <div className="space-y-4">
                <Link to="/" className="flex items-center gap-2 group">
                  <div className="p-2 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      TravelEase
                    </h1>
                    <p className="text-[10px] text-cyan-300">Your Journey, Simplified</p>
                  </div>
                </Link>

                <p className="text-gray-300 text-sm leading-relaxed">
                  Premium vehicle rentals across 50+ cities with 24/7 support.
                </p>


                <div className="flex gap-2">
                  {[
                    { icon: Facebook, url: "#" },
                    { icon: X, url: "#" },
                    { icon: Instagram, url: "#" },

                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="p-2 bg-white/10 rounded-lg hover:bg-gradient-to-br hover:from-cyan-500 hover:to-purple-600 transition-all hover:scale-110 group"
                      aria-label={`Social link ${index + 1}`}
                    >
                      <social.icon size={18} className="group-hover:rotate-12 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-purple-600 rounded"></div>
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2 group text-sm"
                      >
                        <span className="w-0 h-0.5 bg-cyan-400 group-hover:w-3 transition-all"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-purple-400 to-pink-600 rounded"></div>
                  Services
                </h3>
                <ul className="space-y-2">
                  {services.map((service, index) => (
                    <li key={index} className="text-gray-300 hover:text-purple-400 transition-colors cursor-pointer flex items-center gap-2 text-sm">
                      <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>


              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-green-400 to-cyan-600 rounded"></div>
                  Get In Touch
                </h3>

                <div className="space-y-2 text-xs text-gray-300 mb-4">
                  <p className="flex items-start gap-2 hover:text-cyan-400 transition-colors">
                    <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                    Dhaka, Chittagong, Sylhet
                  </p>
                  <a href="tel:+8801779933459" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <Phone size={16} />
                    +8801779933459
                  </a>
                  <a href="mailto:support@travelease.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <Mail size={16} />
                    support@travelease.com
                  </a>
                  <p className="flex items-center gap-2 text-cyan-300 font-medium">
                    <Clock size={16} /> Available 24/7
                  </p>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full px-3 py-2 pr-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors text-xs"
                  />
                  <button
                    onClick={handleNewsletterSubmit}
                    className="absolute right-1 top-1 bottom-1 px-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-md hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                  >
                    <Send size={14} />
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Get exclusive deals</p>
              </div>
            </div>


            <div className="pt-6 border-t border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                <p className=" text-white text-md">
                  © {currentYear} <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-bold">TravelEase</span>. All rights reserved.
                </p>

                <div className="flex flex-wrap justify-center gap-4 text-xs">
                  {[
                    { to: "#", label: "Privacy" },
                    { to: "#", label: "Terms" },
                    { to: "#", label: "Refund" },
                    { to: "#", label: "Support" },
                  ].map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>


        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl shadow-2xl shadow-purple-500/50 hover:scale-110 hover:rotate-12 transition-all z-50 group ${showBackToTop ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          aria-label="Back to top"
        >
          <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </footer>
    </>
  );
};

export default Footer;