import "./Button.css";

const Button = ({
  text,
  color,
  handleChange,
}: {
  text: string;
  color: string;
  handleChange: () => void;
}) => {
  return (
    <button className={`btn btn__${color}`} onClick={handleChange}>
      {text}
    </button>
  );
};

export default Button;
