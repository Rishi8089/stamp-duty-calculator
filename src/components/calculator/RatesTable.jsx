import { STATES } from '../../data/stampData';
import Card from '../common/Card';

const RatesTable = () => {
  return (
    <Card className="mt-8 overflow-x-auto">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Current Reference Rates</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="py-3 px-4 font-semibold text-slate-700">State</th>
            <th className="py-3 px-4 font-semibold text-slate-700">Male Base (%)</th>
            <th className="py-3 px-4 font-semibold text-slate-700">Female Base (%)</th>
            <th className="py-3 px-4 font-semibold text-slate-700">Registration</th>
            <th className="py-3 px-4 font-semibold text-slate-700">Notes</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(STATES).map(([id, state]) => {
            const mr = state.useSlab ? 'Slab' : (state.base.male != null ? state.base.male + '%' : '—');
            const fr = state.useSlab ? 'Slab' : (state.base.female != null ? state.base.female + '%' : '—');
            return (
              <tr key={id} className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="py-3 px-4 font-medium text-slate-900">{state.name}</td>
                <td className="py-3 px-4 text-slate-600">{mr}</td>
                <td className="py-3 px-4 text-slate-600 text-green-600 font-medium">{fr}</td>
                <td className="py-3 px-4 text-slate-600">
                  {state.reg}% {state.regCap ? `(Cap: ₹${state.regCap})` : ''}
                </td>
                <td className="py-3 px-4 text-xs text-slate-500">
                  {state.concession}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-xs text-slate-400 mt-4">* Rates apply to general conveyance. Actual effective rates may vary due to local surcharges.</p>
    </Card>
  );
};

export default RatesTable;
