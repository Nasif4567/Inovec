'use client';

const timelineData = [
  { year: '2010', title: 'Company Foundation', description: 'Started with 5 employees and 3 international brand partnerships.' },
  { year: '2013', title: 'Expansion & Growth', description: 'Expanded product portfolio to HVAC & automation. 500+ projects.' },
  { year: '2016', title: 'Market Leadership', description: 'Led in emergency lighting & HVAC controls. 30 employees.' },
  { year: '2019', title: 'Innovation Excellence', description: 'Launched IoT solutions. ISO certifications. 1500+ projects.' },
  { year: '2024', title: 'Future Forward', description: 'Serving 500+ clients with 15+ partners and 2000+ projects completed.' },
];

const Timeline = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="font-display text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFA500] mb-4">
          Our Journey
        </h2>
        <p className="text-xl text-black max-w-2xl mx-auto">
          From humble beginnings to Qatar's leading provider of electro-mechanical solutions
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-3 top-0 bottom-0 w-1 bg-gray-300"></div>

        {timelineData.map((item, index) => (
          <div key={item.year} className="relative pl-10 mb-10">
            {/* Dot */}
            <div className="absolute left-0 top-1 w-6 h-6 bg-[#CD7F32] rounded-full border-2 border-white shadow-lg"></div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:-translate-y-2 transition-transform">
              <div className="flex items-center mb-4">
                <span className="text-2xl text-black mr-4">
                  {item.year}
                </span>
                <h3 className="font-display text-xl text-black">{item.title}</h3>
              </div>
              <p className="text-black">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
