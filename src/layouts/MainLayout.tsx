import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="px-4 md:px-8 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
