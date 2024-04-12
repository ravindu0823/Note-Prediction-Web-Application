import { useMemo } from "react";
import { ComplexNavbar } from "../components/NavBar";
import getScrollAnimation from "../utils/getScrollAnimation";
import { motion } from "framer-motion";
import ScrollAnimationWrapper from "../components/ScrollAnimationWrapper";

const AboutUs = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  return (
    <>
      <div className="bg-[url('https://klang.io/wp-content/uploads/2024/02/klangio_background_tinified.jpg')] bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply">
        <ComplexNavbar className="mx-auto max-w-screen-xl p-7" />
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-10">
          <ScrollAnimationWrapper>
            <motion.div className="text-center" variants={scrollAnimation}>
              <img
                className="object-contain w-auto mx-auto block"
                src="https://flowbite.s3.amazonaws.com/brand/logo-dark/type/flowbite-logo.svg"
                alt="Flowbite logo dark"
              />

              <div className="flex flex-col items-center justify-center gap-4 mt-4 sm:mt-5 sm:gap-8 sm:flex-row">
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center text-base font-semibold leading-tight hover:underline text-primary-500"
                >
                  Visit the website
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-1.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>

                <a
                  href="#"
                  title=""
                  className="inline-flex items-center text-base font-semibold leading-tight hover:underline text-primary-500"
                >
                  Let{"'"}s work together
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-1.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </motion.div>

            <motion.div
              className="max-w-5xl mx-auto mt-8 lg:mt-16"
              variants={scrollAnimation}
              custom={{ duration: 3 }}
            >
              <img
                className="w-full rounded-lg shadow-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/computer-dark.png"
                alt="Content image"
              />
            </motion.div>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 gap-8 mt-8 lg:gap-16 lg:grid-cols-2 lg:mt-16">
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: {
                  duration: 0.2,
                },
              }}
            >
              <div>
                <h3 className="text-2xl font-extrabold text-white">Overview</h3>
                <p className="mt-2 text-lg font-normal text-gray-400">
                  Since 1984, Flowbite has been serving up grab-and-go frozen
                  daiquiris from its stores across the U.S. Its signature
                  drinks, souvenir cups, and discounted refills have made
                  Flowbite synonymous with great music, good vibes, and starting
                  the best party in town.
                </p>
              </div>

              <ul className="grid grid-cols-1 mt-8 sm:grid-cols-2 gap-x-4 gap-y-3">
                <li className="flex items-center gap-2.5">
                  <svg
                    className="w-5 h-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal text-gray-400">
                    A/B Testing
                  </span>
                </li>

                <li className="flex items-center gap-2.5">
                  <svg
                    className="w-5 h-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal text-gray-400">
                    Craft CMS development
                  </span>
                </li>

                <li className="flex items-center gap-2.5">
                  <svg
                    className="w-5 h-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal text-gray-400">
                    UX/UI design
                  </span>
                </li>

                <li className="flex items-center gap-2.5">
                  <svg
                    className="w-5 h-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal text-gray-400">
                    Copywriting
                  </span>
                </li>

                <li className="flex items-center gap-2.5">
                  <svg
                    className="w-5 h-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal text-gray-400">
                    Brand development
                  </span>
                </li>

                <li className="flex items-center gap-2.5">
                  <svg
                    className="w-5 h-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal text-gray-400">
                    Graphic design
                  </span>
                </li>

                <li className="flex items-center gap-2.5">
                  <svg
                    className="w-5 h-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal text-gray-400">
                    Front-end development
                  </span>
                </li>

                <li className="flex items-center gap-2.5">
                  <svg
                    className="w-5 h-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-base font-normal text-gray-400">
                    SEO
                  </span>
                </li>
              </ul>
            </motion.div>

            <div className="space-y-8">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <h3 className="text-2xl font-extrabold text-white">
                  Background
                </h3>
                <p className="mt-2 text-lg font-normal text-gray-400">
                  Come 2021, Flowbite had expanded to over 40 locations. The
                  brand’s digital presence existed, but it lacked strategy.
                  Although its target market of 21-30 year-olds was as engaged
                  (and as loyal) as ever, the brand had outgrown its amateur
                  look of the early {"'"}00s and the family-owned business
                  vibes. It needed to show it was a strong brand moving in a new
                  direction - and it was heading there fast.
                </p>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <h3 className="text-2xl font-extrabold text-white">
                  The challenge
                </h3>
                <p className="mt-2 text-lg font-normal text-gray-400">
                  Flowbite’s new website would set the tone for all future
                  marketing initiatives, so the brand needed something to
                  showcase its new identity as soon as possible. A tight
                  timeline, paired with the fact that the new management team
                  were still exploring how to shift the brand from what it used
                  to be to what it needed to be, meant that working
                  collaboratively was a must.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
