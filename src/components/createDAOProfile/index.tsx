import { PlusIcon } from "components/common/icons/plus";
import { LabelInput, LabelCheckbox } from "components/common/LabelInput";
import { useState } from "react";
import "./style.scss";
import "../../scss/content.scss";

import * as pic from "../../pic/pic";
import { Keypair, PublicKey } from "@solana/web3.js";
import { setGovernance, getGovernance } from "../../pic/sim";

const CreateDaoProfile = () => {
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linktree, setLinktree] = useState("");
  const [more, setMore]=useState("");

  const onInitializeStream = (): void => {};

  const onSave = (): void => {
    // let token_stream: pic.Stream = {
    // };
  };

  return (
    // <div className="content">
    <div className="daoprofile-content">
      {/* <div className="content-left"> */}
      <div className="outer-box-margin">
        <div className="content-outer-box">
          <div className="content-inner-box">
            <div className="create-dao">
              {/* <div></div> */}
              <div>Create Token Stream</div>
              <LabelInput
                value={website}
                title="Website"
                onChange={setWebsite}
              />
              <LabelInput
                value={twitter}
                title="Twitter"
                onChange={setTwitter}
              />
              <LabelInput
                value={discord}
                title="Discord"
                onChange={setInstagram}
              />
              <LabelInput
                value={linktree}
                title="Linktree"
                onChange={setLinktree}
              />
              <LabelInput
                value={more}
                title="More..."
                onChange={setMore}
              />
              <div className="content-btn-group">
                <button className="btn">Clear</button>
                <button className="btn" onClick={onSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* </div> */}
    </div>
    //  </div>
  );
};

export default CreateDaoProfile;
