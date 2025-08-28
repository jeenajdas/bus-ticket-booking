import React, { useEffect, useState } from "react";

const BusFormModal = ({ id="busFormModal", initial, onSave }) => {
  const [form, setForm] = useState({ route:"", busType:"AC", seatType:"Seater", fare:0, status:"ACTIVE" });
  useEffect(()=>{ if(initial) setForm(initial); },[initial]);

  const change = (e)=> setForm(f=>({ ...f, [e.target.name]: e.target.value }));
  const submit = ()=> onSave(form);

  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog"><div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{initial ? "Edit Bus" : "Add Bus"}</h5>
          <button className="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div className="modal-body">
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label">Route</label>
              <input className="form-control" name="route" value={form.route} onChange={change} placeholder="Mumbai → Pune" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Bus Type</label>
              <select className="form-select" name="busType" value={form.busType} onChange={change}>
                <option>AC</option><option>Non-AC</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Seat Type</label>
              <select className="form-select" name="seatType" value={form.seatType} onChange={change}>
                <option>Seater</option><option>Sleeper</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Fare</label>
              <input type="number" className="form-control" name="fare" value={form.fare} onChange={change}/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Status</label>
              <select className="form-select" name="status" value={form.status} onChange={change}>
                <option value="ACTIVE">ACTIVE</option>
                <option value="DISABLED">DISABLED</option>
              </select>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-light" data-bs-dismiss="modal">Close</button>
          <button className="btn btn-primary" data-bs-dismiss="modal" onClick={submit}>Save</button>
        </div>
      </div></div>
    </div>
  );
};

export default BusFormModal;
