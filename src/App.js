import './App.css';

import Navbar from './navigation/Navbar';
import Sidebar from './navigation/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="Body">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
