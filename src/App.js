import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserContext from './context/user';
import ProtectedRoute from './halpers/ProtectedRoute';
import useAuthListener from './hooks/useAuthListener'
import * as ROUTES from './constants/routes';

import './App.css';

const Login     = lazy(() => import('./pages/login'));
const Signup    = lazy(() => import('./pages/signup'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Notfound  = lazy(() => import('./pages/notfound'));

export default function App() {

  const { userUid } = useAuthListener();

  return (
    <UserContext.Provider value={{ userUid }}>
      <BrowserRouter>
        <Suspense fallback={'...'}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={Signup} />
            <ProtectedRoute path={ROUTES.DASHBOARD} bool={userUid} redirect={ROUTES.LOGIN}>
              <Dashboard />
            </ProtectedRoute>
            <Route component={Notfound} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
