import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { INSTR_REF } from '../../data/instrumentRef';

const DutyReferenceTable = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-200 transition-colors">
            <BookOpen size={20} />
          </div>
          <span className="font-bold text-slate-800">📋 View Instrument-wise Duty Reference (All Acts)</span>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
      </button>

      {isOpen && (
        <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden shadow-sm animate-in slide-in-from-top-4 duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 font-bold text-slate-700 uppercase tracking-wider text-[10px]">Instrument</th>
                  <th className="px-4 py-3 font-bold text-slate-700 uppercase tracking-wider text-[10px]">Governing Act / Article</th>
                  <th className="px-4 py-3 font-bold text-slate-700 uppercase tracking-wider text-[10px]">Rate</th>
                  <th className="px-4 py-3 font-bold text-slate-700 uppercase tracking-wider text-[10px]">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {INSTR_REF.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-800">{item.title}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">{item.acts}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-100 text-[11px] font-bold font-mono">
                        {item.rate}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-[11px] leading-relaxed italic">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DutyReferenceTable;
