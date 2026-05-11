import { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import AIUpload from '../components/ai/AIUpload';
import APIKeyInput from '../components/ai/APIKeyInput';
import AIResult from '../components/ai/AIResult';
import { validateApiKey } from '../utils/validators';
import { extractTextFromPDF } from '../utils/pdfParser';
import { analyzeDocument } from '../utils/aiApi';
import toast from 'react-hot-toast';
import { Sparkles, FileSearch } from 'lucide-react';

const AIAnalyzerPage = () => {
  const [file, setFile] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [result, setResult] = useState(null);
  const [provider, setProvider] = useState('claude');
  const [endpoint, setEndpoint] = useState('');

  const handleAnalyze = async () => {
    // Validation
    const keyError = validateApiKey(apiKey);
    if (keyError) {
      setApiKeyError(keyError);
      return;
    }
    setApiKeyError('');

    if (!file) {
      toast.error('Please upload a document first');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Step 1: Extract Text
      setLoadingText('Extracting text from PDF (this happens locally)...');
      const text = await extractTextFromPDF(file);
      
      if (!text || text.length < 50) {
        throw new Error('Could not extract sufficient text from the PDF. Is it an image-based PDF without OCR?');
      }

      // Step 2: Call selected AI provider
      setLoadingText(`Analyzing legal document with ${provider.charAt(0).toUpperCase() + provider.slice(1)}...`);
      const analysisData = await analyzeDocument(text, apiKey, provider, endpoint);
      
      setResult(analysisData);
      toast.success('Document analysis complete!');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'An error occurred during analysis');
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-in fade-in duration-500">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-4">
          <FileSearch size={32} className="text-indigo-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          AI Legal Document Analyzer
        </h1>
        <p className="text-slate-600 text-lg">
          Upload a property document (PDF) and our system will use AI to extract key clauses, parties, values, and provide a stamp duty estimation.
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <h2 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">
            1. Document & Configuration
          </h2>
          
          <div className="space-y-8">
            <AIUpload onFileSelect={setFile} disabled={loading} />
            
            <APIKeyInput 
              value={apiKey} 
              onChange={(val) => {
                setApiKey(val);
                if (apiKeyError) setApiKeyError('');
              }} 
              error={apiKeyError} 
              provider={provider}
              onProviderChange={setProvider}
              endpoint={endpoint}
              onEndpointChange={setEndpoint}
            />

            <div className="flex justify-end pt-2">
              <Button 
                onClick={handleAnalyze} 
                disabled={loading || !file}
                className="w-full md:w-auto px-8"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles size={18} />
                    Analyze Document
                  </span>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {loading && (
          <Card className="flex justify-center border-indigo-100 bg-indigo-50/30">
            <Loader text={loadingText} />
          </Card>
        )}

        {!loading && result && (
          <AIResult result={result} />
        )}
      </div>
    </div>
  );
};

export default AIAnalyzerPage;
