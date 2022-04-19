import { useState } from "react";
import { PlusIcon } from "components/common/icons/plus";
import { LabelInput } from "components/common/LabelInput";
import "./style.scss";
import "../../scss/content.scss";
import { Keypair, PublicKey } from "@solana/web3.js";
const CreateSPLTokenStream = () => {
  const [dao_address, setDaoAddress] = useState("");
  const [token_mint_address, setTonkenMintAddress] = useState("");
  const [token_pool_address, setTokenPoolAddress] = useState("");
  const [verified_creator_addresses, setVerifiedCreatorAddress] = useState<
    string[]
  >([""]);
  const [stream_rate, setStreamRate] = useState(0);
  const [is_simulation, setSimulation] = useState<boolean>(false);
  const [is_active, setActive] = useState<boolean>(false);
  const [num_connections, setNumConnections] = useState(0);
  const [total_streamed, setTotalStreamed] = useState(0);
  const [total_claimed, setTotalClaimed] = useState(0);
  const [last_update_timestamp, setLastUpdateTimestamp] = useState(0);

  // {
  //   console.log(is_simulation);
  //   console.log(is_active);
  // }
  const onCancel = (): void => {
    setDaoAddress("");
    setTonkenMintAddress("");
    setTokenPoolAddress("");
    setVerifiedCreatorAddress([""]);
    setStreamRate(0);
    setSimulation(false);
    setActive(false);
    setNumConnections(0);
    setTotalStreamed(0);
    setTotalClaimed(0);
    setLastUpdateTimestamp(0);
  };
  const onSave = (): void => {
    const dao_address_pubkey=new PublicKey(dao_address);
    const token_mint_address_pubkey = new PublicKey(token_mint_address);
    const token_pool_address_pubkey=new PublicKey(token_pool_address);
    const verified_creator_addresses_pubkey = verified_creator_addresses.map((address)=>[new PublicKey(address)]);
    //const stream_rate
    //const is_simulation
    //const is_active
    //const num_connections
    //const total_streamed
    //const total_claimed
    //const last_update_timestamp

  };
  const changeVerifiedCreatorAddress = (index: number) => (value: string) => {
    const temp = [...verified_creator_addresses];
    temp[index] = value;
    setVerifiedCreatorAddress(temp);
  };

  const onAddVerifiedCreatorAddress = (): void => {
    const temp = [...verified_creator_addresses];
    temp.push("");
    setVerifiedCreatorAddress(temp);
  };
  const onRemoveVerifiedCreatorAddress = (index: number): void => {
    const temp = [...verified_creator_addresses];
    temp.splice(index, 1);
    setVerifiedCreatorAddress(temp);
  };
  return (
    <div className="content-spltokenstream">
      <div className="content-left">
        <div className="content-outer-box">
          <div className="content-input-box">
            <div className="create-dao">
              <LabelInput
                value={dao_address}
                title="Ado Address"
                onChange={setDaoAddress}
              />
              <LabelInput
                value={token_mint_address}
                title="Token Mint Address"
                onChange={setTonkenMintAddress}
              />
              <LabelInput
                value={token_pool_address}
                title="Token Pool Address"
                onChange={setTokenPoolAddress}
              />
              {verified_creator_addresses.map((item, index) => (
                <LabelInput
                  value={item}
                  title={index === 0 ? "Collections" : ""}
                  onChange={changeVerifiedCreatorAddress(index)}
                  key={index}
                />
              ))}

              <div className="item-wrapper">
                <div></div>
                <div
                  className="add-stream"
                  onClick={onAddVerifiedCreatorAddress}
                >
                  <PlusIcon /> Add A Verified Creator Address
                </div>
              </div>
              <LabelInput
                value={stream_rate}
                title="Stream Rate"
                onChange={setStreamRate}
              />
              <div className="item-wrapper">
                <div className="input-title">Is Simulation?</div>
                <div className="input-checkbox">
                  <input
                    type="checkbox"
                    defaultChecked={is_simulation}
                    onChange={() => setSimulation(!is_simulation)}
                  />
                </div>
              </div>
              <div className="item-wrapper">
                <div className="input-title">Is Active?</div>
                <div className="input-checkbox">
                  <input
                    type="checkbox"
                    defaultChecked={is_active}
                    onChange={() => setActive(!is_active)}
                  />
                </div>
              </div>
              <LabelInput
                value={num_connections}
                title="# of Connections"
                onChange={setNumConnections}
              />
              <LabelInput
                value={total_streamed}
                title="# of Streamed"
                onChange={setTotalStreamed}
              />
              <LabelInput
                value={total_claimed}
                title="# of Total Claimed"
                onChange={setTotalClaimed}
              />
              <LabelInput
                value={last_update_timestamp}
                title="Last Update Timestamp"
                onChange={setLastUpdateTimestamp}
              />
              <div className="content-btn-group">
                <button className="btn" onClick={onCancel}>
                  Cancel
                </button>
                <button className="btn" onClick={onSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-right">
        <div className="content-outer-box">
          <div className="content-input-box">
            <div className="content-dao-image">
              <img src="/rainbow512.png" alt="Girl in a jacket" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSPLTokenStream;
