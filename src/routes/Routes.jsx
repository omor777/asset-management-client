import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root/Root';
import Home from '../pages/Home/Home/Home';
import JoinAsEmployee from '../pages/JoinAsEmployee/JoinAsEmployee';
import Login from '../pages/Login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/join-as-employee',
        element: <JoinAsEmployee />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
