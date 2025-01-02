import './App.css';
import Register from './components/Register.js';
import Login from './components/Login.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard.js';
import ProtectedRoute from './components/ProtectedRoute.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
          
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/register" element={<Register />} />
          
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
