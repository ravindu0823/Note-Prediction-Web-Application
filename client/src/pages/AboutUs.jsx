import { useMemo } from "react";
import { ComplexNavbar } from "../components/NavBar";
import getScrollAnimation from "../utils/getScrollAnimation";
import { motion } from "framer-motion";
import ScrollAnimationWrapper from "../components/ScrollAnimationWrapper";
import musify_logo from "../assets/images/musify_logo.webp";
import { Typography } from "@material-tailwind/react";
import about_us_image from "../assets/images/predict_new.png";

const AboutUs = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  return (
    <>
      <div className="bg-klangio-image bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply">
        <ComplexNavbar className="mx-auto max-w-screen-xl p-7" />
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-10">
          <ScrollAnimationWrapper>
            <motion.div className="text-center" variants={scrollAnimation}>
              <a
                href="/"
                className="flex items-center justify-center mb-6 text-2xl font-semibold text-white"
              >
                <img
                  className="w-24 h-24 mr-2 rounded-full"
                  src={musify_logo}
                  alt="logo"
                />
                Musify
              </a>
            </motion.div>

            <motion.div
              className="flex flex-col items-center justify-center gap-4 mt-4 sm:mt-5 sm:gap-8 sm:flex-row"
              variants={scrollAnimation}
            >
              <a
                href="https://github.com/ravindu0823/Note-Prediction-Web-Application"
                target="_blank"
                className="inline-flex items-center text-base font-semibold leading-tight hover:underline text-primary-500"
              >
                Visit the GitHub Repository
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
                href="https://github.com/ravindu0823/Note-Prediction"
                target="_blank"
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
            </motion.div>

            <motion.div
              className="max-w-5xl mx-auto mt-8 lg:mt-16 rounded-full"
              variants={scrollAnimation}
              custom={{ duration: 3 }}
            >
              <img
                className="w-full shadow-lg border border-cyan-500 rounded-xl"
                src={about_us_image}
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
                <Typography
                  variant="h3"
                  className="text-2xl font-extrabold text-white"
                >
                  Overview
                </Typography>

                <Typography
                  variant="lead"
                  className="mt-2 text-lg font-normal text-gray-400"
                >
                  Musify is an innovative web application designed to transform
                  the way musicians, educators, and music enthusiasts engage
                  with audio analysis. It offers a user-friendly platform that
                  requires no downloads, installations, setups, or sign-ups,
                  enabling users to dive straight into the music visualization
                  process. With Musify, users can upload song files and
                  instantly visualize musical notations and chords along an
                  interactive audio timeline. The application leverages advanced
                  algorithms like FFT and TensorFlow to analyze audio files and
                  present accurate, real-time visual feedback.
                </Typography>
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
                    Notes Visualization
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
                    Chords Visualisation
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
                    Save User Progress
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
                    News Articles
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
                    Newsletters
                  </span>
                </li>

                {/* <li className="flex items-center gap-2.5">
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
                </li> */}

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
                <Typography
                  variant="h3"
                  className="text-2xl font-extrabold text-white"
                >
                  Background
                </Typography>
                <Typography
                  variant="lead"
                  className="mt-2 text-lg font-normal text-gray-400"
                >
                  People of all ages and ethnic backgrounds may relate to music
                  as an art form, frequently becoming a lifetime interest or
                  professional choice. Perfect, absolute, and relative pitch are
                  three categories of musical note recognition by ear, and it
                  {"'"}s a highly sought-after talent for artists and music
                  industry professionals. Roughly one in ten persons is born
                  with perfect pitch, the unique ability to recognise musical
                  notes quickly and without using a reference tone. While
                  comparable, absolute pitch is more context-dependent and less
                  exact. The most often used type, relative pitch, enables note
                  identification by comparison with a recognised reference note.
                </Typography>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <Typography
                  variant="h3"
                  className="text-2xl font-extrabold text-white"
                >
                  The Challenge
                </Typography>
                <Typography
                  variant="lead"
                  className="mt-2 text-lg font-normal text-gray-400"
                >
                  At Musify, we believe that the journey of music learning is an
                  ever-evolving challenge that should be accessible and
                  enjoyable for everyone. Whether you{"'"}re a budding musician,
                  a seasoned educator, or simply a music lover, our platform
                  offers you the opportunity to test and improve your musical
                  skills.
                </Typography>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
