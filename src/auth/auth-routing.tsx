import { Route, Routes } from 'react-router';
import { BrandedLayout } from './layouts/branded';
import { ClassicLayout } from './layouts/classic';
import { SignInPage } from './pages/signin-page';
import { TwoFactorAuth } from './pages/extended/tfa';
import { SignUpPage } from './pages/signup-page';


/**
 * Handles all authentication related routes.
 * This component is mounted at /auth/* in the main application router.
 * Since we've simplified the auth system, we redirect all auth routes to the main dashboard.
 */
export function AuthRouting() {
	return (
    <Routes>
      {/* Index route to redirect to dashboard */}
      {/* <Route index element={<Navigate to="/" replace />} /> */}
      <Route element={<ClassicLayout/>}>
        <Route index path="/signin" element={<SignInPage />} />
        <Route path="/2fa" element={<TwoFactorAuth />} />
		<Route path='/signup' element={<SignUpPage />} />
      </Route>

      {/* Catch all auth routes and redirect to dashboard */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
}