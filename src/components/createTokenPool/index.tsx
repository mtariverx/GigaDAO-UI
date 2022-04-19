import { PlusIcon } from "components/common/icons/plus";
import { LabelInput, LabelCheckbox } from "components/common/LabelInput";
import { useState } from "react";
import "./style.scss";
import "../../scss/content.scss";

import * as pic from "../../pic/pic";
import { Keypair, PublicKey } from "@solana/web3.js";
import { setGovernance, getGovernance } from "../../pic/sim";

const CreateTokenPool = () => {
  const [pool_name, setPoolName] = useState("");
  const [pool_address, setPoolAddress] = useState("");
  const [dao_address, setDaoAddress] = useState("");
  const [collections, setCollections] = useState([""]);
  const [num_collections, setNumCollections] = useState(0);

  const changeCollections = (index: number) => (value: string) => {
    const temp = [...collections];
    temp[index] = value;
    setCollections(temp);
  };

  const onAddCollections = (): void => {
    const temp = [...collections];
    temp.push("");
    setCollections(temp);
  };

  const onInitializeStream = (): void => {};

  const onSave = (): void => {
    const pool_address_pubkey = new PublicKey(pool_address);
    const dao_address_pubkey = new PublicKey(dao_address);
    const collections_pubkey = collections.map(
      (collection) => new PublicKey(collection)
    );

    // let token_stream: pic.Stream = {
    // };
  };

  return (
    // <div className="content">
    <div className="createTokenPool-content">
      {/* <div className="content-left"> */}
      <div className="outer-box-margin">
        <div className="content-outer-box">
          <div className="content-input-box">
            <div className="create-dao">
              {/* <div></div> */}
              <div>Create Token Stream</div>
              <LabelInput
                value={pool_name}
                title="Name"
                onChange={setPoolName}
              />
              <LabelInput
                value={pool_address}
                title="Address"
                onChange={setPoolAddress}
              />
              <LabelInput
                value={dao_address}
                title="Dao Address"
                onChange={setDaoAddress}
              />
              {collections.map((item, index) => (
                <LabelInput
                  value={item}
                  title={index === 0 || item === undefined ? "Collections" : ""}
                  onChange={() => changeCollections(index)}
                  key={index}
                />
              ))}
              <div className="item-wrapper">
                <div></div>
                <div className="add-stream" onClick={onAddCollections}>
                  <PlusIcon /> Add a collection
                </div>
              </div>
              <LabelInput
                value={num_collections}
                title="# of Collections"
                onChange={setNumCollections}
              />
              <div className="tokenpool-btn-group">
                <button className="btn">Cancel</button>
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

export default CreateTokenPool;
