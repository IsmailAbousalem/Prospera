import './App.css';
import './styles/tailwind.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ChatPage from './pages/ChatPage';
import ChatbotWithAdvicePage from './pages/ChatbotWithAdvicePage';
import { FinancialHealthTrackerComponent } from '/src/components/financial-health-tracker';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<FinancialHealthTrackerComponent />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chatwithadvice" element={<ChatbotWithAdvicePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;