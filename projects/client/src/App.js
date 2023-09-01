import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPageMain from "./pages/LandingPageMain";

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
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
