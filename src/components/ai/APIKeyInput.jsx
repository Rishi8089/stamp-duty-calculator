import { Key } from 'lucide-react';
import Input from '../common/Input';

const APIKeyInput = ({ value, onChange, error }) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Key size={18} className="text-slate-600" />
        <h4 className="font-semibold text-slate-800">Gemini API Key</h4>
      </div>
      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
        Your key is used directly in your browser to call Google's Gemini API and is never stored on our servers.
      </p>
      <Input
        type="password"
        placeholder="Enter your Gemini API Key..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
      />
    </div>
  );
};

export default APIKeyInput;
