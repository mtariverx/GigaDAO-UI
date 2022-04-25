import "./style.scss";
type Props = {
  icon:string;
  text:string;
  onClick: () => void;
};
const NavItem: React.FC<Props> = (props) => {
  const {icon, text} = props
  return <div className="nav-item" onClick={props.onClick}>
    <div className="nav-item-icon">   
      <img src={icon}/>
    </div>
    <div className="nav-item-text">
      {text}
    </div>
  </div>;
};

export default NavItem;
