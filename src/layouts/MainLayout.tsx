import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="px-4 md:px-8">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
