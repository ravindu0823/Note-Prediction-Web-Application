import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { SignInContext } from "./contexts/SignInContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <SignInContext.Provider value={{ loggedIn, setLoggedIn }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </SignInContext.Provider>
        <Toaster position="bottom-right" reverseOrder={false} />
      </BrowserRouter>
    </>
  );
}

export default App;
