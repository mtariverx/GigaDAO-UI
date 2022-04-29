import "./style.scss";
import "../common/LabelInput/style.scss";
import { useState } from "react";
import Button from "components/common/Button";
import Profile from "img/icons/profile.png";

const NewDAO = (props) => {
  const [dao_id, setDaoId] = useState("");
  const [dao_disp_name, setDaoDispName] = useState("");
  const [dao_disp_img, setDaoDispImg] = useState("");
  const [councillors, setCouncillors] = useState([""]);
  const [one_councillor, setOneCouncillor] = useState("");
  const [approval_threshold, setApprovalThresold] = useState(0);

  const onAddCouncillors = (): void => {
    const temp = [...councillors];
    temp.push(one_councillor);
    setCouncillors(temp);
  };
  return (
    <div className="NewDAO-container">
      <div className="container-title">Create New DAO</div>
      <div className="container-body">
        <div className="DAO-content">
          <div className="item-wrapper">
            <div className="title">DAO ID</div>
            <input
              value={dao_id}
              onChange={(evt) => setDaoId(evt.target.value)}
            />
          </div>
          <div className="item-wrapper">
            <div className="title">Address</div>
            <input
              value={dao_disp_name}
              onChange={(evt) => setDaoDispName(evt.target.value)}
            />
          </div>
          <div className="item-wrapper">
            <div className="title">Address</div>
            <input
              value={dao_disp_img}
              onChange={(evt) => setDaoDispImg(evt.target.value)}
            />
          </div>
          <div className="item-wrapper plus-button">
            <div className="title">Councillors</div>
            <input
              value={one_councillor}
              onChange={(evt) => setOneCouncillor(evt.target.value)}
            />
            <div className="input-side-btn">
              <img src={Profile} onClick={onAddCouncillors} />
            </div>
          </div>
          <div className="item-wrapper">
            <div></div>
            <div className="show-collections">
              {councillors.map((item, index) => (
                <div className="item">{item}</div>
              ))}
            </div>
          </div>
          <div className="item-wrapper">
            <div className="title">Approval Threshold</div>
            <input
              value={approval_threshold}
              className="num"
              onChange={(evt) =>
                setApprovalThresold(parseInt(evt.target.value || "0"))
              }
            />
          </div>
          <div className="DAO-content-lowerspace"></div>
        </div>
        <div className="DAO-initialize">
          <Button is_btn_common={true} btn_title="Initialize DAO" />
        </div>
      </div>
    </div>
  );
};

export default NewDAO;
