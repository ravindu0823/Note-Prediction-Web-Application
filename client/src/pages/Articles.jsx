import Article from "../components/Article";
import { ComplexNavbar } from "../components/NavBar";

const Articles = () => {
  return (
    <>
      <div className="bg-[#111827] text-white">
        <div className="bg-hero-image h-screen bg-cover">
          <div className="mx-auto max-w-screen-xl">
            <ComplexNavbar className="p-7" />
            <Article />
          </div>
        </div>
      </div>
    </>
  );
};

export default Articles;
