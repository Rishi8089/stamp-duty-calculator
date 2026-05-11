import { formatCurrency } from '../../utils/formatCurrency';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { EXPERT } from '../../data/stampData';

const ResultPanel = ({ result }) => {
  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
        <AlertCircle size={48} className="mb-4 text-indigo-100" />
        <p>Fill out the form and calculate to see the estimated stamp duty.</p>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 text-error">
        <AlertCircle size={48} className="mb-4 text-red-100" />
        <p className="font-semibold">{result.error}</p>
      </div>
    );
  }

  const { state, lines, total, pvalOut, cat, eff } = result;
  const exp = EXPERT[cat];

  return (
    <div className="flex flex-col h-full overflow-y-auto pr-2">
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle2 className="text-success" size={28} />
        <h3 className="text-2xl font-bold text-slate-800">Calculation Estimate</h3>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-6">
        <div className="text-sm font-medium text-slate-500 mb-1">State / UT</div>
        <div className="text-xl font-bold text-slate-800 mb-4">{state.name}</div>
        
        {pvalOut > 0 && (
          <>
            <div className="text-sm font-medium text-slate-500 mb-1">Base / Transaction Value</div>
            <div className="text-3xl font-bold text-slate-900">{formatCurrency(pvalOut)}</div>
            {eff && <div className="text-sm text-slate-500 mt-1">Effective Rate: {eff.toFixed(2)}%</div>}
          </>
        )}
      </div>

      <div className="space-y-3 mb-8">
        {lines.map((l, i) => (
          <div key={i} className="flex justify-between items-start py-3 border-b border-slate-100 last:border-0">
            <div>
              <span className="block text-slate-800 font-medium">{l.n}</span>
              <span className="block text-xs text-slate-500 mt-0.5">{l.r} {l.note ? `· ${l.note}` : ''}</span>
            </div>
            <span className="font-semibold text-right whitespace-nowrap pl-4">{formatCurrency(l.v)}</span>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-200">
        <div className="text-sm font-semibold text-indigo-600 mb-1">Total Payable Estimate</div>
        <div className="text-4xl font-bold text-indigo-700 mb-4">{formatCurrency(total)}</div>
      </div>

      {exp && (
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 flex items-center gap-2">
            <span>⚖️</span> Expert Opinion
          </div>
          <div className="text-xs text-blue-900 space-y-2" dangerouslySetInnerHTML={{ __html: exp }} />
        </div>
      )}

      {state.notes && (
        <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-amber-900">
          <strong>{state.act}</strong><br/>
          {state.notes}
        </div>
      )}
    </div>
  );
};

export default ResultPanel;
