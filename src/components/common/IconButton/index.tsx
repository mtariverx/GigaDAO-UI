import "./style.scss";

const IconButton = (props) => {
  const { icon_img, is_background} = props;

  return (
    <div>
      {is_background == true ? (
        <div className="btn-fill">
          <img src={icon_img}/>
        </div>
      ) : (
        <div className="btn-unfill">
          <img src={icon_img}/>
        </div>
      )}
    </div>
  );
};
export default IconButton;
