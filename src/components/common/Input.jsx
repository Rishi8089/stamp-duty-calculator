import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
      <input ref={ref} className={`input-field ${error ? 'border-error' : ''}`} {...props} />
      {error && <span className="text-xs text-error mt-1">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
