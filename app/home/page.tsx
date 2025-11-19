"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroImage from "../../public/resources/hero-bg.jpg";
import { Typewriter } from "react-simple-typewriter";

const HomePage: React.FC = () => {
  return (
    <div  className="w-full overflow-hidden">
      {/* Cart Dropdown 
      <div id="cart-dropdown" className="cart-dropdown absolute top-full right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-display text-lg font-semibold">Shopping Cart</h3>
          <button id="close-cart" className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <div id="cart-items" className="space-y-3 max-h-64 overflow-y-auto"></div>
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total: </span>
            <span id="cart-total" className="font-bold bronze-gradient">$0.00</span>
          </div>
          <button className="w-full btn-bronze text-white py-2 px-4 rounded-lg font-medium">Checkout</button>
        </div>
      </div> */}

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
           <h1 className="text-white text-6xl font-bold text-center">
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
            <button className="btn-bronze text-white px-8 py-4 rounded-lg font-semibold text-lg">
              Explore Products
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-800 transition-all duration-300">
              Get Quote
            </button>
          </div>
        </motion.div>
      </section>

      {/* Statistics 
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[500, 15, 2000].map((num, i) => (
              <motion.div
                key={i}
                className="stats-item"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <div className="text-5xl font-bold bronze-gradient">{num}+</div>
                <p className="text-gray-600 text-lg font-medium">
                  {i === 0 ? "Happy Clients" : i === 1 ? "International Partners" : "Projects Completed"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Featured Products */}
      <section data-header-theme="light" className="py-20 bg-gradient-to-r from-[#EFEFEF] via-[#F9F9F9] to-[#E5E5E5] animate-gradient-shimmer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#8A8A8A] via-[#B0B0B0] to-[#C0D6E4] bg-clip-text text-transparent mb-4 animate-gradient-shimmer">
  Best-in-Class Products
</h2>
            <p className="text-xl max-w-2xl mx-auto bg-gradient-to-r from-[#A8A8A8] via-[#C0C0C0] to-[#D0E2F0] bg-clip-text text-transparent animate-gradient-shimmer">
  Illuminate your operations and optimize performance with our top-tier 
  industrial lighting, advanced HVAC controls, and cutting-edge automation solutions. 
  Explore our premium selection designed for efficiency, reliability, and innovation.
</p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[16, 17, 18, 19].map((id, i) => (
              <motion.div
                key={i}
                className="card-hover bg-white rounded-lg shadow-lg overflow-hidden h-96"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
              >
                <Image
  src={`/resources/product-${id}.jpg`}
  alt={`Product ${id}`}
  width={500}
  height={300}
  className="w-full h-48 object-cover"
/>
                <div className="p-6">
  <h3 className="font-display text-xl font-semibold mb-2 bg-gradient-to-r from-[#2C2C2C] via-[#4B4B4B] to-[#6B6B6B] bg-clip-text text-transparent animate-gradient-shimmer">
    Product {id}
  </h3>
  <p className="mb-4 bg-gradient-to-r from-[#3A3A3A] via-[#5A5A5A] to-[#7A7A7A] bg-clip-text text-transparent animate-gradient-shimmer">
    High-quality premium engineered solution
  </p>
  <div className="flex justify-between items-center">
    <span className="text-xl font-bold bg-gradient-to-r from-[#2C2C2C] via-[#4B4B4B] to-[#6B6B6B] bg-clip-text text-transparent animate-gradient-shimmer">
      {id * 10} QAR
    </span>
    <button className="px-0 py-2 border-b-1 border-gray-700 bg-transparent font-medium text-gray-800 hover:border-gray-900 hover:text-gray-900 transition-all duration-300">
    Add to Cart
    </button>


  </div>
</div>


              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4B4B4B] via-[#6B6B6B] to-[#8C8C8C] bg-clip-text text-transparent mb-4 animate-gradient-shimmer">
        Our Partners
      </h2>
      <p className="text-xl text-gray-800 max-w-2xl mx-auto">
        Trusted by leading international brands in lighting and automation industry
      </p>
    </div>

    {/* Partner Logos */}
      <div className="scroll-container">
        {["SIEMENS", "TRIDONIC", "ONTEC", "RYDAIR", "ENOV", "SIEMENS", "TRIDONIC", "ONTEC", "RYDAIR", "ENOV"].map((name, i) => (
          <div
            key={i}
            className="flex justify-center items-center w-40 h-20 rounded-lg shadow-lg bg-white/70 hover:bg-white/90 transition-all duration-300 mr-8"
          >
            <span className="text-gray-900 font-bold text-lg">{name}</span>
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
          className="font-display text-5xl md:text-6xl font-extrabold mb-6 text-shadow-lg tracking-wide"
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
          <button className="bg-white text-gray-800 px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
            Request Consultation
          </button>
          <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-800 hover:scale-105 transition-all duration-300 shadow-lg">
            Browse Catalog
          </button>
        </motion.div>
      </div>
    </section>
    </div>
  );
};

export default HomePage;
