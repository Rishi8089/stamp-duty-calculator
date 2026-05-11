import { useState } from 'react';
import Card from '../components/common/Card';
import CalculatorForm from '../components/calculator/CalculatorForm';
import ResultPanel from '../components/calculator/ResultPanel';
import RatesTable from '../components/calculator/RatesTable';
import { calculateStampDuty } from '../utils/calculations';
import { Calculator } from 'lucide-react';

const CalculatorPage = () => {
  const [result, setResult] = useState(null);

  const handleCalculate = (data) => {
    if (!data) {
      setResult(null);
      return;
    }
    
    const calculationResult = calculateStampDuty(
      data.state, 
      data.instrument, 
      data
    );
    
    setResult(calculationResult);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3 mb-2">
          <Calculator className="text-indigo-600" />
          Stamp Duty Calculator
        </h1>
        <p className="text-slate-600 text-lg">
          Calculate estimated stamp duty, surcharges, and registration fees for property transactions.
        </p>
      </div>

      <div className="calculator-grid">
        <Card className="order-2 lg:order-1 h-full">
          <h2 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">
            Transaction Details
          </h2>
          <CalculatorForm onCalculate={handleCalculate} />
        </Card>

        <Card className="order-1 lg:order-2 h-full bg-slate-50/50 border-indigo-100/50 shadow-indigo-100/20">
          <ResultPanel result={result} />
        </Card>
      </div>

      <RatesTable />
    </div>
  );
};

export default CalculatorPage;
