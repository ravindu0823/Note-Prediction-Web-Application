import { Typography } from "@material-tailwind/react";
import propTypes from "prop-types";

const FeedbackCard = ({ firstName, lastName, feedback, email }) => {
  return (
    <article className="p-6 mb-6 text-base rounded-lg border shadow-sm bg-blue-gray-700 border-cyan-500">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <img
            className="mr-2 w-8 h-8 rounded-lg"
            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
            alt="Michael Gough"
          />
          <div>
            <Typography className="text-sm font-semibold text-white">
              {firstName} {lastName}
            </Typography>
            <Typography variant="small" className="text-sm text-white">
              {email}
            </Typography>
          </div>
        </div>
      </footer>
      <Typography variant="paragraph" className="font-medium text-white">
        {feedback}
      </Typography>
    </article>
  );
};

FeedbackCard.propTypes = {
  firstName: propTypes.string.isRequired,
  lastName: propTypes.string.isRequired,
  feedback: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
};

export default FeedbackCard;
