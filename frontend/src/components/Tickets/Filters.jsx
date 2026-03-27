import React from 'react';

const Filters = () => {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-xl shadow-primary/5">
      <h5 className="text-xl font-black text-slate-900 uppercase italic mb-8 flex items-center gap-3">
        <div className="w-2 h-6 bg-accent rounded-full" />
        Filters
      </h5>

      {/* Departure Time Filter */}
      <div className="mb-10">
        <h6 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Departure Time</h6>
        <div className="space-y-4">
          {[
            { id: 'morning', label: 'Morning', time: '5am - 12pm' },
            { id: 'afternoon', label: 'Afternoon', time: '12pm - 5pm' },
            { id: 'evening', label: 'Evening', time: '5pm - 9pm' },
            { id: 'night', label: 'Night', time: '9pm - 5am' },
          ].map((item) => (
            <label key={item.id} className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                <input type="checkbox" id={item.id} className="w-5 h-5 rounded-lg border-2 border-gray-100 text-accent focus:ring-accent transition-all cursor-pointer" />
                <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">{item.label}</span>
              </div>
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">{item.time}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-gray-50 mb-10" />

      {/* Bus Type Filter */}
      <div className="mb-10">
        <h6 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Bus Category</h6>
        <div className="grid grid-cols-2 gap-3">
          {['AC', 'Non-AC', 'Sleeper', 'Seater'].map((type) => (
            <label key={type} className="relative flex items-center justify-center py-3 rounded-2xl border-2 border-gray-50 cursor-pointer group hover:border-accent transition-all">
              <input type="checkbox" id={type.toLowerCase()} className="sr-only peer" />
              <div className="peer-checked:bg-accent/10 peer-checked:text-slate-900 absolute inset-0 rounded-2xl transition-all" />
              <span className="relative text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-slate-900 transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-gray-50 mb-10" />

      {/* Price Range Filter */}
      <div>
        <h6 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Max Price (₹)</h6>
        <input type="range" className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent" min="100" max="2000" />
        <div className="flex justify-between mt-3">
          <span className="text-[10px] font-black text-gray-300">₹100</span>
          <span className="text-[10px] font-black text-gray-300">₹2000</span>
        </div>
      </div>
    </div>
  );
};

export default Filters;
