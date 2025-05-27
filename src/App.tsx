import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';


function App() {
  return (
    <Routes>
      {/* Routes WITHOUT layout (no Header) */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/signup" element={<Signup />} /> */}
      {/* Routes WITH layout (includes Header) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
