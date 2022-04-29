import "./style.scss";
const DAODetailModal = (props) => {
  return (
    <div id="open-modal" className="modal-window">
      <div className="modal-main">
        <a href="" className="back-dashboard">back</a>
        {props.children}
      </div>
    </div>
  );
};
export default DAODetailModal;
