import { STATES } from '../../data/stampData';

const StateSelector = ({ value, onChange, error }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">Select State</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className={`input-field ${error ? 'border-error' : ''}`}
      >
        <option value="">-- Select a State --</option>
        {Object.entries(STATES).map(([id, state]) => (
          <option key={id} value={id}>{state.name}</option>
        ))}
      </select>
      {error && <span className="text-xs text-error mt-1">{error}</span>}
    </div>
  );
};

export default StateSelector;
