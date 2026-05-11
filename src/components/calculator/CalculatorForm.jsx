import { useState } from 'react';
import StateSelector from './StateSelector';
import InstrumentSelector from './InstrumentSelector';
import Input from '../common/Input';
import Button from '../common/Button';
import { CFG } from '../../data/stampData';
import { Calculator } from 'lucide-react';

const CalculatorForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    state: '',
    instrument: '',
    gender: 'male',
    ptype: 'residential',
    leasePeriodType: 'months',
    leasemonths: '',
    partnew: 'new',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const handleReset = () => {
    setFormData({ 
      state: '', instrument: '', gender: 'male', ptype: 'residential', 
      leasePeriodType: 'months', leasemonths: '', partnew: 'new' 
    });
    setErrors({});
    onCalculate(null);
  };

  const cat = formData.instrument;
  const cfg = cat && CFG[cat] ? CFG[cat] : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <StateSelector 
        value={formData.state} 
        onChange={(val) => handleChange('state', val)} 
        error={errors.state} 
      />
      
      <InstrumentSelector 
        value={formData.instrument} 
        onChange={(val) => handleChange('instrument', val)} 
        error={errors.instrument} 
      />
      
      {cfg && cfg.hint && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-800">
          {cfg.hint}
        </div>
      )}

      {cfg && (
        <div className="space-y-4">
          <div className="border-t border-slate-100 pt-4 font-semibold text-xs uppercase tracking-wider text-slate-500">
            Details
          </div>
          
          {cfg.G !== 0 && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Party / Executant</label>
              <select className="input-field" value={formData.gender} onChange={(e) => handleChange('gender', e.target.value)}>
                <option value="male">Individual (Male)</option>
                <option value="female">Individual (Female)</option>
                <option value="joint">Joint (Male + Female)</option>
                <option value="joint_f">Joint (Female + Female)</option>
                <option value="company">Company / LLP / Trust / HUF</option>
              </select>
            </div>
          )}

          {cfg.PT && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Property / Asset Type</label>
              <select className="input-field" value={formData.ptype} onChange={(e) => handleChange('ptype', e.target.value)}>
                <optgroup label="Immovable Property">
                  <option value="residential">Residential (Flat / House / Plot)</option>
                  <option value="commercial">Commercial (Shop / Office / Godown)</option>
                  <option value="agricultural">Agricultural Land</option>
                  <option value="industrial">Industrial / Factory</option>
                  <option value="na_plot">NA Plot / Layout</option>
                </optgroup>
                <optgroup label="Movable / Financial Assets">
                  <option value="shares">Shares / Equity</option>
                  <option value="debentures">Debentures / Bonds</option>
                  <option value="mf_units">Mutual Fund Units</option>
                  <option value="options_deriv">Options / Derivatives</option>
                  <option value="vehicle">Vehicle / Machinery</option>
                  <option value="ip">Intellectual Property</option>
                </optgroup>
                <optgroup label="Business Interest">
                  <option value="business">Business / Going Concern</option>
                  <option value="goodwill">Goodwill</option>
                  <option value="partnership_share">Partnership Share</option>
                </optgroup>
              </select>
            </div>
          )}

          {cfg.PV && (
            <Input label={cfg.plab || "Value (₹)"} type="number" placeholder="e.g. 5000000"
              value={formData.pval || ''} onChange={(e) => handleChange('pval', e.target.value)} />
          )}

          {cfg.CV && (
            <Input label="Govt. Circle Rate (₹)" type="number" placeholder="If higher than market value"
              value={formData.circle || ''} onChange={(e) => handleChange('circle', e.target.value)} />
          )}

          {cfg.LN && (
            <Input label="Loan / Mortgage Amount (₹)" type="number" placeholder="e.g. 3500000"
              value={formData.loan || ''} onChange={(e) => handleChange('loan', e.target.value)} />
          )}

          {cfg.MP && (
            <Input label="Security Property Value (₹)" type="number" placeholder="e.g. 5000000"
              value={formData.mortprop || ''} onChange={(e) => handleChange('mortprop', e.target.value)} />
          )}

          {cfg.AD && (
            <Input label="Advance / Premium / Security Deposit (₹)" type="number" placeholder="e.g. 100000"
              value={formData.advance || ''} onChange={(e) => handleChange('advance', e.target.value)} />
          )}

          {cfg.YR && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Period Type</label>
              <select className="input-field" value={formData.leasePeriodType} onChange={(e) => handleChange('leasePeriodType', e.target.value)}>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          )}

          {cfg.YR && (
            <Input label={formData.leasePeriodType === 'months' ? "No. of Months" : "No. of Years"} type="number" placeholder={formData.leasePeriodType === 'months' ? "e.g. 11" : "e.g. 3"}
              value={formData.leasemonths || ''} onChange={(e) => handleChange('leasemonths', e.target.value)} />
          )}

          {cfg.RN && (
            <Input label={formData.leasePeriodType === 'months' ? "Monthly Rent (₹)" : "Annual Rent (₹)"} type="number" placeholder="e.g. 20000"
              value={formData.rent || ''} onChange={(e) => handleChange('rent', e.target.value)} />
          )}

          {cfg.PX && (
            <Input label="Total Property Value (₹)" type="number" placeholder="e.g. 10000000"
              value={formData.partval || ''} onChange={(e) => handleChange('partval', e.target.value)} />
          )}

          {cfg.NS && (
            <Input label="No. of Co-owners" type="number" placeholder="e.g. 3"
              value={formData.nshares || ''} onChange={(e) => handleChange('nshares', e.target.value)} />
          )}

          {cfg.PA && (
            <Input label="Transaction / Property Value (₹)" type="number" placeholder="e.g. 5000000"
              value={formData.poaval || ''} onChange={(e) => handleChange('poaval', e.target.value)} />
          )}

          {cfg.PC && (
            <Input label="Total Capital Contribution (₹)" type="number" placeholder="e.g. 500000"
              value={formData.partcap || ''} onChange={(e) => handleChange('partcap', e.target.value)} />
          )}

          {cfg.PN && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Deed Type</label>
              <select className="input-field" value={formData.partnew} onChange={(e) => handleChange('partnew', e.target.value)}>
                <option value="new">New Deed</option>
                <option value="amendment">Amendment / Supplementary</option>
                <option value="dissolution">Dissolution Deed</option>
              </select>
            </div>
          )}

          {cfg.SV && (
            <Input label={cfg.slab || "Consideration / Market Value (₹)"} type="number" placeholder="e.g. 1000000"
              value={formData.shareval || ''} onChange={(e) => handleChange('shareval', e.target.value)} />
          )}

          {cfg.SF && (
            <Input label="Face Value (₹)" type="number" placeholder="e.g. 100000"
              value={formData.sharefv || ''} onChange={(e) => handleChange('sharefv', e.target.value)} />
          )}

          {cfg.DB && (
            <Input label="Debenture / Bond Value (₹)" type="number" placeholder="e.g. 5000000"
              value={formData.debval || ''} onChange={(e) => handleChange('debval', e.target.value)} />
          )}

          {cfg.PR && (
            <Input label={cfg.prlab || "Note / Bill Amount (₹)"} type="number" placeholder="e.g. 200000"
              value={formData.pronote || ''} onChange={(e) => handleChange('pronote', e.target.value)} />
          )}

          {cfg.US && (
            <Input label="Usance Period (months)" type="number" placeholder="e.g. 3"
              value={formData.usance || ''} onChange={(e) => handleChange('usance', e.target.value)} />
          )}

          {cfg.LA && (
            <Input label={cfg.lalab || "Loan / Agreement Amount (₹)"} type="number" placeholder="e.g. 2000000"
              value={formData.loanamt || ''} onChange={(e) => handleChange('loanamt', e.target.value)} />
          )}

          {cfg.AC && (
            <Input label="Authorised Share Capital (₹)" type="number" placeholder="e.g. 1000000"
              value={formData.autcap || ''} onChange={(e) => handleChange('autcap', e.target.value)} />
          )}
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <Button type="submit" className="flex-1">
          <Calculator size={18} />
          Calculate
        </Button>
        <Button type="button" variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default CalculatorForm;
