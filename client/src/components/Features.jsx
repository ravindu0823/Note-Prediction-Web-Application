import { useMemo } from "react";
import getScrollAnimation from "../utils/getScrollAnimation";
import { motion } from "framer-motion";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const FeaturesComponent = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <>
      <section id="features">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 xl:gap-16 sm:py-16 lg:px-6 ">
          <ScrollAnimationWrapper className="flex w-full my-auto">
            <motion.div
              className="h-full w-full p-4"
              variants={scrollAnimation}
            >
              <img
                className="mb-4 w-full lg:mb-0 rounded-lg border-2 border-blue-500"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/features/feature-office-long.png"
                alt="feature image"
              />
            </motion.div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper>
            <motion.div
              className="text-gray-400 sm:text-lg"
              variants={scrollAnimation}
            >
              <Typography
                variant="h2"
                className="mb-4 text-4xl tracking-tight font-extrabold text-white"
              >
                Musify is the Perfect App for Your Songs Visualizations
              </Typography>
              <p className="mb-8 font-light lg:text-xl text-white">
                We develop handcrafted AI algorithms for each Song Features.
                Musify provides you with the best visualizations for your songs
                and many more features.
              </p>
              <div className="py-8 mb-6 border-t border-b border-gray-700">
                <motion.div
                  className="flex"
                  variants={scrollAnimation}
                  custom={{ duration: 2 }}
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                >
                  <div className="flex justify-center items-center mr-4 w-8 h-8 rounded-full bg-primary-900 shrink-0">
                    <svg
                      className="w-5 h-5 text-primary-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <Typography
                      variant="lead"
                      className="mb-2 text-xl font-bold text-white"
                    >
                      Visualize Audio Data in Real-Time
                    </Typography>
                    <Typography
                      variant="paragraph"
                      className="mb-2 font-light text-gray-400"
                    >
                      Real-time audio visualization turns sounds into visual
                      data, showing the rhythm and pulse of music as it plays.
                    </Typography>
                    <Link
                      to="/about"
                      className="inline-flex items-center text-primary-500 hover:text-primary-600"
                    >
                      Learn more
                      <svg
                        className="ml-1 w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </motion.div>
                <motion.div
                  className="flex pt-8"
                  variants={scrollAnimation}
                  custom={{ duration: 3 }}
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                >
                  <div className="flex justify-center items-center mr-4 w-8 h-8 rounded-full bg-purple-900 shrink-0">
                    <svg
                      className="w-5 h-5 text-purple-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <Typography
                      variant="lead"
                      className="mb-2 text-xl font-bold text-white"
                    >
                      Get in Touch with the Latest Music Trends and News.
                    </Typography>
                    <Typography
                      variant="paragraph"
                      className="mb-2 font-light text-gray-400"
                    >
                      Stay attuned to the heartbeat of the music industry! Keep
                      your finger on the pulse of evolving genres, emerging
                      artists, and groundbreaking tracks.
                    </Typography>
                    <Link
                      to="/about"
                      className="inline-flex items-center text-purple-500 hover:text-purple-600"
                    >
                      Learn more
                      <svg
                        className="ml-1 w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </motion.div>
                <motion.div
                  className="flex pt-8"
                  variants={scrollAnimation}
                  custom={{ duration: 4 }}
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                >
                  <div className="flex justify-center items-center mr-4 w-8 h-8 rounded-full bg-teal-900 shrink-0">
                    <svg
                      className="w-5 h-5 text-teal-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <Typography
                      variant="lead"
                      className="mb-2 text-xl font-bold text-white"
                    >
                      Manage Users Previously Analyzed Songs
                    </Typography>
                    <Typography
                      variant="paragraph"
                      className="mb-2 font-light text-gray-400"
                    >
                      To manage and view the history of previously analyzed
                      songs, you can use a feature that allows you to access
                      your past searches and transcriptions 🎼
                    </Typography>
                    <Link
                      to="/about"
                      className="inline-flex items-center text-teal-500 hover:text-teal-600"
                    >
                      Learn more
                      <svg
                        className="ml-1 w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              </div>
              <Typography variant="paragraph" className="text-sm">
                By using the Musify you can get the best visualizations for your
                songs and many more features.
              </Typography>
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </>
  );
};

export default FeaturesComponent;
