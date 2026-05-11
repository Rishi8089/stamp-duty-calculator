import { Key, Bot, ExternalLink } from 'lucide-react';
import Input from '../common/Input';

const AI_PROVIDERS = {
  claude: {
    id: 'claude',
    name: 'Claude (Anthropic)',
    placeholder: 'sk-ant-api03-...',
    loginUrl: 'https://console.anthropic.com',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    activeColor: 'bg-purple-600 text-white border-purple-600',
    description: 'Claude by Anthropic — Best for legal document analysis and structured reasoning.',
    steps: [
      'Click here to open Anthropic Console (opens in new tab)',
      'Sign up or log in with your email / Google account',
      'Go to Settings → API Keys → click Create Key',
      'Copy the key (starts with sk-ant-) and paste below'
    ],
    footer: 'Free tier: $5 credits on sign-up. Paid plans available. Supports PDF + image upload.'
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini (Google)',
    placeholder: 'AIzaSy...',
    loginUrl: 'https://aistudio.google.com/app/apikey',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    activeColor: 'bg-blue-600 text-white border-blue-600',
    description: 'Gemini by Google — Good for document reading and multilingual analysis.',
    steps: [
      'Click here to open Google AI Studio (opens in new tab)',
      'Sign in with your Google account',
      'Click Create API Key → choose a project',
      'Copy the key (starts with AIzaSy) and paste below'
    ],
    footer: 'Free tier available. Gemini 1.5 Pro supports PDF & image. Rate limits apply on free tier.'
  },
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT (OpenAI)',
    placeholder: 'sk-proj-...',
    loginUrl: 'https://platform.openai.com/api-keys',
    color: 'bg-green-100 text-green-700 border-green-200',
    activeColor: 'bg-green-600 text-white border-green-600',
    description: 'ChatGPT by OpenAI (GPT-4o) — Excellent general-purpose AI with vision capability.',
    steps: [
      'Click here to open OpenAI Platform (opens in new tab)',
      'Log in or create account at platform.openai.com',
      'Go to API Keys → click Create new secret key',
      'Copy the key (starts with sk-) and paste below'
    ],
    footer: 'Requires billing setup ($5 min). GPT-4o supports image upload. No free tier for API.'
  },
  copilot: {
    id: 'copilot',
    name: 'Azure OpenAI',
    placeholder: 'Your Azure OpenAI API key...',
    loginUrl: 'https://oai.azure.com',
    color: 'bg-sky-100 text-sky-700 border-sky-200',
    activeColor: 'bg-sky-600 text-white border-sky-600',
    description: 'Microsoft Copilot / Azure OpenAI — Enterprise-grade AI via Azure cloud.',
    steps: [
      'Click here to open Azure OpenAI Studio (opens in new tab)',
      'Sign in with your Microsoft / Azure account',
      'Go to Resource → Keys and Endpoint',
      'Copy Key 1 and paste below. Also note your Endpoint URL'
    ],
    footer: 'Requires Azure subscription. Enterprise SLAs. You will be prompted for the endpoint URL when analysing.'
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
      
      <div className="bg-white border border-indigo-100 rounded-xl p-5 mb-4 text-sm text-slate-600 shadow-sm">
        <p className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          {currentProvider.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <p className="font-semibold text-slate-700 text-xs uppercase tracking-wider">How to get your API key:</p>
          <ul className="space-y-1.5 list-none">
            {currentProvider.steps.map((step, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <span className="text-[13px]">
                  {i === 0 ? (
                    <a 
                      href={currentProvider.loginUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 font-medium hover:underline inline-flex items-center gap-1"
                    >
                      {step} <ExternalLink size={12} />
                    </a>
                  ) : step}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 italic">
          {currentProvider.footer}
        </div>
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
