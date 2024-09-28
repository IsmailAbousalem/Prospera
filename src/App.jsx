import './App.css';
import './styles/tailwind.css';
import { FinancialHealthTrackerComponent } from '/src/components/financial-health-tracker';  // Adjust the path if necessary

function App() {
  return (
    <div className="App">
      <h1>Welcome to Prospera</h1>
      <FinancialHealthTrackerComponent />
    </div>
  );
}

export default App;