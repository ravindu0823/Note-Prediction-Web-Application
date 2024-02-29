import { useContext } from "react";
import { ComplexNavbar } from "../components/NavBar";
import { SignInContext } from "../contexts/SignInContext";
import Cookies from "js-cookie";
import Hero from "../components/Hero";
import Features from "../components/Feature";

const Home = () => {
  const { setLoggedIn } = useContext(SignInContext);

  if (Cookies.get("token")) {
    setLoggedIn(true);
  }

  return (
    <>
      <div className="bg-gray-800 text-white">
        <div className="bg-hero-image h-screen bg-cover">
          <div className="mx-auto max-w-screen-xl">
            <ComplexNavbar />
            <Hero />
          </div>
        </div>
        <Features />
      </div>
    </>
  );
};

export default Home;
