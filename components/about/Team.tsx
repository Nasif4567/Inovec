import React from 'react';

const team = [
  { name: 'Ahmed Khalifa', role: 'Managing Director', initials: 'AK' },
  { name: 'Sarah Al-Mansouri', role: 'Technical Director', initials: 'SM' },
  { name: 'Fahad Al-Hajri', role: 'Operations Manager', initials: 'FH' },
  { name: 'Laila Al-Ansari', role: 'Sales Director', initials: 'LA' },
  { name: 'Rashid Al-Kuwari', role: 'Quality Manager', initials: 'RK' },
  { name: 'Mariam Al-Ali', role: 'Customer Success Manager', initials: 'MA' },
];

export default function Team() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-600">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map(member => (
            <div key={member.name} className="bg-white text-black rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-yellow-500">
                  {member.initials}
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-yellow-600 font-medium mb-2">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
