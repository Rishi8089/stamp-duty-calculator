import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File, X } from 'lucide-react';
import Button from '../common/Button';

const AIUpload = ({ onFileSelect, disabled }) => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length > 0) {
      const selected = acceptedFiles[0];
      setFile(selected);
      onFileSelect(selected);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled
  });

  const handleClear = (e) => {
    e.stopPropagation();
    setFile(null);
    onFileSelect(null);
  };

  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`dropzone-container ${isDragActive ? 'active' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        
        {!file ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <UploadCloud size={40} className="text-indigo-500" />
            </div>
            <p className="text-lg font-medium text-slate-800 mb-1">
              Drag & drop your legal document here
            </p>
            <p className="text-sm text-slate-500 mb-6">
              Only PDF format is supported (Max 5 pages parsed)
            </p>
            <Button type="button" variant="secondary" className="pointer-events-none">
              Browse Files
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-50 p-2 rounded-lg">
                <File className="text-indigo-600" size={24} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-800 line-clamp-1">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            {!disabled && (
              <button 
                onClick={handleClear}
                className="p-2 text-slate-400 hover:text-error hover:bg-red-50 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIUpload;
