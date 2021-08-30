import React from 'react';
import { Modal } from 'react-bootstrap';
import { RgbaColorPicker } from 'react-colorful';
import { Button } from 'react-bootstrap';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
const ColorPickerModal = (props) => {
  const { color, setColor, nextAction } = props;

  return (
    <Modal
      {...props}
      size="sm"
      backdrop="static"
      centered
      className="color__modal"
    >
      <Modal.Body className="modal__body">
        <RgbaColorPicker color={color} onChange={setColor} />
      </Modal.Body>
      <Modal.Footer className="modal__footer">
        <div>
          <Button onClick={props.onHide}>
            <AiOutlineClose />
          </Button>
          <Button
            onClick={(event) => {
              nextAction(event);
            }}
          >
            <AiOutlineCheck />
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ColorPickerModal;
