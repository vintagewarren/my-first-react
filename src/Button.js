import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({ text }) {
  return <button className={styles.btn}>{text}</button>;
  // className = styles.btn : css의 classname을 가져옴!! 
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
