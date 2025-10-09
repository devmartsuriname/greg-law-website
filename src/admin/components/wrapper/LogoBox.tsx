import { Link } from 'react-router-dom';

const LogoBox = () => {
  return (
    <div className="logo-box">
      <Link to="/admin" className="logo text-center d-block py-3">
        <span className="logo-lg">
          <h4 className="text-white mb-0">Law Admin</h4>
        </span>
        <span className="logo-sm">
          <h5 className="text-white mb-0">LA</h5>
        </span>
      </Link>
    </div>
  );
};

export default LogoBox;
