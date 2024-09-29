import './App.css';
import './styles/tailwind.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ChatPage from './pages/ChatPage'; // Import the ChatPage
import { FinancialHealthTrackerComponent } from '/src/components/financial-health-tracker';  // Adjust the path if necessary

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<FinancialHealthTrackerComponent />} /> {/* Home page */}
          <Route path="/chat" element={<ChatPage />} /> {/* Route for ChatPage */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;