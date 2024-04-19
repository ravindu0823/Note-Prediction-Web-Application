import { useEffect, useMemo, useState } from "react";
import ArticleCard from "./ArticleCard";
import { AricleSchema } from "../models/article";
import axios, { GET_ARTICLES } from "../api/axios";
import ScrollToTop from "react-scroll-to-top";
import { Typography } from "@material-tailwind/react";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";

const Article = () => {
  const [articles, setArticles] = useState([AricleSchema]);
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  useEffect(() => {
    axios.get(GET_ARTICLES).then((res) => {
      setArticles(res.data.news);
    });
  }, []);

  console.log(articles);

  return (
    <>
      <div className="px-4 mx-auto max-w-screen-xl lg:py-7 lg:px-6">
        
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <Typography
              className="mb-4 text-4xl tracking-tight font-extrabold text-white"
              variant="h2"
            >
              Music Articles
            </Typography>
            <Typography
              variant="lead"
              className="font-light sm:text-xl text-gray-400"
            >
              We use an agile approach to test assumptions and connect with the
              needs of your audience early and often.
            </Typography>
          </div>
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={scrollAnimation}
          >
            {articles.length > 1 &&
              articles.map((article) => (
                <ArticleCard
                  key={article._id}
                  image={article.image}
                  title={article.title}
                  target={article.target}
                  category={article.category}
                  desc={article.desc}
                  date={article.date}
                />
              ))}
          </motion.div>
        
        <ScrollToTop smooth color="#111827" />
      </div>
    </>
  );
};

export default Article;
