import { ShieldAlert, Scale } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-auto text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6">
          
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[11px] md:text-xs text-slate-400 font-medium tracking-tight">
            <span className="text-indigo-400 font-bold">StampCalc India</span>
            <span className="text-slate-700">•</span>
            <span>Indian Stamp Act 1899</span>
            <span className="text-slate-700">•</span>
            <span>Finance Act 2019</span>
            <span className="text-slate-700">•</span>
            <span>SEBI/Depositories Rules 2019</span>
            <span className="text-slate-700">•</span>
            <span>Registration Act 1908</span>
            <span className="text-slate-700">•</span>
            <span>State Stamp Acts</span>
            <span className="text-slate-700">•</span>
            <span className="text-emerald-400 font-semibold">FY 2026–27</span>
          </div>

          <div className="max-w-3xl border-t border-slate-800/50 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-slate-500 text-[11px] md:text-sm">
              <div className="flex items-center gap-1.5 text-amber-500/80">
                <ShieldAlert size={14} />
                <span>Not legal advice — consult a qualified professional</span>
              </div>
              <span className="hidden md:block text-slate-700">|</span>
              <div className="flex items-center gap-1.5">
                <Scale size={14} />
                <span className="italic">Penalty for under-stamping: up to 10× deficit (Sec.35, ISA 1899)</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-600 pt-4">
            &copy; {new Date().getFullYear()} StampCalc India. Built for professional real estate & legal compliance research.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
