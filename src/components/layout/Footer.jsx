import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-slate-300">
          <Shield size={20} className="text-indigo-400" />
          <span className="font-semibold tracking-wide">StampAI Legal Tech</span>
        </div>
        
        <p className="text-slate-400 text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} StampAI. All rights reserved. For MVP demonstration purposes only. Not financial or legal advice.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
