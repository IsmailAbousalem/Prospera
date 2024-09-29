import './App.css';
import './styles/tailwind.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import ChatPage from './pages/ChatPage';
import ChatbotWithAdvicePage from './pages/ChatbotWithAdvicePage';
import { FinancialHealthTrackerComponent } from '/src/components/financial-health-tracker';

function App() {
  // Language state to toggle between English (default) and Spanish
  const [language, setLanguage] = useState('en');

  // Handler to toggle language
  const handleToggleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <Router>
      <div className="App">
        <Header onToggleLanguage={handleToggleLanguage} language={language} />
        <Routes>
          <Route path="/" element={<FinancialHealthTrackerComponent language={language} />} />
          <Route path="/chat" element={<ChatPage language={language} />} />
          <Route path="/chatwithadvice" element={<ChatbotWithAdvicePage language={language} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
