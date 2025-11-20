import React from 'react';

export default function MissionVision() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFA500] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
          <p>Deliver innovative, reliable, and sustainable electro-mechanical solutions while ensuring customer satisfaction.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
          <p>To be the leading provider of sustainable electro-mechanical solutions in the GCC region with innovation, quality, and excellence.</p>
        </div>
      </div>
    </section>
  );
}
