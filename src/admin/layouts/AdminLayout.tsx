import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { Container } from 'react-bootstrap';
import '../styles/admin.scss';

const AdminLayout = () => {
  return (
    <div className="wrapper">
      <Topbar />
      <Sidebar />
      <div className="page-content">
        <Container fluid>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default AdminLayout;
