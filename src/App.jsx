import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import CalculatorPage from './pages/CalculatorPage';
import AIAnalyzerPage from './pages/AIAnalyzerPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="calculator" element={<CalculatorPage />} />
          <Route path="ai-analyzer" element={<AIAnalyzerPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;