import { Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import SignUp from './pages/Auth/SignUp';
import Category from './components/Category/Category';
import BrandsPage from './pages/Brands/BrandsPage';
import BrandProductsPage from './pages/Brands/BrandsProductPage';


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path='/brands' element={<BrandsPage/>}/>
        <Route path="/brands/:slug" element={<BrandProductsPage />} />

        {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
