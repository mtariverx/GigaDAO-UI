import { PlusIcon } from "components/common/icons/plus";
import { useEffect, useState } from "react";
import "./style.scss";
import "../common/LabelInput/style.scss";
import Plus_fill from "img/icons/plus_symbol_fill.png";

import * as pic from "../../pic/pic";
import * as simPic from "../../pic/sim";
import * as livePic from "../../pic/live";
import { Keypair, PublicKey } from "@solana/web3.js";
import Button from "components/common/Button";
import { validateSolanaAddress } from "components/CommonCalls";
import {
  sampleTokenStream1,
  sampleTokenStream2,
} from "pic/sim_data/sample-streams";
import { useAnchorWallet } from "providers/adapters/core/react";
const NewStream = (props) => {

  const { dao } = props;
  const [is_stream, setStream] = useState(1);
  const [pool_name, setPoolName] = useState<string>();
  const [token_mint_address, setTokenMintAddress] = useState<string>();
  const [token_ticker, setTokenTicker] = useState<string>();
  const [token_img_url, setTokenImgUrl] = useState<string>();
  const [stream_rate, setStreamRate] = useState<number>();
  const [collections, setCollections] = useState<string[]>([]);
  const [num_connections, setNumCollections] = useState(0);
  const [collect, setCollect] = useState<string>();

  const [selected_dao, setSelectedDao] = useState<pic.Dao>();
  const [stream_compensate_arr, setStreamCompensateArr] = useState<string[]>(
    []
  );
 const wallet = useAnchorWallet();
  useEffect(() => {
    setSelectedDao({ ...dao });
    setStreamCompArr();
  }, []);

  const table_rows = 10;
  const changeCollections = (index: number) => (value: string) => {
    const temp = [...collections];
    temp[index] = value;
    setCollections(temp);
  };
  const onAddCollections = async () => {
    const temp = [...collections];
    let flag=true;
    //  let flag = await validateSolanaAddress(collect);
    if (flag) {
      if(!temp.includes(collect)){
        temp.push(collect);
        setCollections(temp);
      } else {
        alert("The collection address is duplicated");
      }
    }
    setCollect("");
  };

  const setStreamCompArr = () => {
    const remain_rows = dao.streams
      ? dao.streams.length >= table_rows
        ? 0
        : table_rows - dao.streams.length
      : 10;
    let tmp_stream: string[] = [];
    for (let i = 0; i < remain_rows; i++) {
      tmp_stream.push("tmp_stream");
    }
    setStreamCompensateArr(tmp_stream);
  };

  const onClickCreateNewStreamBtn = async () => {
    if ((await validateSolanaAddress(token_mint_address)) == false) {
      setTokenMintAddress("");
    }
    // if ((await validateSolanaAddress(dao_address)) == false) {
    //   setDaoAddress("");
    // }

    if (
      pool_name && token_ticker && token_img_url &&
      (token_mint_address) &&
      collections.length > 0
    ) {
      console.log("props.dao.dao_address=",props.dao);
      const key=Keypair.generate();
      let new_stream:pic.Stream = {
        name: pool_name,
        address: key.publicKey,
        dao_address: new PublicKey(props.dao.address),
        collections: collections.map((collect) => {
          let collection = {
            address: new PublicKey(collect),
          };

          return collection;
        }),
        num_connections: num_connections,
        token_image_url: token_img_url,
        daily_stream_rate: stream_rate,
        total_earned: 0,
        total_claimed: 0,
        current_pool_amount: sampleTokenStream1.pool_reserve_amount,
        token_ticker: token_ticker,
        last_update_timestamp: Math.floor(Date.now() / 1000),
        is_active: false,
        token_mint_address:new PublicKey(token_mint_address),
        stream_keypair:key,
      };

      const { dao, stream } = await livePic.initializeStream(
        wallet,
        props.dao,
        new_stream
      ); //initializeStream
      setSelectedDao({ ...dao }); //setting dao with streams
      props.onClose(); //close btn
    }
  };

  const streams = dao.streams;
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
          Token Streams
        </div>
      </div>
      {is_stream == 1 ? (
        <div className="stream-pool-content">
          <div className="stream-content">
            <div className="content-title">Create Token Streams</div>
            <div className="item-wrapper">
              <div className="title">Name</div>
              <input
                required
                value={pool_name}
                onChange={(evt) => setPoolName(evt.target.value)}
              />
            </div>
            <div className="item-wrapper">
              <div className="title">Token Mint Address</div>
              <input
                required
                value={token_mint_address}
                onChange={(evt) => setTokenMintAddress(evt.target.value)}
              />
            </div>
            <div className="item-wrapper">
              <div className="title">Token Ticker</div>
              <input
                required
                value={token_ticker}
                onChange={(evt) => setTokenTicker(evt.target.value)}
              />
            </div>
            <div className="item-wrapper">
              <div className="title">Token Image URL</div>
              <input
                required
                value={token_img_url}
                onChange={(evt) => setTokenImgUrl(evt.target.value)}
              />
            </div>
            <div className="item-wrapper">
              <div className="title">Stream Rate</div>
              <input
                required
                type="number"
                value={stream_rate}
                onChange={(evt) =>
                  setStreamRate(parseFloat(evt.target.value))
                }
              />
            </div>
            <div className="item-wrapper plus-button">
              <div className="title">Collections</div>
              <input
                value={collect}
                onChange={(evt) => setCollect(evt.target.value)}
              />
              <div className="input-side-btn">
                <img src={Plus_fill} onClick={onAddCollections} />
              </div>
            </div>
            <div className="item-wrapper">
              <div></div>
              <div className="show-collections">
                {collections != undefined
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
            <Button
              btn_type="common"
              btn_title="Initialize Stream"
              onClick={onClickCreateNewStreamBtn}
            />
          </div>
        </div>
      ) : (
        <div className="pool-stream-table">
          <div className="table-container">
            <div className="table-title">Token Streams</div>
            <div className="table-content">
              <table>
                <tr>
                  <th>Pool Name</th>
                  <th>Pool Address</th>
                  <th>Active</th>
                  <th>Token Image Url</th>
                  <th>Stream Rate</th>
                  <th>Total Earned</th>
                  <th>Total Claimed</th>
                  <th>Current Pool Amount</th>
                  <th>Token Tickers</th>
                </tr>
                {selected_dao && selected_dao.streams
                  ? selected_dao.streams.map((stream) => {
                      return (
                        <tr>
                          <td>{stream.name}</td>
                          <td>{stream.address.toString()}</td>
                          <td>{stream.is_active.toString()}</td>
                          <td>{stream.token_image_url}</td>
                          <td>{stream.daily_stream_rate}</td>
                          <td>{stream.total_earned}</td>
                          <td>{stream.total_claimed}</td>
                          <td>{stream.current_pool_amount}</td>
                          <td>{stream.token_ticker}</td>
                        </tr>
                      );
                    })
                  : ""}
                {}
                {stream_compensate_arr.map((item) => {
                  return (
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
          {/* <div className="table-container">
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
                {selected_dao
                  ? selected_dao.streams.map((stream) => {
                      return (
                        <tr>
                          <td>{stream.name}</td>
                          <td>{stream.total_earned}</td>
                          <td>{stream.total_claimed}</td>
                          <td>{stream.current_pool_amount}</td>
                          <td>{stream.token_ticker}</td>
                        </tr>
                      );
                    })
                  : ""}
                {stream_compensate_arr.map((item) => {
                  return (
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default NewStream;
