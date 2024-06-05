import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  // const { isAuthenticated } = useSelector((state) => state.user);
  const isAuthenticated = true;
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: isAuthenticated ? (
            <h1>THGIS IS DA</h1>
          ) : (
            <Navigate to="/auth/login" />
          ),
        },
      ],
    },
    // {
    //   path: '/auth',
    //   element: <AuthLayout />,
    //   children: [
    //     {
    //       path: '/auth/login',
    //       element: !isAuthenticated ? <Login /> : <Navigate to="/" />,
    //     },
    //     {
    //       path: '/auth/register',
    //       // element: <Register />,
    //     },
    //   ],
    // },
    {
      path: '*',
      element: <h1>error</h1>
      // element: <PageNotFound />,
    },
  ]);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
