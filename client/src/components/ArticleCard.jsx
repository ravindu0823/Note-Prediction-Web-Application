import { Typography } from "@material-tailwind/react";
import propTypes from "prop-types";
import { motion } from "framer-motion";
import { useMemo } from "react";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

const ArticleCard = ({ image, title, target, category, desc, date }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  return (
    <ScrollAnimationWrapper>
      <motion.div
        variants={scrollAnimation}
        className="p-7  rounded-lg border shadow-md bg-[#111827] border-cyan-500"
        custom={{
          duration: 2,
          delay: 1,
        }}
      >
        <a href={target} target="_blank">
          <img
            className="mb-5 rounded-lg w-full text-white"
            src={image}
            alt={`Image of ${title}`}
          />
        </a>
        <span className="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-800 text-white">
          {category}
        </span>
        <Typography
          as={"a"}
          href={target}
          target="_blank"
          variant="h4"
          className="my-2 font-bold tracking-tight text-white"
        >
          {title}
        </Typography>
        <Typography
          variant="paragraph"
          className="mb-4 font-light text-gray-400"
        >
          {desc && desc.substring(0, 100)}{" "}
          <a href={target} className="text-blue-300 underline">
            See more...
          </a>
        </Typography>
        <div className="flex items-center space-x-4">
          <img
            className="w-10 h-10 rounded-full"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png"
            alt="Sofia McGuire avatar"
          />
          <div className="font-medium text-white">
            <div>Medical Express</div>
            <div className="text-sm font-normal text-gray-400">{date}</div>
          </div>
        </div>
      </motion.div>
    </ScrollAnimationWrapper>
  );
};

ArticleCard.propTypes = {
  image: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  target: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
  desc: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
};

export default ArticleCard;
