import { ComplexNavbar } from "../components/NavBar";
import Hero from "../components/Hero";
import FeaturesComponent from "../components/Features";

const Home = () => {
  return (
    <>
      <div className="bg-[#111827] text-white">
        <div className="bg-hero-image h-screen bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply">
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
