import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import LoginPage from './pages/LoginPage';
import { useAuth } from './store/AuthProvider';
import ShopsPage from './pages/ShopsPage';
import AddShopPage from './pages/AddShopPage';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/RegisterPage';
import SingleShopPage from './pages/SingleShopPage';
import UserProfilePage from './pages/UserProfilePage';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import Page404 from './pages/Page404';

function App() {
  const ctx = useAuth();

  return (
    <div className='min-h-screen flex flex-col h-calc '>
      <Toaster
        toastOptions={{
          success: {
            iconTheme: {
              primary: 'rgb(235, 169, 55)',
              secondary: 'white',
            },
          },
        }}
      />
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            !ctx.isUserLoggedIn ? <HomePage /> : <Navigate to={'/shops'} />
          }
        />
        <Route
          path='/login'
          element={
            !ctx.isUserLoggedIn ? <LoginPage /> : <Navigate to={'/shops'} />
          }
        />
        <Route
          path='/register'
          element={
            !ctx.isUserLoggedIn ? <RegisterPage /> : <Navigate to={'/shops'} />
          }
        />
        <Route
          path='/shops'
          element={ctx.isUserLoggedIn ? <ShopsPage /> : <Page404 />}
        />
        <Route
          path='/add-shop'
          element={ctx.isUserLoggedIn ? <AddShopPage /> : <Page404 />}
        />
        <Route
          path='/user-profile'
          element={
            ctx.isUserLoggedIn ? (
              <UserProfilePage />
            ) : (
              <Navigate to={'/login'} />
            )
          }
        />
        <Route
          path='/:shopId'
          element={ctx.isUserLoggedIn ? <SingleShopPage /> : <Page404 />}
        />
        <Route
          path='*'
          element={
            <div className='text-center'>
              <h1 className='font-header text-7xl'>404</h1>
              <p className='text-2xl'>page not found</p>
            </div>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
