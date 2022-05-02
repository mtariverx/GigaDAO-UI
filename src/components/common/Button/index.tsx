import "./style.scss";
type Props_input = {
  is_btn_common: string;
  btn_title: string;
  onClick:(value:any)=>void;
}
const Button = (props) => {
  const { is_btn_common, btn_title, } = props;
  const onClick=(props.onClick);
  return (
    <div className={`${is_btn_common ? "btn-common" : "btn-connection"}`} onClick={onClick}>
      {btn_title}
    </div>
  );
};

export default Button;
