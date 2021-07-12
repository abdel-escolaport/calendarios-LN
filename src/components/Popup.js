import { useState } from "react";

import PopPop from "react-poppop";
const Popup = () => {
  const [show, setshow] = useState(false);

  const toggleShow = (show) => {
    setshow({ show });
  };

  return (
    <div>
      <button onClick={() => toggleShow(true)}>Short content</button>
      <PopPop
        position="centerCenter"
        open={show}
        closeBtn={true}
        closeOnEsc={true}
        onClose={() => toggleShow(false)}
        closeOnOverlay={true}
      >
        <div style={{ textAlign: "center" }}>
          <div>
            <h1>Short Content</h1>
            <p>super short.</p>
          </div>
        </div>
      </PopPop>
    </div>
  );
};

export default Popup;
