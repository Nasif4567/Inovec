'use client';
import React from 'react';

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/resources/about-bg.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <h1 className="text-5xl md:text-7xl mb-6">
          About NAK
        </h1>

        <p className="text-lg md:text-2xl mb-10 font-light leading-relaxed text-white/90 max-w-3xl mx-auto drop-shadow-sm">
          Your trusted partner for innovative lighting, automation, and HVAC solutions in Qatar since 2010. We craft experiences that combine innovation, reliability, and excellence.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => document.getElementById('company-story')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFA500] hover:from-[#B8860B] hover:to-[#FFD700] shadow-lg transition-all transform hover:scale-105"
          >
            Our Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
