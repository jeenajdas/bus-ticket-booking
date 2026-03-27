import React, { useEffect, useRef } from 'react';
import Filters from './Filters';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBuses } from '../../features/buses/userBusSlice';
import BusList from './BusList';
import { useSearchParams } from 'react-router-dom';
import BusLoader from '../BusLoader';
import notFoundImage from '../../assets/not-found.avif';
import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaLocationArrow, FaCalendarAlt } from 'react-icons/fa';

const Tickets = () => {
  const form = useRef(null);
  const dispatch = useDispatch();
  const { busesByDate, status } = useSelector(state => state.userBuses);
  const [searchParams] = useSearchParams();

  const fromParam = searchParams.get('from') || '';
  const toParam = searchParams.get('to') || '';
  const dateParam = searchParams.get('date') || '';

  useEffect(() => {
    if (fromParam && toParam && dateParam) {
      dispatch(fetchUserBuses({ from: fromParam, to: toParam, date: dateParam }));
    }
  }, [dispatch, fromParam, toParam, dateParam]);

  const formAction = (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const from = formData.get('from');
    const to = formData.get('to');
    const date = formData.get('date');

    if (!from || !to) {
      alert('Please enter both from and to locations.');
      return;
    }

    const formattedDate = date ? new Date(date).toISOString().split('T')[0] : undefined;
    dispatch(fetchUserBuses({ from, to, date: formattedDate }));
  };

  const today = new Date().toISOString().split('T')[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-primary pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-20 -mb-20" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic mb-4">
            Reserve Your <span className="text-accent underline decoration-accent/30 underline-offset-8">Tickets</span>
          </h1>
          <p className="text-white/60 font-bold max-w-xl mx-auto uppercase tracking-widest text-sm">Find the best routes across the country with premium comfort.</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        {/* Search Bar Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-3xl border border-white p-2 rounded-[32px] shadow-2xl shadow-primary/10 flex flex-col lg:flex-row items-stretch gap-2"
        >
          <form ref={form} onSubmit={formAction} className="flex flex-col lg:flex-row items-stretch gap-2 w-full">
            <div className="relative flex-1 bg-gray-50/50 rounded-3xl p-4 flex items-center gap-4 border-2 border-transparent focus-within:border-accent transition-all">
              <FaMapMarkerAlt className="text-primary/40" />
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">From</p>
                <input name="from" type="text" placeholder="Source" defaultValue={fromParam} className="outline-none w-full text-base font-black text-slate-900 bg-transparent placeholder:text-gray-300" />
              </div>
            </div>

            <div className="relative flex-1 bg-gray-50/50 rounded-3xl p-4 flex items-center gap-4 border-2 border-transparent focus-within:border-accent transition-all">
              <FaLocationArrow className="text-primary/40" />
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">To</p>
                <input name="to" type="text" placeholder="Destination" defaultValue={toParam} className="outline-none w-full text-base font-black text-slate-900 bg-transparent placeholder:text-gray-300" />
              </div>
            </div>

            <div className="relative flex-1 bg-gray-50/50 rounded-3xl p-4 flex items-center gap-4 border-2 border-transparent focus-within:border-accent transition-all">
              <FaCalendarAlt className="text-primary/40" />
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Travel Date</p>
                <input name="date" type="date" min={today} defaultValue={dateParam} className="outline-none w-full text-base font-black text-slate-900 bg-transparent cursor-pointer" />
              </div>
            </div>

            <button type="submit" className="bg-accent hover:bg-accent-dark text-slate-900 font-black uppercase tracking-widest px-10 py-6 lg:py-4 rounded-3xl transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-3 active:scale-95 group">
              <FaSearch className="group-hover:scale-110 transition-transform" />
              <span>Update Search</span>
            </button>
          </form>
        </motion.div>

        {/* Main Content Grid */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 h-fit sticky top-24"
          >
            <Filters />
          </motion.div>

          {/* Bus List Area */}
          <div className="lg:col-span-9">
            {status === 'loading' && (
              <div className="grid gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse bg-white rounded-3xl h-48 border border-gray-100" />
                ))}
              </div>
            )}

            {status === 'failed' && (
              <div className="bg-red-50 p-8 rounded-3xl border border-red-100 text-center">
                <p className="text-red-500 font-black uppercase tracking-widest text-sm">Error loading available buses</p>
                <button onClick={() => window.location.reload()} className="mt-4 text-xs font-black uppercase text-red-500 underline underline-offset-4">Retry Now</button>
              </div>
            )}

            {status === 'succeeded' && Object.keys(busesByDate).length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-20 rounded-[48px] border-2 border-dashed border-gray-100 text-center flex flex-col items-center"
              >
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center">
                    <img src={notFoundImage} alt="No buses found" className="w-24 grayscale opacity-40 mix-blend-multiply" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full border-4 border-white flex items-center justify-center text-xs font-black italic">?</div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase italic">No Buses Found</h3>
                <p className="mt-4 text-gray-400 font-bold max-w-sm mx-auto">We couldn't find any buses for this route and date. Try adjusting your preferences.</p>
              </motion.div>
            )}

            {status === 'succeeded' && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-12"
              >
                {Object.entries(busesByDate).map(([date, buses]) => (
                  <div key={date}>
                    <div className="flex items-center gap-4 mb-8">
                      <h2 className="text-2xl font-black text-slate-900 uppercase italic whitespace-nowrap">
                        {new Date(date).toDateString()}
                      </h2>
                      <div className="h-px w-full bg-gray-100" />
                      <div className="bg-primary px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                        {buses.length} {buses.length === 1 ? 'Bus' : 'Buses'} Available
                      </div>
                    </div>
                    <BusList buses={buses} date={date} />
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
