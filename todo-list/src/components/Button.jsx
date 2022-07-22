const Button = ({ text, color, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      className="btn"
      style={{ backgroundColor: color }}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
