import { useContext } from "react";
import { ComplexNavbar } from "../components/NavBar";
import { SignInContext } from "../contexts/SignInContext";
import Cookies from "js-cookie";
import Hero from "../components/Hero";
import FeaturesComponent from "../components/Features";

const Home = () => {
  const { setLoggedIn } = useContext(SignInContext);

  if (Cookies.get("token")) {
    setLoggedIn(true);
  }

  return (
    <>
      <div className="bg-[#111827] text-white">
        <div className="bg-hero-image h-screen bg-cover">
          <div className="mx-auto max-w-screen-xl">
            <ComplexNavbar className="p-7" />
            <Hero />
          </div>
        </div>
        <FeaturesComponent />
      </div>
    </>
  );
};

export default Home;
