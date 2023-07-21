import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Checkout from '@/pages/Checkout';
import Signup from '@/pages/Signup';
import ProductDetails from '@/pages/ProductDetails';
import PrivateRoute from './PrivateRoute';
import UpdateBooks from '@/pages/UpdateBooks';
import AddNewBook from '@/pages/AddNewBook';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/books',
        element: <Products />,
      },
      {
        path: '/add-new-book',
        element:   (
          <PrivateRoute>
           <AddNewBook />,
          </PrivateRoute>
        ),
      },
      {
        path: '/product-details/:id',
        element: <ProductDetails />,
      },
      {
        path: '/edit-book/:id',
        element:  (
          <PrivateRoute>
           <UpdateBooks />,
          </PrivateRoute>
        ),
      },
      {
        path: '/checkout',
        element: (
          <PrivateRoute>
            <Checkout />,
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
