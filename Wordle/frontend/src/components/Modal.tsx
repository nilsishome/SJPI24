import React, { JSX } from "react";
import "./Modal.css";

type Props = {
  wordLengthRef: React.RefObject<HTMLSelectElement | null>;
  allowRepetitionRef: React.RefObject<HTMLSelectElement | null>;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  startGame: () => Promise<void>;
};

const Modal: React.FC<Props> = ({
  wordLengthRef,
  allowRepetitionRef,
  startGame,
  closeModal,
}): JSX.Element => {
  return (
    <div className="modalBlur">
      <div className="modalContainer">
        <form
          onSubmit={(event: React.FormEvent<Element>) => {
            event.preventDefault();
            startGame();
            closeModal(false);
          }}
        >
          <div className="modalTitle">
            <h1>Hello World!</h1>
          </div>

          <div className="modalBody">
            <p>Select Word Length</p>
            <select id="wordLength" ref={wordLengthRef} required>
              <option value="">--Please choose an option--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
            </select>

            <p>Must All Letters Be Unique?</p>
            <select id="allowRepetition" ref={allowRepetitionRef} required>
              <option value="">--Please choose an option--</option>
              <option value="true">No</option>
              <option value="false">Yes</option>
            </select>
          </div>

          <div className="modalFooter">
            <button>Start</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
