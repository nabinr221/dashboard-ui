import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-50">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
