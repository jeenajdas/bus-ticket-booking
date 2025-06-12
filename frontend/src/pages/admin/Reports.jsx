import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReports } from '../features/report/reportSlice';

const Reports = () => {
  const dispatch = useDispatch();
  const { reportData } = useSelector(state => state.report);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2>Reports</h2>
      <h4>Total Collection by Date</h4>
      <ul>
        {reportData.totalByDate.map(r => (
          <li key={r.date}>{r.date}: ₹{r.total}</li>
        ))}
      </ul>

      <h4>Collection of Each Bus by Date</h4>
      <ul>
        {reportData.busWise.map(r => (
          <li key={r.busId}>{r.busName} on {r.date}: ₹{r.total}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
