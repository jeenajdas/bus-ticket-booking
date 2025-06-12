import React, { useEffect, useRef } from 'react';
import './Tickets.css';
import Filters from './Filters';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBuses } from '../../features/buses/userBusSlice';
import BusList from './BusList';
import { useSearchParams } from 'react-router-dom';
import BusLoader from '../BusLoader';
import notFoundImage from '../../assets/not-found.avif';


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

    dispatch(fetchUserBuses({ from, to, date }));
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="tickets-page">
      <div className="tickets-hero">
        <h2>Reserve your tickets</h2>
      </div>

      <div className="tickets-search container shadow-lg">
        <h5 className="text-center mb-3">Want to change route?</h5>
        <form ref={form} className="search-form row g-3" onSubmit={formAction}>
          <div className="col-md-3 col-sm-6">
            <input name="from" type="text" className="form-control" placeholder="From" defaultValue={fromParam} />
          </div>
          <div className="col-md-3 col-sm-6">
            <input name="to" type="text" className="form-control" placeholder="To" defaultValue={toParam} />
          </div>
          <div className="col-md-3 col-sm-6">
            <input name="date" type="date" min={today} className="form-control" defaultValue={dateParam} />
          </div>
          <div className="col-md-3 col-sm-6">
            <button type="submit" className="btn btn-warning w-100">Search</button>
          </div>
        </form>
      </div>

      <div className="container mt-5">
        <div className="row gx-4">
          <div className="col-md-3 mb-4">
            <Filters />
          </div>
          <div className="col-md-9">
            {status === 'loading' && <BusLoader/>}
            {status === 'failed' && <p>Error loading buses.</p>}
            {status === 'succeeded' && Object.keys(busesByDate).length === 0 && (
  <div className="text-center mt-5">
    <img
      src={notFoundImage}
      alt="No buses found"
      style={{ width: '220px', opacity: 0.8 }}
    />
    <h5 className="mt-3 text-muted">No buses found for the selected route and date.</h5>
    <p>Try changing your travel date or route and search again.</p>
  </div>
)}


{status === 'succeeded' &&
  Object.entries(busesByDate).map(([date, buses]) => (
    <div key={date} className="mb-4">
      <h5 className="mb-3 text-primary">Buses for {new Date(date).toDateString()}</h5>
      <BusList buses={buses} />
    </div>
  ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets; 
