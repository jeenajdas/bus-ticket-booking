import React from "react";

const BusForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (name, value) => {
    setFormData({ ...formData, [name]: value.split(",") });
  };

  const inputClasses =
    "w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-700 placeholder:text-slate-300 text-sm focus:ring-4 focus:ring-accent/20 outline-none transition-all";
  const labelClasses =
    "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block";
  const groupClasses = "space-y-2";

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.3em] border-b border-gray-100 pb-4">
          Basic Manifest
        </h3>

        <div className={groupClasses}>
          <label className={labelClasses}>Asset Designation (Bus Name)</label>
          <input
            type="text"
            name="busName"
            value={formData.busName}
            onChange={handleChange}
            placeholder="e.g. Skyline Express Gold"
            className={inputClasses}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={groupClasses}>
            <label className={labelClasses}>Operational Class</label>
            <input
              type="text"
              name="busType"
              value={formData.busType}
              onChange={handleChange}
              placeholder="e.g. AC Sleeper / Scania"
              className={inputClasses}
              required
            />
          </div>
          <div className={groupClasses}>
            <label className={labelClasses}>Seating Strategy</label>
            <input
              type="text"
              name="seatType"
              value={formData.seatType}
              onChange={handleChange}
              placeholder="e.g. 2+1 Luxury"
              className={inputClasses}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={groupClasses}>
            <label className={labelClasses}>Tariff Rate (₹)</label>
            <input
              type="number"
              name="fare"
              value={formData.fare}
              onChange={handleChange}
              placeholder="2500"
              className={inputClasses}
              required
            />
          </div>
          <div className={groupClasses}>
            <label className={labelClasses}>Asset Capacity</label>
            <input
              type="number"
              name="availableSeats"
              value={formData.availableSeats}
              onChange={handleChange}
              placeholder="36"
              className={inputClasses}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.3em] border-b border-gray-100 pb-4">
          Deployment Vectors
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={groupClasses}>
            <label className={labelClasses}>Origin Station</label>
            <input
              type="text"
              name="startLocation"
              value={formData.startLocation}
              onChange={handleChange}
              placeholder="Source Terminal"
              className={inputClasses}
              required
            />
          </div>
          <div className={groupClasses}>
            <label className={labelClasses}>Destination Terminal</label>
            <input
              type="text"
              name="endLocation"
              value={formData.endLocation}
              onChange={handleChange}
              placeholder="Target Destination"
              className={inputClasses}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={groupClasses}>
            <label className={labelClasses}>Scheduled Departure</label>
            <input
              type="datetime-local"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleChange}
              className={`${inputClasses} uppercase text-[10px]`}
            />
          </div>
          <div className={groupClasses}>
            <label className={labelClasses}>Estimated Arrival</label>
            <input
              type="datetime-local"
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleChange}
              className={`${inputClasses} uppercase text-[10px]`}
            />
          </div>
        </div>

        <div className={groupClasses}>
          <label className={labelClasses}>Boarding Checkpoints (CSV)</label>
          <input
            type="text"
            name="boardingPoints"
            value={formData.boardingPoints.join(",")}
            onChange={(e) =>
              handleArrayChange("boardingPoints", e.target.value)
            }
            placeholder="Station A, Terminal B, Gate 4"
            className={inputClasses}
          />
        </div>

        <div className={groupClasses}>
          <label className={labelClasses}>Drop-off Zones (CSV)</label>
          <input
            type="text"
            name="droppingPoints"
            value={formData.droppingPoints.join(",")}
            onChange={(e) =>
              handleArrayChange("droppingPoints", e.target.value)
            }
            placeholder="Interchange C, Plaza D"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.3em] border-b border-gray-100 pb-4">
          Persistence Protocol
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={groupClasses}>
            <label className={labelClasses}>Start Cycle</label>
            <input
              type="date"
              name="recurringStartDate"
              value={formData.recurringStartDate || ""}
              onChange={handleChange}
              className={`${inputClasses} uppercase text-[10px]`}
            />
          </div>
          <div className={groupClasses}>
            <label className={labelClasses}>Retirement Date</label>
            <input
              type="date"
              name="recurringEndDate"
              value={formData.recurringEndDate || ""}
              onChange={handleChange}
              className={`${inputClasses} uppercase text-[10px]`}
            />
          </div>
          <div className={groupClasses}>
            <label className={labelClasses}>Cycle Frequency</label>
            <select
              name="frequency"
              value={formData.frequency || ""}
              onChange={handleChange}
              className={`${inputClasses} uppercase text-[10px] appearance-none cursor-pointer`}
            >
              <option value="">Manual Deployment</option>
              <option value="ONE_TIME">One Time Pulse</option>
              <option value="DAILY">Daily Systematic</option>
              <option value="WEEKENDS">Vanguard (Weekends)</option>
              <option value="MONDAY_FRIDAY">Industrial (Mon-Fri)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusForm;
