import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPageMain from "./pages/LandingPageMain";
import Shop from "./pages/Shop";
import AboutEcoGroceries from "./pages/AboutEcoGroceries";
import Contact from "./pages/Contact";
import DetailsProducts from "./pages/user/DetailsProducts";
import Package from "./pages/Package";
import DetailsPackages from "./pages/user/DetailsPackages";
import NotFound404 from "./pages/user/NotFound404";
import LoginForm from "./pages/user/LoginForm";
import RegistrationForm from "./pages/user/RegistrationForm";
import LoginAdminForm from "./pages/admin/LoginAdminForm";
import ForgotPassword from "./pages/user/ForgotPass";
import AdminLandingSuper from "./pages/admin/AdminSuper/AdminLandingSuper";


function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPageMain />} />
          <Route path="/about" element={<AboutEcoGroceries />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<DetailsProducts />} />
          <Route path="/package" element={<Package />} />
          <Route path="/package/:id" element={<DetailsPackages />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/admin" element={<LoginAdminForm/>} />
          <Route path="/admin/super" element={<AdminLandingSuper />} />
          <Route path="/*" element={<NotFound404/>} />
        </Routes>
      </Router>
      
    </ChakraProvider>
  );
}

export default App;
