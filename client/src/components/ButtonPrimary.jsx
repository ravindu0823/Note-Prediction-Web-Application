import { Button } from "@material-tailwind/react";
import propTypes from "prop-types";

const ButtonPrimary = ({ children, addClass, onClick }) => {
  return (
    <Button
      size="lg"
      onClick={onClick}
      color="light-blue"
      className={
        "py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg bg-light-blue-700 hover:shadow-orange-md transition-all outline-none " +
        addClass
      }
    >
      {children}
    </Button>
  );
};

ButtonPrimary.propTypes = {
  children: propTypes.node.isRequired,
  addClass: propTypes.string,
  onClick: propTypes.func,
};

export default ButtonPrimary;
