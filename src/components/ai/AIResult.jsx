import { FileText, MapPin, DollarSign, Users, Scale, AlertTriangle, Lightbulb } from 'lucide-react';

const AIResult = ({ result }) => {
  if (!result) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="ai-insight-card">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Lightbulb className="text-indigo-600" />
          AI Document Analysis
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-start gap-3">
            <FileText className="text-blue-500 mt-1" size={20} />
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Document Type</p>
              <p className="font-medium text-slate-900">{result.documentType || 'Not identified'}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-start gap-3">
            <MapPin className="text-emerald-500 mt-1" size={20} />
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">State</p>
              <p className="font-medium text-slate-900">{result.state || 'Not identified'}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-start gap-3 md:col-span-2">
            <DollarSign className="text-amber-500 mt-1" size={20} />
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Property / Transaction Value</p>
              <p className="font-medium text-slate-900 text-lg">
                {result.propertyValue ? `₹${result.propertyValue.toLocaleString('en-IN')}` : 'Not clearly mentioned'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-3 border-b border-indigo-100 pb-2">
              <Users size={18} className="text-indigo-500" />
              Parties Involved
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              {result.parties || 'Could not extract parties information.'}
            </p>
          </div>

          <div>
            <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-3 border-b border-indigo-100 pb-2">
              <Scale size={18} className="text-indigo-500" />
              Key Legal Clauses
            </h4>
            <ul className="text-sm text-slate-600 space-y-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              {result.clauses && result.clauses.length > 0 ? (
                result.clauses.map((clause, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{clause}</span>
                  </li>
                ))
              ) : (
                <li>No significant clauses identified.</li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-3 border-b border-indigo-100 pb-2">
              <FileText size={18} className="text-indigo-500" />
              Stamp Duty Estimate
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-sm">
              {result.stampDutyEstimate || 'Could not generate estimate based on text.'}
            </p>
          </div>

          <div>
            <h4 className="flex items-center gap-2 font-semibold text-slate-800 mb-3 border-b border-indigo-100 pb-2">
              <AlertTriangle size={18} className="text-amber-500" />
              Recommendations
            </h4>
            <ul className="text-sm text-slate-600 space-y-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              {result.recommendations && result.recommendations.length > 0 ? (
                result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))
              ) : (
                <li>No specific recommendations.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResult;
