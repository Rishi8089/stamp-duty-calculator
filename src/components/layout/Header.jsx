import { Link, useLocation } from 'react-router-dom';
import { Scale, Calculator, FileSearch } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/calculator', label: 'Calculator', icon: Calculator },
    { path: '/ai-analyzer', label: 'AI Analyzer', icon: FileSearch },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-indigo-600 text-white p-2.5 rounded-xl group-hover:bg-indigo-700 transition-colors">
              <Scale size={24} />
            </div>
            <span className="font-bold text-xl md:text-2xl text-slate-800 tracking-tight">StampCalc <span className="text-indigo-600">India</span></span>
          </Link>
          
          <nav className="flex items-center gap-2 md:gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden md:inline">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Global Status Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-4 pt-1 border-t border-slate-100">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
            ISA 1899 · Finance Act 2026 · Rules 2019
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
            Registration Act 1908
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
            All 36 States & UTs
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
            FY 2026–27 Updated
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-600 border border-rose-100">
            Not Legal Advice
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
