import "./button.scss";
const Button = ({ children = "Button", className, ...props }) => {
  return (
    <button className={`button-component ${className}`} {...props}>
      {children}
    </button>
  );
};
export default Button;
