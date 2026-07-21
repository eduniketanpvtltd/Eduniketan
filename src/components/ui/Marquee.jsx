'use client';

import React from 'react';
import Image from 'next/image';

const partners = [
  { name: 'Lovely Professional University (LPU)', badge: 'PEP Partner', text: 'LPU Punjab' },
  { name: 'Pyramid College of Business & Technology', badge: 'MoU Partner', text: 'PCBT Phagwara' },
  { name: 'West Bengal Engineering Institutions', badge: 'Campus Network', text: 'WB Network' },
  { name: 'National Institute Network', badge: 'Placement Partner', text: 'NIT & Tier-1/2' },
  { name: 'Apex Institute of Technology', badge: 'Technical Training', text: 'Apex Tech' },
  { name: 'Global Tech Academy', badge: 'Skill Partner', text: 'Global Tech' },
];

export function Marquee() {
  const list = [...partners, ...partners];

  return (
    <div className="w-full overflow-hidden py-4 bg-slate-900/5 border-y border-slate-200/60 relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
      
      <div className="animate-marquee flex items-center gap-8 px-4">
        {list.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs whitespace-nowrap hover:border-blue-300 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-800 flex items-center justify-center font-bold text-xs">
              {item.text.slice(0, 2)}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">{item.name}</div>
              <div className="text-[10px] text-teal-600 font-medium">{item.badge}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
