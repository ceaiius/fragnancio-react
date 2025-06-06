import { Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import SignUp from './pages/Auth/SignUp';
import Category from './components/Category/Category';
import BrandsPage from './pages/Brands/BrandsPage';
import BrandProductsPage from './pages/Brands/BrandsProductPage';
import SearchPage from './pages/Search/SearchPage';
import Profile from './pages/Profile/Profile';
import ProfileSelling from './pages/Profile/ProfileSelling';
import ProfileLikes from './pages/Profile/ProfileLikes';
import ProfileSaved from './pages/Profile/ProfileSaved';

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
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<Profile />}>
          <Route index element={<ProfileSelling />} />
          <Route path="likes" element={<ProfileLikes />} />
          <Route path="saved" element={<ProfileSaved />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
