import "./style.scss";
import "../common/LabelInput/style.scss";
import { useState } from "react";
import Button from "components/common/Button";
const DAOSocial = () => {
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linktree, setLinktree] = useState("");
  const [medium, setMedium] = useState("");
  return (
    <div className="DAOSocial-container">
      <div className="container-title">DAO Social</div>
      <div className="container-body">
        <div className="social-content">
          <div className="social-content-body">
            <div className="item-wrapper">
              <div className="title">Website</div>
              <input
                value={website}
                onChange={(evt) => setWebsite(evt.target.value)}
              />
            </div>
            <div className="item-wrapper plus-button">
              <div className="title">Twitter</div>
              <input
                value={twitter}
                onChange={(evt) => setTwitter(evt.target.value)}
              />
              <Button is_btn_common={true} btn_title="Link" />
            </div>
            <div className="item-wrapper plus-button">
              <div className="title">Discord</div>
              <input
                value={discord}
                onChange={(evt) => setDiscord(evt.target.value)}
              />
              <Button is_btn_common={true} btn_title="Link" />
            </div>
            <div className="item-wrapper plus-button">
              <div className="title">Instagram</div>
              <input
                value={instagram}
                onChange={(evt) => setInstagram(evt.target.value)}
              />
              <Button is_btn_common={true} btn_title="Link" />
            </div>
            <div className="item-wrapper">
              <div className="title">Linktree</div>
              <input
                value={linktree}
                onChange={(evt) => setLinktree(evt.target.value)}
              />
            </div>
            <div className="item-wrapper">
              <div className="title">Medium</div>
              <input
                value={medium}
                onChange={(evt) => setMedium(evt.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="social-save">
          {/* <div className="social-save-btn">Save Changes</div> */}
          <Button is_btn_common={true} btn_title="Save Changes" />
        </div>
      </div>
    </div>
  );
};

export default DAOSocial;
