import { useState } from 'react';
import { ChevronDown, ChevronUp, Map } from 'lucide-react';
import { STATE_RATES_REF } from '../../data/stateRatesRef';

const StateRatesTable = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-200 transition-colors">
            <Map size={20} />
          </div>
          <span className="font-bold text-slate-800">📋 View State-wise Reference Rates (Conveyance)</span>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
      </button>

      {isOpen && (
        <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden shadow-sm animate-in slide-in-from-top-4 duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 font-bold text-slate-700 uppercase tracking-wider text-[10px]">State</th>
                  <th className="px-4 py-3 font-bold text-slate-700 uppercase tracking-wider text-[10px]">Male Base (%)</th>
                  <th className="px-4 py-3 font-bold text-slate-700 uppercase tracking-wider text-[10px]">Female Base (%)</th>
                  <th className="px-4 py-3 font-bold text-slate-700 uppercase tracking-wider text-[10px]">Registration</th>
                  <th className="px-4 py-3 font-bold text-slate-700 uppercase tracking-wider text-[10px]">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {STATE_RATES_REF.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors text-[11px]">
                    <td className="px-4 py-3 font-bold text-slate-800">{item.state}</td>
                    <td className="px-4 py-3 text-slate-600 font-semibold">{item.male}</td>
                    <td className="px-4 py-3 text-slate-600 font-semibold">{item.female}</td>
                    <td className="px-4 py-3 text-slate-600 font-semibold">{item.reg}</td>
                    <td className="px-4 py-3 text-slate-500 italic">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 p-3 text-[10px] text-slate-500 italic border-t border-slate-200 text-center">
            * Rates apply to general conveyance. Actual effective rates may vary due to local surcharges.
          </div>
        </div>
      )}
    </div>
  );
};

export default StateRatesTable;
