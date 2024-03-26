import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { AricleSchema } from "../models/article";
import axios, { GET_ARTICLES } from "../api/axios";

const Article = () => {
  const [articles, setArticles] = useState([AricleSchema]);

  useEffect(() => {
    axios.get(GET_ARTICLES).then((res) => {
      setArticles(res.data.news);
    });
  }, []);

  console.log(articles);

  return (
    <>
      <div aria-label="Related articles" className=" bg-gray-900 rounded-lg mt-5 h-[750px] overflow-auto">
        <div className="px-4 mx-auto">
          <h2 className="mb-8 text-2xl font-bold  text-white">Read Next</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                image={article.image}
                title={article.title}
                target={article.target}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
