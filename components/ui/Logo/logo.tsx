import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center bg-transparent p-2 font-sans select-none">
      {/* Scaled down Logo Icon Section */}
      <div className="relative w-12 h-10 mr-3">
        <svg
          viewBox="0 0 100 80"
          className="absolute inset-0 w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Swoosh 1 (Primary Blue) */}
          <path
            d="M5 65 Q 50 80 95 45"
            stroke="#1a3a5f"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Swoosh 2 (Accent Cyan) */}
          <path
            d="M10 50 Q 45 60 85 35"
            stroke="#00a8cc"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Flower/Star Icon */}
          <text
            x="8"
            y="35"
            fill="#00a8cc"
            fontSize="32"
            fontWeight="bold"
          >
            ✦
          </text>
        </svg>
      </div>

      {/* Logo Text Section - Reduced sizing */}
      <div className="flex flex-col justify-center border-l border-slate-200 pl-3">
        <h1 className="m-0 text-[0.9rem] font-black tracking-tight text-[#1a3a5f] leading-none uppercase">
          Naseem Al Kawther
        </h1>
        <p className="m-0 text-[0.6rem] font-bold text-[#00a8cc] tracking-[0.2em] leading-tight uppercase">
          Trading W.L.L
        </p>
        <h1 
          className="m-0 text-[1.05rem] font-bold text-[#1a3a5f] leading-none mt-1" 
          dir="rtl"
        >
          نسيم الكوثر للتجارة
        </h1>
      </div>
    </div>
  );
};

export default Logo;