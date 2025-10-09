import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HiddenBar from '../components/HiddenBar';

export default function MainLayout() {
  return (
    <div className="page-wrapper">
      <div className="form-back-drop"></div>
      <Header />
      <HiddenBar />
      <Outlet />
      <Footer />
      <div className="scroll-to-top scroll-to-target" data-target="html">
        <span className="fa fa-arrow-circle-up"></span>
      </div>
    </div>
  );
}
