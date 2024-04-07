import { useMemo } from "react";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import feature_logo from "../assets/images/feature_logo.webp";

const features = [
  "The classical score.",
  "Pianoroll.",
  "Guitar Tabs",
  "No specific time limits.",
];

const Features = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <>
      <div
        className="max-w-screen-xl mt-8 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto pb-20"
        id="feature"
      >
        <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p y-8 my-20">
          <ScrollAnimationWrapper className="flex w-full my-auto">
            <motion.div
              className="h-full w-full p-4"
              variants={scrollAnimation}
            >
              <img
                src={feature_logo}
                alt="VPN Illustrasi"
                height={1000}
                width={1000}
              />
            </motion.div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <motion.div
              className="flex flex-col items-end justify-center mx-auto ml-auto w-full lg:w-9/12"
              variants={scrollAnimation}
            >
              <h3 className="text-3xl lg:text-4xl pb-10 font-medium leading-relaxed text-black-600">
                Edit scores the way you want.
              </h3>
              <p className="my-2 text-black-500 pb-10 text-lg">
                There are three view types available between which you can
                switch. Finished with editing? Use the PDF export to create
                beautiful sheets.
              </p>
              <ul className="text-black-500 self-start list-inside ml-8">
                {features.map((feature, index) => (
                  <motion.li
                    className="text-lg py-5"
                    custom={{ duration: 2 + index }}
                    variants={scrollAnimation}
                    key={feature}
                    whileHover={{
                      scale: 1.1,
                      transition: {
                        duration: 0.2,
                      },
                    }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </>
  );
};

export default Features;
