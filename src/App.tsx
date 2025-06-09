import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LeaveProvider } from './context/LeaveContext';
import Dashboard from './pages/Dashboard';
import LeaveRequests from './pages/LeaveRequests';
import Students from './pages/Students';

function App() {
  return (
    <Router>
      <LeaveProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leave-requests" element={<LeaveRequests />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </LeaveProvider>
    </Router>
  );
}

export default App;