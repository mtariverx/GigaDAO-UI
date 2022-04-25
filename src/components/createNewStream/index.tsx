import { useState } from "react";
import "./style.scss";
import "../common/LabelInput";

const CreateNewStream = () => {
  const [is_stream, setStream] = useState(0);

  return (
    <div className="new-stream">
      <div className="stream-pool-tabs">
        <div className="tab-title">Create New Stream</div>
        <div className="tab-title">Pools & Streams</div>
      </div>
      <div className="stream-pool-content">sflkafj</div>
    </div>
  );
};

export default CreateNewStream;
