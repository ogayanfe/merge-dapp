import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalInputProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  title: string;
  label: string;
  placeholder?: string;
}

export const ModalInput = ({ isOpen, onClose, onSubmit, title, label, placeholder }: ModalInputProps) => {
  const [value, setValue] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(value);
    setValue(""); // Reset after submit
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="bg-base-100 w-full max-w-2xl rounded-2xl border border-base-300 p-8 shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-black uppercase text-primary tracking-tight">{title}</h3>
            <p className="text-xs font-mono uppercase tracking-widest opacity-60 mt-1">{label}</p>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle hover:bg-base-200 transition-colors">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <textarea
          className="textarea textarea-bordered w-full h-64 font-mono text-sm focus:outline-none focus:border-primary bg-base-200/50 mb-8 p-4 leading-relaxed custom-scrollbar resize-none"
          placeholder={placeholder || "Type here..."}
          value={value}
          onChange={e => setValue(e.target.value)}
          autoFocus
        ></textarea>

        <div className="flex justify-end gap-3 mt-auto">
          <button onClick={onClose} className="btn btn-ghost font-black uppercase text-sm">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!value.trim()}
            className="btn btn-primary font-black uppercase text-sm px-8 shadow-brand-glow"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
