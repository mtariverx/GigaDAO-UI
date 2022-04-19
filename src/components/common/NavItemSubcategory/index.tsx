import "./style.scss";
type Props = {
  icon: string;
  text: string;
  onClick: () => void;
};
const NavItemSubcategory: React.FC<Props> = (props) => {
  const { icon, text } = props;
  return (
    <div className="subcategory-item" onClick={props.onClick}>
      <div className="subcategory-item-icon">
        <img src={icon} />
      </div>
      <div className="subcategory-item-text">{text}</div>
    </div>
  );
};

export default NavItemSubcategory;
