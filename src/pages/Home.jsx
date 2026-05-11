import { useNavigate } from 'react-router-dom';
import { Calculator, FileSearch, ArrowRight, ShieldCheck, Zap, Scale } from 'lucide-react';
import Button from '../components/common/Button';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Smart Calculator',
      description: 'Get instant, accurate estimates for stamp duty, registration fees, and surcharges across major Indian states.',
      icon: Calculator,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      title: 'AI Document Analysis',
      description: 'Upload legal PDFs and let Gemini AI instantly extract parties, clauses, values, and duty implications.',
      icon: FileSearch,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      title: 'State-Specific Rules',
      description: 'Built-in logic for state-wise concessions, urban/rural surcharges, and different instrument types.',
      icon: Scale,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm font-medium mb-8">
            <Zap size={16} /> MVP Release v1.0
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            AI Stamp Duty Calculator <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              & Legal Document Analyzer
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Instantly calculate state-wise property registration charges or leverage Gemini AI to extract critical legal insights from your PDF documents securely in your browser.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate('/calculator')}
              className="w-full sm:w-auto text-lg px-8 py-4"
            >
              Open Calculator
              <ArrowRight size={20} />
            </Button>
            <Button 
              variant="secondary"
              onClick={() => navigate('/ai-analyzer')}
              className="w-full sm:w-auto text-lg px-8 py-4 !bg-white/10 !border-white/20 !text-white hover:!bg-white/20"
            >
              Analyze Document
              <FileSearch size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Powerful Legal-Tech Features</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our MVP demonstrates the power of combining traditional deterministic calculators with next-generation generative AI directly in the browser.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`inline-flex p-4 rounded-2xl mb-6 border ${feat.color}`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feat.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
          <ShieldCheck className="text-slate-400 mb-4" size={32} />
          <h4 className="font-semibold text-slate-700 mb-2">Legal Disclaimer</h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            This application is an MVP built for demonstration purposes. The stamp duty calculations are approximations based on simplified logic and may not reflect the latest government gazette notifications. The AI analysis is generated by Google Gemini and should not be construed as professional legal advice. Always consult a registered legal practitioner or property lawyer for actual transactions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
