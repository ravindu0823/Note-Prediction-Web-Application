import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Articles from "./pages/Articles";
import Footer from "./components/Footer";
import Predict from "./pages/Predict";
import Feedback from "./pages/Feedback";
import AboutUs from "./pages/AboutUs";
import { PrivateRoute, PrivateRouteForAuth } from "./contexts/PrivateRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route element={<PrivateRoute />}>
            <Route path="/predict" element={<Predict />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<PrivateRouteForAuth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <Toaster position="bottom-right" reverseOrder={false} />
      </BrowserRouter>
    </>
  );
}

export default App;
