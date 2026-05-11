
const Loader = ({ text = "Processing..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-slate-600 font-medium animate-pulse">{text}</p>
    </div>
  );
};

export default Loader;
