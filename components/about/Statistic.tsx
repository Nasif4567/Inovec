'use client';
import { useEffect } from 'react';

const stats = [
  { label: 'Happy Clients', value: 500 },
  { label: 'Projects Completed', value: 2000 },
  { label: 'International Partners', value: 15 },
  { label: 'Years of Excellence', value: 14 },
];

export default function Statistics() {
  useEffect(() => {
    const counters = document.querySelectorAll('.stats-counter');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target')!;
      let current = 0;
      const increment = target / 100;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toString();
          clearInterval(interval);
        } else {
          counter.textContent = Math.floor(current).toString();
        }
      }, 20);
    });
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-12 text-yellow-400">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-yellow-500 stats-counter" data-target={stat.value}>0</div>
              <p className="mt-2 text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
