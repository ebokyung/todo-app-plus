import { Footer } from '../component/common/Footer';
import { Header } from '../component/common/Header';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
