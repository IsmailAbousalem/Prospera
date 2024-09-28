import './App.css';
import './styles/tailwind.css';
import Chatbot from './components/Chatbot';
import { FinancialHealthTrackerComponent } from '/src/components/financial-health-tracker';  // Adjust the path if necessary

function App() {
  return (
    <div className="App">
      <h1>Welcome to Prospera</h1>
      <FinancialHealthTrackerComponent />
      <Chatbot></Chatbot>
    </div>
  );
}

export default App;