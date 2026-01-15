'use client';
import React from 'react';
import Logo from '../ui/Logo/logo';

const CompanyStory = () => {
  return (
    <section id="company-story" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          {/* Updated gradient to match your new logo colors */}
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#1a3a5f] to-[#00a8cc]">
            Engineering the Future
          </h2>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed font-medium">
            Launched in 2026, <span className="text-[#1a3a5f] font-bold">Naseem Al Kawther Trading W.L.L</span> was founded to redefine the landscape of industrial and commercial engineering in the region.
          </p>

          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            We specialize in delivering high-precision engineering solutions, ranging from advanced mechanical components to integrated industrial systems. Our mission is to bridge the gap between complex technical challenges and sustainable, efficient results for our partners.
          </p>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed italic border-l-4 border-[#00a8cc] pl-4">
            Even as a new force in the market, our team brings decades of combined expertise to every project, ensuring that "Naseem Al Kawther" is synonymous with reliability and technical excellence.
          </p>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => window.location.href='/solutions'} 
              className="px-8 py-3 rounded-lg font-bold text-white bg-[#1a3a5f] hover:bg-[#00a8cc] transform hover:-translate-y-1 transition-all shadow-lg"
            >
              Explore Solutions
            </button>
            <button 
              onClick={() => window.location.href='/contact'} 
              className="border-2 border-[#1a3a5f] px-8 py-3 rounded-lg font-bold text-[#1a3a5f] hover:bg-gray-50 transition-all"
            >
              Partner With Us
            </button>
          </div>
        </div>

        <div className="relative group">
          {/* Decorative background element to match the logo 'swoosh' */}
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-cyan-100 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
          
          <div className="relative overflow-hidden rounded-2xl">
            <Logo/>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;