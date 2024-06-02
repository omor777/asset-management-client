import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root/Root';
import AddAsset from '../pages/AddAsset/AddAsset';
import AssetList from '../pages/AssetList/AssetList';
import RequestForAsset from '../pages/Employee/RequestForAsset/RequestForAsset';
import Home from '../pages/Home/Home/Home';
import JoinAsEmployee from '../pages/JoinAsEmployee/JoinAsEmployee';
import JoinAsHrManager from '../pages/JoinAsHrManager/JoinAsHrManager';
import Login from '../pages/Login/Login';
import Payment from '../pages/Payment/Payment';

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
        path: '/employee',
        element: <JoinAsEmployee />,
      },
      {
        path: '/request-for-asset',
        element: <RequestForAsset />,
      },
      {},
      {},
      {},
      {
        path: '/hr-manager',
        element: <JoinAsHrManager />,
      },
      {
        path: '/add-asset',
        element: <AddAsset />,
      },
      {
        path: '/asset-list',
        element: <AssetList />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
