import { Key, Bot, Settings2 } from 'lucide-react';
import Input from '../common/Input';
import { useState } from 'react';

const AI_PROVIDERS = {
  claude: {
    id: 'claude',
    name: 'Claude (Anthropic)',
    placeholder: 'sk-ant-api03-...',
    loginUrl: 'https://console.anthropic.com',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    activeColor: 'bg-purple-600 text-white border-purple-600',
    info: 'Best for legal document analysis and structured reasoning. Get your key at console.anthropic.com (starts with sk-ant-)'
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini (Google)',
    placeholder: 'AIzaSy...',
    loginUrl: 'https://aistudio.google.com/app/apikey',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    activeColor: 'bg-blue-600 text-white border-blue-600',
    info: 'Good for document reading and multilingual analysis. Get your key at aistudio.google.com (starts with AIzaSy)'
  },
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT (OpenAI)',
    placeholder: 'sk-proj-...',
    loginUrl: 'https://platform.openai.com/api-keys',
    color: 'bg-green-100 text-green-700 border-green-200',
    activeColor: 'bg-green-600 text-white border-green-600',
    info: 'Excellent general-purpose AI. Get your key at platform.openai.com (starts with sk-)'
  },
  copilot: {
    id: 'copilot',
    name: 'Azure OpenAI',
    placeholder: 'Your Azure OpenAI API key...',
    loginUrl: 'https://oai.azure.com',
    color: 'bg-sky-100 text-sky-700 border-sky-200',
    activeColor: 'bg-sky-600 text-white border-sky-600',
    info: 'Enterprise-grade AI via Azure cloud. Requires Azure subscription and endpoint URL.'
  }
};

const APIKeyInput = ({ value, onChange, error, provider, onProviderChange, endpoint, onEndpointChange }) => {
  const currentProvider = AI_PROVIDERS[provider] || AI_PROVIDERS.gemini;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bot size={18} className="text-slate-600" />
        <h4 className="font-semibold text-slate-800">1. Select AI Provider</h4>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.values(AI_PROVIDERS).map((p) => (
          <button
            key={p.id}
            onClick={() => onProviderChange(p.id)}
            className={"px-4 py-2 rounded-full text-sm font-medium transition-colors border " + (
              provider === p.id 
                ? p.activeColor 
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            )}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Key size={18} className="text-slate-600" />
        <h4 className="font-semibold text-slate-800">2. Enter API Key</h4>
      </div>
      
      <div className="bg-white border border-indigo-100 rounded-xl p-4 mb-4 text-sm text-slate-600">
        <p className="mb-2">{currentProvider.info}</p>
        <a 
          href={currentProvider.loginUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-indigo-600 font-medium hover:underline flex items-center gap-1 inline-flex"
        >
          Get API Key &rarr;
        </a>
      </div>

      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
        Your key is used directly in your browser to call the API and is never stored on our servers.
      </p>

      {provider === 'copilot' && (
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Azure OpenAI Endpoint URL (e.g., https://your-resource.openai.azure.com)"
            value={endpoint}
            onChange={(e) => onEndpointChange(e.target.value)}
          />
        </div>
      )}

      <Input
        type="password"
        placeholder={currentProvider.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
      />
    </div>
  );
};

export default APIKeyInput;
