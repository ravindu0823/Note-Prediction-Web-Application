import { useMemo, useState } from "react";
import { ComplexNavbar } from "../components/NavBar";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../components/ScrollAnimationWrapper";
import { motion } from "framer-motion";
import { Button, IconButton, Input, Textarea } from "@material-tailwind/react";
import { FeedbackSchema } from "../models/Feedback";
import { validateFeedbackData } from "../utils/FeedbackValidation";
import axios, { CREATE_FEEDBACK } from "../api/axios";
import { ReactToast } from "../utils/ReactToast";

const Feedback = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const [feedbackData, setFeedbackData] = useState(FeedbackSchema);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateFeedbackData(feedbackData)) {
      try {
        const response = await axios.post(CREATE_FEEDBACK, feedbackData);

        if (response.status !== 201) return;

        ReactToast("Feedback posted successfully, Thank You!", "success");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <section className="bg-[#111827]">
        <ScrollAnimationWrapper>
          <div className="bg-contact-us-image h-screen bg-no-repeat bg-cover bg-center bg-blue-gray-400 bg-blend-multiply">
            <ComplexNavbar className="p-7 mx-auto max-w-screen-xl" />
            <motion.div
              className="px-4 lg:pt-5 pt-8 pb-20 lg:pb-80 mx-auto text-center lg:px-6"
              variants={scrollAnimation}
            >
              <div className="max-w-screen-sm text-center mx-auto">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white ">
                  Feedback
                </h2>
                <p className="mb-16 font-light text-white sm:text-xl">
                  We use an agile approach to test assumptions and connect with
                  the needs of your audience early and often.
                </p>
              </div>

              <form
                className="grid grid-cols-1 gap-x-10 gap-y-10 p-6 mx-auto mb-16 max-w-screen-md rounded-lg border shadow-sm lg:mb-28 bg-[#111827] border-blue-500 sm:grid-cols-2"
                onSubmit={handleSubmit}
              >
                <Input
                  type="text"
                  label="First name"
                  color="white"
                  size="lg"
                  value={feedbackData.firstName}
                  onChange={(e) =>
                    setFeedbackData({
                      ...feedbackData,
                      firstName: e.target.value,
                    })
                  }
                />
                <Input
                  type="text"
                  label="Last name"
                  color="white"
                  size="lg"
                  value={feedbackData.lastName}
                  onChange={(e) =>
                    setFeedbackData({
                      ...feedbackData,
                      lastName: e.target.value,
                    })
                  }
                />
                <Input
                  type="email"
                  label="Email address"
                  color="white"
                  size="lg"
                  value={feedbackData.email}
                  onChange={(e) =>
                    setFeedbackData({ ...feedbackData, email: e.target.value })
                  }
                />
                <div>
                  <Input
                    type="tel"
                    label="Phone number"
                    color="white"
                    size="lg"
                    value={feedbackData.phoneNumber}
                    onChange={(e) =>
                      setFeedbackData({
                        ...feedbackData,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <div className="relative w-full">
                    <Textarea
                      variant="outlined"
                      className="text-white"
                      label="Your Comment"
                      rows={8}
                      color="cyan"
                      value={feedbackData.feedback}
                      onChange={(e) =>
                        setFeedbackData({
                          ...feedbackData,
                          feedback: e.target.value,
                        })
                      }
                    />
                    <div className="flex w-full justify-between py-1.5">
                      <div className="flex gap-2">
                        <Button
                          type="submit"
                          size="md"
                          className="rounded-md mt-5"
                          color="blue"
                        >
                          Post Feedback
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </ScrollAnimationWrapper>
        <div className="px-4 mx-auto max-w-screen-xl sm:py-24 lg:py-0 lg:pb-10 lg:px-6">
          <ScrollAnimationWrapper>
            <div className="text-center md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0 pt-20">
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <div className="flex justify-center items-center mx-auto mb-4 w-10 h-10 rounded-lg bg-gray-800 lg:h-16 lg:w-16">
                  <svg
                    className="w-5 h-5 lg:w-8 lg:h-8 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <p className="mb-2 text-xl font-bold text-white">Email us:</p>
                <p className="mb-3 text-gray-400">
                  Email us for general queries, including marketing and
                  partnership opportunities.
                </p>
                <Button
                  href="mailto:abc@example.com"
                  className="font-semibold text-primary-500 hover:underline lowercase text-base"
                  variant="outlined"
                  color="blue"
                  size="sm"
                >
                  hello@flowbite.com
                </Button>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <div className="flex justify-center items-center mx-auto mb-4 w-10 h-10  rounded-lg bg-gray-800 lg:h-16 lg:w-16">
                  <svg
                    className="w-5 h-5 lg:w-8 lg:h-8 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                </div>
                <p className="mb-2 text-xl font-bold text-white">Call us:</p>
                <p className="mb-3 text-gray-400">
                  Call us to speak to a member of our team. We are always happy
                  to help.
                </p>
                <Button
                  variant="outlined"
                  color="blue"
                  size="sm"
                  className="font-semibold text-primary-500 text-base"
                >
                  +1 (646) 786-5060
                </Button>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                <div className="flex justify-center items-center mx-auto mb-4 w-10 h-10 rounded-lg bg-gray-800 lg:h-16 lg:w-16">
                  <svg
                    className="w-5 h-5 lg:w-8 lg:h-8 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <p className="mb-2 text-xl font-bold text-white">Support</p>
                <p className="mb-3 text-gray-400">
                  Email us for general queries, including marketing and
                  partnership opportunities.
                </p>
                <Button
                  variant="outlined"
                  color="blue"
                  size="sm"
                  className="inline-flex py-2 px-4 text-sm font-medium text-center rounded-lg border text-primary-600 border-primary-600 hover:text-white hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-600 dark:focus:ring-primary-800"
                >
                  Support center
                </Button>
              </motion.div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </>
  );
};

export default Feedback;
