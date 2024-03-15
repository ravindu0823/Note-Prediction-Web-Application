import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { SignInContext } from "./contexts/SignInContext";
import Articles from "./pages/Articles";
import Footer from "./components/Footer";
import Predict from "./pages/Predict";
import { ComplexNavbar } from "./components/NavBar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <SignInContext.Provider value={{ loggedIn, setLoggedIn }}>
        <ComplexNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/predict" element={<Predict />} />
          </Routes>
          <Footer />
        </SignInContext.Provider>
        <Toaster position="bottom-right" reverseOrder={false} />
      </BrowserRouter>
    </>
  );
}

export default App;
