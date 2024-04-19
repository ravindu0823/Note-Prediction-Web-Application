import Article from "../components/Article";
import { ComplexNavbar } from "../components/NavBar";

const Articles = () => {
  return (
    <>
      <div className="bg-article-image min-h-screen bg-center bg-gray-500 bg-blend-multiply">
        <div className="mx-auto max-w-screen-xl">
          <ComplexNavbar className="p-7" />
          <Article />
        </div>
      </div>
    </>
  );
};

export default Articles;
