"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroImage from "../../public/resources/hero-bg.jpg";
import { Typewriter } from "react-simple-typewriter";
import ProductCard from "@/components/common/ProductCard";
import Link from "next/link";

const HomePage: React.FC = () => {
  
  const products = [
  { 
    id: 16, 
    name: "ENOV EV-EM1-DP-5W-3H, LED Emergency Battery kit, 3 Hours battery", 
    description: "Industrial-grade emergency backup solution providing 3 hours of continuous illumination during power failures. Features a high-capacity battery and rapid-switch technology to ensure safety in commercial and residential spaces.", 
    price: 160, 
    imageUrl: "/resources/enov.jpg" 
  },
  { 
    id: 17, 
    name: "LEDVANCE LED PANEL 600x600, 42W, 4000LM, 6500K COOL DALYLIGHT", 
    description: "High-performance 600x600 recessed panel offering 4000 Lumens of crisp 6500K daylight. Rated IP40 with a 30,000-hour lifespan and 3-year warranty, making it ideal for offices, hospitals, and modern retail environments.", 
    price: 170, 
    imageUrl: "/resources/fff.jpg" 
  },
  { 
    id: 18, 
    name: "ORO LED Panel Light, 20W, 3000K, 90 lm/w", 
    description: "Energy-efficient warm white (3000K) panel light with a high luminous efficacy of 90 lm/W. Perfect for creating a comfortable atmosphere in residential interiors while significantly reducing energy consumption.", 
    price: 180, 
    imageUrl: "/resources/lef.jpg" 
  }
];

// Professional Brand Data
  const brands = [
    { name: "SIEMENS", color: "text-[#009999]" },
    { name: "TRIDONIC", color: "text-[#E30613]" },
    { name: "ONTEC", color: "text-[#005793]" },
    { name: "RYDAIR", color: "text-[#231F20]" },
    { name: "ENOV", color: "text-[#E6332A]" },
  ];
  
  return (
    <div  className="w-full overflow-hidden">
      {/* Hero Section */}
      <section data-header-theme="dark" className="relative min-h-screen flex items-center justify-center  overflow-hidden">
          {/* Background Image */}
  <Image
    src={HeroImage}   // ← your local image inside /public/images
    alt="Hero Background"
    fill
    priority
    className="object-cover"
  />
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
        >
           <h1 className="text-white text-6xl text-center">
        <Typewriter
          words={["Innovating Tomorrow", "Lighting the Future", "Smart Automation"]}
          loop={0}        // 0 = infinite
          cursor
          cursorStyle="|"
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h1>
          <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed">
            Your dedicated partner for Lighting, Automation, HVAC, Controls, and Air Filtration solutions in Qatar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/product">
    <button className="btn-bronze cursor-pointer text-white px-8 py-4 rounded-lg font-semibold text-lg w-full sm:w-auto">
      Explore Products
    </button>
  </Link>

  {/* Link to a Quote/Contact page */}
  <Link href="/contact">
    <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-800 transition-all duration-300 w-full sm:w-auto">
      Get Quote
    </button>
  </Link>
          </div>
        </motion.div>
      </section>
     

      {/* Featured Products */}
      <section data-header-theme="light" className="py-20 bg-gradient-to-r from-[#EFEFEF] via-[#F9F9F9] to-[#E5E5E5] animate-gradient-shimmer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl bg-gradient-to-r from-[#4A4A4A] via-[#636363] to-[#4A6070] bg-clip-text text-transparent mb-4 animate-gradient-shimmer">
  Best-in-Class Products
</h2>
            <p className="text-xl max-w-2xl mx-auto bg-gradient-to-r from-[#4A4A4A] via-[#636363] to-[#4A6070] bg-clip-text text-transparent animate-gradient-shimmer">
  Illuminate your operations and optimize performance with our top-tier 
  industrial lighting, advanced HVAC controls, and cutting-edge automation solutions. 
  Explore our premium selection designed for efficiency, reliability, and innovation.
</p>
</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
              <ProductCard
                key={prod.id}
                id={prod.id}
                name={prod.name}
                description={prod.description}
                price={prod.price}
                imageUrl={prod.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="font-display text-4xl md:text-5xl bg-gradient-to-r from-[#4B4B4B] via-[#6B6B6B] to-[#8C8C8C] bg-clip-text text-transparent mb-4 animate-gradient-shimmer">
        Our Partners
      </h2>
      <p className="text-xl text-gray-800 max-w-2xl mx-auto">
        Trusted by leading international brands in lighting and automation industry
      </p>
    </div>

    {/* Partner Logos */}
      <div className="scroll-container">
        {[...brands, ...brands, ...brands].map((brand, i) => (
              <div
                key={i}
                className="flex items-center justify-center min-w-[200px] h-24 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className={`font-black text-xl tracking-tighter ${brand.color}`}>
                  {brand.name}
                </span>
              </div>
            ))}
      </div>
  </div>
</section>
     

     {/*CTA*/}
     <section className="relative py-24 bg-gradient-to-r from-[#5a3f37] via-[#8c6239] to-[#c89142] overflow-hidden animate-gradient-shimmer">
      {/* Decorative floating circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-yellow-400/20 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-pulse-slow"></div>

      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 text-white">
        <motion.h2
          className="font-display text-5xl md:text-6xl mb-6 text-shadow-lg tracking-wide"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Ready to Start Your Project?
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Get in touch with our experts for customized lighting, HVAC, and automation solutions tailored to your needs. Let's build something extraordinary together.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link href="/contact">
          <button className="bg-white text-gray-800 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
            Request Consultation
          </button>
          </Link>
          <Link href="/product">
          <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-800 hover:scale-105 transition-all duration-300 shadow-lg">
            Browse Catalog
          </button>
           </Link>
        </motion.div>
      </div>
    </section>
    </div>
  );
};

export default HomePage;
