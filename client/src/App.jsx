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
import { AuthContextProvider } from "./contexts/AuthContext";
import { PrivateRoute, PrivateRouteForAuth } from "./contexts/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route element={<PrivateRoute />}>
              <Route path="/predict" element={<Predict />} />
            </Route>
            <Route element={<PrivateRouteForAuth />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
          <Toaster position="bottom-right" reverseOrder={false} />
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
