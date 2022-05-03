import "./style.scss";
type props_button = {
  icon_img: string;
  is_background: boolean;
  onClick: () => void;
};

const IconButton = (props) => {
  const { icon_img, is_background } = props;
  const onClick=props.onClick;
  return (
    <div>
      {is_background == true ? (
        <div className="btn-fill" onClick={onClick}> 
          <img src={icon_img} />
        </div>
      ) : (
        <div className="btn-unfill">
          <img src={icon_img} />
        </div>
      )}
    </div>
  );
};
export default IconButton;
