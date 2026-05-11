import { INSTR_GROUPS } from '../../data/stampData';

const InstrumentSelector = ({ value, onChange, error }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">Document Type</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className={`input-field ${error ? 'border-error' : ''}`}
      >
        <option value="">-- Select Document Type --</option>
        {INSTR_GROUPS.map((group, i) => (
          <optgroup key={i} label={group.label}>
            {group.options.map(inst => (
              <option key={inst.id} value={inst.id}>{inst.name}</option>
            ))}
          </optgroup>
        ))}
      </select>
      {error && <span className="text-xs text-error mt-1">{error}</span>}
    </div>
  );
};

export default InstrumentSelector;
