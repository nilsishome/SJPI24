import React, { JSX } from "react";
import "./Modal.css";

type Props = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<Props> = ({ closeModal }): JSX.Element => {
  return (
    <div className="modalBlur">
      <div className="modalContainer">
        <div className="modalTitle">
          <h1>Hello World!</h1>
        </div>
        <div className="modalBody">
          <p>Here is the main content of the modal.</p>
        </div>
        <div className="modalFooter">
          <button
            onClick={() => {
              closeModal(false);
            }}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
