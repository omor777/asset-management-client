import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root/Root';
import AddAsset from '../pages/AddAsset/AddAsset';
import AssetList from '../pages/AssetList/AssetList';
import UpdateAsset from '../pages/AssetList/UpdateAsset';
import MyRequestedAsset from '../pages/Employee/MyRequestedAsset/MyRequestedAsset';
import MyTeam from '../pages/Employee/MyTeam/MyTeam';
import RequestForAsset from '../pages/Employee/RequestForAsset/RequestForAsset';
import AddAnEmployee from '../pages/HR/AddAnEmployee/AddAnEmployee';
import AllRequests from '../pages/HR/AllRequests/AllRequests';
import MyEmployeeList from '../pages/HR/MyEmployeeList/MyEmployeeList';
import Home from '../pages/Home/Home/Home';
import JoinAsEmployee from '../pages/JoinAsEmployee/JoinAsEmployee';
import JoinAsHrManager from '../pages/JoinAsHrManager/JoinAsHrManager';
import Login from '../pages/Login/Login';
import Payment from '../pages/Payment/Payment';
import { Profile } from '../pages/shared/Profile';
import EmployeeRoute from './EmployeeRoute';
import HrRoute from './HrRoute';
import PrivateRoute from './PrivateRoute';

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
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <RequestForAsset />
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
      {
        path: '/my-team',
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <MyTeam />
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
      {
        path: '/my-assets',
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <MyRequestedAsset />
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },

      {
        path: '/hr-manager',
        element: <JoinAsHrManager />,
      },
      {
        path: '/add-asset',
        element: (
          <PrivateRoute>
            <HrRoute>
              <AddAsset />
            </HrRoute>
          </PrivateRoute>
        ),
      },
      {
        path: '/asset-list',
        element: (
          <PrivateRoute>
            <HrRoute>
              <AssetList />
            </HrRoute>
          </PrivateRoute>
        ),
      },
      {
        path: '/asset-list/update/:id',
        element: (
          <PrivateRoute>
            <HrRoute>
              <UpdateAsset />
            </HrRoute>
          </PrivateRoute>
        ),
      },
      {
        path: '/all-requests',
        element: (
          <PrivateRoute>
            <HrRoute>
              <AllRequests />
            </HrRoute>
          </PrivateRoute>
        ),
      },
      {
        path: '/add-an-employee',
        element: (
          <PrivateRoute>
            <HrRoute>
              <AddAnEmployee />
            </HrRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-employee-list',
        element: (
          <PrivateRoute>
            <HrRoute>
              <MyEmployeeList />
            </HrRoute>
          </PrivateRoute>
        ),
      },
      {
        path: '/payment',
        element: (
          <PrivateRoute>
            <HrRoute>
              <Payment />
            </HrRoute>
          </PrivateRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
