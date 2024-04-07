import propTypes from "prop-types";

const ButtonPrimary = ({ children, addClass }) => {
  return (
    <button
      className={
        "py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg bg-light-blue-700 hover:shadow-orange-md transition-all outline-none " +
        addClass
      }
    >
      {children}
    </button>
  );
};

ButtonPrimary.propTypes = {
  children: propTypes.node.isRequired,
  addClass: propTypes.string,
};

export default ButtonPrimary;
