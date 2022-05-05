import "./style.scss";
import "../common/LabelInput/style.scss";
import { useState } from "react";
import * as pic from "../../pic/pic";
import * as simPic from "../../pic/sim";
import Button from "components/common/Button";
const DAOSocial = (props) => {
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");

  const onClickSaveSocial = async() => {
    const social: pic.social_type = {
      website:website,
      twitter:twitter,
      discord:discord,

    };
    props.onClose();
    // const _social=await simPic.saveSocial(social);
  };
  return (
    <div className="DAOSocial-container">
      <div className="container-title">DAO Social</div>
      <div className="container-body">
        <div className="social-content">
            <div className="item-wrapper">
              <div className="title">Website</div>
              <input
                value={website}
                onChange={(evt) => setWebsite(evt.target.value)} required
              />
            </div>
            <div className="item-wrapper plus-button">
              <div className="title">Twitter</div>
              <input
                value={twitter}
                onChange={(evt) => setTwitter(evt.target.value)} required
              />
              <Button btn_type="side" btn_title="Link" />
            </div>
            <div className="item-wrapper plus-button">
              <div className="title">Discord</div>
              <input
                value={discord}
                onChange={(evt) => setDiscord(evt.target.value)} required
              />
              <Button btn_type="side" btn_title="Link" />
            </div>
          
        </div>
        <div className="social-save">
          <Button
            btn_type="common"
            btn_title="Save Changes"
            onClick={onClickSaveSocial}
          />
        </div>
      </div>
    </div>
  );
};

export default DAOSocial;
