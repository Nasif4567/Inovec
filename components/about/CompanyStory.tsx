'use client';
const CompanyStory = () => {
  return (
    <section id="company-story" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFA500]">
            Innovation Forward
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            INOVEC Trading Qatar was established in 2010 with a vision to become the leading provider of advanced lighting, automation, HVAC controls, and air filtration solutions in Qatar.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Over the years, we have successfully executed over 2000 projects across various sectors including commercial, residential, industrial, and infrastructure developments. Our partnerships with 15+ international brands ensure cutting-edge technology and superior quality.
          </p>
          <div className="flex gap-4">
            <button onClick={() => window.location.href='/products'} className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#CD7F32] to-[#B8860B] hover:from-[#B8860B] hover:to-[#FFD700] transition-all">
              Our Products
            </button>
            <button onClick={() => window.location.href='/contact'} className="border-2 border-gray-300 px-6 py-3 rounded-lg font-semibold text-gray-700 hover:border-yellow-500 hover:text-yellow-600 transition-all">
              Get in Touch
            </button>
          </div>
        </div>
        <div className="relative">
          <img src="/resources/about-bg.jpg" alt="INOVEC Team" className="rounded-lg shadow-xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;
