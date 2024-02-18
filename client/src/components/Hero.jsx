import { useMemo } from "react";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";
import ButtonPrimary from "./ButtonPrimary";
import { motion } from "framer-motion";

const Hero = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <>
      <div className="max-w-screen-xl mt-16 xl:px-16" id="about">
        <ScrollAnimationWrapper>
          <motion.div
            className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
            variants={scrollAnimation}
          >
            <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal text-white">
                GIVE MUSIC YOUR PERSONAL NOTE!
              </h1>
              <p className="text-black-500 mt-4 mb-6 text-lg text-white">
                Musify is the most powerful tool to automatically transcribe
                your favorite songs to sheet music using Artificial intelligence
                and Machine Learning.
              </p>
              <ButtonPrimary addClass="mt-5 text-white">Get Started</ButtonPrimary>
            </div>
            <div className="flex w-full">
              <motion.div className="h-full w-full" variants={scrollAnimation}>
                <img
                  src="https://melodyscanner.com/Content/img/header-mockup.png"
                  alt="Hero Logo"
                  width={500}
                  height={500}
                />
              </motion.div>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </>
  );
};

export default Hero;