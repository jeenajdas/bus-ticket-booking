import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaBan, FaBus, FaMoneyBillWave, FaPlus } from "react-icons/fa";
import { fetchBuses, createBus, editBus, removeBus, toggleBusStatus } from "../../features/buses/busAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import BusFormModal from "../../components/admin/BusFormModal";
import "../../styles/admin/ManageBuses.css";
import { Button } from "react-bootstrap";

const ManageBuses = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCount, setActiveCount] = useState(0);
  const [disabledCount, setDisabledCount] = useState(0);

  // Modal & Form
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    busName: "",
    busType: "",
    seatType: "",
    fare: "",
    isActive: true,
    startLocation: "",
    endLocation: "",
    startDateTime: "",
    endDateTime: "",
    availableSeats: "",
    boardingPoints: [],
    droppingPoints: [],
    startDate: "",
    endDate: "",
    frequency: "",
  });

  // Load buses from API
  const loadBuses = async () => {
    setLoading(true);
    try {
      const data = await fetchBuses();
      setBuses(data);
    } catch (err) {
      console.error("Error fetching buses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBuses();
  }, []);

  useEffect(() => {
    setActiveCount(buses.filter((b) => b.isActive).length);
    setDisabledCount(buses.filter((b) => !b.isActive).length);
  }, [buses]);

  // Open modal for add or edit
  const openModal = (bus = null) => {
    if (bus) {
      setFormData({
        ...bus,
        boardingPoints: bus.boardingPoints || [],
        droppingPoints: bus.droppingPoints || [],
      });
    } else {
      setFormData({
        busName: "",
        busType: "",
        seatType: "",
        fare: "",
        isActive: true,
        startLocation: "",
        endLocation: "",
        startDateTime: "",
        endDateTime: "",
        availableSeats: "",
        boardingPoints: [],
        droppingPoints: [],
        startDate: "",
        endDate: "",
        frequency: "",
      });
    }
    setModalOpen(true);
  };

  // Handle save from modal
  const handleSave = async (data) => {
    try {
      if (data.id) {
        await editBus({ id: data.id, updatedData: data });
      } else {
        await createBus(data);
      }
      setModalOpen(false);
      await loadBuses();
    } catch (err) {
      console.error("Error saving bus:", err);
      alert("Failed to save bus. Check console for details.");
    }
  };

  const handleDelete = async (bus) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      try {
        await removeBus(bus.id);
        setBuses(buses.filter((b) => b.id !== bus.id));
      } catch (err) {
        console.error("Error deleting bus:", err);
        alert("Failed to delete bus. Check console for details.");
      }
    }
  };

  const handleToggleStatus = async (bus) => {
    try {
      await toggleBusStatus(bus.id);
      await loadBuses();
    } catch (error) {
      console.error("Error toggling bus status:", error);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Buses</h2>
        <Button variant="primary" onClick={() => openModal()}>
          <FaPlus className="me-1" /> Add Bus
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-2">
          <div className="stat-card blue d-flex align-items-center p-3 rounded shadow-sm text-white">
            <FaBus size={28} className="me-2" />
            <div>
              <h3>{buses.length}</h3>
              <p>Total Buses</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <div className="stat-card green d-flex align-items-center p-3 rounded shadow-sm text-white">
            <FaCheck size={28} className="me-2" />
            <div>
              <h3>{activeCount}</h3>
              <p>Active</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <div className="stat-card red d-flex align-items-center p-3 rounded shadow-sm text-white">
            <FaBan size={28} className="me-2" />
            <div>
              <h3>{disabledCount}</h3>
              <p>Disabled</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <div className="stat-card purple d-flex align-items-center p-3 rounded shadow-sm text-white">
            <FaMoneyBillWave size={28} className="me-2" />
            <div>
              <h3>
                ₹
                {buses.length
                  ? (buses.reduce((sum, b) => sum + (b.fare || 0), 0) / buses.length).toFixed(0)
                  : 0}
              </h3>
              <p>Avg Fare</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        {loading ? (
          <p>Loading buses...</p>
        ) : (
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Bus Name</th>
                <th>Type</th>
                <th>Seats</th>
                <th>Fare</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus, index) => (
                <tr key={bus.id}>
                  <td>{index + 1}</td>
                  <td>{bus.busName}</td>
                  <td>{bus.busType || "N/A"}</td>
                  <td>{bus.seatType || "N/A"}</td>
                  <td>₹{bus.fare}</td>
                  <td>
                    <span className={`badge ${bus.isActive ? "bg-success" : "bg-secondary"}`}>
                      {bus.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button variant="outline-primary" size="sm" onClick={() => openModal(bus)}>
                        <FaEdit />
                      </Button>
                      <Button
                        type="button"
                        variant={bus.isActive ? "outline-warning" : "outline-success"}
                        size="sm"
                        onClick={() => handleToggleStatus(bus)}
                      >
                        {bus.isActive ? <FaBan /> : <FaCheck />}
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(bus)}>
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Bus Form Modal */}
      <BusFormModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
      />
    </div>
  );
};

export default ManageBuses;
