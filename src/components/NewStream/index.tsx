import { PlusIcon } from "components/common/icons/plus";
import { useState } from "react";
import "./style.scss";
import "../common/LabelInput/style.scss";
import Profile from "img/icons/profile.png";

import * as pic from "../../pic/pic";
import * as simPic from "../../pic/sim";
import { PublicKey } from "@solana/web3.js";

const NewStream = (props) => {
  const [is_stream, setStream] = useState(1);
  const [pool_name, setPoolName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [dao_address, setDaoAddress] = useState<string>();
  const [collections, setCollections] = useState<string[]>([]);
  const [num_connections, setNumCollections] = useState(0);
  const [collect, setCollect] = useState<string>();
  const changeCollections = (index: number) => (value: string) => {
    const temp = [...collections];
    temp[index] = value;
    setCollections(temp);
  };
  const onAddCollections = (): void => {
    const temp = [...collections];
    temp.push(collect);
    setCollect("");
    setCollections(temp);
  };
  console.log("collections=", collections);
  const onClickCreateNewStreamBtn = async () => {
    let new_stream = {
      name: pool_name,
      address: new PublicKey(address),
      dao_address: new PublicKey(dao_address),
      collections: collections.map((collect) => {
        let collection={
          address : new PublicKey(collect),
        }
       
        return collection;
      }),
      num_collections:num_connections,
    };
    
    const { dao, stream } = await simPic.initializeStream(
      props.dao,
      new_stream
    ); //initializeStream
  };
  console.log("num=", num_connections);
  return (
    <div className="new-stream">
      <div className="stream-pool-tabs">
        <div
          className={`tab-title ${is_stream == 1 ? "active" : ""}`}
          onClick={() => setStream(1)}
        >
          Create New Stream
        </div>
        <div
          className={`tab-title ${is_stream == 2 ? "active" : ""}`}
          onClick={() => setStream(2)}
        >
          Pools & Streams
        </div>
      </div>
      {is_stream == 1 ? (
        <div className="stream-pool-content">
          <div className="stream-content">
            <div className="content-title">Create Token Streams</div>
            <div className="item-wrapper">
              <div className="title">Pool Name</div>
              <input
                value={pool_name}
                onChange={(evt) => setPoolName(evt.target.value)}
              />
            </div>
            <div className="item-wrapper">
              <div className="title">Address</div>
              <input
                value={address}
                onChange={(evt) => setAddress(evt.target.value)}
              />
            </div>
            <div className="item-wrapper">
              <div className="title">DAO Address</div>
              <input
                value={dao_address}
                onChange={(evt) => setDaoAddress(evt.target.value)}
              />
            </div>
            <div className="item-wrapper plus-button">
              <div className="title">Collections</div>
              <input
                value={collect}
                onChange={(evt) => setCollect(evt.target.value)}
              />
              <div className="input-side-btn">
                <img src={Profile} onClick={onAddCollections} />
              </div>
            </div>
            <div className="item-wrapper">
              <div></div>
              <div className="show-collections">
                {collections!=undefined
                  ? collections.map((item, index) => (
                      <div className="item">{item}</div>
                    ))
                  : ""}
              </div>
            </div>
            <div className="item-wrapper">
              <div className="title">Num_collections</div>
              <input
                value={num_connections}
                className="num"
                onChange={(evt) =>
                  setNumCollections(parseInt(evt.target.value || "0"))
                }
              />
            </div>
          </div>
          <div className="stream-initial-btn">
            <div
              className="initilize-stream-btn"
              onClick={onClickCreateNewStreamBtn}
            >
              InitializeStream
            </div>
          </div>
        </div>
      ) : (
        <div className="pool-stream-table">
          <div className="content-title">Pools & Streams</div>
          <div className="table-container">
            <div className="table-title">Token Streams</div>
            <div className="table-content">
              <table>
                <tr>
                  <th>Name</th>
                  <th>is_active</th>
                  <th>name</th>
                  <th>token_image_url</th>
                  <th>daily_stream_rate</th>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
          <div className="table-container">
            <div className="table-title">Token Pools</div>
            <div className="table-content">
              <table>
                <tr>
                  <th>Name</th>
                  <th>total_earned</th>
                  <th>total_claimed</th>
                  <th>current_pool_amount</th>
                  <th>token_tickers</th>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewStream;
