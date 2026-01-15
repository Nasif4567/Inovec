import React from 'react';

export default function MissionVision() {
  return (
    <section id="mission-vision" className="py-24 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a8cc] opacity-10 blur-[120px] rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1a3a5f] opacity-20 blur-[120px] rounded-full -ml-48 -mb-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 hover:border-[#00a8cc]/50 transition-all duration-500 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#00a8cc] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,168,204,0.4)]">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight">Our Mission</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To empower industries by delivering high-precision engineering solutions that merge 2026 innovation with sustainable practices, ensuring our clients stay ahead in an ever-evolving technical landscape.
            </p>
          </div>

          {/* Vision Card */}
          <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 hover:border-[#00a8cc]/50 transition-all duration-500 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#1a3a5f] rounded-lg flex items-center justify-center border border-[#00a8cc]/30 shadow-[0_0_20px_rgba(26,58,95,0.4)]">
                <svg className="w-6 h-6 text-[#00a8cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight">Our Vision</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To be the premier engineering partner in the GCC, recognized for setting the benchmark in technical excellence, reliability, and the successful execution of complex industrial projects.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}