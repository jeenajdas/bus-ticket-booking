import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaBus, FaSave } from "react-icons/fa";
import BusForm from "./BusForm";

const BusFormModal = ({ show, onHide, formData, setFormData, onSave }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onHide}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-4xl rounded-[40px] shadow-3xl relative z-10 overflow-hidden border border-white/20"
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col h-full max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-accent shadow-lg shadow-primary/20 rotate-6">
                    <FaBus size={18} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                      {formData.id ? "Modify Asset" : "Register Asset"}
                    </h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                      Deployment Protocol{" "}
                      {formData.id ? `#${formData.id}` : "Initiation"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onHide}
                  className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center text-slate-400 transition-colors"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                <BusForm formData={formData} setFormData={setFormData} />
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-gray-100 flex justify-end gap-4 bg-gray-50/50">
                <button
                  type="button"
                  onClick={onHide}
                  className="px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Terminate Protocol
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-primary text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 flex items-center gap-3 hover:bg-slate-900 transition-all"
                >
                  <FaSave size={12} className="text-accent" />
                  {formData.id ? "Confirm Modification" : "Deploy Asset"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BusFormModal;
