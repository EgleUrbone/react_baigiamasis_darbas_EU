import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import LoginPage from './pages/LoginPage';
import { useAuth } from './store/AuthProvider';
import ShopsPage from './pages/ShopsPage';
import AddShopPage from './pages/AddShopPage';

function App() {
  const ctx = useAuth();

  return (
    <div>
      <Header />

      <Routes>
        <Route
          path='/login'
          element={
            !ctx.isUserLoggedIn ? <LoginPage /> : <Navigate to={'/shops'} />
          }
        />
        <Route
          path='/shops'
          element={
            ctx.isUserLoggedIn ? <ShopsPage /> : <Navigate to={'/login'} />
          }
        />
        <Route
          path='/add-shop'
          element={
            ctx.isUserLoggedIn ? <AddShopPage /> : <Navigate to={'/login'} />
          }
        />
        <Route
          path='*'
          element={
            <div>
              <h1>404</h1>
              <p>page not found</p>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
