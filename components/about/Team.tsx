import React from 'react';

const team = [
  { name: 'Ahmed Khalifa', role: 'Managing Director', initials: 'AK' },
  { name: 'Sarah Al-Mansouri', role: 'Technical Director', initials: 'SM' },
  { name: 'Fahad Al-Hajri', role: 'Operations Manager', initials: 'FH' },
  { name: 'Laila Al-Ansari', role: 'Commercial Director', initials: 'LA' },
  { name: 'Rashid Al-Kuwari', role: 'Chief Engineer', initials: 'RK' },
  { name: 'Mariam Al-Ali', role: 'Project Coordinator', initials: 'MA' },
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#1a3a5f] mb-4">
            Expert Leadership
          </h2>
          <div className="w-24 h-1.5 bg-[#00a8cc] mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            Our multi-disciplinary team combines global engineering standards with local market expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((member) => (
            <div 
              key={member.name} 
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden"
            >
              {/* Avatar Header with Brand Colors */}
              <div className="h-48 bg-[#1a3a5f] relative flex items-center justify-center overflow-hidden">
                {/* Decorative SVG Pattern */}
                <svg className="absolute inset-0 opacity-10 w-full h-full" fill="currentColor">
                   <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                     <circle cx="2" cy="2" r="1"></circle>
                   </pattern>
                   <rect width="100%" height="100%" fill="url(#pattern)"></rect>
                </svg>
                
                {/* Initial Circle */}
                <div className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-3xl font-black text-white group-hover:scale-110 transition-transform duration-300">
                  {member.initials}
                </div>
                
                {/* Bottom Cyan Accent */}
                <div className="absolute bottom-0 w-full h-1 bg-[#00a8cc] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>

              {/* Member Details */}
              <div className="p-8 text-center">
                <h3 className="text-xl font-extrabold text-[#1a3a5f] group-hover:text-[#00a8cc] transition-colors">
                  {member.name}
                </h3>
                <p className="text-[#00a8cc] text-sm font-bold uppercase tracking-widest mt-1">
                  {member.role}
                </p>
                
                <div className="mt-6 pt-6 border-t border-slate-50 flex justify-center gap-4">
                  {/* Placeholder for Social Icons or Contact */}
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#1a3a5f] hover:text-white transition-all cursor-pointer">
                    in
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#1a3a5f] hover:text-white transition-all cursor-pointer">
                    ✉
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}