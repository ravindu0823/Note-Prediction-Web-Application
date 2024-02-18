import { motion } from "framer-motion";
import propTypes from "prop-types";

const ScrollAnimationWrapper = ({ children, className, ...props }) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

ScrollAnimationWrapper.propTypes = {
  children: propTypes.node.isRequired,
  className: propTypes.string,
};

export default ScrollAnimationWrapper;
