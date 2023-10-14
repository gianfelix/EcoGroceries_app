// import axios from "axios";
// import "./App.css";
import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';

import { Route, 
  createBrowserRouter, 
  RouterProvider, 
  createRoutesFromElements, Outlet, useNavigate  } from 'react-router-dom';
  
  //Pages
  import LandingPageMain from "./pages/LandingPageMain";
  import Shop from "./pages/Shop";
  import AboutEcoGroceries from "./pages/AboutEcoGroceries";
  import Contact from "./pages/Contact";
// import DetailsProducts from "./pages/user/DetailsProducts";
// import Package from "./pages/Package";
// import DetailsPackages from "./pages/user/DetailsPackages";
import NotFound404 from "./pages/user/NotFound404";

//Admin Pages
import LoginAdminForm from "./pages/admin/LoginAdminForm";
import AdminLandingSuper from "./pages/admin/AdminSuper/AdminLandingSuper";
import AdminLandingYogyakarta from "./pages/admin/AdminBranch/TokoYK/AdminLandingYogyakarta";
import AdminLandingJabodetabek from "./pages/admin/AdminBranch/TokoJabodetabek/AdminLandingJabodetabek";

//User Pages
import LoginForm from "./pages/user/LoginForm";
import RegistrationForm from "./pages/user/RegistrationForm";
import VerificationPage from "./pages/user/VerifyAccountPage.jsx";
import ForgotPassword from "./pages/user/ForgotPass";
import ChangesPassword from "./pages/user/ChangePass";
import ResetPassword from "./pages/user/ResetPass";
import Cart from "./pages/user/Cart";
import UserProfile from "./pages/user/UserProfile";
import LandingYkAround from "./components/user/LandingYkAround";
import LandingJabodetabek from "./components/user/LandingJabodetabek";
import ProductDetail, {productDetailsLoader} from "./components/user/ProductDetail";
import Payment from "./pages/user/Payment";

//Layout
import RootLayout from "./layouts/RootLayouts";
import ShopLayout from "./layouts/ShopLayout";
import Checkout from "./pages/user/Checkout";

function checkUserRole() {
  const token = localStorage.getItem('token');

  const decoded = jwt_decode(token);
  if (decoded.isSuper === true) return 'superAdmin';
  if (decoded.isSUper === false) return 'admin';
  return 'user';
}

function ProtectedAdminRoute() {
  const navigate = useNavigate();
  const role = checkUserRole();

  useEffect(() => {
    if (role === 'user') {
      navigate("/");
    } 
  }, [role, navigate]);

  return <Outlet />;
}

function ProtectedSuperAdminRoute() {
  const navigate = useNavigate();
  const role = checkUserRole();

  useEffect(() => {
    if (role === 'user') {
      navigate("/");
    } else if (role === 'admin') {
      navigate("/admin");
    }
  }, [role, navigate]);

  return <Outlet />;
}


function ProtectedRoute({ children, allowedRoles }) {
  const navigate = useNavigate();
  const role = checkUserRole();

  useEffect(() => {
    if (!allowedRoles.includes(role)) {
      navigate('/admin');
      return null;
    }
  }, [role, navigate, allowedRoles]);

  return children;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} >
      <Route index element={<LandingPageMain />} />
      <Route path="register" element={<RegistrationForm />} />
      <Route path="verify/:token" element={<VerificationPage />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="changes-password" element={<ChangesPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
      <Route path="about" element={<AboutEcoGroceries />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="cart" element={<ProtectedRoute allowedRoles={['user']}><Cart /></ProtectedRoute>} />
      <Route path="checkout" element={<ProtectedRoute allowedRoles={['user']}><Checkout /></ProtectedRoute>} />
      <Route path="shop" element={<ProtectedRoute allowedRoles={['user']}><ShopLayout /></ProtectedRoute>} >
        <Route index element={<ProtectedRoute allowedRoles={['user']}><Shop /></ProtectedRoute>} />
        <Route path="yk" element={<ProtectedRoute allowedRoles={['user']}><LandingYkAround /></ProtectedRoute>} />
        <Route path="kt" element={<ProtectedRoute allowedRoles={['user']}><LandingJabodetabek /></ProtectedRoute>} />
        <Route path=":id" element={<ProtectedRoute allowedRoles={['user']}><ProductDetail /></ProtectedRoute>} loader={productDetailsLoader} />
      </Route>
      <Route path="payment" element={<ProtectedRoute allowedRoles={['user']}><Payment /></ProtectedRoute>}/>
      <Route path="UserProfile" element={<ProtectedRoute allowedRoles={['user']}><UserProfile  /></ProtectedRoute>}/>
      <Route path="admin" element={<ProtectedAdminRoute><LoginAdminForm /></ProtectedAdminRoute>}>
        <Route path="jkt" element={<ProtectedAdminRoute><AdminLandingJabodetabek /></ProtectedAdminRoute>}/>
        <Route path="yk" element={<ProtectedAdminRoute><AdminLandingYogyakarta /></ProtectedAdminRoute>}/>
        <Route path="super" element={<ProtectedAdminRoute><AdminLandingSuper /></ProtectedAdminRoute>}>

         </Route>
      </Route>
      <Route path="*" element={<NotFound404 />} />
  </Route>
  )
)

function App() {
  return <RouterProvider router={router} />;
}
export default App;
