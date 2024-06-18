import './App.css';
import PackageForm from './package-manager/packageForm';
import DisplayAll from './package-manager/display-all-list'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* packages */}
      <Route path="/" element={<DisplayAll />} />
      <Route path="/all" element={<DisplayAll />} />
      <Route path="/edit" element={<PackageForm type='edit' />} />
      <Route path="/add" element={<PackageForm type='add' />} />
    </Routes>
  );
}

export default App;
