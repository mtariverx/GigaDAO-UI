import "./style.scss";
const DAODetailModal = (props) => {
  return (
    <div id="open-modal" className="modal-window">
      <div className="modal-main">
        <div className="back-dashboard">back</div>
        <div className="modal-main-content">{props.children}</div>
      </div>
    </div>
  );
};
export default DAODetailModal;
