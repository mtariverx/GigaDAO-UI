import "./style.scss";
type Props_input = {
  btn_type: string;
  btn_title: string;
  onClick:(value:any)=>void;
}
const Button = (props) => {
  const { btn_type, btn_title, } = props;
  const onClick=(props.onClick);
  return (
    <div className= {`btn-${btn_type}`} onClick={onClick}>
    {/* <div className={is_btn_common ? "btn-common" : "btn-connection"}`} onClick={onClick}> */}
      {btn_title}
    </div>
  );
};

export default Button;
