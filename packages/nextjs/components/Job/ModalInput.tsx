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
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-base-100 w-full h-full sm:h-auto sm:max-w-3xl sm:rounded-xl border-t sm:border border-base-300 p-8 shadow-2xl relative animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 btn btn-ghost btn-sm btn-circle hover:bg-base-200 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h3 className="text-2xl font-black uppercase text-primary mb-2">{title}</h3>
        <p className="text-sm opacity-60 font-mono mb-8 uppercase tracking-wider">{label}</p>

        <textarea
          className="textarea textarea-bordered w-full flex-1 sm:h-128 font-mono text-sm focus:outline-none focus:border-primary bg-base-200/50 mb-8 p-4 leading-relaxed custom-scrollbar"
          placeholder={placeholder || "Type here..."}
          rows={10}
          value={value}
          onChange={e => setValue(e.target.value)}
        ></textarea>

        <div className="flex justify-end gap-4 mt-auto sm:mt-0">
          <button onClick={onClose} className="btn btn-ghost font-black uppercase text-sm">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary font-black uppercase text-sm px-8 shadow-brand-glow"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
