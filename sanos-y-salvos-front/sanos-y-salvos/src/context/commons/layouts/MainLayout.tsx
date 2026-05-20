import { Outlet } from 'react-router';
import { Navbar } from '../components/navbar/Navbar';

export function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
