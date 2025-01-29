import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MiningDashboard from './components/MiningDashboard';
import WithdrawalForm from './components/WithdrawalForm';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element ={<LoginForm/>}/>
        <Route path="/dashboard" element={<MiningDashboard />} />
        <Route path="/Withdraw" element={<WithdrawalForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
