// src/pages/admin/Reports.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalCollection, fetchBusCollections } from "../../features/reports/reportSlice";

const Reports = () => {
  const dispatch = useDispatch();
  const { totalCollection, busCollections } = useSelector((state) => state.reports);

  useEffect(() => {
    dispatch(fetchTotalCollection());
    dispatch(fetchBusCollections());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Reports</h2>

      {/* Total Collection by Date */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          Total Collection by Date
        </div>
        <div className="card-body">
          {totalCollection.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Total Collection (₹)</th>
                </tr>
              </thead>
              <tbody>
                {totalCollection.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>

      {/* Collection by Bus */}
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white">
          Collection by Bus
        </div>
        <div className="card-body">
          {busCollections.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Bus Name</th>
                  <th>Collection (₹)</th>
                </tr>
              </thead>
              <tbody>
                {busCollections.map((bus, index) => (
                  <tr key={index}>
                    <td>{bus.busName}</td>
                    <td>{bus.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
