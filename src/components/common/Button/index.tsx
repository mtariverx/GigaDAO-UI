import "./style.scss";

const Button = (props) => {
  const { is_btn_common, btn_title } = props;
  return (
    <div className={`${is_btn_common ? "btn-common" : "btn-connection"}`}>
      {btn_title}
    </div>
  );
};

export default Button;
