import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';

export default function MainLayout() {
  return (
    <div className="page-wrapper">
      <Preloader />
      <div className="form-back-drop"></div>
      <Header />
      <Outlet />
      <Footer />
      <div className="scroll-to-top scroll-to-target" data-target="html">
        <span className="fa fa-arrow-circle-up"></span>
      </div>
    </div>
  );
}
